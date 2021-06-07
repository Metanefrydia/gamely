const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const ctrlAnnouncement = require('../controllers/announcements');

const storage = require('../helpers/storage');
const express = require('express');
const router = express.Router();

// profile
router.get('/profile/:userName', ctrlProfile.getProfile);
router.get('/profile-id/:id', ctrlProfile.getProfileById);
router.get('/user-announcements/:userId', ctrlProfile.getUserAnnouncements);
router.post('/edit-profile', storage, ctrlProfile.editProfile);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// announcement
router.post('/announcement', ctrlAnnouncement.createAnnouncement);
router.get('/announcement/:announcementId', ctrlAnnouncement.getAnnouncement);
router.get('/announcements', ctrlAnnouncement.getAnnouncements);
router.delete('/announcement/:announcementId', ctrlAnnouncement.deleteAnnouncement);
router.put('/announcement/:announcementId', ctrlAnnouncement.editAnnouncement);

module.exports = router;