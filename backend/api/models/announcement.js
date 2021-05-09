const mongoose = require('mongoose');
const User = mongoose.model('User');

const announcementSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: false, 
  },
  members: {
      type: Number,
      required: true
  },
  maxMembers: {
      type: Number,
      required: true
  },
  date: {
      type: Date,
      required: true
  },
  type: {
      type: String,
      required: true
  },
  mode: {
      type: String,
      required: true
  },
  game: {
      type: String,
      required: true
  },
  rank: {
      type: String,
      required: false
  },
  createdAt: {
      type: Date,
      required: true
  },
  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
  }
});

mongoose.model('Announcement', announcementSchema);