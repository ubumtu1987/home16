var request =require("request");

var cheerio =require("cheerio");
var connect = require("./routes/save.js").connect;

var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

var Example = require("./mongoData.js");


mongoose.connect("mongodb://localhost/TestHome");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



//console.log("start");


request(  "https://www.nytimes.com/" , function(err, res, html) {

   var $ = cheerio.load(html);

   var result = [] ; 
   let index = 0 ; 

   $("h2.story-heading").each(function(i, element){
        
        if(index == 10){
        	

           return result;
        }

	    var titles  = $(this).text();
	    //console.log(titles);


	    var links = $(element).children().attr("href");



	    result.push({
	       title : titles,
	       link : links


	    });


        index ++;



   });


    for(let s = 0 ;  s < result.length ; s ++){

    	var user = new Example(result[s]);
        console.log(user);

         user.save(function(error, doc) {
              // send an error to the browser
              if (error) {
                 console.log("error");
              }
              // or send the doc to our browser
              else {
                  //console.log("good");
              }
         });





    } 
   
  
});



