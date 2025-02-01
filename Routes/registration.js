const express = require('express');
const router = express.Router();
const {verifyJWT,verifyRole} = require('../Middleware/authMiddleware');
const {joinEvent} = require('../Controllers/registrationController');

router.post('/events/:id/register',verifyJWT,verifyRole('attendee'),joinEvent);

module.exports = router;

