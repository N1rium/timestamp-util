require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const moment = require('moment');

app.use(bodyParser.json(), allowCorsMiddleware);

app.get('/api/v1/timestamp/:date', getTimestampFromDate);
app.get('/api/v1/date/:timestamp', getDateFromTimestamp);

function getTimestampFromDate(req, res) {
  const date = new Date(moment(req.params.date)).getTime();
  return res.status(200).send(date.toString());
}

function getDateFromTimestamp(req, res) {
  const timestamp = moment(Number(req.params.timestamp)).format("YYYY-MM-DD HH:mm:ss");
  return res.status(200).send(timestamp.toString());
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/* Add CORS-headers to every request */
function allowCorsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}