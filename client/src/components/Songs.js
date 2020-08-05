import React, { Component } from 'react';
import '../App.css';
const axios = require('axios');

export default class Songs extends Component {
	state = {
		mongoID : null
	};

	async componentDidMount() {
		const short_term_tracks = await this.getData(`short_term`, 'tracks');
		const medium_term_tracks = await this.getData(`medium_term`, 'tracks');
		const long_term_tracks = await this.getData(`long_term`, 'tracks');
		const short_term_artists = await this.getData(`short_term`, 'artists');
		const medium_term_artists = await this.getData(`medium_term`, 'artists');
		const long_term_artists = await this.getData(`long_term`, 'artists');

		sessionStorage.setItem(
			'tracks',
			JSON.stringify({
				short_term_tracks  : short_term_tracks,
				medium_term_tracks : medium_term_tracks,
				long_term_tracks   : long_term_tracks
			})
		);
		sessionStorage.setItem(
			'artists',
			JSON.stringify({
				short_term_artists  : short_term_artists,
				medium_term_artists : medium_term_artists,
				long_term_artists   : long_term_artists
			})
		);

		// Headers
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		// Request Body
		const body = JSON.stringify({
			short_term_tracks   : short_term_tracks,
			medium_term_tracks  : medium_term_tracks,
			long_term_tracks    : long_term_tracks,
			short_term_artists  : short_term_artists,
			medium_term_artists : medium_term_artists,
			long_term_artists   : long_term_artists
		});

		// Send songs to database
		const res = await axios.post('/api/users', body, config);
		this.props.updateMongoID(res.data._id);
		this.setState({
			mongoID : res.data._id
		});
	}

	async getData(time_range, type) {
		const token = this.props.access_token;
		let array = [];
		for (let i = 0; i <= 49; i += 49) {
			if (array.length) {
				array.pop();
			}
			const config = {
				headers : {
					Accept         : 'application/json',
					'Content-Type' : 'application/json',
					Authorization  : `Bearer ${token}`
				},
				params  : {
					time_range : time_range,
					limit      : 50,
					offset     : i
				}
			};

			const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, config);
			array = array.concat(response.data.items);
		}
		return array;
	}

	render() {
		const testSongs = JSON.parse(sessionStorage.getItem('tracks'));
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
