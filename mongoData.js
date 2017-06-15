var mongoose = require("mongoose");

var Schema = mongoose.Schema; 

var ExampeSS = new Schema({

    title : {
      type : String,
      trim : true, 
      required : "String is Required"


    },

    link :{
       type: String ,
       required : "String is Required"



    },
    comment :{
       type: Schema.Types.ObjectId,
       ref: 'comment'


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




ExampeSS.methods.getFullName = function() {
  // Concatenate the  users first and last name, save it to this
  this.title  = "%%%" + this.title + "%%%"
  // Return the full name
  return this.title;
};


var Example = mongoose.model("Example", ExampeSS);

module.exports =Example;