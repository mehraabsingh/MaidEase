const mongoose = require('mongoose');

// Define the schema for the negotiations
const negotiationSchema = new mongoose.Schema({
  offer: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create the model based on the schema
const Negotiation = mongoose.model('Negotiation', negotiationSchema);

// Export the model so it can be used in other files
module.exports = Negotiation;
