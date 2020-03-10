import React, { Component } from "react";
import { runtime, releaseYear } from "../../helpers/movies";
import axios from "axios";

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class MovieHeader extends Component {
  state = {
    movieRating: "",
    releaseDate: "",
    crew: [],
    id: this.props.id
  };

  componentDidMount() {
    const { id } = this.state.id;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      )
      .then(res => {
        const release = res.data;
        this.setState({ crew: release.crew });
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
      )
      .then(res => {
        const release = res.data.results;
        release.map(item => {
          if (item.iso_3166_1 === "US" && this.state.release !== null) {
            this.setState({ releaseDate: item.release_dates[0].release_date });
            this.setState({ movieRating: item.release_dates[0].certification });
          }
          return 0;
        });
      });
  }

  rating(value) {
    if (value) {
      return this.state.movieRating;
    }
    return "Not Rated";
  }

  director() {
    let cast = [];
    Object(this.state.crew).forEach(function(person, i) {
      if (person.job === "Director") {
        cast.push(person);
      }
    });
    return cast;
  }

  writer() {
    let cast = [];
    Object(this.state.crew).forEach(function(person, i) {
      if (person.job === "Screenplay") {
        cast.push(person);
      }
    });
    return cast;
  }

  poster() {
    const { movie } = this.props;
    if (movie.poster_path) {
      return (
        <div className="poster">
          <img
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          />
        </div>
      );
    }
  }

  render() {
    const { movie } = this.props;
    const genres = movie.genres;

    return (
      <div className="movie-header">
        {this.poster()}
        <div className="movie-details">
          <h1>
            {movie.title} ({releaseYear(this.state.releaseDate)})
          </h1>
          <div className="stats">
            <p>
              {this.rating(this.state.movieRating)} | {runtime(movie.runtime)}
              <br />
              {genres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index < genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>
              Director:{" "}
              {this.director().map((person, index) => (
                <span key={person.credit_id}>
                  {person.name}
                  {index < this.director().length - 1 ? ", " : ""}
                </span>
              ))}
              <br />
              Screenplay:{" "}
              {this.writer().map((person, index) => (
                <span key={person.credit_id}>
                  {person.name} {index < this.writer().length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <div className="description">{movie.overview}</div>
        </div>
      </div>
    );
  }
}

export default MovieHeader;
