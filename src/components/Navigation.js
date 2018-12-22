import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
	render() {
		return (
			<div>
				<nav className="grey darken-4">
					<div className="container nav-wrapper">
						<a href="#!" className="brand-logo">
							ClickItOn
						</a>
						<a href="http://#" data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>
						<ul className="right hide-on-med-and-down">
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/featured-movies">In Theaters Now</Link>
							</li>
							<li>
								<a href="three.html">Three</a>
							</li>
						</ul>
					</div>
				</nav>

				<ul className="sidenav" id="mobile-demo">
					<li>
						<a href="one.html">One</a>
					</li>
					<li>
						<a href="two.html">Two</a>
					</li>
					<li>
						<a href="three.html">Three</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default Navigation;
