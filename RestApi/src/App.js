import React, { useState,useEffect,useCallback } from "react";
import AddMovie from './components/AddMovie';
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isNewMovvieLoading,setIsNewMovieLoaidng] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState(false)
  
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try{
      const response = await fetch("https://react-24e45-default-rtdb.firebaseio.com/movies.json");
      if(!response.ok) {throw new Error("Somthing went wrong");setError()}
      const data = await response.json();
      const loadedMmovies = [];

      for(const key in data){
        loadedMmovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      //
      // const transFormedData = data.map((movie) => {
      //   return {
      //     id: movie.episode_id,
      //     title: movie.title,
      //     openingText: movie.opening_crawl,
      //     releaseDate: movie.release_date,
      //   };
      // });
      //
      setMovies(loadedMmovies);
      setIsLoading(false);
    }catch(e){
      setError(e.message);
      setIsLoading(false)
    }
      

    // .then((resp) => {
    //   return resp.json();
    // })
    // .then((data) => {
    //   const transFormedData = data.results.map((movie) => {
    //     return {
    //       id: movie.episode_id,
    //       title: movie.title,
    //       openingText: movie.opening_crawl,
    //       releaseDate: movie.release_date,
    //     };
    //   });
    //   setMovies(transFormedData);
    // });
  },[]);
  useEffect( ()=>{
    fetchMovies();
  },[fetchMovies]);
  const addMovieHandler = async (movie) =>{
    setIsNewMovieLoaidng(true)
    const response  = await fetch('https://react-24e45-default-rtdb.firebaseio.com/movies.json',{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    fetchMovies();
    setIsNewMovieLoaidng(false)
  }
  let content = "Found No Movies";
  if(error){
    content = <p>{error}</p>
  }
  if(isLoading){
    content = "Loading..."
  }
  if(movies.length>0){
    content = <MoviesList movies={movies} />
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
        
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {isNewMovvieLoading && <h4>Adding New Movie</h4>}
      </section>
    </React.Fragment>
  );
}

export default App;
