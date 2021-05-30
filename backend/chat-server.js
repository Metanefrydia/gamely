const { v4: getID } = require("uuid");
const WebSocket = require("ws").Server;
const port = process.env.PORT || 2233;
const CLIENTS = new Map();
const ROOMS = new Map();
const wss = new WebSocket({ port });

wss.on("connection", (client) => {
  const id = getID();
  client.uid = id;
  CLIENTS.set(id, client);
  const msg = {
    type: "connection",
    text: "Connection is established.",
    id: id,
  };
  client.send(JSON.stringify(msg));

  client.on("close", () => {
    const leave_id = client.uid;
    const room_id = client.room;
    if (client.room) {
      const thisRoom = ROOMS.get(room_id);
      if (thisRoom.attendees.has(leave_id)) {
        const msg = {
          type: "leave",
          text: "Bye",
          id: client.uid,
        };
        thisRoom.attendees.forEach((c) => {
          if (c !== client) {
            c.send(JSON.stringify(msg));
          }
        });
        thisRoom.attendees.delete(leave_id);
        if (thisRoom.attendees.size === 0) {
          ROOMS.delete(room_id);
        }
      }
    }
    CLIENTS.delete(leave_id);
  });

  client.on("message", (m) => {
    const msg = JSON.parse(m);
    const room = msg.id;
    switch (msg.type) {
      case "connection":
        client.name = msg.text;
        break;
      case "getMembers":
        let attendees = [];
        if (ROOMS.has(room)) {
          const thisRoom = ROOMS.get(room);
          thisRoom.attendees.forEach((attendee) => {
            attendees.push(attendee.name)
          })
          const m = {text: attendees, type: 'getMembers'}
          thisRoom.attendees.forEach((attendee) => {
            attendee.send(JSON.stringify(m))
          })
        }
        break;
      case "message":
        if (ROOMS.has(room)) {
          const thisRoom = ROOMS.get(room);
          msg.id = client.name;
          thisRoom.attendees.forEach((c) => {
            c.send(JSON.stringify(msg));
          });
        }
        break;
      case "join":
        client.room = room;
        if (!ROOMS.has(room)) {
          const newroom = {
            name: room,
            host: client,
            attendees: new Map(),
          };
          ROOMS.set(room, newroom);
        }
        const thisRoom = ROOMS.get(room);
        thisRoom.attendees.set(client.uid, client);
        const list = [];
        thisRoom.attendees.forEach((c) => {
          list.push({ name: c.name, id: c.uid });
        });
        const m = { text: list, id: client.uid, type: "list" };
        thisRoom.attendees.forEach((c) => {
          c.send(JSON.stringify(m));
        });
        break;
      case "available":
        if (ROOMS.has(room)) {
          const thisRoom = ROOMS.get(room);
          msg.id = msg.text;
          msg.text = client.name;
          thisRoom.attendees.forEach((c) => {
            console.log("call", c.name);
            if (c !== client) {
              c.send(JSON.stringify(msg));
            }
          });
        }
        break;
    }
  });
});
