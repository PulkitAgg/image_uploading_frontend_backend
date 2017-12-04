/*
 * Controller for Image.
 *
 *Created by:- Pulkit
 */


//Import required module
var Image = require('../models/image');
var FileSystem = require('fs');

exports.uploadImage = function (req, res) {
  console.log("req.body111", req.body)
  let image = req.body.base64Image;
  let matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
  let imgresponse = {}

  // run when matches is null or undefined.
  if (!matches) {
    res.status(500).send("Something Went Worng.");
    res.end();
  }

  if (matches.length !== 3) {
    res.status(500).send("Invalid File.");
    res.end();
  }

  // Image type (i.e. image/jpeg)
  imgresponse.type = matches[1]

  // Image base64 data
  imgresponse.data = new Buffer(matches[2], 'base64');

  // for creating the name of image.
  var imageName = req.body.name.substr(0, req.body.name.lastIndexOf(".")) + '_' + Math.random() + '.' + req.body.type.substr(req.body.type.indexOf("/") + 1);
  var imagePath = process.cwd() + '/images' + "/" + imageName;
  FileSystem.writeFile(imagePath, imgresponse.data, function (error) {
    if (error) {
      console.log("in error", error)
      res.status(500).send("Something Went Worng During Saving the image.");
      res.end();
    } else {
      var imageInfo = new Image({
        image: imageName,
        created_at: new Date(),
      });
      //  save the creating image
      imageInfo.save(function (error, response) {
        // handle the error
        if (error) {
          res.json(error);
          res.end();
        } else {
          //send the response to the browser
          res.status(200);
          res.json({
            success: true,
            body: response
          }); // end of response.
          res.end();
        } //end of else.
      }); // end of save method
     
    }
  })
}

exports.getImages = function (req, res) {
  console.log("in get images")
  Image.find({}, function (error, response) {
    if (error) {
      return res.json(req, res, error);
      res.end();
    }else{
      for (var count = 0; count < response.length; count++) {
        response[count].image = "http://localhost:8888/images/" + response[count].image
      }
      //sending the reponse to the browser
      res.json(response);
      res.end();
    }
  });
}