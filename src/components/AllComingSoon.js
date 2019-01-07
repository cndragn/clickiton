import React, { Component } from 'react';
import axios from 'axios';
import { fetchComingSoon, titleLink } from '../helpers/movies';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import noImg from '../images/no-image2.png';

class AllComingSoon extends Component {
	state = {
		movies: []
	};

	componentDidMount() {
		axios.get(fetchComingSoon()).then((res) => {
			const movies = res.data.results;
			this.setState({ movies });
		});
	}

	render() {
		const movies = this.state.movies;
		document.title = 'ClickItOn: Coming Soon';
		return (
			<div>
				<div className="all-featured">
					<div className="container">
						<h2>Coming Soon</h2>
						<div className="show-grid auto-clear">
							{movies.map(({ id, title, poster_path }) => (
								<Col xs={6} md={3} lg={2} key={id} className="poster-wrap">
									<Link to={`/movie/${id}/${titleLink(title)}`}>
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

export default AllComingSoon;
