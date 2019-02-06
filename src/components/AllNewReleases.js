import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNewReleases } from '../actions';

import { tidyLink } from '../helpers/movies';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

class AllNewReleases extends Component {
	componentDidMount() {
		this.props.fetchNewReleases();
	}

	render() {
		const { movies } = this.props;
		document.title = 'ClickItOn: New Releases';
		return (
			<div>
				<div className="all-featured">
					<div className="container">
						<h2>New Releases</h2>
						<div className="show-grid auto-clear">
							{movies.map(({ id, title, poster_path }) => (
								<Col xs={6} md={3} lg={2} key={id}>
									<Link to={`/movie/${id}/${tidyLink(title)}`}>
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

const mapStateToProps = (state) => {
	return {
		movies: state.newReleases
	};
};

export default connect(mapStateToProps, { fetchNewReleases })(AllNewReleases);
