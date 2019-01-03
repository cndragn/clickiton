import React, { Component } from 'react';
import axios from 'axios';
import { ColorExtractor } from 'react-color-extractor';
import MovieHeader from './MovieHeader';
import Main from './Main';
import movieImg from '../../images/pexels-photo-925744a.png';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Movie extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movie: [],
			movieRating: '',
			releaseDate: '',
			backdrop: '',
			genres: [],
			crew: [],
			colors: [],
			id: this.props.match.params
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.setState({ id });
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

			axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`).then((res) => {
				const release = res.data;
				this.setState({ crew: release.crew });
			});
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

	getColors = (colors) => this.setState((state) => ({ colors: [ ...state.colors, ...colors ] }));

	render(props) {
		const { movie, crew } = this.state;
		const accent = this.state.colors[0];
		document.title = movie.title;

		console.log(this.props);

		return (
			<div
				className="movieWrapper"
				style={{
					backgroundImage: `url(${this.state.backdrop})`
				}}
			>
				<ColorExtractor getColors={(colors) => this.setState({ colors: colors })}>
					<img className="hidden" alt={movie.title} src={this.state.backdrop} />
				</ColorExtractor>
				<div className="movie-bg">
					<div className="movie">
						<MovieHeader
							movie={movie}
							crew={crew}
							movieRating={this.state.movieRating}
							releaseDate={this.state.releaseDate}
							genres={this.state.genres}
						/>
						<div
							className="content"
							style={{
								borderColor: accent
							}}
						>
							<div className="container">
								<Main id={this.state.id} color={accent} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;
