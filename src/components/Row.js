import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

// 🚀 Import CSS
import './Row.css';
import MovieModal from './MovieModal';

// 🚀 import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ isLargeRow, title, id, fetchUrl }) => {
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, []);


    // 🚀 When Row Component mounted!
    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        // console.log('request', request);

        setMovies(request.data.results);
    };

    // 🚀 무비 포스터를 클릭 했을 때
    const handleClick = (movie) => {
        setIsModalOpen(true);
        setMovieSelected(movie);
    };

    return (
        <section className={`row ${isLargeRow && 'firstRow'}`}>
            <h2>{title}</h2>

            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation // arrow 버튼 사용유무
                pagination={{ clickable: true }}
                loop={true}
                breakpoints={{
                    1378: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    },
                    998: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    625: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                }}>

                <div id={id} className='row__posters'>
                    {movies.map((movie) => (
                        <SwiperSlide >
                            <img
                                key={movie.id}
                                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                                alt={movie.name}
                                onClick={() => handleClick(movie)}/>
                        </SwiperSlide>
                    ))};
                </div>

            </Swiper>

            {
                isModalOpen && (
                    <MovieModal 
                        {...movieSelected}
                        setIsModalOpen={setIsModalOpen} />
                )
            }
        </section>
    );
};

export default Row;