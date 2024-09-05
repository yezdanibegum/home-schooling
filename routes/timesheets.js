const express = require('express');
const router = express.Router();
const Attendee = require('../models/Attendee');

router.get('/monthly', async (req, res) => {
    try {
        const attendees = await Attendee.find();
        const timesheet = attendees.map(attendee => {
            return {
                name: attendee.name,
                email: attendee.email,
                checkInTimes: attendee.checkInTimes,
                checkOutTimes: attendee.checkOutTimes
            };
        });
        res.json(timesheet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
