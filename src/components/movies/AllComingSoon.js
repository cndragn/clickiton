import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class AllComingSoon extends Component {
	state = {
		movies: [],
		backdrop: ''
	};

	componentDidMount() {
		axios
			.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`)
			.then((res) => {
				const movies = res.data.results;
				const backdrop = res.data.results[0].backdrop_path;
				this.setState({ movies });
				this.setState({ backdrop });
			});
	}

	titleLink(link) {
		return link.replace(/\s+/g, '-').toLowerCase();
	}

	movieList() {
		let movieArr = [];
		Object(this.state.movies).forEach(function(movie, i) {
			if (movie.poster_path !== null) {
				movieArr.push(movie);
			}
		});
		return movieArr;
	}

	render() {
		return (
			<div>
				<div className="all-featured">
					<div className="container">
						<h2>Coming Soon</h2>
						<div className="show-grid auto-clear">
							{this.movieList().map(({ id, title, poster_path }) => (
								<Col xs={4} md={3} lg={2} key={id}>
									<Link to={`/movie/${id}/${this.titleLink(title)}`}>
										<img
											alt={title}
											title={title}
											src={`https://image.tmdb.org/t/p/w342${poster_path}`}
										/>
									</Link>
								</Col>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AllComingSoon;
