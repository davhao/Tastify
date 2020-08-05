import React, { Component } from 'react';
import Data from './Data';

export default class SingleView extends Component {
	render() {
		return (
			<div className="song-row-div">
				<div>
					<div className="col-title">Your Songs</div>
					<Data
						access_token={this.props.access_token}
						updateMongoID={this.props.updateMongoID}
						duration={this.props.duration}
						type={this.props.type}
					/>
				</div>
			</div>
		);
	}
}
