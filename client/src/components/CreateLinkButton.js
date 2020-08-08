import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class CreateLinkButton extends Component {
	state = {
		mongoID : null,
		copied  : false
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.mongoID !== this.props.mongoID) {
			this.setState({
				mongoID : this.props.mongoID
			});
		}
	}

	switchText = () => {
		if (this.state.mongoID) {
			this.setState({
				copied : true
			});
		}
	};

	render() {
		return (
			<CopyToClipboard text={`https://david-hao-tastify.herokuapp.com/?id=${this.state.mongoID}`}>
				{this.state.copied ? (
					<Button className="main-btn">Link Copied!</Button>
				) : (
					<Button className="main-btn" onClick={this.switchText}>
						Share Link
					</Button>
				)}
			</CopyToClipboard>
		);
	}
}
