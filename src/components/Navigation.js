import React from 'react';

class Navigation extends React.Component {
	render() {
		return (
			<div>
				<nav className="grey darken-4">
					<div className="nav-wrapper">
						<a href="#!" className="brand-logo">
							ClickItOn
						</a>
						<a href="#" data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>
						<ul className="right hide-on-med-and-down">
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
				</nav>

				<ul className="sidenav" id="mobile-demo">
					<li>
						<a href="sass.html">Sass</a>
					</li>
					<li>
						<a href="badges.html">Components</a>
					</li>
					<li>
						<a href="collapsible.html">Javascript</a>
					</li>
					<li>
						<a href="mobile.html">Mobile</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default Navigation;
