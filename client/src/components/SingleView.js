import React, { Component } from 'react';
import Songs from './Songs';

export default class SingleView extends Component {
	render() {
		return (
			<div className="song-row-div">
				<div>
					<div className="col-title">Your Songs</div>
					<Songs
						access_token={this.props.access_token}
						updateMongoID={this.props.updateMongoID}
						updateUserSongs={this.props.updateUserSongs}
					/>
				</div>
			</div>
		);
	}
}
