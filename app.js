const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch');
const Data = require('./model.js');
dotenv.config();

const app = express();

app.use(cors());

let data = [];
const fetcheddata = async () => {
  let response = await fetch('https://api.wazirx.com/api/v2/tickers');
  let json = await response.json();
  let object = [];
  for (item in json) {
    object.push(json[item]);
  }
  object = object.slice(0, 10);
  object.map((item) => {
    data.push({
      base_unit: item.base_unit,
      last: item.last,
      volume: item.volume,
      sell: item.sell,
      buy: item.buy,
      name: item.name,
    });
  });
  const allData = Data.find({});
  if (allData.length == 0)
    Data.insertMany(data).then((result) => {
      console.log(result);
    });
};
fetcheddata();

app.get('/getData', async (req, res) => {
  const tabledata = await Data.find({});
  // console.log(tabledata);
  res.status(200).send(tabledata);
});

const port = process.env.PORT || 3030;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Successfully connected with database'))
  .then(() => {
    app.listen(port, () => {
      console.log('Server started');
    });
  });
