import React, { Component } from 'react';
import axios from 'axios';
import { fetchFeatured, titleLink } from '../../helpers/movies';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class FeaturedMovies extends Component {
	state = {
		movies: [],
		backdrop: ''
	};

	componentDidMount() {
		axios.get(fetchFeatured()).then((res) => {
			const movies = res.data.results;
			const backdrop = res.data.results[0].backdrop_path;
			this.setState({ movies });
			this.setState({ backdrop });
		});
	}

	featuredMovies() {
		let movieArr = [];
		Object(this.state.movies).forEach(function(movie, i) {
			if (i < 6) {
				movieArr.push(movie);
			}
		});
		return movieArr;
	}

	render() {
		return (
			<div
				className="featured-bg"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original${this.state.backdrop})`
				}}
			>
				<div className="featured">
					<div className="container">
						<div className="featured-title">
							<h2>New Releases</h2>
							<LinkContainer to="/featured-movies">
								<Button>View All</Button>
							</LinkContainer>
						</div>

						<div className="show-grid auto-clear">
							{this.featuredMovies().map(({ id, title, poster_path }) => (
								<Col xs={4} md={3} lg={2} key={id}>
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
			</div>
		);
	}
}

export default FeaturedMovies;
