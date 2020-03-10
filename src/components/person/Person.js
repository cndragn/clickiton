import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { tidyLink, releaseYear } from "../../helpers/movies";
import { Table } from "react-bootstrap";

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      person: [],
      credits: [],
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
              credit.title &&
              credit.release_date
            ) {
              credits.push(credit);
              knownFor.push(credit);
            }
          })
        );
        credits.sort((a, b) => (a.title > b.title ? 1 : -1));
        this.setState({ credits });
        this.setState({ knownFor });
      });
  }

  knownFor() {
    let knownFor = this.state.knownFor;
    let movies = [];
    knownFor.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
    Object(this.state.knownFor).forEach(function(movie, i) {
      if (i < 4) {
        movies.push(movie);
      }
    });
    return movies;
  }

  render(props) {
    let { person, credits } = this.state;
    document.title = `ClickItOn: ${person.name}`;
    console.log(person);
    return (
      <div className="movieWrapper">
        <div className="movie-bg">
          <div className="movie">
            <div className="movie-header">
              <div className="poster">
                <img
                  alt={`${person.name} profile photo`}
                  src={`http://image.tmdb.org/t/p/w342/${person.profile_path}`}
                />
              </div>
              <div className="movie-details">
                <h1>{person.name}</h1>
                <p>
                  born: {person.birthday} died: {person.deathday}
                </p>
                <p>Place of birth: {person.place_of_birth}</p>
                <p>Professional roles: {person.known_for_department}</p>
                <p>{person.biography}</p>
              </div>
            </div>
            <div className="content">
              <div className="container">
                <h2>Known For</h2>
                <div className="recommended">
                  {this.knownFor().map(
                    ({
                      id,
                      character,
                      poster_path,
                      title,
                      release_date,
                      overview
                    }) => (
                      <div className="card" key={id}>
                        <div className="poster">
                          <Link to={`/movie/${id}/${tidyLink(title)}`}>
                            <img
                              src={`http://image.tmdb.org/t/p/w92/${poster_path}`}
                              alt={title}
                              // style={borderStyle}
                            />
                          </Link>
                        </div>
                        <div className="desc">
                          <Link
                            to={`/movie/${id}/${tidyLink(title)}`}
                            //   style={linkStyle}
                          >
                            <h4 className="trans">
                              {title}({releaseYear(release_date)})
                            </h4>
                          </Link>
                          <p>As {character}</p>
                          <p>{overview}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="container">
                <h2>Movie Credits</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Movie Title</th>
                      <th>Release Date</th>
                    </tr>
                  </thead>
                  {credits.map(
                    ({ id, character, original_title, release_date }) => (
                      <tbody>
                        <tr>
                          <td>{character} </td>
                          <td>
                            <Link
                              to={`/movie/${id}/${tidyLink(original_title)}`}
                              //   style={linkStyle}
                            >
                              {original_title}
                            </Link>
                          </td>
                          <td>{release_date}</td>
                        </tr>
                      </tbody>
                    )
                  )}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
