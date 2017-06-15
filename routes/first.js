var path = require("path");
var express = require('express');

var apiRouter = express.Router();
var  article = require("./save.js");

var request =require("request");

var cheerio =require("cheerio");

var connect = require("./save.js").connect;


var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise;
var Comment = require("../comment.js");


var Example = require("../mongoData.js");

var TempMan = require("../Temper.js");


// mongoose.connect("mongodb://localhost/TestHome");
mongoose.connect("mongodb://heroku_z1lsp1cg:r82obmluhrlptl7k68mtf2lfhq@ds127802.mlab.com:27802/heroku_z1lsp1cg");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// =============================================================

  // Each of the below routes just handles the HTML page that the user gets sent to.
  // index route loads view.html
  /*
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/real.html"));
  });
  */

  apiRouter.get("/return", function(req, res) {
        return connect()
        .then(function(dbget){
          console.log(dbget);
          res.send("success");
          //res.render('index', {  try : "success" , elements: dbget });



        });

 });


apiRouter.post("/returnDB", function(req, res) {
    Example.find({}, function(err, doc) {
        // log any errors
        if (err) {
            console.log(err);
        }
        // or send the doc to the browser as a json object
        else {
            var sent = {
               doc : doc, 
               com : req.body.cm                

            }


            res.send(sent);
        }
        });
        



});


apiRouter.get("/showshowlist", function(req, res) {
       
       
       TempMan.find({}, function(err, doc) {
        // log any errors
        if (err) {
            console.log(err);
        }
        // or send the doc to the browser as a json object
        else {
            
          
            res.json(doc);
        }
        });
        

 });







apiRouter.post("/update", function(req, res) {
   console.log(req.body);
    var good ={
     title: req.body.title,
     body : req.body.comment

    }
    var newNote = new Comment (good);

    // and save the new note the db
    newNote.save(function(err, doc) {
        // log any errors
        if (err) {
            console.log(err);
        }
        // otherwise
        else {
            // using the Article id passed in the id parameter of our url,
            // prepare a query that finds the matching Article in our db
            // and update it to make it's lone note the one we just saved
            Example.findOneAndUpdate({ '_id': req.body.key },  { 'comment': doc._id })
                // execute the above query
                .exec(function(err, doc) {
                    // log any errors
                    if (err) {
                        console.log(err);
                    } else {
                        // or send the document to the browser
                        res.send('/');
                    }
                });
        }
    });


});









apiRouter.post("/removeProperty", function(req, res) {

                Example.update({ '_id': req.body.keyMan } ,{ $unset: { comment : "" }} 
                , function(err, doc) {
                  
                    if (err) {
                        console.log(err);
                    } else {
                       // delete Example.comment;
                        // or send the document to the browser
                        res.send({ val : req.body.title});
                    }
                });




});


apiRouter.post("/remove", function(req, res) {

   Comment.remove({"title" : req.body.title}, function(err, doc) {
                 
                   if(err){

                   }
                   else{
                        //delete Comment;
                        
                           res.send("/");

                       
                   }
                 
          });





  

   
  



});






apiRouter.post("/eradicate", function(req, res) {

   Example.findOneAndRemove({"_id" : req.body.key}).exec(function(err, doc) {
      // Log any errors
      if (err) {
          console.log(err);
      } else {
        //basically.. refresh the page
        res.send("/");
      }
    });





  

   
  


});





apiRouter.get("/showComment", function(req, res) {
   //console.log(req.body);
   Comment.find({}, function(err, doc) {
        // log any errors
          if (err) {
              console.log(err);
          }
          // or send the doc to the browser as a json object
          else {
              res.json(doc);
          }
        });


});



apiRouter.post('/saveData', function(req, res) {
    console.log( req.body.keyMan);
   //console.log(req.body);
   TempMan.find({'_id' :  req.body.keyMan}, function(err, doc) {
        // log any errors
          if (err) {
              console.log(err);
          }
          // or send the doc to the browser as a json object
          else {
              
              var userX = new Example({
                title : doc[0].title,
                link : doc[0].link


               });
               
                console.log("brother")
                userX.save(function(error, doc) {
                  // send an error to the browser
                  if (error) {
                     console.log("error");
                  }
                  // or send the doc to our browser
                  else {
                      console.log(req.body.titleS);
                      var titleSent = {title : req.body.titleS,
                                       key : req.body.keyMan};
                            
                      res.send(titleSent);
                  }
                });

            
          }
        });


});






  apiRouter.get("/", function(req, res) {
        
       res.sendFile(path.join(__dirname, '../public/real.html'));


  });







 
apiRouter.post("/takeMan" , function(req, res){

   TempMan.remove({}, function(err, doc) {
   if (err){
      console.log("hello");
   } 
   else{

   request(  "https://www.nytimes.com/" , function(err, resp, html) {

    console.log('tada!')

       var $ = cheerio.load(html);

       var result = [] ; 
       let index = 0 ; 

       $("h2.story-heading").each(function(i, element){
            
            if(index == 12){
              

               return result;
            }

          var titles  = $(this).text();
          //console.log(titles);


          var links = $(element).children().attr("href");

         
           result.push({
             title : titles,
             link : links


          });

           var user = new TempMan({
             title : titles,
             link : links


          });


           user.save(function(error, doc) {
                  // send an error to the browser
                  if (error) {
                     console.log("error");
                  }
                  // or send the doc to our browser
                  else {
                      console.log("good");
                  }
             });


            index ++;



       });


      


       res.send("/");

   
  
     });
       

   }



 });


});

  apiRouter.post("/submit", function(req, res) {
        
        var user = new Example(req.body);
        user.getFullName();

         user.save(function(error, doc) {
              // send an error to the browser
              if (error) {
                res.send(error);
              }
              // or send the doc to our browser
              else {
                res.send(doc);
              }
         });

      


  });



apiRouter.post("/DelData", function(req, res) { 

    TempMan.findOneAndRemove({"_id" : req.body.keykey}).exec(function(err, doc) {
      // Log any errors
      if (err) {
          console.log(err);
      } else {
        //basically.. refresh the page
        res.send("/");
      }
    });




 }); 



 apiRouter.post("/taketest", function(req, res) {  


     res.send("just Test!");


 }); 

  


module.exports = apiRouter;