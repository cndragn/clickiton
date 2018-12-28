import React, { Component } from 'react';
import axios from 'axios';
import { fetchComingSoon, titleLink } from '../../helpers/movies';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class ComingSoon extends Component {
	state = {
		movies: [],
		backdrop: ''
	};

	componentDidMount() {
		axios.get(fetchComingSoon()).then((res) => {
			const movies = res.data.results;
			// movies.map(
			// 	(e) =>
			// 		e.poster_path == null
			// 			? (e.poster_path = posterImage)
			// 			: (e.poster_path = `https://image.tmdb.org/t/p/w342${e.poster_path}`)
			// );
			const backdrop = res.data.results[0].backdrop_path;
			this.setState({ movies });
			this.setState({ backdrop });
		});
	}

	movieList() {
		let movieArr = [];
		Object(this.state.movies).forEach(function(movie, i) {
			if (movie.poster_path !== null && movieArr.length < 6) {
				movieArr.push(movie);
			}
		});
		return movieArr;
	}

	render() {
		return (
			<div className="featured coming-soon">
				<div className="container">
					<div className="featured-title">
						<h2>Coming Soon</h2>
						<LinkContainer to="/coming-soon">
							<Button>View All</Button>
						</LinkContainer>
					</div>

					<div className="show-grid auto-clear">
						{this.movieList().map(({ id, title, poster_path }) => (
							<Col xs={4} md={2} key={id}>
								<Link to={`/movie/${id}/${titleLink(title)}`}>
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
		);
	}
}

export default ComingSoon;
