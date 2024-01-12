import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';
import useDebounce from '../../hooks/useDebounce';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get('q');
    const debounceSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debounceSearchTerm) {
            console.log('debounceSearchTerm', debounceSearchTerm);
            fetchSearchMovie(debounceSearchTerm);
        }
    }, [debounceSearchTerm]);


    // 🚀 Get Movie Infos by Search Terms
    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(`search/multi?include_adult=false&query=${searchTerm}`);
            setSearchResults(request.data.results);

        } catch (error) {
            console.log('error', error);
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== 'person') {
                        const movieImageUrl = 
                        "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return (
                            <div className='movie' key={movie.id}>
                                <div onClick={() => navigate(`/${movie.id}`)} className='movie__column-poster'>
                                    <img src={movieImageUrl} alt='movie image' className='movie__poster'/>

                                </div>
                            </div>
                        )
                    }
                })}
            </section>
        ) : (
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>찾고자 하는 검색어 "{debounceSearchTerm}"에 맞는 영화가 없습니다.</p>
                </div>
            </section>
        )
    }


    return renderSearchResults();
}

export default SearchPage;