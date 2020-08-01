import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import LoginButton from './LoginButton';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import CreateLinkButton from './CreateLinkButton';
import CompareView from './CompareView';
import SingleView from './SingleView';
import DurationDropdown from './DurationDropdown';
import DataTypeDropdown from './DataTypeDropdown';

const qs = require('query-string');

export default class MainPage extends Component {
	state = {
		access_token   : qs.parse(this.props.location.search).access_token,
		showSongs      : false,
		compareSongs   : false,
		mongoID        : null,
		sharedMongoID  : null,
		userSongs      : null,
		otherUserSongs : null,
		mutualSongs    : null,
		view           : 'single'
	};

	componentDidMount = () => {
		const sharedMongoID = qs.parse(this.props.location.search).id;
		if (sharedMongoID) {
			sessionStorage.setItem('sharedMongoID', JSON.stringify({ sharedMongoID: sharedMongoID }));
		}
		else if (sessionStorage.getItem('sharedMongoID')) {
			this.setState({
				sharedMongoID : JSON.parse(sessionStorage.getItem('sharedMongoID')).sharedMongoID,
				view          : 'compare'
			});
		}
	};

	showSongsHandler = () => {
		this.setState({
			showSongs : true
		});
	};

	compareSongsHandler = () => {
		this.setState({
			compareSongs : true
		});
	};

	updateMongoID = (mongoID) => {
		this.setState({
			mongoID : mongoID
		});
	};

	// HashMap of User's Songs
	updateUserSongs = (songs) => {
		this.setState({
			userSongs : songs
		});
	};

	// HashMap of Other User's Songs
	updateOtherUserSongs = (songs) => {
		this.setState({
			otherUserSongs : songs
		});
	};

	// Array of Songs Mutual To Both Users
	updateMutualSongs = (songs) => {
		this.setState({
			mutualSongs : songs
		});
	};

	setView = (view) => {
		this.setState({
			view : view
		});
	};

	setDuration = (duration) => {
		console.log(duration);
	};

	render() {
		return (
			<div>
				<div>
					<AppNavbar />
				</div>

				<div className="btn-drpdwns">
					<DurationDropdown setDuration={this.setDuration} />
					<DataTypeDropdown />
				</div>

				<div className="btn-div">
					{this.state.mongoID ? <CreateLinkButton mongoID={this.state.mongoID} /> : null}
				</div>

				<div>
					{this.state.access_token && this.state.view === 'single' ? (
						<SingleView
							access_token={this.state.access_token}
							updateMongoID={this.updateMongoID}
							updateUserSongs={this.updateUserSongs}
						/>
					) : null}
				</div>
				<div>
					{this.state.view === 'compare' ? (
						<CompareView
							showSongs={this.state.showSongs}
							compareSongs={this.state.compareSongs}
							access_token={this.state.access_token}
							updateMongoID={this.updateMongoID}
							updateUserSongs={this.updateUserSongs}
							otherUserSongs={this.state.otherUserSongs}
							userSongs={this.state.userSongs}
							updateMutualSongs={this.updateMutualSongs}
							sharedMongoID={this.state.sharedMongoID}
							updateOtherUserSongs={this.updateOtherUserSongs}
						/>
					) : null}
				</div>

				<div className="login-btn">{!this.state.access_token ? <LoginButton /> : null}</div>
			</div>
		);
	}
}
