import React, { Component } from 'react';
import Lightbox from 'lightbox-react';

// http://jsfiddle.net/8XYNx/10/

class Trailer extends Component {
	state = {
		isOpen: false
	};

	Youtube = () => [
		<iframe
			title="trailer"
			width="560"
			height="315"
			src={`https://www.youtube.com/embed/${this.props.id}?autoplay=1`}
			allowFullScreen
			style={{
				maxWidth: '97%',
				position: 'absolute',
				left: 0,
				right: 0,
				margin: 'auto',
				top: '50%',
				transform: 'translateY(-50%)'
			}}
		/>
	];

	render() {
		const { isOpen } = this.state;
		return (
			<div className="trailers">
				<div className="img-box">
					<img
						alt="stuff"
						src={`https://img.youtube.com/vi/${this.props.id}/0.jpg`}
						onClick={() => this.setState({ isOpen: true })}
					/>
				</div>

				{isOpen && <Lightbox mainSrc={this.Youtube} onCloseRequest={() => this.setState({ isOpen: false })} />}
			</div>
		);
	}
}

export default Trailer;
