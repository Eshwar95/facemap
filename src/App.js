import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/Signin.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
import Clarifai from 'clarifai';
import RegisterForm from './components/RegisterForm/RegisterForm.js'; 
	
const app = new Clarifai.App({
 apiKey: 'ccdacd65f82549cfa91592a49bd7bca6'
});

const particlesOptions = {
	particles: {
	number:{
		value:55,
		density: {
			enable:true,
			value_area: 800
		}
	}	
	}
}

class App extends Component {

	constructor(){
		super();
		this.state ={
			input:'',
			imageUrl:'',
			box:{},
			route: 'Signin',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		}
	}

	// componentDidMount() {
	// 	fetch('http://localhost:3001/')
	// 	.then(response => response.json())
	// 	.then(data =>console.log(data))
	// }

	calculateFaceLocation = (data) =>{
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image= document.getElementById('inputImage');
		const width= Number(image.width);
		const height= Number(image.height);
		return{
			leftCol: width* clarifaiFace.left_col,
			topRow: height* clarifaiFace.top_row,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}

	}

	displayFaceBox= (box) =>{
		this.setState({box: box});
	}
	onInputChange  =(event)=>{
		this.setState({input: event.target.value});
	}

	onButtonSubmit =()=>{
	this.setState({imageUrl: this.state.input});
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL,
			 this.state.input)
		.then(response => {
			if(response){
				fetch('http://localhost:3001/image',{
					method:'put',
					headers:{'Content-Type' : 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
					.then(response => response.json())
					.then(count =>{
						this.setState(Object.assign(this.state.user,{ entries: count }))
					})
			}
			this.displayFaceBox(this.calculateFaceLocation(response))
		})
		.catch(err=> alert(err));
	}

	onRouteChange =(route) =>{
		if(route === 'Signout'){
			this.setState({isSignedIn: false})
		}
		else if(route === 'Home'){
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});	
	}

	loadUser = (data)=>{
		this.setState({user:{
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}

	render(){
		const {isSignedIn, route, box, imageUrl} = this.state;
		  return (
		    <div className="App">
		    	 <Particles className= 'particles' 
	              params={particlesOptions}
	            />
			    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
			    { route === 'Home' 
				    ? <div> 
					    <Logo />
					    <Rank name={this.state.user.name} entries = {this.state.user.entries} />
					    <ImageLinkForm 
					    onInputChange={this.onInputChange}
					    onButtonSubmit={this.onButtonSubmit} />
					    <FaceRecognition box={box} imageUrl={imageUrl}/>
					</div>
				    : ( this.state.route === 'Signin' 
				    	? <SignIn  loadUser = {this.loadUser} onRouteChange= {this.onRouteChange}/>	
				    	:<RegisterForm loadUser = {this.loadUser} onRouteChange= {this.onRouteChange}/>
				    	)
				}
		    </div>
		  );
		}
}

export default App;
