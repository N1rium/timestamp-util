# timestamp-util
API to handle dates and timestamp conversions

# Install
`$ npm install timestamp-utility`

## Features
  * timestamp to date conversion
  * date to timestamp conversion
  * timestamp + date object from mathematically evaluated expressions using [mathjs](https://www.npmjs.com/package/mathjs)
  * slack slash command ready with mathematically evaluated expressions

## Quick Start
The fastest way to get timestamp-util up and running is to simply run the start command
```
$ npm run start
```
To launch the [Express](https://www.npmjs.com/package/express) server and navigate to:
```
http://localhost:3000
```
And you should be presented with a JSON object similar to:
```
{
    "timestamp": 1521879441885,
    "date": "2018-03-24 09:17:21"
}
```

## Timestamp to date conversion
Simply converts a given timestamp to a date.
```
http://localhost:3000/api/v1/date/1521821170061
```
And the return value would be (UTC):
```
2018-03-23 16:06:10
```

## Date to timestamp conversion
Simply converts a given date to a timestamp.
```
http://localhost:3000/api/v1/timestamp/1995-08-23 17:06:10
```
And the return value would be similar to:
```
809190370000
```

## Combined JSON object from mathematically evaluated expressions
This is probably the most handy feature of timestamp-util. You can provide any mathematical value to get a timestamp which will then also be converted to a date object. Look at the following example:
```
http://localhost:3000/api/v1/calc/0
```
The passed value is simply zero which will give you the first millisecond possible in relation to Epoch time (1970-01-01).
So the returned object would display both the timestamp and the date:
```
{
    "timestamp": 0,
    "date": "1970-01-01 00:00:00"
}
```
timestamp-util can take some predefined values that are then converted to math:
```
now | new Date().getTime()
ms  | (1)
s   | (1000)
m   | (1000 * 60)
h   | (1000 * 60 * 60)
d   | (1000 * 60 * 60 * 24)
```
The predefined value `now` is extremely useful since it gives you the current time in milliseconds. 
Lets say you are working on a tournament system and you want it to start 10 minutes from now. timestamp-util would handle that with ease using the following:
```
http://localhost:3000/api/v1/calc/now + 10m
```
This is then converted internally and (at the time of this writing) would be exactly the same as calling:
```
http://localhost:3000/api/v1/calc/1521823375773 + 10(1000 * 60 * 10)
```
Which returned:
```
{
    "timestamp": 1521823975773,
    "date": "2018-03-23 17:52:55"
}
```
The reason this works is because the value passed is evaluated by using [mathjs](https://www.npmjs.com/package/mathjs). The bottom line is that `/calc` is really good if you want conversions both ways and especially if you need a timestamp in relation to current time.

## A few examples
Here comes a few example values passed to `/calc` to better understand how it works
```
 -- Value passed to /calc --  -- Timestamp --      -- Date --
1000 + 2 * 250000  * 3489034 | 1744517001000 | 2025-04-13 05:03:21
now * 2                      | 3043646895558 | 2066-06-13 10:28:15
365d + 48h                   | 31708800000   | 1971-01-03 01:00:00
now + 1d - 60s + 25ms * 2    | 1521909976637 | 2018-03-24 17:46:16
```

## A working example
timestamp-util is hosted on [Heroku](https://www.heroku.com/) and is using the GitHub deployment method so it is directly connected to this repository. Simply visit https://timestamp-util.herokuapp.com to expreiment with the different features.
