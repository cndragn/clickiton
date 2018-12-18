import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class JsonPlaceholder extends Component {
	state = {
		persons: []
	};

	componentDidMount() {
		axios
			.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
			.then((res) => {
				const persons = res.data.results;
				console.log(persons);
				this.setState({ persons });
			});
	}

	featuredMovies() {
		let movieArr = [];
		Object(this.state.persons).forEach(function(movie, i) {
			if (i < 6) {
				console.log(movie.title);
				movieArr.push(movie);
			}
		});
		return movieArr;
	}

	render() {
		return (
			<div>
				<h2>In Theatres Now</h2>

				<ul>{this.featuredMovies().map(({ title }) => <li key={title}>{title}</li>)}</ul>
			</div>
		);
	}
}

export default JsonPlaceholder;
