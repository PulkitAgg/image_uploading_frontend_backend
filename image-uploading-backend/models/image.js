// Import required modules.
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create the Schema
var imageSchema = new Schema({
  //append the uniqueIdForSeries with date of time when it is created
    image:              {type: String},
    created_at:         {type: Date, default: Date.now()}
});

// we need to create a model for using schema
var Image = mongoose.model('image',imageSchema);

// make this available to our application in our Node applications
module.exports = Image;
