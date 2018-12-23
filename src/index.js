import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './scss/styles.scss';

import Nav from './components/Navigation';
import Home from './components/frontpage/FrontPage';
import AllFeaturedMovies from './components/movies/AllFeaturedMovies';
import Movie from './components/movies/Movie';

const routing = (
	<Router>
		<div>
			<Nav />
			<Route exact path="/" component={Home} />
			<Route path="/featured-movies" component={AllFeaturedMovies} />
			<Route path="/movie/:id" exact component={Movie} />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));
