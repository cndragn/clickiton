import React, { Component } from 'react';
import axios from 'axios';
import { fetchFeatured, fetchComingSoon } from '../helpers/movies';

import NewReleases from './frontpage/NewReleases';
import ComingSoon from './frontpage/ComingSoon';
import News from './frontpage/News';

class FrontPage extends Component {
	state = {
		featured: [],
		featuredBg: '',
		comingSoon: []
	};

	componentDidMount() {
		axios.get(fetchFeatured()).then((res) => {
			const movies = res.data.results;
			const backdrop = res.data.results[0].backdrop_path;
			this.setState({ featured: movies });
			this.setState({ featuredBg: backdrop });
		});
		axios.get(fetchComingSoon()).then((res) => {
			const movies = res.data.results;
			this.setState({ comingSoon: movies });
		});
	}

	render() {
		const { featured, featuredBg, comingSoon } = this.state;

		document.title = 'ClickItOn - Entertainment Hub';
		return (
			<div>
				<NewReleases movies={featured} backdrop={featuredBg} />
				<ComingSoon movies={comingSoon} />
				<News />
			</div>
		);
	}
}

export default FrontPage;
