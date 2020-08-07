import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class GenerateButton extends Component {
	render() {
		return (
			<Button className="main-btn link-gen-btn" onClick={this.props.showSongsHandler}>
				Get Top Songs
			</Button>
		);
	}
}
