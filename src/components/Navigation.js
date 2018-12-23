import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
	render() {
		return (
			<div>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#brand">ClickItOn</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<LinkContainer exact to="/">
								<NavItem eventKey={1}>Home</NavItem>
							</LinkContainer>
							<LinkContainer to="/featured-movies">
								<NavItem eventKey={2} href="#">
									In Theaters Now
								</NavItem>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default Navigation;
