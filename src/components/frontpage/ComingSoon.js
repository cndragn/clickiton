import React, { Component } from 'react';
import { movieList, titleLink } from '../../helpers/movies';
import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class ComingSoon extends Component {
	constructor(props) {
		super(props);
		this.movieList = movieList.bind(this);
	}

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
						{movieList(this, 6).map(({ id, title, poster_path }) => (
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

export default ComingSoon;
