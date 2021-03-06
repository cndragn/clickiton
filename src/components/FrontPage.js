import React, { Component } from 'react';

import NewReleases from './frontpage/NewReleases';
import ComingSoon from './frontpage/ComingSoon';
import News from './frontpage/News';

class FrontPage extends Component {
	render() {
		document.title = 'ClickItOn - Entertainment Hub';
		return (
			<div>
				<NewReleases />
				<ComingSoon />
				<News />
			</div>
		);
	}
}

export default FrontPage;
