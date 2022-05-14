var express = require('express');
var app = express();
require('dotenv').config();

var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function(_, res) {
    let date = new Date();
    res.json({utc: date.toUTCString(), unix: Math.round(date.getTime())});
});

app.get('/api/:date', function(req, res) {
    let { date } = req.params;
    if (/^([\s\d]+)$/g.test(date))
        parsed = new Date(parseInt(date));
    else
        parsed = new Date(date);
    
    let time = parsed.getTime();
    parsed = parsed.toUTCString();

    if (parsed === "Invalid Date") return res.json({error: parsed});
    res.json({utc: parsed, unix: Math.round(time)});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
