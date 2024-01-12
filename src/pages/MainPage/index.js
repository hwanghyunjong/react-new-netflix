import React from 'react';

import Banner  from '../../components/Banner';
import Row     from '../../components/Row';
import request from '../../api/request';

const MainPage = () => {
  return (
    <div className="App">
      <Banner/>

      <Row 
        title='NETFLIX ORIGINALS'
        id='NO'
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow />

      <Row 
        title='Trending Now'
        id='TN'
        fetchUrl={request.fetchTrending} />

      <Row 
        title='Top Rated'
        id='TR'
        fetchUrl={request.fetchTopRated} />

      <Row 
        title='Action Movies'
        id='AM'
        fetchUrl={request.fetchActionMovies} />

      <Row 
        title='Comedy Movies'
        id='Cm'
        fetchUrl={request.fetchcomedyMovies} />
    </div>
  )
}

export default MainPage;