import React, { Component } from 'react';
import '../App.css';

export default class MutualSongs extends Component {
	state = {
		songs    : [],
		songsJsx : null
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps !== this.props) {
			const songs = [];
			this.props.userSongs.forEach((song, id) => {
				if (this.props.otherUserSongs.has(id)) {
					songs.push(song);
				}
			});
			this.setState({
				songs : songs
			});
		}
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
