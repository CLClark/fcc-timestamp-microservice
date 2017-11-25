// server.js
// where your node app starts

var express = require('express');
var app = express();

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.get("/:timeIn", function (request, response){
  response.type('json');
  
  //implentation logic, first check if it's unix time
  var timeIn = parseInt(request.params.timeIn.slice(0,15)); //first set of request digits build into a new integer
  var toCheck = new Date(parseInt(timeIn));  
  //tester response.send(jfyer(timeIn, toCheck.getTime()));
  
  //easy condition - compare Date method ms getter to the parsed timeIn
  if(toCheck.getTime() == timeIn){ 
    response.send(jfyer(toCheck.getTime(), toCheck.toDateString()));
  }
  
  //hard condition - check if natural language
  var toParse = request.params.timeIn; //Unprocessed String
  //check if contains
    //words
      //month [full names or abbreviations] *no spell check
      //day of week   [full names or abbreviations] *no spell check 
    //numbers
      //day date
      //year
      //numerical date
      //time [hours, minutes, seconds, miliseconds]
    //priority of values: Year, Month, Day
    //defaults if absent
      //current year
      //current month
      //current day?
      //midnight
  
  //tokenize (whitespace) (trim commas)
  //token by token [what is it?] > populate fields
    //is it a word? .toLowerCase() is it [January, February, etc] [Jan, Feb, etc] [Monday, Tuesday, etc...] [Mon, Tue, Tues, etc...]
      //populate Month and or Day
    //contains digits?
      //contains colon (:)? (probably a time) >
        //how many digits on left side? (1 or 2) + ( < "24") = hour
        //digits on right side? (2) = minute > digits right of minute? = seconds > digits right of seconds? = miliseconds
      //contains a slash? (probably a Month, Day date or Year)
        //how many digits to left of slash? (1 or 2?) + (less than 13) = month >
        //how many digits to right of slash? (1 or 2?) + (less than 32) = day >
        //digits to the right of? (2 or 4?) = year
  //new date object
  //populate date obj with values
  
  else if(new Boolean(true)/*timeIn == natural language*/){
    response.send(jfyer("DateObj.getTime\(\)","DateObj.toString\(\)"));
  }
  
  //null on all counts
  else{     
    response.send(jfyer(null,null));
  }
});

function jfyer (unix, nlang){
  var jOut = { "UNIX": unix, "Natural Language": nlang };
  var stringOut = JSON.stringify(jOut);   
  return stringOut;
}

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


