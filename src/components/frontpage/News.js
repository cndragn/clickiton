import React from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';

const API_KEY = `${process.env.REACT_APP_NEWS_API_KEY}`;

class News extends React.Component {
	state = {
		news: []
	};

	componentDidMount() {
		axios.get(`https://newsapi.org/v2/everything?q=movie+film+actor+actress&apiKey=${API_KEY}`).then((res) => {
			const news = res.data.articles;
			this.setState({ news });
		});
	}

	newsLimit() {
		let news = [];
		Object(this.state.news).forEach(function(article, i) {
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

export default News;
