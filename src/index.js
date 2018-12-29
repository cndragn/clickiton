import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './scss/styles.scss';

import Nav from './components/Navigation';
import Home from './components/FrontPage';
import AllFeaturedMovies from './components/AllNewReleases';
import AllComingSoon from './components/AllComingSoon';
import Movie from './components/movie/Movie';
import Footer from './components/Footer';

const routing = (
	<Router>
		<div>
			<Nav />
			<Route exact path="/" component={Home} />
			<Route path="/new-releases" component={AllFeaturedMovies} />
			<Route path="/coming-soon" component={AllComingSoon} />
			<Route path="/movie/:id/:title" exact component={Movie} />
			<Footer />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));
