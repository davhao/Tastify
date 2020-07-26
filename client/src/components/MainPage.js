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

const qs = require('query-string');

export default class MainPage extends Component {
	state = {
		access_token  : qs.parse(this.props.location.search).access_token,
		showSongs     : false,
		compareSongs  : false,
		mongoID       : null,
		sharedMongoID : null
	};

	componentDidMount = () => {
		const sharedMongoID = qs.parse(this.props.location.search).id;
		if (sharedMongoID) {
			localStorage.setItem('sharedMongoID', JSON.stringify({ sharedMongoID: sharedMongoID }));
		}
		else {
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
					<div>
						{this.state.showSongs || this.state.compareSongs ? (
							<Songs access_token={this.state.access_token} updateMongoID={this.updateMongoID} />
						) : null}
					</div>
					<div>
						{this.state.compareSongs ? <SongsToCompare sharedMongoID={this.state.sharedMongoID} /> : null}
					</div>
				</div>
				<div className="btn-div">
					<div>
						{this.state.access_token && !this.state.showSongs ? (
							<GenerateButton showSongsHandler={this.showSongsHandler} />
						) : null}
					</div>
					<div>
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
