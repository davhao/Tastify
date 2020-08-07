import React, { Component } from 'react';
import '../App.css';
const axios = require('axios');

export default class SongsToCompare extends Component {
	async componentDidMount() {
		const mongoID = this.props.sharedMongoID;
		const res = await axios.get(`api/users/${mongoID}`);

		// Store songs to compare in sessionStorage
		const short_term_tracks = res.data.result.short_term_tracks;
		const medium_term_tracks = res.data.result.medium_term_tracks;
		const long_term_tracks = res.data.result.long_term_tracks;
		const short_term_artists = res.data.result.short_term_artists;
		const medium_term_artists = res.data.result.medium_term_artists;
		const long_term_artists = res.data.result.long_term_artists;

		sessionStorage.setItem(
			'compare_tracks',
			JSON.stringify({
				short_term_tracks  : short_term_tracks,
				medium_term_tracks : medium_term_tracks,
				long_term_tracks   : long_term_tracks
			})
		);
		sessionStorage.setItem(
			'compare_artists',
			JSON.stringify({
				short_term_artists  : short_term_artists,
				medium_term_artists : medium_term_artists,
				long_term_artists   : long_term_artists
			})
		);
	}

	render() {
		const testSongs = JSON.parse(sessionStorage.getItem('compare_tracks'));
		if (testSongs) {
			const JSX = testSongs.short_term_tracks.map((song, i) => (
				<div key={song.id} className="song">
					<div className="image">
						<img src={song.album.images[0].url} alt="" />
						<div className="number">{i + 1}.</div>
						<div className="artist-name">{song.artists[0].name}</div>
						<div className="song-title">{song.name}</div>
					</div>
				</div>
			));

			return <div>{JSX}</div>;
		}
		else {
			return <div />;
		}
	}
}
