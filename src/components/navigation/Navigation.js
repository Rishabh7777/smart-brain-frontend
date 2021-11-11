const Navigation = ({isSignin, onRouteChange}) => {
	if(isSignin) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange('signin')} 
						className='f3 link dim pointer black pa3 mt1'>
							Sign Out
					</p>
			</nav>
		);
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange('register')} 
						className='f3 link dim pointer black pa3 mt1'>
							Register
					</p>
			</nav>
		);
	}
}

export default Navigation;