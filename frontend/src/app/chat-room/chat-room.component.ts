import { AnnouncementsService } from './../announcements/service/announcements.service';
import { AuthenticationService } from './../authentication/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMsg, IMsgType } from 'src/models/IMessage.js';
import { IPeerJs } from 'src/models/peerJS.js';
import { from, Subject } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment.js';
import { ActivatedRoute } from '@angular/router';

const mediaConstraints: MediaStreamConstraints = {
  audio: {
    autoGainControl: false,
    channelCount: 2,
    echoCancellation: false,
    latency: 0,
    noiseSuppression: false,
    sampleRate: 48000,
    sampleSize: 16
  },
  video: false
};

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  public msg: string = '';
  public messages: IMsg[] = [];
  public end$ = new Subject();
  public socket = new WebSocketSubject<IMsg>(environment.url);
  public _room = '';
  public room = '';
  public _name: string = '';
  public name: string = '';
  public localStream!: MediaStream;
  public remoteStreams: MediaStream[] = [];
  public myPeer!: IPeerJs;
  public peers: {
    [id: string]: any;
  } = {};
  public id: string = '';
  public remoteNames: string[] = [];
  public members: any = [];

  public constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private announcementService: AnnouncementsService
  ) {}

  public ngOnInit(): void {
    this.socket.pipe(takeUntil(this.end$)).subscribe(
      (m) => {
        switch (m.type) {
          case 'connection':
            if (m.text === 'Welcome') {
              this.id = m.id;
            }
            this.getMembers();
            break;
          case 'message':
            this.messages.push(m);
            break;
          case 'available':
            const call = this.myPeer.call(m.id, this.localStream);
            this.connectToNewUser(call);
            break;
          case 'leave':
            this.peers[m.id]?.close();
            this.getMembers();
            break;
          case 'getMembers':
            this.members = m.text;
            this.updateAnnouncement();
            break;
        }
      },
      (err) => {
        console.error(err);
        this.name = '';
        this.room = '';
      }
    );

    this.setName(this.authenticationService.getUserDetails().name);

    this.route.paramMap.subscribe((params) => {
      this.setRoom(params.get('id'));
    });
  }

  public updateAnnouncement(): void {
    this.announcementService
      .getAnnouncementById(this.room)
      .subscribe((response) => {
        let announcement = response.data.announcement;
        announcement.members = this.members;
        this.announcementService
          .editAnnouncement(this.room, announcement)
          .subscribe((response) => {});
      });
  }

  public getMembers(): void {
    this.sendSignal('', 'getMembers');
  }

  public setName(value: string) {
    if (value) {
      this.name = value;
      this.sendSignal(this.name, 'connection');
    }
  }

  public initAudio(): void {
    from(navigator.mediaDevices.getUserMedia(mediaConstraints))
      .pipe(
        tap((stream) => (this.localStream = stream)),
        mergeMap(() => from(import('./../../assets/peer.js')))
      )
      .pipe(takeUntil(this.end$))
      .subscribe((data) => {
        this.myPeer = new data.default(this.name) as IPeerJs;
        this.myPeer.on('open', () => {});
        this.myPeer.on('call', (call) => {
          call.answer(this.localStream);
          this.connectToNewUser(call);
        });
      });
  }

  public startCall() {
    this.sendSignal(this.name, 'available');
  }

  public sendSignal(text: string, type: IMsgType = 'message') {
    this.socket.next({ type, id: this.room, text });
    this.msg = '';
  }

  public setRoom(roomId: string) {
    if (roomId) {
      this.room = roomId;
      this.sendSignal(this.room, 'join');
      this.initAudio();
    }
  }

  public connectToNewUser(call: any) {
    call.on('stream', (stream: MediaStream) => {
      this.remoteStreams.push(stream);
      this.peers[call.peer] = call;
      this.remoteNames = Object.keys(this.peers);
    });
    call.on('close', () => {
      this.peers[call.peer].close();
    });
  }

  public ngOnDestroy() {
    if (this.members.length === 1) {
      this.members = [];
      this.updateAnnouncement();
    }
    this.end$.next(1);
  }
}
