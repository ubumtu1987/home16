var MongoClient = require('mongodb').MongoClient;
var db;


module.exports.connect = function connect(){
  if(db){
  	return Promise.resolve(db);
    }


  return MongoClient.connect('mongodb://localhost:27017/zoo', { promiseLibrary : Promise})
         .then(function(dbcon){
         db = dbcon; 
         //console.log(db);

         console.log('Connected to db');  
         return db.collection('examples').find()./*sort({name :1}).*/toArray();

         });






} 