import React, { Component } from "react";
import axios from "axios";
import blankProfilePic from "../../images/blank-profile.jpg";
import { Link } from "react-router-dom";
import { tidyLink } from "../../helpers/movies";

const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

class Cast extends Component {
  state = {
    cast: []
  };

  componentDidMount() {
    const { id } = this.props.id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      )
      .then(res => {
        const release = res.data;
        this.setState({ cast: release.cast });
      });
  }

  topCast() {
    let cast = [];
    Object(this.state.cast).forEach(function(person, i) {
      if (i < 6) {
        cast.push(person);
      }
    });
    return cast;
  }

  profilePic(profile_path, name) {
    if (profile_path) {
      return (
        <img
          src={`http://image.tmdb.org/t/p/w185/${profile_path}`}
          alt={name}
        />
      );
    } else {
      return <img src={blankProfilePic} alt={name} />;
    }
  }

  render() {
    return (
      <div className="cast-crew">
        {this.topCast().length > 0 ? <h2>Cast!</h2> : ""}
        <div className="cast">
          <div className="cards">
            {this.topCast().map(
              ({ cast_id, id, name, character, profile_path }) => (
                <div className="card" key={cast_id}>
                  <Link to={`/person/${id}/${tidyLink(name)}`}>
                    {this.profilePic(profile_path, name)}
                    <p>{name}</p>
                    <p>{character}</p>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Cast;
