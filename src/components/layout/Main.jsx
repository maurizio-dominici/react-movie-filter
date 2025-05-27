// IMPORTS
import { useState, useEffect } from "react";

export default function Main() {
  // array di partenza
  const initialMovies = [
    { title: "Inception", genre: "Fantascienza" },
    { title: "Il Padrino", genre: "Thriller" },
    { title: "Titanic", genre: "Romantico" },
    { title: "Batman", genre: "Azione" },
    { title: "Interstellar", genre: "Fantascienza" },
    { title: "Pulp Fiction", genre: "Thriller" },
  ];

  return (
    <main>
      <div className="movie-list">
        <h1>Lista Flim</h1>

        <div>
          <label>Filtra per genere: </label>
        </div>
      </div>
    </main>
  );
}
