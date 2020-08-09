import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import DataToCompare from './DataToCompare';
import MutualData from './MutualData';
import Data from './Data';
// import { Spinner } from 'react-bootstrap';

export default class CompareView extends Component {
	// state = {
	// 	yourTracksLoading : true
	// mutualTracksLoading : true,
	// theirTracksLoading  : true
	// };

	// setYourTracksLoading = () => {
	// 	if (this.state.yourTracksLoading) {
	// 		this.setState({
	// 			yourTracksLoading : false
	// 		});
	// 	}
	// };

	// setMutualTracksLoading = () => {
	// 	if (this.state.mutualTracksLoading) {
	// 		this.setState({
	// 			mutualTracksLoading : false
	// 		});
	// 	}
	// };

	// setTheirTracksLoading = () => {
	// 	if (this.state.theirTracksLoading) {
	// 		this.setState({
	// 			theirTracksLoading : false
	// 		});
	// 	}
	// };

	render() {
		return (
			<div className="song-row-div">
				<Row className="song-row">
					<Col className="sm">
						{/* <div className="wrapper-div"> */}
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
							// setYourTracksLoading={this.setYourTracksLoading}
						/>
						{/* </div> */}
					</Col>
					{/* {this.state.yourTracksLoading ? null : ( */}
					{/* <div className="wrapper-div"> */}
					<Col style={{ padding: 0 }}>
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
					{/* </div> */}
					{/* )} */}
				</Row>
			</div>
		);
	}
}
