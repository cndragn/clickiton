import React, { Component } from 'react';
import axios from 'axios';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

// https://developers.themoviedb.org/3/movies/get-movie-recommendations
// recommeded movies

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
			.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
			.then((res) => {
				const release = res.data.results;
				this.setState({ recommend: release });
			});
	}

	render() {
		return (
			<div>
				<h2>Recommended</h2>
				<div className="show-grid auto-clear">
					{this.state.recommend.map(({ id, title, poster_path, overview }) => <p key={id}>{title}</p>)}
				</div>
			</div>
		);
	}
}

export default Videos;
