const mongoose = require("mongoose");
const User = mongoose.model("User");
const Announcement = mongoose.model("Announcement");

module.exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.userName });

    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err,
    });
  }
};

module.exports.getProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err,
    });
  }
}

module.exports.editProfile = async (req, res) => {
  try {
    let user;
    const id = req.body._id;
    const userData = req.body;
    userData.games = JSON.parse(req.body.games);
    if (req.file) {
      const imagePath = 'http://localhost:3000/images/' + req.file.filename;
      user = await User.findByIdAndUpdate(id, { ...userData, imagePath });
    } else {
      user = await User.findByIdAndUpdate(id, userData);
    }

    res.status(201).json({
      status: "success",
      data: { user: user },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

module.exports.getUserAnnouncements = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    const announcements = await Announcement.find({
      _id: { $in: user.createdAnnouncements },
    });

    res.status(200).json({
      status: "success",
      userAnnouncements: announcements,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};