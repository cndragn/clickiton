import React, { Component } from 'react';
import FeaturedMovies from './FeaturedMovies';
import News from './News';

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
