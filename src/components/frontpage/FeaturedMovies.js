import React, { Component } from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class FeaturedMovies extends Component {
	state = {
		movies: [],
		backdrop: ''
	};

	componentDidMount() {
		axios
			.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
			.then((res) => {
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
		console.log(movieArr);
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
						<h2>In Theaters Now</h2>
						<div className="show-grid">
							{this.featuredMovies().map(({ id, title, poster_path }) => (
								<Col xs={6} md={4} lg={2} key={id}>
									<img
										alt={title}
										title={title}
										src={`https://image.tmdb.org/t/p/w342${poster_path}`}
										responsive
									/>
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
