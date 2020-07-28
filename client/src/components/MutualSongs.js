import React, { Component } from 'react';
import '../App.css';

export default class MutualSongs extends Component {
	state = {
		songs    : [],
		songsJsx : null
	};

	componentDidMount() {
		this.props.userSongs.forEach((song, name) => {
			if (this.props.otherUserSongs.has(name)) {
				this.setState({
					songs : this.state.songs.push(song)
				});
			}
		});
		const songsJsx = this.state.songs.map((song, i) => (
			<div key={song.id} className="song">
				<div>{i + 1}.</div>
				<div className="caption">{song.artists[0].name}</div>
				{/* <div className='caption'>{song.album.name}</div> */}
				<div className="caption">{song.name}</div>
				<img src={song.album.images[0].url} alt="" />
			</div>
		));
		this.setState({
			songsJsx : songsJsx
		});
	}

	render() {
		return <div>{this.state.songsJsx}</div>;
	}
}
