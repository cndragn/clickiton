import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Movie extends Component {
	constructor(props) {
		super(props);

		this.state = {
			person: []
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.setState({ id });
		axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`).then((res) => {
			const person = res.data;
			this.setState({ person });
		});
	}

	render(props) {
		const { person } = this.state;
		console.log(person);
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
								<h1>Main</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;
