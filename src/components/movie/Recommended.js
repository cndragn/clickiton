import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { tidyLink } from "../../helpers/movies";
import { releaseYear } from "../../helpers/movies";

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Recommended extends Component {
  state = {
    recommend: [],
    id: this.props.id
  };

  componentDidMount() {
    const { id } = this.props.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(res => {
        const release = res.data.results;
        this.setState({ recommend: release });
      });
  }

  selectMovies() {
    let movies = [];
    Object(this.state.recommend).forEach(function(movie, i) {
      if (movie.poster_path && i < 4) {
        movies.push(movie);
      }
    });
    return movies;
  }

  render() {
    const linkStyle = {
      color: this.props.color
    };
    const borderStyle = {
      color: this.props.color
    };
    return (
      <div>
        {this.selectMovies().length > 0 ? <h2>Similar Movies</h2> : ""}
        <div className="recommended">
          {this.selectMovies().map(
            ({ id, title, poster_path, overview, release_date }) => (
              <div className="card" key={id}>
                <div className="poster">
                  <Link to={`/movie/${id}/${tidyLink(title)}`}>
                    <img
                      src={`http://image.tmdb.org/t/p/w92/${poster_path}`}
                      alt={title}
                      style={borderStyle}
                    />
                  </Link>
                </div>
                <div className="desc">
                  <Link
                    to={`/movie/${id}/${tidyLink(title)}`}
                    style={linkStyle}
                  >
                    <h4 className="trans">
                      {title}({releaseYear(release_date)})
                    </h4>
                  </Link>
                  <p>{overview}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default Recommended;
