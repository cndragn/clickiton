import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Movie extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			person: [],
			credits: [],
			movies: []
		};
	}

	componentDidMount() {
		const { id, title } = this.props.match.params;
		this.setState({ id });
		axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`).then((res) => {
			const person = res.data;
			this.setState({ person });
		});

		axios
			.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`)
			.then((res) => {
				const credits = res.data.cast;
				this.setState({ credits });
			});

		axios
			.get(
				`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${title}&page=1&include_adult=false&region=US`
			)
			.then((res) => {
				const knownFor = res.data.results;
				Object(
					knownFor.map((movies) => {
						if (movies.id === parseInt(id)) {
							this.setState({ movies });
						}
						return 0;
					})
				);
			});
	}

	render(props) {
		let { person, credits, movies } = this.state;
		let knownFor = movies.known_for;
		console.log(knownFor);
		console.log(credits);
		document.title = `ClickItOn: ${person.name}`;

		return (
			<div className="movieWrapper">
				<div className="movie-bg">
					<div className="movie">
						<div className="header">
							<p>Name: {person.name}</p>
							<p>birthday: {person.birthday}</p>
							<p>Place of birth: {person.place_of_birth}</p>
							<p>Profile pic path: {person.profile_path}</p>
							<p>Bio: {person.biography}</p>
						</div>
						<div className="content">
							<div className="container">
								<h1>Known For</h1>
								{Object(movies.map(({ id }) => <p>{id}</p>))}
								<h1>Movie Credits</h1>
								{credits.map(({ character, poster_path, original_title, release_date }) => (
									<p>
										{character}, {poster_path}, {original_title}, {release_date}
									</p>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;
