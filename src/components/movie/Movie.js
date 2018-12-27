import React, { Component } from 'react';
import axios from 'axios';
import Palette from 'react-palette';
import MovieHeader from './MovieHeader';
import Details from './Details';
import Main from './Main';
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
			movieRating: '',
			releaseDate: '',
			backdrop: '',
			genres: []
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`).then((res) => {
			const movie = res.data;
			this.setState({ movie });

			let backdrop = '';
			if (movie.backdrop_path == null) {
				backdrop = movieImg;
			} else {
				backdrop = `https://image.tmdb.org/t/p/w780/${res.data.backdrop_path}`;
			}
			this.setState({ backdrop });
			this.setState({ genres: movie.genres });
		});

		// Release date, rating
		axios.get(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`).then((res) => {
			const release = res.data.results;
			release.map((item) => {
				if (item.iso_3166_1 === 'US' && this.state.release !== null) {
					this.setState({ releaseDate: item.release_dates[0].release_date });
					this.setState({ movieRating: item.release_dates[0].certification });
				}
				return 0;
			});
		});
	}

	render(props) {
		const movie = this.state.movie;
		const releaseDate = new Date(this.state.releaseDate);
		// const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
		const genres = this.state.genres;
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
							<MovieHeader movie={movie} releaseDate={releaseDate} genres={genres} />
							<div
								className="content"
								style={{
									borderColor: palette.vibrant ? `${palette.vibrant}` : '#1c1c1c'
								}}
							>
								<div className="containers">
									<Details />
									<Main />
								</div>
							</div>
						</div>
					</div>
				)}
			</Palette>
		);
	}
}

export default Movie;
