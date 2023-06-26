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

app.get("/api/:unix(\\d+)", function(req, res) {
  const dateObject = new Date(Number(req.params.unix));
  const utcString = dateObject.toUTCString();
  res.json({ unix: req.params.unix, utc: utcString });
});
app.get("/api/:date", function(req, res) {
  const unixTime = new Date(req.params.date).getTime();
  const utcString = new Date(req.params.date).toUTCString();
  res.json({ unix: unixTime, utc: utcString });
});


// listen for requests :)
var listener = app.listen(3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
