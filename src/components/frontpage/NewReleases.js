import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNewReleases } from "../../actions";

import { tidyLink } from "../../helpers/movies";
import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

class NewReleases extends Component {
  componentDidMount() {
    this.props.fetchNewReleases();
  }

  movieList = num => {
    const { movies } = this.props;
    let movieArr = [];
    let backdrop = "";
    movies.sort(function() {
      return 0.5 - Math.random();
    });
    Object(movies).forEach(function(movie, i) {
      if (i === 0) {
        backdrop = movie.backdrop_path;
      }
      if (movie.poster_path !== null && movieArr.length < num) {
        movieArr.push(movie);
      }
    });
    movieArr.unshift(backdrop);
    return movieArr;
  };

  render() {
    let movies = this.movieList(6);
    let backdropImg = `https://image.tmdb.org/t/p/original/${movies[0]}`;
    console.log(backdropImg);
    return (
      <div
        className="featured-bg"
        style={{
          backgroundImage: `url(${backdropImg})`
        }}
      >
        <div className="featured">
          <div className="container">
            <div className="featured-title">
              <h2>New Releases</h2>
              <LinkContainer to="/new-releases">
                <Button>View All</Button>
              </LinkContainer>
            </div>

            <div className="show-grid auto-clear" />
            {movies.slice(1).map(({ id, title, poster_path }) => (
              <Col xs={4} md={2} key={id}>
                <Link to={`/movie/${id}/${tidyLink(title)}`}>
                  <img
                    alt={title}
                    title={title}
                    src={`https://image.tmdb.org/t/p/w342${poster_path}`}
                  />
                </Link>
              </Col>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.newReleases,
    backdrop: state.backdrop
  };
};

export default connect(mapStateToProps, { fetchNewReleases })(NewReleases);
