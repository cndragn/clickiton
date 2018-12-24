import React, { Component } from 'react';
import axios from 'axios';
import Palette from 'react-palette';
import movieImg from '../../images/pexels-photo-925744a.png';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

// https://developers.themoviedb.org/3/movies/get-movie-credits
// cast, crew, director, producer

// https://developers.themoviedb.org/3/movies/get-movie-keywords
// keywords

// https://developers.themoviedb.org/3/movies/get-movie-videos
// trailers

// https://developers.themoviedb.org/3/movies/get-movie-recommendations
// recommeded movies

class Movie extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movie: [],
			backdrop: ''
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		console.log(id);
		axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`).then((res) => {
			const movie = res.data;
			this.setState({ movie });
			let backdrop = '';
			if (movie.backdrop_path == null) {
				backdrop = movieImg;
			} else {
				backdrop = `https://image.tmdb.org/t/p/original/${res.data.backdrop_path}`;
			}
			this.setState({ backdrop });
		});
	}

	render(props) {
		const movie = this.state.movie;
		document.title = movie.title;

		return (
			<Palette image={this.state.backdrop}>
				{(palette) => (
					<div
						className="movie-bg"
						style={{
							backgroundImage: `url(${this.state.backdrop})`
						}}
					>
						<div className="movie">
							<div className="movie-header">
								<div className="poster">
									<img
										alt={movie.title}
										src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
									/>
								</div>
								<div className="movie-details">
									<h1>{movie.title}</h1>
									<div className="stats">
										<p>
											rating | {movie.runtime} | genres | {movie.release_date}
										</p>
									</div>
									<div className="description">{movie.overview}</div>
									<div className="crew" />
								</div>
							</div>
							<div
								className="content"
								style={{
									borderColor: palette.vibrant ? `${palette.vibrant}` : '#1c1c1c'
								}}
							>
								<div className="container" />
							</div>
						</div>
					</div>
				)}
			</Palette>
		);
	}
}

export default Movie;
