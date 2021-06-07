const mongoose = require("mongoose");
const Announcement = mongoose.model("Announcement");
const User = mongoose.model("User");

module.exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.createdBy },
      { $push: { createdAnnouncements: announcement._id } }
    );
    res.status(201).json({
      status: "success",
      data: { announcement: announcement },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

module.exports.getAnnouncements = async (req, res) => {
  try {
    let announcements;
    if (req.params.game !== 'null' && req.params.rank !== 'null') {
      announcements = await Announcement.find({
        "$expr": { 
        "$and": [
            { "$eq": ["$game", req.params.game] },
            { "$eq": ["$rank", req.params.rank] }
        ]
      }});
    } else if (req.params.game !== 'null') {
      announcements = await Announcement.find({ game: req.params.game });
    } else {
      announcements = await Announcement.find();
    }
    
    res.status(200).json({
      status: "success",
      results: announcements.length,
      data: { announcements },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

module.exports.deleteAnnouncement = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.announcementId);
    await Announcement.findByIdAndDelete({_id: id});

    res.status(200).json({
      status: "success"
    });
  } catch (err) {
      res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

module.exports.getAnnouncement = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.announcementId);
    const announcement = await Announcement.findById(id);
    
    res.status(200).json({
      status: "success",
      data: { announcement },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

module.exports.editAnnouncement = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.announcementId);
    const announcementData = req.body;
    const announcement = await Announcement.findByIdAndUpdate(id, announcementData);

    res.status(201).json({
      status: "success",
      data: { announcement: announcement },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
}