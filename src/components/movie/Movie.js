import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovie } from "../../actions";

import { ColorExtractor } from "react-color-extractor";
import MovieHeader from "./MovieHeader";
import Main from "./Main";
import movieImg from "../../images/blank-backdrop.jpg";

class Movie extends Component {
  state = {
    colors: [],
    id: this.props.match.params
  };

  componentDidMount() {
    const { id } = this.state.id;
    this.props.fetchMovie(id, movieImg);
    console.log(movieImg);
  }

  displayHdr(movie, backdrop) {
    if (backdrop && movie.poster_path) {
      return <MovieHeader id={this.state.id} movie={movie} />;
    }
  }

  getColors = colors =>
    this.setState(state => ({ colors: [...state.colors, ...colors] }));

  render() {
    const { movie, backdrop } = this.props;
    console.log(backdrop);
    const accent = this.state.colors[0];
    console.log(movie.poster_path);
    return (
      <div
        className="movieWrapper"
        style={{
          backgroundImage: `url(${backdrop})`
        }}
      >
        <ColorExtractor getColors={colors => this.setState({ colors: colors })}>
          <img
            className="hidden"
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          />
        </ColorExtractor>
        <div className="movie-bg">
          <div className="movie">
            {this.displayHdr(movie, backdrop)}
            <div
              className="content"
              style={{
                borderColor: accent
              }}
            >
              <div className="container">
                <Main id={this.state.id} color={accent} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movie,
    backdrop: state.backdrop
  };
};
export default connect(mapStateToProps, { fetchMovie })(Movie);
