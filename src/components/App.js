import React, { Component } from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';

import Nav from './Navigation';
import Home from './FrontPage';
import AllFeaturedMovies from './AllNewReleases';
import AllComingSoon from './AllComingSoon';
import Movie from './movie/Movie';
import Footer from './Footer';

/* <Route path="/movie/:id/:title" render={(props) => <Movie {...props} key={this.props.location.key} />} /> */

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Nav />
					<Route exact path="/" component={Home} />
					<Route path="/new-releases" component={AllFeaturedMovies} />
					<Route path="/coming-soon" component={AllComingSoon} />
					<Route path="/movie/:id/:title" render={(props) => <Movie {...props} key="id" />} />
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
