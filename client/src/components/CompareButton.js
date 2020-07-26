import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class CompareButton extends Component {
	render() {
		return (
			<Button className="main-btn margined-btn" onClick={this.props.compareSongsHandler}>
				Compare Songs
			</Button>
		);
	}
}
