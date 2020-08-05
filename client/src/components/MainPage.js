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

	updateMongoID = (mongoID) => {
		this.setState({
			mongoID : mongoID
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

				<div className="link-btn-wrapper">
					<CreateLinkButton mongoID={this.state.mongoID} />
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
							access_token={this.state.access_token}
							updateMongoID={this.updateMongoID}
							sharedMongoID={this.state.sharedMongoID}
						/>
					) : null}
				</div>

				<div className="login-btn">{!this.state.access_token ? <LoginButton /> : null}</div>
			</div>
		);
	}
}
