const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const productRouter = require('./routes/productRouter');
const customerRouter = require('./routes/customerRouter');
const billRouter = require('./routes/billRouter');

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://admin:admin@equipmentease.l6tl6ay.mongodb.net/product');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(productRouter);
app.use(customerRouter);
app.use(billRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
