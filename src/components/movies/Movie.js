// https://api.themoviedb.org/3/movie/343611?api_key={api_key}

import React, { Component } from 'react';
import axios from 'axios';
import Palette from 'react-palette';
import movieImg from '../../images/pexels-photo-925744a.png';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;
const movieID = '315064';

// https://developers.themoviedb.org/3/movies/get-movie-credits
// cast, crew, director, producer

// https://developers.themoviedb.org/3/movies/get-movie-keywords
// keywords

// https://developers.themoviedb.org/3/movies/get-movie-videos
// trailers

// https://developers.themoviedb.org/3/movies/get-movie-recommendations
// recommeded movies

class Movie extends Component {
	state = {
		movie: [],
		backdrop: ''
	};

	componentDidMount() {
		axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`).then((res) => {
			const movie = res.data;
			this.setState({ movie });
			let backdrop = '';
			if (movie.backdrop_path == null) {
				backdrop = movieImg;
			} else {
				backdrop = `https://image.tmdb.org/t/p/original/${res.data.backdrop_path}`;
			}
			console.log('backdrop is: ' + backdrop);
			this.setState({ backdrop });
			// console.log(movie);
		});
	}

	render() {
		const movie = this.state.movie;
		return (
			<div
				className="movie-bg"
				style={{
					backgroundImage: `url(${this.state.backdrop})`
				}}
			>
				<Palette image={this.state.backdrop}>
					{(palette) => (
						<div
							className="movie"
							style={{
								backgroundColor: `${palette.vibrant}7f`
							}}
						>
							<h1>{movie.title}</h1>
							<img alt={movie.title} src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />

							<div className="movie-details">
								<div className="stats">
									rating | {movie.runtime} | genres | {movie.release_date}
								</div>
								<div className="description">{movie.overview}</div>
								<div className="crew" />
							</div>
						</div>
					)}
				</Palette>
			</div>
		);
	}
}

export default Movie;
