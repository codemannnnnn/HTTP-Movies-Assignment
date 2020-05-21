import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialValue = {
  title: "",
  director: "",
  metascore: "",
};

export default function MovieForm(props) {
  const history = useHistory();
  const [movie, setMovie] = useState(initialValue);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        // console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChanges = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => {
        // console.log(res);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="movie-form-box">
      <div className="movie-feorm">
        <form onSubmit={handleSubmit}>
          <h1>Movie Form</h1>

          <label>Title </label>
          <input
            type="text"
            name="title"
            onChange={handleChanges}
            value={movie.title}
          />
          <br />
          <br />

          <label>Director </label>
          <input
            type="text"
            name="director"
            onChange={handleChanges}
            value={movie.director}
          />
          <br />
          <br />

          <label>Metascore </label>
          <input
            type="text"
            name="metascore"
            onChange={handleChanges}
            value={movie.metascore}
          />
          <br />
          <br />

          <button>Add Movie</button>
        </form>
      </div>
    </div>
  );
}
