import React, { Component } from 'react';
import FeaturedMovies from './frontpage/FeaturedMovies';
import News from './frontpage/News';

// https://developers.themoviedb.org/3/movies/get-upcoming
// coming soon, include region

class FrontPage extends Component {
	render() {
		return (
			<div>
				<FeaturedMovies />
				<News />
			</div>
		);
	}
}

export default FrontPage;
