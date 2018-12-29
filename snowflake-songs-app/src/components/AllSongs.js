import React from 'react';
import Provider from "../utils/dataProvider";

import Header from "./Header/Header";
import Footer from "./Footer";
import SnowflakeCard from "./SnowflakeCard";

const AllSongs = () => {
    const data = Provider.getAllSongs();
    return (
      <article className="all-songs colorful-background dynamic">
        <Header />
        <main className="songs-container">
            {
              data.map((d) => (
                <SnowflakeCard 
                  key={d.id} 
                  song={d} 
                  size={ 300 }/>
              ))            
            }
        </main>
        <Footer />
      </article>
  );
};

export default AllSongs;
