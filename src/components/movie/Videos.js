import React, { Component } from 'react';
import axios from 'axios';
import 'lightbox-react/style.css';
import Trailer from './Trailer';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Videos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			id: this.props.id
		};
	}

	componentDidMount() {
		const { id } = this.props.id;
		axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
			const release = res.data.results;
			this.setState({ videos: release });
		});
	}

	selectVids() {
		let movieArr = [];
		Object(this.state.videos).forEach(function(movie, i) {
			if (i < 3) {
				movieArr.push(movie);
			}
		});
		return movieArr;
	}

	render() {
		return (
			<div>
				<h2>Videos</h2>
				<div className="show-grid auto-clear">
					{this.selectVids().map(({ key, name }) => <Trailer key={key} id={key} />)}
				</div>
			</div>
		);
	}
}

export default Videos;
