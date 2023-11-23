const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    details: String,
    startDate: Date,
    endDate: Date,
    address: String,
    image: String,
    // เพิ่ม properties ตามที่ต้องการ
  });

  const productModel  = mongoose.model('Products', productSchema);

module.exports = productModel ;