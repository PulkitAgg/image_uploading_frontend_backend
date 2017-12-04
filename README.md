# image_uploading_frontend_backend
This repo gives full idea about how we can uplaod image on the server and get image from the server and show on the front-end. In this repo front-end is developed in the react js and back end is developed in node js. Mogodb is used for storing the image data. 

## Prerequisites:
* Mongodb is installed [Steps for installing mongodb](https://docs.mongodb.com/manual/installation/)
* Node js is also installed in your system [Steps for isntalling node js](https://nodejs.org/en/download/)
* React js is also installed [Steps for installing react js](https://reactjs.org/docs/installation.html)  


## Steps For Running This Project
Make sure you have latest version of node and react js in your system.

### Step 1:
Open the terminal and run this command  

`$git clone https://github.com/PulkitAgg/image_uploading_frontend_backend.git`

### Step 2:
Migrate to the project which is cloned right now i.e run this commmand   

`$cd image_uploading_frontend_backend/`

### Step 3:
First start the mongodb server using   

`$ mongod`

### Step 4: 
Setup for node js
* `$ cd image-uploading-ui/`
* `$ npm install`
* `$ node app.js`  

Now node server runs on 8888 port number.


### Step 4:
Setup for react js  

* `$ cd image-uploading-backend/`
* `$ npm install`
* `$ node start`

### Step 5:
Now you are ready with project and check you browser. You can upload you image by choosing the file and get your image by clicking on the get all images button.
