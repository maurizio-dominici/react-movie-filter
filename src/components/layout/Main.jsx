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

  // Stato che contiene tutti i film (compresi quelli aggiunti successivamente)
  const [movies, setMovies] = useState(initialMovies);

  // Stato che contiene solo i film filtrati da mostrare a schermo
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);

  // Stato per il filtro selezionato (genere)
  const [selectedGenre, setSelectedGenre] = useState("");

  // Stati per la gestione del form di aggiunta (titolo e genere del nuovo film)
  const [newTitle, setNewTitle] = useState("");
  const [newGenre, setNewGenre] = useState("");

  // Effetto che aggiorna la lista dei film filtrati ogni volta che cambiano i filtri o la lista
  useEffect(() => {
    let result = movies;

    // Filtra per genere se è stato selezionato
    if (selectedGenre) {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    setFilteredMovies(result);
  }, [selectedGenre, movies]);

  // Deep copy dell'array principale
  const uniqueGenres = [];
  for (const movie of movies) {
    if (!uniqueGenres.includes(movie.genre)) {
      uniqueGenres.push(movie.genre);
    }
  }
  console.log(initialMovies);

  return (
    <main>
      <div className="container py-4">
        <h1 className="mb-4">Lista Film</h1>

        {/*  Select con la lista dei generi  */}
        <div className="mb-4">
          <label htmlFor="select-gen" className="form-label">
            Filtra per genere:
          </label>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="form-select mb-2"
            id="select-gen"
          >
            {/* Lista dei generi disponibili nelle option  */}
            <option value="">Tutti</option>
            {uniqueGenres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Lista di tutti i titoli presenti */}
        <ul className="list-group mb-4">
          {filteredMovies.map((movie, index) => (
            <li key={index} className="list-group-item">
              <strong>{movie.title}</strong> - {movie.genre}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
