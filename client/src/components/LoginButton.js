import React, { Component } from 'react';
import { Button } from 'reactstrap';

class LoginButton extends Component {
	render() {
		return (
			<Button
				className="main-btn margined-btn"
				onClick={(event) => (window.location.href = 'http://localhost:5000/api/login')}
			>
				Log In With Spotify
			</Button>
		);
	}
}

export default LoginButton;
