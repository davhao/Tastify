import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import LoginButton from './LoginButton';
import GenerateButton from './GenerateButton';
import Songs from './Songs';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import CreateLinkButton from './CreateLinkButton';

const qs = require('query-string');

export default class MainPage extends Component {
	state = {
		access_token  : qs.parse(this.props.location.search).access_token,
		showSongs     : false,
		mongoID       : null,
		sharedMongoID : qs.parse(this.props.location.search).id
	};

	showSongsHandler = () => {
		this.setState({
			showSongs : true
		});
	};

	updateMongoID = (mongoID) => {
		this.setState({
			mongoID : mongoID
		});
	};

	showLinkButtonHandler = () => {
		this.setState({
			showLinkButton : true
		});
	};

	render() {
		return (
			<div>
				<div>
					<AppNavbar />
				</div>
				<div className="btn-div">
					{this.state.mongoID ? <CreateLinkButton mongoID={this.state.mongoID} /> : null}
				</div>
				<div className="songs">
					{this.state.showSongs ? (
						<Songs access_token={this.state.access_token} updateMongoID={this.updateMongoID} />
					) : null}
				</div>
				<div className="btn-div">
					{this.state.access_token && !this.state.showSongs ? (
						<GenerateButton showSongs={this.state.showSongs} showSongsHandler={this.showSongsHandler} />
					) : null}
				</div>
				<div className="btn-div">{!this.state.access_token ? <LoginButton /> : null}</div>
			</div>
		);
	}
}
