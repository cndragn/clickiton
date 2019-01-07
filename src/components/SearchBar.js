import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { titleLink } from '../helpers/movies';
import { Glyphicon } from 'react-bootstrap';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClear = this.handleClear.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.value !== '') {
			this.props.history.push(`/search/${titleLink(this.state.value)}`);
		}
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleClear(event) {
		this.setState({ value: '' });
	}
	render() {
		console.log(this.state.value);
		return (
			<div className="searchbar">
				<form onSubmit={this.handleSubmit}>
					<Glyphicon glyph="search" onClick={this.handleSubmit} />
					<input
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
						placeholder="Search movie title..."
					/>
					<Glyphicon glyph="remove" onClick={this.handleClear} />
				</form>
			</div>
		);
	}
}

export default withRouter(SearchBar);