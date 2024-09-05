require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const attendeesRouter = require('./routes/attendees');
const usersRouter = require('./routes/users');
const timesheetsRouter = require('./routes/timesheets');

const app = express();

// Update CORS settings
app.use(cors({
  origin: 'https://home-schooling.onrender.com'
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to Database'))
.catch((error) => {
  console.error('Database connection error:', error);
  console.error('Error details:', JSON.stringify(error, null, 2));
});

app.get('/', (req, res) => {
  res.send('Home Schooling API');
});

app.use('/attendees', attendeesRouter);
app.use('/users', usersRouter);
app.use('/timesheets', timesheetsRouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
