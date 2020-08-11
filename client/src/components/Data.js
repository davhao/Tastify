import React, { Component } from 'react';
// import { Spinner } from 'react-bootstrap';
import '../App.css';
const axios = require('axios');

export default class Data extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mongoID   : null,
			isDesktop : false,
			loading   : true
		};

		this.updatePredicate = this.updatePredicate.bind(this);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updatePredicate);
	}

	updatePredicate() {
		this.setState({ isDesktop: window.innerWidth > 500 });
	}

	async componentDidMount() {
		this.updatePredicate();
		window.addEventListener('resize', this.updatePredicate);

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

		this.setState({
			loading : false
		});

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
		const isDesktop = this.state.isDesktop;

		if (this.state.loading) {
			// return <Spinner animation="grow" />;
			return null;
		}
		else {
			let data;
			// if (this.props.setYourTracksLoading) {
			// 	this.props.setYourTracksLoading();
			// }
			switch (this.props.type) {
				case 'artists':
					data = JSON.parse(sessionStorage.getItem('artists'));
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
									{isDesktop ? null : <div className="number-shadow">{i + 1}.</div>}
									<div className="number">{i + 1}.</div>
									{artist.images[0] ? null : <div className="no-image">No Image</div>}
									{isDesktop ? null : <div className="name-shadow">{artist.name}</div>}
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
					data = JSON.parse(sessionStorage.getItem('tracks'));
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
									{isDesktop ? null : <div className="number-shadow">{i + 1}.</div>}
									<div className="number">{i + 1}.</div>
									{isDesktop ? null : <div className="artist-shadow">{track.artists[0].name}</div>}
									<div className="artist-name">{track.artists[0].name}</div>
									{isDesktop ? null : <div className="name-shadow">{track.name}</div>}
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
}
