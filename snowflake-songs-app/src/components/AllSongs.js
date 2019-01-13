import React from 'react';
import { DataProvider } from "../providers";

import Header from "./Header/Header";
import Footer from "./Footer";
import SnowflakeCard from "./SnowflakeCard";

const AllSongs = () => {
    const songs = DataProvider.getAllSongs();
    return (
      <article className="all-songs colorful-background dynamic">
        <Header />
        <main className="songs-container">
            {
              songs.map((d) => (
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
