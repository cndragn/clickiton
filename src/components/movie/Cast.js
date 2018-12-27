import React, { Component } from 'react';
import axios from 'axios';
const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

// https://react-bootstrap.github.io/components/panel/

class Videos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			cast: [],
			crew: [],
			id: this.props.id
		};
	}

	componentDidMount() {
		const { id } = this.props.id;
		axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`).then((res) => {
			const release = res.data;
			this.setState({ cast: release.cast });
			this.setState({ crew: release.crew });
		});
	}

	render() {
		return (
			<div>
				<h2>Cast</h2>
				<div className="show-grid auto-clear" />
				{this.state.cast.map(({ id, name, character, profile_path }) => <p key={id}>{name}</p>)}
				<h3>Director / Screenplay</h3>
				{this.state.crew.map(({ id, name, job }) => (
					<p key={id}>
						{name} - {job}
					</p>
				))}
			</div>
		);
	}
}

export default Videos;
