const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: String,

  last: String,

  buy: String,

  sell: String,

  volume: String,

  base_unit: String,
});

const data = mongoose.model('data', dataSchema);
module.exports = data;
