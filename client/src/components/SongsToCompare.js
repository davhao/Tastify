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
		this.state.songs.forEach((song) => songMap.set(song.name, song));
		this.props.updateOtherUserSongs(songMap);
	}

	render() {
		const songsJsx = this.state.songs.map((song, i) => (
			<div key={song.id} className="song">
				<div>{i + 1}.</div>
				<div className="caption">{song.artists[0].name}</div>
				{/* <div className='caption'>{song.album.name}</div> */}
				<div className="caption">{song.name}</div>
				<img src={song.album.images[0].url} alt="" />
			</div>
		));

		return <div>{songsJsx}</div>;
	}
}
