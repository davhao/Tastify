import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SongsToCompare from './SongsToCompare';
import MutualSongs from './MutualSongs';
import Data from './Data';

export default class CompareView extends Component {
	render() {
		return (
			<div className="song-row-div">
				<Row className="song-row">
					<Col className="sm">
						<div>
							<div className="col-title">Your Songs</div>
							<Data access_token={this.props.access_token} updateMongoID={this.props.updateMongoID} />
						</div>
					</Col>
					<Col>
						<div>
							<div className="col-title">Mutual Songs</div>
							{sessionStorage.getItem('tracks') && sessionStorage.getItem('compare_tracks') ? (
								<div>
									<MutualSongs />
								</div>
							) : null}
						</div>
					</Col>
					<Col>
						<div>
							<div className="col-title">Their Songs</div>
							<SongsToCompare sharedMongoID={this.props.sharedMongoID} />
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
