import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearch } from '../actions';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

import { tidyLink } from '../helpers/movies';
import noImg from '../images/no-image2.png';

class Search extends Component {
	componentDidMount() {
		const term = this.props.match.params.query;
		this.props.fetchSearch(term);
	}

	noResults() {
		const { movies } = this.props;
		if (movies.length < 1) {
			return (
				<div className="no-results">
					<h2>No Results Found</h2>
					<h2>Please try again!</h2>
				</div>
			);
		}
	}

	render() {
		const { movies } = this.props;
		return (
			<div className="flexible search">
				<div className="container">
					{this.noResults()}
					{movies.length > 0 ? <h2>Search Results</h2> : ''}
					<div className="show-grid auto-clear">
						{movies.map(({ id, title, poster_path, release_date }) => (
							<Col xs={6} md={3} lg={2} key={id} className="poster-wrap">
								<Link to={`/movie/${id}/${tidyLink(title)}`}>
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		movies: state.searchTerm
	};
};

export default connect(mapStateToProps, { fetchSearch })(Search);
