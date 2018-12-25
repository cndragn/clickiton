import React, { Component } from 'react';
import axios from 'axios';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class FeaturedMovies extends Component {
	state = {
		movies: [],
		backdrop: ''
	};

	componentDidMount() {
		axios
			.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`)
			.then((res) => {
				const movies = this.shuffle(res.data.results);
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

	titleLink(link) {
		return link.replace(/\s+/g, '-').toLowerCase();
	}

	shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
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
								<Button>View All New Movies</Button>
							</LinkContainer>
						</div>

						<div className="show-grid">
							{this.featuredMovies().map(({ id, title, poster_path }) => (
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

export default FeaturedMovies;
