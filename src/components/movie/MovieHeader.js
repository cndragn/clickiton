import React, { Component } from 'react';
import { runtime } from '../../helpers/movies';

class MovieHeader extends Component {
	rating(value) {
		if (value) {
			return this.props.movieRating;
		}
		return 'Not Rated';
	}

	director() {
		let cast = [];
		Object(this.props.crew).forEach(function(person, i) {
			if (person.job === 'Director') {
				cast.push(person);
			}
		});
		return cast;
	}

	writer() {
		let cast = [];
		Object(this.props.crew).forEach(function(person, i) {
			if (person.job === 'Screenplay') {
				cast.push(person);
			}
		});
		return cast;
	}

	poster() {
		if (this.props.movie.poster_path) {
			return (
				<div className="poster">
					<img
						alt={this.props.movie.title}
						src={`https://image.tmdb.org/t/p/w342${this.props.movie.poster_path}`}
					/>
				</div>
			);
		}
	}

	releaseYear() {
		const releaseDate = new Date(this.props.releaseDate);
		const DATE_YEAR = { year: 'numeric' };
		if (this.props.releaseDate) {
			return `(${releaseDate.toLocaleDateString('en-US', DATE_YEAR)})`;
		}
	}

	render() {
		const genres = this.props.genres;

		// const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
		return (
			<div className="movie-header">
				{this.poster()}
				<div className="movie-details">
					<h1>
						{this.props.movie.title} {this.releaseYear()}
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
						<p>
							Director:{' '}
							{this.director().map((person, index) => (
								<span key={person.credit_id}>
									{person.name}
									{index < this.director().length - 1 ? ', ' : ''}
								</span>
							))}
							<br />
							Screenplay:{' '}
							{this.writer().map((person, index) => (
								<span key={person.credit_id}>
									{person.name} {index < this.writer().length - 1 ? ', ' : ''}
								</span>
							))}
						</p>
					</div>
					<div className="description">{this.props.movie.overview}</div>
				</div>
			</div>
		);
	}
}

export default MovieHeader;
