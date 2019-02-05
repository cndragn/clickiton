import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNowPlaying } from '../../actions';

import { movieList, titleLink } from '../../helpers/movies';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class NewReleases extends Component {
	constructor(props) {
		super(props);
		this.movieList = movieList.bind(this);
	}

	componentDidMount() {
		this.props.fetchNowPlaying();
	}

	render() {
		console.log(this.props.movies);
		return (
			<div
				className="featured-bg"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.props.backdrop})`
				}}
			>
				<div className="featured">
					<div className="container">
						<div className="featured-title">
							<h2>New Releases</h2>
							<LinkContainer to={{ pathname: '/new-releases', state: { movies: this.props.movies } }}>
								<Button>View All</Button>
							</LinkContainer>
						</div>

						<div className="show-grid auto-clear" />
						{this.movieList(this, 6).map(({ id, title, poster_path }) => (
							<Col xs={4} md={2} key={id}>
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
		);
	}
}

const mapStateToProps = (state) => {
	return { movies: state.nowPlaying };
};

export default connect(mapStateToProps, { fetchNowPlaying })(NewReleases);
