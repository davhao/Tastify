import React, { Component } from 'react';
import '../App.css';

export default class MutualSongs extends Component {
	state = {
		mutualData : null
	};

	componentDidMount() {
		const mutualData = [];
		const dataMap = new Map();
		const data = JSON.parse(sessionStorage.getItem('tracks')).short_term_tracks;
		data.forEach((item) => dataMap.set(item.id, item));
		const compareData = JSON.parse(sessionStorage.getItem('compare_tracks')).short_term_tracks;
		compareData.forEach((item) => {
			if (dataMap.has(item.id)) {
				mutualData.push(item);
			}
		});
		this.setState({
			mutualData : mutualData
		});
	}

	render() {
		if (this.state.mutualData) {
			const mutualJSX = this.state.mutualData.map((song, i) => (
				<div key={song.id} className="song">
					<div className="image">
						<img src={song.album.images[0].url} alt="" />
						<div className="number">{i + 1}.</div>
						<div className="artist-name">{song.artists[0].name}</div>
						<div className="song-title">{song.name}</div>
					</div>
				</div>
			));

			return <div>{mutualJSX}</div>;
		}
		else {
			return null;
		}
	}
}
