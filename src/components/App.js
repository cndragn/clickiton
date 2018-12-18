import React, { Component } from 'react';
import FrontPage from '../components/frontpage/FrontPage';

import '../scss/App.scss';

class App extends Component {
	render() {
		return (
			<div>
				<h1>Click It On</h1>
				<FrontPage />
			</div>
		);
	}
}

export default App;
