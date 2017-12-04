// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to the MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/imagedb',{useMongoClient:true});

// Create Express application
var app = module.exports = express();

var NODE_ENV = 'development';

//Set Variables
app.set('env', process.env.NODE_ENV || 'production');
app.use('/images',express.static(__dirname + '/images'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function(req,res,next){
    next();
})
routes = require('./routes/routes')
app.use('/api', routes);

// Use environment defined port or 3000
var port = process.env.PORT || 8888;

// Start the server
app.listen(port);
console.log('Server starts on port ' + port);
