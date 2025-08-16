import React, { useEffect, useState } from 'react'
import { fetchTrendingMovies } from '../connections/appwrite'

const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [error, setError] = useState('');

    const loadTrendingMoviews = async ()=>{
        try{
            const result = await fetchTrendingMovies();
            // console.log(result);
            if (Array.isArray(result)) {
                setTrendingMovies(result);
            } else {
                setTrendingMovies([]);
                console.error('Expected array from fetchTrendingMovies, got:', result);
            }
        }catch(error){
            console.log(error);
            setError('Failed to load trending movies');
            setTrendingMovies([]);
        }
    }

    useEffect(()=>{
        loadTrendingMoviews();
    },[]);

  return (
    <div>
      {trendingMovies && trendingMovies.length > 0 && (
        <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
                {trendingMovies.map((movie, index)=>(
                    <li key={movie.$id}>
                        <p>{index + 1}</p>
                        <img src={movie.poster_url} alt={movie.title} />
                    </li>
                ))}

            </ul>
        </section>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default TrendingMovies
