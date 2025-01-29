const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const events = [];

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeToken;
        //return next();
        if (req.user.role !== 'organizer') {
            return res.status(403).send({ message: 'Unauthorized' });
        }
        next();
    }
    else {
        return res.status(403).send({ message: 'Invalid token' });
    }
    next();
}

router.get('/events', (req, res) => {
    res.send(events);
});

router.use(verifyJWT);

router.post('/events', (req, res) => {
    const { title, date, time, description } = req.body;
    const newEvent = { title, date, time, description };
    const len = events.length;
    if (len == 0) {
        newEvent.id = 1;
    }
    else {
        newEvent.id = events[len - 1].id + 1;
    }
    events.push(newEvent);
    res.send({ message: 'Event created' });

});

router.put('/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, date, time, description } = req.body;
    if (!title || !date || !time || !description) {
        return res.status(400).send({ message: 'Invalid Request' });
    }
    const index = events.findIndex(event => event.id === id);
    if (index == -1) {
        return res.status(404).send({ message: "Invalide Request" });
    }
    const updateEvent = { title, date, time, description, id };
    events[index] = updateEvent;
    res.send({ message: 'Event updated' });
});

router.delete('/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = events.findIndex(event => event.id === id);
    if (index == -1) {
        return res.status(404).send({ message: "Invalide Request" });
    }
    events.splice(index, 1);
    res.send({ message: 'Event Deleted' });
});


module.exports = router;