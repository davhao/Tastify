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
		access_token  : qs.parse(this.props.location.search).access_token,
		mongoID       : null,
		sharedMongoID : null,
		view          : 'single',
		duration      : 'medium_term',
		type          : 'tracks'
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
		this.setState({
			duration : duration
		});
	};

	setType = (type) => {
		this.setState({
			type : type
		});
	};

	render() {
		return (
			<div>
				<div>
					<AppNavbar />
				</div>

				<div>
					{this.state.access_token ? (
						<div className="btn-drpdwns">
							<DurationDropdown setDuration={this.setDuration} />
							<DataTypeDropdown setType={this.setType} />
						</div>
					) : null}
				</div>

				<div>
					{this.state.access_token ? (
						<div className="link-btn-wrapper">
							<CreateLinkButton mongoID={this.state.mongoID} />
						</div>
					) : null}
				</div>

				<div>
					{this.state.access_token && this.state.view === 'single' ? (
						<SingleView
							access_token={this.state.access_token}
							updateMongoID={this.updateMongoID}
							duration={this.state.duration}
							type={this.state.type}
						/>
					) : null}
				</div>
				<div>
					{this.state.view === 'compare' ? (
						<CompareView
							access_token={this.state.access_token}
							updateMongoID={this.updateMongoID}
							sharedMongoID={this.state.sharedMongoID}
							duration={this.state.duration}
						/>
					) : null}
				</div>

				<div className="login-btn">{!this.state.access_token ? <LoginButton /> : null}</div>
			</div>
		);
	}
}
