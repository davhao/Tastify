import React, { Component } from 'react';
import '../App.css';
const axios = require('axios');

export default class DataToCompare extends Component {
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
		let data;
		switch (this.props.type) {
			case 'artists':
				data = JSON.parse(sessionStorage.getItem('compare_artists'));
				if (data) {
					let artists;
					switch (this.props.duration) {
						case 'short_term':
							artists = data.short_term_artists;
							break;
						case 'medium_term':
							artists = data.medium_term_artists;
							break;
						default:
							artists = data.long_term_artists;
					}
					const JSX = artists.map((artist, i) => (
						<div key={artist.id} className="song">
							<div className="image">
								{artist.images[0] ? (
									<img src={artist.images[0].url} alt="" />
								) : (
									<img src={require('../no-image.png')} alt="" />
								)}
								<div className="number-shadow">{i + 1}.</div>
								<div className="number">{i + 1}.</div>
								{artist.images[0] ? null : <div className="no-image">No Image</div>}
								<div className="name-shadow">{artist.name}</div>
								<div className="song-title">{artist.name}</div>
							</div>
						</div>
					));

					return <div>{JSX}</div>;
				}
				else {
					return null;
				}
			default:
				data = JSON.parse(sessionStorage.getItem('compare_tracks'));
				if (data) {
					let tracks;
					switch (this.props.duration) {
						case 'short_term':
							tracks = data.short_term_tracks;
							break;
						case 'medium_term':
							tracks = data.medium_term_tracks;
							break;
						default:
							tracks = data.long_term_tracks;
					}
					const JSX = tracks.map((track, i) => (
						<div key={track.id} className="song">
							<div className="image">
								<img src={track.album.images[0].url} alt="" />
								<div className="number-shadow">{i + 1}.</div>
								<div className="number">{i + 1}.</div>
								<div className="artist-shadow">{track.artists[0].name}</div>
								<div className="artist-name">{track.artists[0].name}</div>
								<div className="name-shadow">{track.name}</div>
								<div className="song-title">{track.name}</div>
							</div>
						</div>
					));

					return <div>{JSX}</div>;
				}
				else {
					return null;
				}
		}
	}
}
