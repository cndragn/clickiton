import React, { Component } from 'react';
import axios from 'axios';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

// https://www.npmjs.com/package/react-multimedia-gallery

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

	render() {
		return (
			<div>
				<h2>Videos</h2>
				<div className="show-grid auto-clear">
					{this.state.videos.map(({ id, name }) => (
						<p key={id}>
							{id}, {name}
						</p>
					))}
				</div>
			</div>
		);
	}
}

export default Videos;
