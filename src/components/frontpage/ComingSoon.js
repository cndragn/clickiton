import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComingSoon } from '../../actions';

import { tidyLink } from '../../helpers/movies';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class ComingSoon extends Component {
	componentDidMount() {
		this.props.fetchComingSoon();
	}

	movieList = (num) => {
		const { upcoming } = this.props;
		let movieArr = [];
		Object(upcoming).forEach(function(movie, i) {
			if (movie.poster_path !== null && movieArr.length < num) {
				movieArr.push(movie);
			}
		});
		return movieArr;
	};

	render() {
		return (
			<div className="featured coming-soon">
				<div className="container">
					<div className="featured-title">
						<h2>Coming Soon</h2>
						<LinkContainer to="/coming-soon">
							<Button>View All</Button>
						</LinkContainer>
					</div>

					<div className="show-grid auto-clear">
						{this.movieList(6).map(({ id, title, poster_path }) => (
							<Col xs={4} md={2} key={id}>
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		upcoming: state.comingSoon
	};
};

export default connect(mapStateToProps, { fetchComingSoon })(ComingSoon);
