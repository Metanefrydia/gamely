const mongoose = require('mongoose');
const Announcement = mongoose.model('Announcement');

module.exports.createAnnouncement = (req, res) => {
    const announcement = new Announcement();

    announcement.title = req.body.title;
    announcement.description = req.body.description;
    announcement.maxMembers = req.body.maxMembers;
    announcement.date = req.body.date;
    announcement.type = req.body.type;
    announcement.mode = req.body.mode;
    announcement.game = req.body.game;
    announcement.rank = req.body.rank;

    announcement.save(() => {
        res.status(200);
        res.json({
            message: "Announcement created!"
        })
    })
}