import React from 'react';
import axios from 'axios';

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
		var length = 120;
		return str.length > length ? str.substring(0, length - 3) + '...' : str;
	}

	render() {
		return (
			<div className="container">
				<h2>News</h2>
				<div className="news">
					{this.newsLimit().map(({ title, urlToImage, description }) => (
						<div className="article" key={title}>
							<h3 className="header">{title.replace(/<.*?>/gm, '')}</h3>
							<div className="details">
								<div className="image">
									<img alt={title} src={urlToImage} />
								</div>
								<p>
									{this.shorten(description)}
									<br />READ ARTICLE
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default News;
