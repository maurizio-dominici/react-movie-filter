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

  // Stato per il termine di ricerca (titolo del film)
  const [searchTerm, setSearchTerm] = useState("");

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

    // Filtra per termine di ricerca nel titolo
    if (searchTerm) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(result);
  }, [selectedGenre, searchTerm, movies]);

  // Controllo sull'aggiunta di un titolo e genere (necessari entrambi)
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!newTitle || !newGenre) return;
    const newMovie = { title: newTitle, genre: newGenre };
    setMovies((prev) => [...prev, newMovie]);
    setNewTitle("");
    setNewGenre("");
  };

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

          {/* Input per cercare il titolo del film utilizzando (e.target.value) */}
          <input
            type="text"
            placeholder="Cerca per titolo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>

        {/* Lista di tutti i titoli presenti */}
        <ul className="list-group mb-4">
          {filteredMovies.map((movie, index) => (
            <li key={index} className="list-group-item">
              <strong>{movie.title}</strong> - {movie.genre}
            </li>
          ))}
        </ul>

        {/* Form per aggiungere un nuovo film con i controlli (handleAddMovie) */}
        <h2>Aggiungi un nuovo film</h2>
        <form onSubmit={handleAddMovie} className="row g-2">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Titolo"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Genere"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Bottone per l'invio del form */}
          <div className="col-12">
            <button className="btn btn-primary mt-2" type="submit">
              Aggiungi
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
