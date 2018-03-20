require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const moment = require('moment');
const { getCalculatedString } = require('./util');
const math = require('mathjs');

app.use(bodyParser.json(), allowCorsMiddleware);

app.get('/api/v1/timestamp/:date', getTimestampFromDate);
app.get('/api/v1/date/:timestamp', getDateFromTimestamp);
app.get('/api/v1/calc/:value', getCalculatedDate);

function getTimestampFromDate(req, res) {
  const date = new Date(moment(req.params.date)).getTime();
  return res.status(200).send(date.toString());
}

function getDateFromTimestamp(req, res) {
  const timestamp = moment(Number(req.params.timestamp)).format("YYYY-MM-DD HH:mm:ss");
  return res.status(200).send(timestamp.toString());
}

function getCalculatedDate(req, res) {
  const str = getCalculatedString(req.query.text || req.params.value);
  const evaluated = math.eval(str);
  return res.status(200).json({
    timestamp: evaluated,
    date: moment(Number(evaluated)).format("YYYY-MM-DD HH:mm:ss")
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/* Add CORS-headers to every request */
function allowCorsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}