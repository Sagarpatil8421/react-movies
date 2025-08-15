import React, { useState, useEffect } from 'react'
import Search from './components/search'
import { Spinner } from 'flowbite-react';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMovieFethching, setErrorMovieFethching] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async ()=>{
    setIsLoading(true);
    setErrorMovieFethching('');

    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw Error('Failed to fetch Movies');
      }

      const data = await response.json();
      if(data.Response === 'False'){
        setErrorMovieFethching(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      // after getting an api response 
      setMovieList(data.results || []);
      console.log(data);
      
    }catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMovieFethching('Failed to fetch movies. Please try again later.');
    }finally{
      setIsLoading(false);
    }
  }
  
  useEffect(()=>{
    fetchMovies()
  },[]);
  
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero-img.png" alt="hero banner" />
            <h1>Find <span className='text-gradient'> Movies</span> You'll Enjoy Without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className='all-movies'>
            <h2>All Movies</h2>
            {isLoading?(
              <p className='text-shadow-white'>Loading.....</p>
            ): errorMovieFethching ?(  
              <p className='text-red-500'>{errorMovieFethching}</p> ) : 
              (
                <ul>
                  {movieList.map((movie)=>(
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )
            }
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
