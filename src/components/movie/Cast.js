import React, { Component } from 'react';
import axios from 'axios';
import blankProfilePic from '../../images/blank-profile.jpg';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Cast extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			cast: [],
			crew: [],
			id: this.props.id
		};
	}

	componentDidMount() {
		const { id } = this.props.id;
		axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`).then((res) => {
			const release = res.data;
			this.setState({ cast: release.cast });
			this.setState({ crew: release.crew });
		});
	}

	topCast() {
		let cast = [];
		Object(this.state.cast).forEach(function(person, i) {
			if (i < 6) {
				cast.push(person);
			}
		});
		return cast;
	}

	profilePic(profile_path, name) {
		if (profile_path) {
			return <img src={`http://image.tmdb.org/t/p/w185/${profile_path}`} alt={name} />;
		} else {
			return <img src={blankProfilePic} alt={name} />;
		}
	}

	render() {
		return (
			<div className="cast-crew">
				{this.topCast().length > 0 ? <h2>Cast</h2> : ''}
				<div className="cast">
					<div className="cards">
						{this.topCast().map(({ cast_id, name, character, profile_path }) => (
							<div className="card" key={cast_id}>
								{this.profilePic(profile_path, name)}
								<p>{name}</p>
								<p>{character}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default Cast;
