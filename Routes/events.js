const express = require('express');
const router = express.Router();
const {verifyJWT,verifyRole} = require('../Middleware/authMiddleware');
const {getEvents,createEvent,updateEvent,deleteEvent} = require('../Controllers/eventController');

router.get('/events', getEvents);
router.post('/events', verifyJWT,verifyRole('organizer'),createEvent);
router.put('/events/:id',verifyJWT,verifyRole('organizer'),updateEvent);
router.delete('/events/:id',verifyJWT,verifyRole('organizer'),deleteEvent);



module.exports = router;