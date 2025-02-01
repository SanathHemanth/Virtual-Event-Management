const jwt = require('jsonwebtoken');

const events = [];

const getEvents = (req, res) => {
    try {
        res.send(events);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const createEvent = (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateEvent = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, date, time, description } = req.body;
        if (!title || !date || !time || !description) {
            return res.status(404).send({ message: 'Invalid Request' });
        }
        const index = events.findIndex(event => event.id === id);
        if (index == -1) {
            return res.status(404).send({ message: "Invalid Request" });
        }
        const updateEvent = { title, date, time, description, id };
        events[index] = updateEvent;
        res.send({ message: 'Event updated' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

};

const deleteEvent= (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const index = events.findIndex(event => event.id === id);
        if (index == -1) {
            return res.status(404).send({ message: "Invalid Request" });
        }
        events.splice(index, 1);
        res.send({ message: 'Event Deleted' });
    }catch (error) {
        res.status(500).send({ error: error.message });
    }
    
};


module.exports = { events, getEvents, createEvent, updateEvent,deleteEvent };