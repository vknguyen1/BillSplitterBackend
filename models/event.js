const mongoose = require('mongoose');

// Define models
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  eventName: {
    type: String,
    required: [true, 'Please give a title to the event'],
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],
});

module.exports = mongoose.model('Event', eventSchema);
