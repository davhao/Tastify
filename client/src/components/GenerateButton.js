import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class GenerateButton extends Component {
	render() {
		return (
			<Button color="success" className="login-btn" onClick={this.props.showSongsHandler}>
				Get Top Songs
			</Button>
		);
	}
}
