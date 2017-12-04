//import the required modules
var express = require('express');
var router = express.Router();
var appController = require('../controllers/appController');


//API for image

router.route('/v1/uploadImage')
    .post(appController.uploadImage);

router.route('/v1/getImages')
    .get(appController.getImages);

//export the router
module.exports = router;
