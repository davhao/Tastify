import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import DataToCompare from './DataToCompare';
import MutualData from './MutualData';
import Data from './Data';

export default class CompareView extends Component {
	render() {
		return (
			<div className="song-row-div">
				<Row className="song-row">
					<Col className="sm">
						<div>
							{this.props.type === 'tracks' ? (
								<div className="col-title">Your Tracks</div>
							) : (
								<div className="col-title">Your Artists</div>
							)}
							<Data
								access_token={this.props.access_token}
								updateMongoID={this.props.updateMongoID}
								duration={this.props.duration}
								type={this.props.type}
							/>
						</div>
					</Col>
					<Col>
						<div>
							{this.props.type === 'tracks' ? (
								<div className="col-title">Mutual Tracks</div>
							) : (
								<div className="col-title">Mutual Artists</div>
							)}
							{sessionStorage.getItem('tracks') && sessionStorage.getItem('compare_tracks') ? (
								<div>
									<MutualData duration={this.props.duration} type={this.props.type} />
								</div>
							) : null}
						</div>
					</Col>
					<Col>
						<div>
							{this.props.type === 'tracks' ? (
								<div className="col-title">Their Tracks</div>
							) : (
								<div className="col-title">Their Artists</div>
							)}
							<DataToCompare
								sharedMongoID={this.props.sharedMongoID}
								duration={this.props.duration}
								type={this.props.type}
							/>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
