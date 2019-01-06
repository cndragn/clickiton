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
			if (i < 2) {
				movieArr.push(movie);
			}
		});
		return movieArr;
	}

	render() {
		return (
			<div>
				{this.selectVids().length > 0 ? <h2>Trailers</h2> : ''}
				<div className="vids">
					{this.selectVids().map(({ key }) => <Trailer key={key} id={key} color={this.props.color} />)}
				</div>
			</div>
		);
	}
}

export default Videos;
