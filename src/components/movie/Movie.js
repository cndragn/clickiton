import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from '../../actions';
import axios from 'axios';

import { ColorExtractor } from 'react-color-extractor';
import MovieHeader from './MovieHeader';
import Main from './Main';
import movieImg from '../../images/pexels-photo-925744a.png';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Movie extends Component {
	state = {
		movieRating: '',
		releaseDate: '',
		crew: [],
		colors: [],
		id: this.props.match.params
	};

	componentDidMount() {
		const { id } = this.state.id;
		this.props.fetchMovie(id, movieImg);

		axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`).then((res) => {
			const release = res.data;
			this.setState({ crew: release.crew });
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

	displayHdr(movie, backdrop) {
		const { crew, movieRating, releaseDate } = this.state;
		if (backdrop && movie.poster_path) {
			return (
				<MovieHeader
					movie={movie}
					crew={crew}
					movieRating={movieRating}
					releaseDate={releaseDate}
					genres={movie.genres}
				/>
			);
		}
	}

	getColors = (colors) => this.setState((state) => ({ colors: [ ...state.colors, ...colors ] }));

	render() {
		const { movie, backdrop } = this.props;
		const accent = this.state.colors[0];

		return (
			<div
				className="movieWrapper"
				style={{
					backgroundImage: `url(${backdrop})`
				}}
			>
				<ColorExtractor getColors={(colors) => this.setState({ colors: colors })}>
					<img className="hidden" alt={movie.title} src={backdrop} />
				</ColorExtractor>
				<div className="movie-bg">
					<div className="movie">
						{this.displayHdr(movie, backdrop)}
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

const mapStateToProps = (state) => {
	return {
		movie: state.movie,
		backdrop: state.backdrop
	};
};
export default connect(mapStateToProps, { fetchMovie })(Movie);
