const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.profileRead = (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      message: 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    User.findById(req.payload._id).exec(function(err, user) {
      res.status(200).json(user);
    });
  }
};

module.exports.editProfile = async (req, res) => {
  try {
    const id = req.body._id;
    const userData = req.body;
    const user = await User.findByIdAndUpdate(id, userData);

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
}