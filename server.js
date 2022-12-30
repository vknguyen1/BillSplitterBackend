///////////////////////////////
// Dependencies
////////////////////////////////
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const memberRouter = require('./controllers/members');
const transactionRouter = require('./controllers/transactions');
const eventRouter = require('./controllers/events');
const bodyParser = require('body-parser');

// create application object
const app = express();

///////////////////////////////
// Application Settings
////////////////////////////////
require('dotenv').config();

const { PORT = 4001, DATABASE_URI } = process.env;

mongoose.connect(DATABASE_URI);
// Mongo connection Events
mongoose.connection
  .on('open', () => console.log('You are connected to MongoDB'))
  .on('close', () => console.log('You are disconnected from MongoDB'))
  .on('error', (error) => console.log(`MongoDB Error: ${error.message}`));

///////////////////////////////
// Mount Middleware
////////////////////////////////
app.use(cors());
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
///////////////////////////////
// Mount Routes
////////////////////////////////

// create a test route
app.get('/', (req, res) => {
  res.send('Welcome to Split the Bill API');
});

app.use('/api/friends', memberRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/events', eventRouter);

// fallback route or catch all route

app.get('/*', (req, res) => {
  res.status(404).json({ message: 'notfound' });
});

///////////////////////////////
// Tell the app to listen
////////////////////////////////
app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`);
});
