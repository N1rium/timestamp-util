require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { timestampFromDate, dateFromTimestamp, evaulatedDateObj } = require('./util');

app.use(bodyParser.json(), allowCorsMiddleware);

app.get('/api/v1/timestamp/:date', getTimestampFromDate);
app.get('/api/v1/date/:timestamp', getDateFromTimestamp);
app.get('/api/v1/calc/:value', getCalculatedDate);


function getTimestampFromDate(req, res) {
  const date = timestampFromDate(req.params.date);
  return res.status(200).send(date.toString());
}

function getDateFromTimestamp(req, res) {
  const timestamp = dateFromTimestamp(req.params.timestamp);
  return res.status(200).send(timestamp.toString());
}

function getCalculatedDate(req, res) {
  const obj = evaulatedDateObj(req.query.text || req.params.value);
  return res.status(200).json(obj);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/* Add CORS-headers to every request */
function allowCorsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}