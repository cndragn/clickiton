import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

// https://react-bootstrap.github.io/components/panel/
// https://getflywheel.com/layout/flexbox-create-modern-card-design-layout/

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
		console.log(this.state.crew);
		return (
			<div class="cast">
				<h2>Cast</h2>
				<Row>
					{this.topCast().map(({ cast_id, name, character, profile_path }) => (
						<Col xs={4} md={2} key={cast_id}>
							<Thumbnail src={`http://image.tmdb.org/t/p/w185/${profile_path}`} alt={name}>
								<p>{name}</p>
								<p>{character}</p>
							</Thumbnail>
						</Col>
					))}
				</Row>
				<h3>Crew</h3>
				<Row>
					{this.crewList().map(({ credit_id, name, job, profile_path }) => (
						<Col xs={4} md={2} key={credit_id}>
							<Thumbnail src={`http://image.tmdb.org/t/p/w185/${profile_path}`} alt={name}>
								<p>{name}</p>
								<p>{job}</p>
							</Thumbnail>
						</Col>
					))}
				</Row>
			</div>
		);
	}
}

export default Videos;
