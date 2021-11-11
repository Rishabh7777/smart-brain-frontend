import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';

const initialState = {
  input: '',
  imageUrl: '',
  box: {}, 
  route: 'signin',
  isSignin: false,
  user: {
    id: 0,
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  }
}

const app = new Clarifai.App({
  // enter Clarifai API here
  apiKey: "5c0766a6ed424fc5b2fdfeca71283e96"
});

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // receive the response from Clarifai and return calculated points
  // box will be drawn only on first face
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBoxFace = (box) => {
    this.setState({box: box});
  }

  // receive the input image url from user
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // when user clicked the 'Detect' button
  onDetect = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if(response) {
          fetch("", {
            method: "put",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id
            }) // need to stringify() to tranfer through http
          })
          .then(response => response.json())
          .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
          .catch(console.log)
        }
        this.displayBoxFace(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  // controlling the multiple page travelling
  onRouteChange = (route) => {
    this.setState({route: route});
    if(route === 'home') {
      this.setState({isSignin: true});
    } else if(route === 'signin') {
      this.setState(initialState);
    }
  }

  loadUser = (data) => {
    // console.log(data);
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
    // console.log(this.state.user);
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" 
          params={{ 
            particles: { 
              number: { 
                value: 150, 
                density: { 
                  enable: true, 
                  value_area: 1000, 
                } 
              }, 
            }, 
          }} />
        <Navigation isRegister={this.state.isRegister} isSignin={this.state.isSignin} 
          onRouteChange={this.onRouteChange} 
        />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onDetect={this.onDetect} />
              <FaceRecognition box={this.state.box} imageInput={this.state.input}/>
            </div> 
          : ( this.state.route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;