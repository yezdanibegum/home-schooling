const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const attendeesRouter = require('./routes/attendees');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/attendance', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use('/attendees', attendeesRouter);

app.listen(3000, () => console.log('Server Started'));
