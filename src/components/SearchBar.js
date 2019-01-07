import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { titleLink } from '../helpers/movies';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.history.push(`/search/${titleLink(this.state.value)}`);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}
	render() {
		console.log(this.state.value);
		return (
			<div className="searchbar">
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
						placeholder="Search movie title..."
					/>
				</form>
			</div>
		);
	}
}

export default withRouter(SearchBar);
