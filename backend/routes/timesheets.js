const express = require('express');
const router = express.Router();
const Attendee = require('../models/Attendee');

// Get all attendees
router.get('/', async (req, res) => {
    try {
        const attendees = await Attendee.find();
        res.json(attendees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new attendee
router.post('/', async (req, res) => {
    const attendee = new Attendee({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const newAttendee = await attendee.save();
        res.status(201).json(newAttendee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update attendee status
router.patch('/:id', getAttendee, async (req, res) => {
    if (req.body.status != null) {
        res.attendee.status = req.body.status;
        if (req.body.status === 'Checked In') {
            res.attendee.checkInTimes.push(new Date());
        } else {
            res.attendee.checkOutTimes.push(new Date());
        }
    }

    try {
        const updatedAttendee = await res.attendee.save();
        res.json(updatedAttendee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function getAttendee(req, res, next) {
    let attendee;
    try {
        attendee = await Attendee.findById(req.params.id);
        if (attendee == null) {
            return res.status(404).json({ message: 'Cannot find attendee' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.attendee = attendee;
    next();
}

module.exports = router;
