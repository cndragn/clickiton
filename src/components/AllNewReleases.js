import React, { Component } from 'react';
import axios from 'axios';
import { fetchFeatured, titleLink } from '../helpers/movies';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class AllFeaturedMovies extends Component {
	state = {
		movies: []
	};

	componentDidMount() {
		axios.get(fetchFeatured()).then((res) => {
			let movie = [];
			const movies = res.data.results;
			movies.map((item) => {
				if (item.release_date.slice(0, 4) > 2016) {
					movie.push(item);
				}
			});
			this.setState({ movies: movie });
		});
	}

	render() {
		const movies = this.state.movies;
		document.title = 'ClickItOn: New Releases';
		return (
			<div>
				<div className="all-featured">
					<div className="container">
						<h2>New Releases</h2>
						<div className="show-grid auto-clear">
							{movies.map(({ id, title, poster_path }) => (
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

export default AllFeaturedMovies;
