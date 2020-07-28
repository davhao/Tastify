import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import LoginButton from './LoginButton';
import GenerateButton from './GenerateButton';
import Songs from './Songs';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import CreateLinkButton from './CreateLinkButton';
import CompareButton from './CompareButton';
import SongsToCompare from './SongsToCompare';
import MutualSongs from './MutualSongs';

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
		mutualSongs    : null
	};

	componentDidMount = () => {
		const sharedMongoID = qs.parse(this.props.location.search).id;
		if (sharedMongoID) {
			localStorage.setItem('sharedMongoID', JSON.stringify({ sharedMongoID: sharedMongoID }));
		}
		else if (localStorage.getItem('sharedMongoID')) {
			this.setState({
				sharedMongoID : JSON.parse(localStorage.getItem('sharedMongoID')).sharedMongoID
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

	render() {
		return (
			<div>
				<div>
					<AppNavbar />
				</div>

				<div className="btn-div">
					{this.state.mongoID ? <CreateLinkButton mongoID={this.state.mongoID} /> : null}
				</div>

				<div className="column-group">
					<div className="column">
						{this.state.showSongs || this.state.compareSongs ? (
							<Songs
								access_token={this.state.access_token}
								updateMongoID={this.updateMongoID}
								updateUserSongs={this.updateUserSongs}
							/>
						) : null}
					</div>
					<div className="column">
						{this.state.otherUserSongs && this.state.userSongs ? (
							<MutualSongs
								updateMutualSongs={this.updateMutualSongs}
								userSongs={this.state.userSongs}
								otherUserSongs={this.state.otherUserSongs}
							/>
						) : null}
					</div>
					<div className="column">
						{this.state.compareSongs ? (
							<SongsToCompare
								sharedMongoID={this.state.sharedMongoID}
								updateOtherUserSongs={this.updateOtherUserSongs}
							/>
						) : null}
					</div>
				</div>

				<div className="btn-div">
					<div className="btn">
						{this.state.access_token && !this.state.showSongs ? (
							<GenerateButton showSongsHandler={this.showSongsHandler} />
						) : null}
					</div>
					<div className="btn">
						{this.state.sharedMongoID && this.state.access_token && !this.state.showSongs ? (
							<CompareButton compareSongsHandler={this.compareSongsHandler} />
						) : null}
					</div>
				</div>

				<div className="btn-div">{!this.state.access_token ? <LoginButton /> : null}</div>
			</div>
		);
	}
}
