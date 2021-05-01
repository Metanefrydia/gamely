const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: false, 
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
  }
});

mongoose.model('Announcement', announcementSchema);