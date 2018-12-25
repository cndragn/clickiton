import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './scss/styles.scss';

import Nav from './components/Navigation';
import Home from './components/FrontPage';
import AllFeaturedMovies from './components/movies/AllFeaturedMovies';
import AllComingSoon from './components/movies/AllComingSoon';
import Movie from './components/movies/Movie';

const routing = (
	<Router>
		<div>
			<Nav />
			<Route exact path="/" component={Home} />
			<Route path="/featured-movies" component={AllFeaturedMovies} />
			<Route path="/coming-soon" component={AllComingSoon} />
			<Route path="/movie/:id/:title" exact component={Movie} />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));
