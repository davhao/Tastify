import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SongsToCompare from './SongsToCompare';
import MutualSongs from './MutualSongs';
import Songs from './Songs';

export default class CompareView extends Component {
	render() {
		return (
			<div className="song-row-div">
				<Row className="song-row">
					<Col className="sm">
						<div>
							<div className="col-title">Your Songs</div>
							<Songs
								access_token={this.props.access_token}
								updateMongoID={this.props.updateMongoID}
								updateUserSongs={this.props.updateUserSongs}
							/>
						</div>
					</Col>
					<Col>
						{this.props.otherUserSongs && this.props.userSongs ? (
							<div>
								<div className="col-title">Mutual Songs</div>
								<MutualSongs
									userSongs={this.props.userSongs}
									otherUserSongs={this.props.otherUserSongs}
								/>
							</div>
						) : null}
					</Col>
					<Col>
						<div>
							<div className="col-title">Their Songs</div>
							<SongsToCompare
								sharedMongoID={this.props.sharedMongoID}
								updateOtherUserSongs={this.props.updateOtherUserSongs}
							/>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
