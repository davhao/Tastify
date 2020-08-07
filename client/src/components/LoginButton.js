import React, { Component } from 'react';
import { Button } from 'reactstrap';

class LoginButton extends Component {
	render() {
		return (
			<Button className="main-btn" onClick={(event) => (window.location.href = '/api/login')}>
				Log In With Spotify
			</Button>
		);
	}
}

export default LoginButton;
