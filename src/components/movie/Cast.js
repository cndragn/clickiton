import React, { Component } from 'react';
import axios from 'axios';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

// https://getflywheel.com/layout/flexbox-create-modern-card-design-layout/
// Combine if director / screenplay are the same
// http://localhost:3000/movie/466411/speed-kills

class Videos extends Component {
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
			if (person.profile_path && i < 6) {
				cast.push(person);
			}
		});
		return cast;
	}

	crewList() {
		let cast = [];
		Object(this.state.crew).forEach(function(person, i) {
			if (person.job === 'Director' || person.job === 'Screenplay') {
				cast.push(person);
			}
		});

		cast.sort(function(a, b) {
			return a.job < b.job ? -1 : a.job > b.job ? 1 : 0;
		});
		return cast.sort();
	}

	render() {
		return (
			<div className="cast-crew">
				<h2>Cast</h2>
				<div className="cast">
					<div className="cards">
						{this.topCast().map(({ cast_id, name, character, profile_path }) => (
							<div className="card" key={cast_id}>
								<img src={`http://image.tmdb.org/t/p/w185/${profile_path}`} alt={name} />
								<p>{name}</p>
								<p>{character}</p>
							</div>
						))}
					</div>
				</div>
				<h2>Crew</h2>
				<div className="crew">
					<div className="cards">
						{this.crewList().map(({ credit_id, name, job, profile_path }) => (
							<div className="card" key={credit_id}>
								<img src={`http://image.tmdb.org/t/p/w185/${profile_path}`} alt={name} />
								<p>{name}</p>
								<p>{job}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default Videos;
