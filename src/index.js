import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router } from 'react-router-dom';

import './scss/styles.scss';

import Nav from './components/Navigation';
import Home from './components/FrontPage';
import AllFeaturedMovies from './components/AllNewReleases';
import AllComingSoon from './components/AllComingSoon';
import Movie from './components/movie/Movie';
import Footer from './components/Footer';

/* <Route path="/movie/:id/:title" render={(props) => <Movie {...props} key={this.props.location.key} />} /> */

const routing = (
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

ReactDOM.render(routing, document.getElementById('root'));
