import React, { Component } from 'react';
import axios from 'axios';
import ModalVideo from 'react-modal-video';
import { Glyphicon } from 'react-bootstrap';

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Videos extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			trailer: '',
			id: this.props.id,
			isOpen: false
		};
		this.openModal = this.openModal.bind(this);
	}

	componentDidMount() {
		const { id } = this.props.id;
		axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
			const trailer = res.data.results;
			this.setState({ trailer });
		});
	}

	openModal() {
		this.setState({ isOpen: true });
	}

	render() {
		const { trailer } = this.state;
		return (
			<div>
				{trailer.length > 0 ? (
					<div>
						<h2>Trailer</h2>
						<div className="vids">
							<div className="trailer">
								<ModalVideo
									channel="youtube"
									isOpen={this.state.isOpen}
									videoId={trailer[0].key}
									onClose={() => this.setState({ isOpen: false })}
									autoplay={1}
								/>
								<div className="img-box">
									<img
										alt="stuff"
										src={`https://img.youtube.com/vi/${trailer[0].key}/0.jpg`}
										onClick={this.openModal}
									/>
								</div>
								<Glyphicon
									glyph="play-circle"
									style={{ color: this.props.color }}
									onClick={() => this.setState({ isOpen: true })}
								/>
							</div>
						</div>
					</div>
				) : (
					''
				)}
			</div>
		);
	}
}

export default Videos;
