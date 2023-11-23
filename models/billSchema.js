const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    },
  });

  const billsModels = mongoose.model('bills', billSchema);

module.exports = billsModels;