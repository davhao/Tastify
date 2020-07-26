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
	}

	render() {
		const songsJsx = this.state.songs.map((song, i) => (
			<div key={song.id} className="song">
				<div>{i + 1}.</div>
				<div>{song.artists[0].name}</div>
				<div>{song.album.name}</div>
				<div>{song.name}</div>
				<img src={song.album.images[0].url} width="100" alt="" />
			</div>
		));

		return <div>{songsJsx}</div>;
	}
}
