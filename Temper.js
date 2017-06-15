var mongoose = require("mongoose");

var Schema = mongoose.Schema; 

var temper = new Schema({

    title : {
      type : String,
      trim : true, 
      required : "String is Required"


    },

    link :{
       type: String ,
       required : "String is Required"



    },
    check:{
       type: Boolean,
       default : false


    },


    
    data: {
     type: Date,
     default: Date.now


    }









});




temper.methods.getFullName = function() {
  // Concatenate the  users first and last name, save it to this
  this.title  = "%%%" + this.title + "%%%"
  // Return the full name
  return this.title;
};


var Tem = mongoose.model("temp", temper);

module.exports =Tem;