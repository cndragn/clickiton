import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class JsonPlaceholder extends Component {
	state = {
		movies: [],
		backdrop: null
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
						<h2>In Theatres Now</h2>
						<div className="row">
							{this.featuredMovies().map(({ id, title, poster_path }) => (
								<div className="col s6 m4 l2" key={id}>
									<div className="card z-depth-3">
										<div className="card-image">
											<img alt={title} src={`https://image.tmdb.org/t/p/w342${poster_path}`} />
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default JsonPlaceholder;
