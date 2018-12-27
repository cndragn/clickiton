import React, { Component } from 'react';
import { runtime } from '../../helpers/movies';

class MovieHeader extends Component {
	rating(value) {
		if (value) {
			return this.props.movieRating;
		}
		return 'Not Rated';
	}

	render() {
		const releaseDate = new Date(this.props.releaseDate);
		const genres = this.props.genres;
		const DATE_YEAR = { year: 'numeric' };
		// const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

		return (
			<div className="movie-header">
				<div className="poster">
					<img
						alt={this.props.movie.title}
						src={`https://image.tmdb.org/t/p/w342${this.props.movie.poster_path}`}
					/>
				</div>
				<div className="movie-details">
					<h1>
						{this.props.movie.title} ({releaseDate.toLocaleDateString('en-US', DATE_YEAR)})
					</h1>
					<div className="stats">
						<p>
							{this.rating(this.props.movieRating)} | {runtime(this.props.movie.runtime)}
							<br />
							{genres.map((genre, index) => (
								<span key={genre.id}>
									{genre.name}
									{index < this.props.genres.length - 1 ? ', ' : ''}
								</span>
							))}
						</p>
					</div>
					<div className="description">{this.props.movie.overview}</div>
					<div className="crew" />
				</div>
			</div>
		);
	}
}

export default MovieHeader;
