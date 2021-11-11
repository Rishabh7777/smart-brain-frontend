import react from "react";

class Register extends react.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			flag: false
		}
	}

	onNameChange = (event) => {
		// setState() will add field if it does not found it
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		// setState() will add field if it does not found it
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onSubmitRegister = () => {
		// by default fetch() is a get method
		fetch("", {
			method: "post",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			}) // need to stringify() to tranfer through http
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if(data) {
				// this.props.loadUser(data);
				console.log("true");
				this.props.onRouteChange("signin");
			}
		})
		.catch(err => console.log("Unable to register", err))
	}

	render() {
		return(
			<div style={{marginLeft: 'auto', marginRight: 'auto', height: '450px', width: '400px'}}
				className='w-40 shadow-5 pa4 mt5'>
				<div className='f3 mt3'>
					<label className='white' htmlFor='name'>Name</label>
					<br />
					<input style={{border: 'none'}} className='mt2 bg-light-blue pa2 f4' type='text'
						id='name' name='name' onChange={this.onNameChange}>
					</input> 
				</div>

				<div className='f3 mt4'>
					<label className='white' htmlFor='email-address'>Email</label>
					<br />
					<input style={{border: 'none'}} className='mt2 bg-light-blue pa2 f4' type='email'
						id='email-address' name='email-address' onChange={this.onEmailChange}>
					</input>
				</div>

				<div className='f3 mt4'>
					<label className='white' htmlFor='password'>Password</label>
					<br />
					<input style={{border: 'none'}} className='mt2 bg-light-blue pa2 f4' type='password'
						id='password' name='password' onChange={this.onPasswordChange}>
					</input> 
				</div>

				<button style={{border: 'none', fontSize: "120%"}} onClick={this.onSubmitRegister}
					className='f3 mt4 bg-light-green black pv1 pointer' type="submit" form="form1"
					value="Submit">
						Register
				</button>

				{this.state.flag === true ? <p className="white">Email already exists.</p>
					: <p></p>}
			</div>		
		);
	}
}

export default Register;