import React, { Component } from 'react';
import FeaturedMovies from './frontpage/NewReleases';
import ComingSoon from './frontpage/ComingSoon';
import News from './frontpage/News';

class FrontPage extends Component {
	render() {
		document.title = 'ClickItOn - Entertainment Hub';
		return (
			<div>
				<FeaturedMovies />
				<ComingSoon />
				<News />
			</div>
		);
	}
}

export default FrontPage;
