import React, { Component } from 'react';
import axios from 'axios';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

// https://getflywheel.com/layout/flexbox-create-modern-card-design-layout/

class Videos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recommend: [],
			id: this.props.id
		};
	}

	componentDidMount() {
		const { id } = this.props.id;
		axios
			.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
			.then((res) => {
				const release = res.data.results;
				this.setState({ recommend: release });
			});
	}

	selectMovies() {
		let movies = [];
		Object(this.state.recommend).forEach(function(movie, i) {
			if (movie.poster_path && i < 4) {
				movies.push(movie);
			}
		});
		return movies;
	}

	render() {
		return (
			<div>
				<h2>Similar Movies</h2>
				<div className="recommended">
					{this.selectMovies().map(({ id, title, poster_path, overview }) => (
						<div className="card" key={id}>
							<div className="poster">
								<img src={`http://image.tmdb.org/t/p/w92/${poster_path}`} alt={title} />
							</div>
							<div className="desc">
								<h4>{title}</h4>
								<p>{overview}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Videos;
