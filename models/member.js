const mongoose = require('mongoose');

// Define models
const Schema = mongoose.Schema;
const memberSchema = new Schema({
  memberName: { type: String, required: [true, 'Please enter a name'] },
});

module.exports = mongoose.model('Member', memberSchema);
