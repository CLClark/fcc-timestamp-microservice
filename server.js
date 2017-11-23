// server.js
// where your node app starts

// init project
var express = require('express');
var chrono = require('chrono-node');

var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//app.get("/stone", function (request, response) {
 // response.sendFile(__dirname + '/views/stone.html');
//});

//request syntax
//$.post('/dreams?' + $.param({dream: dream})

//could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response){
  var stringIn = request.query.dream;
  var toCheck = new Date(Date.parse(stringIn));
  //convert to date
  //convert date to ISO
  //convert date to UNIX
  //check if date.toString === request.query.dream.toString
  if(toCheck.getTime() == stringIn){
    response.send(JSON.parse( { "UNIX": toCheck.getTime(), "Natural Language": toCheck.toDateString() }));
  }
  else if(chrono.parseDate(stringIn) !== null ){
    response.send(JSON.parse( { "UNIX": toCheck.getTime(), "Natural Language": toCheck.toDateString() }));
  }
  else{
    response.send(JSON.parse( { "UNIX": null, "Natural Language": null }));
  }
  //dreams.push(request.query.dream);
  //  response.sendFile(__dirname + '/views/stone.html');
  //response.sendStatus(200);  
});


// Simple in-memory store for now

var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


