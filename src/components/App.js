import React, { Component } from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import ScrollToTop from '../helpers/scrollToTop';

import Nav from './Navigation';
import SearchBar from './SearchBar.js';
import Home from './FrontPage';
import AllFeaturedMovies from './AllNewReleases';
import AllComingSoon from './AllComingSoon';
import Movie from './movie/Movie';
import Person from './person/Person';
import Footer from './Footer';
import Search from './Search';

/* <Route path="/movie/:id/:title" render={(props) => <Movie {...props} key={this.props.location.key} />} /> */

class App extends Component {
	render() {
		return (
			<Router>
				<ScrollToTop>
					<div>
						<Nav />
						<SearchBar />
						<Route exact path="/" component={Home} />
						<Route path="/new-releases" component={AllFeaturedMovies} />
						<Route path="/coming-soon" component={AllComingSoon} />
						<Route
							path="/movie/:id/:title"
							render={(props) => <Movie {...props} key={props.match.params.id || 'empty'} />}
						/>
						<Route
							path="/person/:id/:title"
							render={(props) => <Person {...props} key={props.match.params.id || 'empty'} />}
						/>
						<Route
							path="/search/:query"
							render={(props) => <Search {...props} key={props.match.params.query || 'empty'} />}
						/>
						<Footer />
					</div>
				</ScrollToTop>
			</Router>
		);
	}
}

export default App;
