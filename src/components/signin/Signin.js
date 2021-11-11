import react from "react";

class Signin extends react.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
			flag: false
		}
	}

	onEmailChange = (event) => {
		// setState() will add field if it does not found it
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSignInSubmit = () => {
		fetch("https://arcane-anchorage-24088.herokuapp.com/signin", {
			method: "post",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			}) // need to stringify() to tranfer through http
		})
		.then(response => response.json())
		.then(data => {
			if(data.id) {
				this.props.loadUser(data);
				this.props.onRouteChange("home");
			} else {
				this.setState({flag: true});
			}
		})
		.catch("unable to do so!")
	}

	render() {
		return (
			<div style={{marginLeft: 'auto', marginRight: 'auto', height: '400px',
			  width: '400px'}} className='w-40 shadow-5 pa4 mt5'>
				<div className='f3 mt4'>
					<label className='white' htmlFor='email-address'>Email</label>
					<br />
					<input style={{border: 'none'}} className='mt2 bg-light-blue pa2 f4'
					  type='email' id='email-address' name='email-address'
					  onChange={this.onEmailChange}>
					</input>
				</div>

				<div className='f3 mt4'>
					<label className='white' htmlFor='password'>Password</label>
					<br />
					<input style={{border: 'none'}} className='mt2 bg-light-blue pa2 f4'
						type='password' id='password' name='password'
						onChange={this.onPasswordChange}>
					</input> 
				</div>

				<button style={{border: 'none', fontSize: "120%"}} onClick={this.onSignInSubmit}
					className='f3 mt5 bg-light-green black pv1 pointer' type="submit" form="form1"
					value="Submit">
					Sign in
				</button>

				{this.state.flag === true ? <p className="white">Incorrect email or password</p>
					: <p></p>}
			</div>
		)
	}
}

export default Signin;