import React, { useEffect, useState } from 'react'
import { fetchTrendingMovies } from '../connections/appwrite'

const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);

    const loadTrendingMoviews = async ()=>{
        try{
            const result = await fetchTrendingMovies();
            // console.log(result);
            setTrendingMovies(result);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        loadTrendingMoviews();
    },[]);

  return (
    <div>
      {trendingMovies.length > 0 && (
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
    </div>
  )
}

export default TrendingMovies
