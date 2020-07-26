import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class CreateLinkButton extends Component {
	render() {
		return (
			<CopyToClipboard text={`localhost:3000/?id=${this.props.mongoID}`}>
				<Button className="main-btn" onClick={this.props.showSongsHandler}>
					Generate Link
				</Button>
			</CopyToClipboard>
		);
	}
}
