import React, { Component } from 'react';
import '../App.css';

export default class MutualData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDesktop : false
		};

		this.updatePredicate = this.updatePredicate.bind(this);
	}

	componentDidMount() {
		this.updatePredicate();
		window.addEventListener('resize', this.updatePredicate);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updatePredicate);
	}

	updatePredicate() {
		this.setState({ isDesktop: window.innerWidth > 500 });
	}

	render() {
		const isDesktop = this.state.isDesktop;
		const mutualData = [];
		const dataMap = new Map();
		let data, compareData;
		switch (this.props.type) {
			case 'artists':
				data = JSON.parse(sessionStorage.getItem('artists'));
				compareData = JSON.parse(sessionStorage.getItem('compare_artists'));
				if (data && compareData) {
					switch (this.props.duration) {
						case 'short_term':
							data = data.short_term_artists;
							compareData = compareData.short_term_artists;
							break;
						case 'medium_term':
							data = data.medium_term_artists;
							compareData = compareData.medium_term_artists;
							break;
						default:
							data = data.long_term_artists;
							compareData = compareData.long_term_artists;
					}
				}
				break;
			default:
				data = JSON.parse(sessionStorage.getItem('tracks'));
				compareData = JSON.parse(sessionStorage.getItem('compare_tracks'));
				if (data && compareData) {
					switch (this.props.duration) {
						case 'short_term':
							data = data.short_term_tracks;
							compareData = compareData.short_term_tracks;
							break;
						case 'medium_term':
							data = data.medium_term_tracks;
							compareData = compareData.medium_term_tracks;
							break;
						default:
							data = data.long_term_tracks;
							compareData = compareData.long_term_tracks;
					}
				}
		}
		if (data && compareData) {
			data.forEach((item) => dataMap.set(item.id, item));
			compareData.forEach((item) => {
				if (dataMap.has(item.id)) {
					mutualData.push(item);
				}
			});

			let JSX;

			switch (this.props.type) {
				case 'artists':
					JSX = mutualData.map((artist, i) => (
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
					break;
				default:
					JSX = mutualData.map((track, i) => (
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
			}
			return <div>{JSX}</div>;
		}
		else {
			return null;
		}
	}
}
