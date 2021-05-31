const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const ctrlAnnouncement = require('../controllers/announcements');

const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');

const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload',
  algorithms: ['HS256']
});

// profile
router.get('/profile/', auth, ctrlProfile.profileRead);
router.put('/edit-profile', ctrlProfile.editProfile);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// announcement
router.post('/announcement', ctrlAnnouncement.createAnnouncement);
router.get('/announcements', ctrlAnnouncement.getAnnouncements);

module.exports = router;