import React, { Component } from 'react';
import Nav from './Navigation';
import FrontPage from '../components/frontpage/FrontPage';

import '../scss/styles.scss';

class App extends Component {
	render() {
		return (
			<div>
				<Nav />
				<FrontPage />
			</div>
		);
	}
}

export default App;
