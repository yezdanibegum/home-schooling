require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const attendeesRouter = require('./routes/attendees');
const usersRouter = require('./routes/users');
const timesheetsRouter = require('./routes/timesheets');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '..', 'frontend')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to Database'))
.catch((error) => {
  console.error('Database connection error:', error);
});

app.use('/api/attendees', attendeesRouter);
app.use('/api/users', usersRouter);
app.use('/api/timesheets', timesheetsRouter);

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
