import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';
// import { uploadImage } from '../../image-uploading-backend/controllers/appController';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      images:[]
    };
  }
  handleChange(e) {
    // Get the files
    let files = e.target.files;

    // Use it when you want to load multiple files.    
    // var allFiles = [];

    // Process each file
    for (var i = 0; i < files.length; i++) {
      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      //This event is triggered each time when reading operation is successfully completed.
      reader.onload = () => {
        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64Image: reader.result,  // contains the file in base64
          file: file,
        };
        const data = {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(fileInfo)
        }
        fetch("http://localhost:8888/api/v1/uploadImage", data).then((res) => {
          if (res.status == 200) {
            alert("Successfully image is upload on the server")
          } else {
            alert("Something Went wrong.")
          }
        }, (error) => {
          alert("Something Went wrong!")
        })

        // Push it to the state
        // Use it when you want to load multiple files.
        // allFiles.push(fileInfo); 
      } // reader.onload
    } // for
  }

  getImages() {
    fetch("http://localhost:8888/api/v1/getImages").then(res => res.json())
      .then((res) => {
        console.log("res",res);
        let img = [];
        for(let count =0 ; count < res.length ; count++){
          img.push(res[count].image)
        }
        this.setState({images:img})
        console.log("images",img)
      }, (error) => {
        alert("Something Went wrong!")
      })
  }

  render() {
    var image = this.state.images.map((data,key)=>{
      console.log("data",data)
      return <img src={data} key={key}/>
    });
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Image Uploading Website</h1>
          </header>
          <p className="App-intro">
            This Application is used for uploading images and getting the images from the server.
        </p>

        </div>
        <div>
          <p style={{ display: 'inline-block' }}>
          Choose image for uploading : 
        </p>
          <input type="file"
            onChange={this.handleChange.bind(this)}
            // multiple={true}  for accepting the multiple files
            accept="image/*"
           />
        </div>
        <div>
          <input
            type="button"
            value = "Get All Images"
            onClick={this.getImages.bind(this)}
          />
        </div>

        {
          (this.state.images.length!=0) ?
          <div>
              {image}
              </div>
          :
          null
        }

      </div>
    );
  }
}

export default App;
