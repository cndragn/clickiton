import React, { Component } from 'react';
import axios from 'axios';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import posterImage from '../../images/no-image.png';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class ComingSoon extends Component {
	state = {
		movies: [],
		backdrop: ''
	};

	componentDidMount() {
		axios
			.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`)
			.then((res) => {
				const movies = this.shuffle(res.data.results);
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
				console.log(movie.poster_path);
				console.log(movieArr.length);
				// if (movieArr.length < 6) {
				// 	movieArr.push(movie);
				// }
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
			<div className="featured coming-soon">
				<div className="container">
					<div className="featured-title">
						<h2>Coming Soon</h2>
						<LinkContainer to="/featured-movies">
							<Button>View All</Button>
						</LinkContainer>
					</div>

					<div className="show-grid">
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
		);
	}
}

export default ComingSoon;
