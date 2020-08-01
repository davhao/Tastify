import React, { Component } from 'react';
import '../App.css';
const axios = require('axios');

export default class SongsToCompare extends Component {
	state = {
		loading : true,
		songs   : []
	};

	async componentDidMount() {
		const mongoID = this.props.sharedMongoID;
		const res = await axios.get(`api/users/${mongoID}`);
		this.setState({ loading: false, songs: res.data.result.songs });

		// Update Other User Songs State in Main Page
		let songMap = new Map();
		this.state.songs.forEach((song) => songMap.set(song.id, song));
		this.props.updateOtherUserSongs(songMap);
	}

	render() {
		const songsJsx = this.state.songs.map((song, i) => (
			<div key={song.id} className="song">
				<div class="image">
					<img src={song.album.images[0].url} alt="" />
					<div class="number">{i + 1}.</div>
					<div class="artist-name">{song.artists[0].name}</div>
					<div class="song-title">{song.name}</div>
				</div>
			</div>
		));

		return <div>{songsJsx}</div>;
	}
}
