import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

import { titleLink } from '../helpers/movies';
import noImg from '../images/no-image2.png';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: []
		};
	}

	componentDidMount() {
		console.log(this.props.match.params.query);
		const term = this.props.match.params.query;
		axios
			.get(
				`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${term}&include_adult=false&region=US`
			)
			.then((res) => {
				const results = res.data.results;
				this.setState({ movies: results });
			});
	}

	noResults() {
		if (this.state.movies.length < 1) {
			return (
				<div className="no-results">
					<h2>No Results Found</h2>
					<h2>Please try again!</h2>
				</div>
			);
		}
	}

	render() {
		const { movies } = this.state;
		return (
			<div className="search">
				<div className="container">
					{movies.length > 0 ? <h2>Search Results</h2> : ''}
					<div className="show-grid auto-clear">
						{movies.map(({ id, title, poster_path, release_date }) => (
							<Col xs={6} md={3} lg={2} key={id} className="poster-wrap">
								<Link to={`/movie/${id}/${titleLink(title)}`}>
									<img
										alt={title}
										title={title}
										src={poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : noImg}
									/>
									<p className={poster_path ? 'hidden' : ''}>{title}</p>
								</Link>
								<h3>{`${title}(${release_date.slice(0, 4)})`}</h3>
							</Col>
						))}
					</div>
					{this.noResults()}
				</div>
			</div>
		);
	}
}

export default Search;
