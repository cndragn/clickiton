import React, { Component } from "react";
import axios from "axios";

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      person: [],
      credits: [],
      movies: [],
      knownFor: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ id });
    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
      )
      .then(res => {
        const person = res.data;
        this.setState({ person });
      });

    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
      )
      .then(res => {
        const creditData = res.data.cast;
        let credits = [];
        let knownFor = [];
        Object(
          creditData.forEach(function(credit, i) {
            if (
              credit.character &&
              credit.poster_path &&
              credit.original_title &&
              credit.release_date
            ) {
              credits.push(credit);
              knownFor.push(credit);
            }
          })
        );

        credits.sort((a, b) => (a.original_title > b.original_title ? 1 : -1));
        this.setState({ credits });
      });
  }

  knownFor() {
    let credits = this.state.credits;
    let movies = [];
    credits.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
    Object(this.state.credits).forEach(function(movie, i) {
      if (i < 4) {
        movies.push(movie);
      }
    });
    return movies;
  }

  render(props) {
    let { person, credits } = this.state;
    document.title = `ClickItOn: ${person.name}`;

    return (
      <div className="movieWrapper">
        <div className="movie-bg">
          <div className="movie">
            <div className="header">
              <p>Name: {person.name}</p>
              <p>birthday: {person.birthday}</p>
              <p>Place of birth: {person.place_of_birth}</p>
              <p>Profile pic path: {person.profile_path}</p>
              <p>Bio: {person.biography}</p>
            </div>
            <div className="content">
              <div className="container">
                <h1>Known For</h1>
                {this.knownFor().map(
                  ({
                    character,
                    poster_path,
                    original_title,
                    release_date
                  }) => (
                    <p>
                      {character}, {poster_path}, {original_title},{" "}
                      {release_date}
                    </p>
                  )
                )}
              </div>
              <div className="container">
                <h1>Movie Credits</h1>
                {credits.map(
                  ({
                    character,
                    poster_path,
                    original_title,
                    release_date
                  }) => (
                    <p>
                      {character}, {poster_path}, {original_title},{" "}
                      {release_date}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
