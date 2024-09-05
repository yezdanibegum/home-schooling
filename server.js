require('dotenv').config();
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const attendeesRouter = require('./routes/attendees');
   const usersRouter = require('./routes/users');
   const timesheetsRouter = require('./routes/timesheets');

   const app = express();
   app.use(cors());
   app.use(express.json());

   mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

   const db = mongoose.connection;
   db.on('error', (error) => console.error(error));
   db.once('open', () => console.log('Connected to Database'));

   app.use('/attendees', attendeesRouter);
   app.use('/users', usersRouter);
   app.use('/timesheets', timesheetsRouter);

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));