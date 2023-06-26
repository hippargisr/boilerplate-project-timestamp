// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date(\\d+)", function(req, res) {
  const { date } = req.params;
  const timestamp = Number(date);
  const dateObject = new Date(timestamp);
  
  if (isNaN(timestamp)) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: timestamp, utc: dateObject.toUTCString() });
  }
});

app.get("/api/:date?", function(req, res) {
  let { date } = req.params;
  
  if (!date) {
    date = new Date();
  }
  
  const timestamp = Date.parse(date);
  
  if (isNaN(timestamp)) {
    res.json({ error: "Invalid Date" });
  } else {
    const dateObject = new Date(timestamp);
    res.json({ unix: timestamp, utc: dateObject.toUTCString() });
  }
});


// listen for requests :)
var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
