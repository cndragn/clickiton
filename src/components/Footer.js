import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<div className="container">
					<div className="links">
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/new-releases">New Releases</Link>
							</li>
							<li>
								<Link to="/coming-soon">Coming Soon</Link>
							</li>
						</ul>
					</div>
					<div className="credits">
						<p>
							ClickItOn
							<br />
							&copy;{new Date().getFullYear()}{' '}
							<a href="http://www.CandiceDavidson.com">Candice Davidson</a>
						</p>
						<p>
							Attributions:<br />The Movie Database API, News API, Pexels
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
