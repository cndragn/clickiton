import React, { Component } from 'react';
import Videos from './Videos';
import Cast from './Cast';
import Recommended from './Recommended';

class Main extends Component {
	render() {
		const id = this.props.id;
		return (
			<div className="main">
				<Videos id={id} />
				<Cast id={id} />
				<Recommended id={id} />
			</div>
		);
	}
}

export default Main;
