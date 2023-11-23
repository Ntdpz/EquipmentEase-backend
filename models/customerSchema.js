const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  telephoneNumber: String,
  // Add other properties as needed
});

const customerModel = mongoose.model('customers', customerSchema);

module.exports = customerModel;