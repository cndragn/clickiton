import React, { Component } from 'react';
import axios from 'axios';
import { fetchComingSoon, titleLink } from '../../helpers/movies';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class AllComingSoon extends Component {
	state = {
		movies: [],
		backdrop: ''
	};

	componentDidMount() {
		axios.get(fetchComingSoon()).then((res) => {
			const movies = res.data.results;
			const backdrop = res.data.results[0].backdrop_path;
			this.setState({ movies });
			this.setState({ backdrop });
		});
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
		document.title = 'ClickItOn: Coming Soon';
		return (
			<div>
				<div className="all-featured">
					<div className="container">
						<h2>Coming Soon</h2>
						<div className="show-grid auto-clear">
							{this.movieList().map(({ id, title, poster_path }) => (
								<Col xs={6} md={3} lg={2} key={id}>
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

export default AllComingSoon;
