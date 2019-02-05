import React, { Component } from 'react';
import axios from 'axios';
import { fetchComingSoon } from '../helpers/movies';

import NewReleases from './frontpage/NewReleases';
import ComingSoon from './frontpage/ComingSoon';
import News from './frontpage/News';

class FrontPage extends Component {
	state = {
		comingSoon: []
	};

	componentDidMount() {
		axios.get(fetchComingSoon()).then((res) => {
			const movies = res.data.results;
			this.setState({ comingSoon: movies });
		});
	}

	render() {
		const { comingSoon } = this.state;

		document.title = 'ClickItOn - Entertainment Hub';
		return (
			<div>
				<NewReleases />
				<ComingSoon movies={comingSoon} />
				<News />
			</div>
		);
	}
}

export default FrontPage;
