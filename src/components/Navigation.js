import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
	render() {
		return (
			<div>
				<Navbar inverse collapseOnSelect fixedTop>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">ClickItOn</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<LinkContainer exact to="/">
								<NavItem eventKey={1}>Home</NavItem>
							</LinkContainer>
							<LinkContainer to="/new-releases">
								<NavItem eventKey={2}>New Releases</NavItem>
							</LinkContainer>
							<LinkContainer to="/coming-soon">
								<NavItem eventKey={3}>Coming Soon</NavItem>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default Navigation;
