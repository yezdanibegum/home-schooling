const mongoose = require('mongoose');

const AttendeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: 'Not Checked In' },
    checkInTimes: [Date],
    checkOutTimes: [Date]
});

module.exports = mongoose.model('Attendee', AttendeeSchema);
