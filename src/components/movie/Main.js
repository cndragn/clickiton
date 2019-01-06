import React, { Component } from 'react';
import Videos from './Videos';
import Cast from './Cast';
import Recommended from './Recommended';

class Main extends Component {
	render() {
		const id = this.props.id;
		return (
			<div className="main">
				<Videos id={id} color={this.props.color} />
				<Cast id={id} color={this.props.color} />
				<Recommended id={id} color={this.props.color} />
			</div>
		);
	}
}

export default Main;
