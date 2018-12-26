import React, { Component } from 'react';
import FeaturedMovies from './frontpage/FeaturedMovies';
import ComingSoon from './frontpage/ComingSoon';
import News from './frontpage/News';

// https://developers.themoviedb.org/3/movies/get-upcoming
// coming soon, include region

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
