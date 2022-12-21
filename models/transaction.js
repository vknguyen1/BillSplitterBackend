const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  // date: {
  //   type: Date,
  //   required: [true, 'Please enter a date'],
  // },
  memberName: {
    type: String,
    required: [true, 'Please enter a name'],
    validate: {
      validator: (value) => /^[A-Za-z]+$/.test(value),
      message: 'Member name must only contain letters',
    },
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter a value'],
    validate: {
      validator: (value) => value > 0,
      message: 'Price must be a positive number',
    },
  },
});

const date = new Date(); // Example date
const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};
const formattedDate = date.toLocaleDateString('en-US', options); // "12/15/2022"

module.exports = mongoose.model('Transaction', transactionSchema);
