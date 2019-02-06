import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComingSoon } from '../actions';

import { tidyLink } from '../helpers/movies';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import noImg from '../images/no-image2.png';

class AllComingSoon extends Component {
	componentDidMount() {
		this.props.fetchComingSoon();
	}

	render() {
		const { movies } = this.props;
		document.title = 'ClickItOn: Coming Soon';
		return (
			<div>
				<div className="all-featured">
					<div className="container">
						<h2>Coming Soon</h2>
						<div className="show-grid auto-clear">
							{movies.map(({ id, title, poster_path }) => (
								<Col xs={6} md={3} lg={2} key={id} className="poster-wrap">
									<Link to={`/movie/${id}/${tidyLink(title)}`}>
										<img
											alt={title}
											title={title}
											src={poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : noImg}
										/>
										<p className={poster_path ? 'hidden' : ''}>{title}</p>
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
		movies: state.comingSoon
	};
};

export default connect(mapStateToProps, { fetchComingSoon })(AllComingSoon);
