import React from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../../actions';

import { Col } from 'react-bootstrap';

class News extends React.Component {
	componentDidMount() {
		this.props.fetchNews();
	}

	newsLimit() {
		const { articles } = this.props;

		let news = [];
		Object(articles).forEach(function(article, i) {
			if (i < 4) {
				news.push(article);
			}
		});
		return news;
	}

	shorten(str) {
		var length = 90;
		return str.length > length ? str.substring(0, length - 3) + '...' : str;
	}

	render() {
		return (
			<div className="container">
				<h2>News</h2>
				<div className="show-grid auto-clear">
					{this.newsLimit().map(({ id, title, urlToImage }) => (
						<Col xs={12} md={6} key={title}>
							<div className="media">
								<div className="media-left">
									<img className="media-object" alt={title} src={urlToImage} />
								</div>
								<div className="media-body">
									<h4 className="media-heading">{title.replace(/<.*?>/gm, '')}</h4>
									<p>
										<br />READ ARTICLE
									</p>
								</div>
							</div>
						</Col>
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { articles: state.articles };
};

export default connect(mapStateToProps, { fetchNews })(News);
