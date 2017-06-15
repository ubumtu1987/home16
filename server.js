
var path = require("path");

var request = require('request');

var express =require('express');
var app = require('express')();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var cheerio = require('cheerio');
var PORT = process.env.PORT || 8000;

var bodyParser = require("body-parser")

var exphbs = require('express-handlebars');






app.engine("handlebars", exphbs({  defaultLayout: 'one',
                                  layoutsDir:    path.join(__dirname, 'views/layouts'),
                                  partialsDir:   path.join(__dirname, 'views/partials')





}));

app.set("view engine", "handlebars");







// Sets up the Express App
// =============================================================


// Requiring our models for syncing
//var db = require("./models");

// Sets up the Express app to handle data parsing
process.env.SECRET_key = "randomsecretforsigningjwt";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// Static directory
app.use(express.static("./public"));
// Routes =============================================================
var firstapp = require("./routes/first.js");






app.use('/', firstapp, function (req, res) {
  res.sendStatus(401);
}); 






// Syncing our sequelize models and then starting our express app
 app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
 });




 io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});



