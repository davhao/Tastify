import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class CreateLinkButton extends Component {
	state = {
		mongoID : null
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.mongoID !== this.props.mongoID) {
			this.setState({
				mongoID : this.props.mongoID
			});
		}
	}
	render() {
		return (
			<CopyToClipboard text={`https://david-hao-tastify.herokuapp.com/?id=${this.state.mongoID}`}>
				<Button className="main-btn">Generate Link</Button>
			</CopyToClipboard>
		);
	}
}
