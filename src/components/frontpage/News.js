import React from "react";
import { connect } from "react-redux";
import { fetchNews } from "../../actions";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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
    return str.length > length ? str.substring(0, length - 3) + "..." : str;
  }

  render() {
    return (
      <div className="container">
        <div className="news-title">
          <h2>News</h2>
          <LinkContainer to="/news">
            <Button>View More</Button>
          </LinkContainer>
        </div>

        <div className="news-wrapper">
          {this.newsLimit().map(
            ({ title, description, source, url, urlToImage }, id) => (
              <div className="card media">
                <div className="media-left">
                  <img className="media-object" alt={title} src={urlToImage} />
                </div>
                <div className="media-body">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <h4 className="media-heading">
                      {title.replace(/<.*?>/gm, "")}
                    </h4>
                  </a>
                  <p>{source.name}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { articles: state.articles };
};

export default connect(mapStateToProps, { fetchNews })(News);
