import React from 'react';
import YouTube from 'react-youtube';
import * as d3 from 'd3';

import Provider from "../utils/dataProvider";

import Header from "./Header/Header";
import Footer from "./Footer";
import Snowflake from "./Snowflake/Snowflake";
import NavigationButton, { BUTTON_TYPES } from "./Navigation/Button";

const scaleValence = d3.scaleLinear().domain([0, 1]).range([0, 100]);

const videoOptions = { playerVars: { autoplay: 1 } };

const Song = ({ match }) => {

  const id = parseInt(match.params.id, 10);
  const song = Provider.getSong(id);
  const lastSong = Provider.getSongsCount() - 1;
  const backgroundPosition = Math.floor(scaleValence(song.valence));

  return (
    <article 
      className="single-song colorful-background"
      style={{ backgroundPosition: `${ backgroundPosition }% ${backgroundPosition}%` }}>
      <Header title={ song.name } singer={ song.artist } createdByBlock={ false } />
      <main>

        <div className="content">
          { (id === 0) ? null : <NavigationButton type={ BUTTON_TYPES.PREV } songId={ id } /> }
          <div className="grow">
            <Snowflake 
                key={ song.id }
                song={ song }
                size={ 500 } 
                maximize={ true }
                animated={ true } />
          </div>
          { (id === lastSong) ? null : <NavigationButton type={ BUTTON_TYPES.NEXT } songId={ id } /> }
        </div>

        <YouTube 
          key={ song.youtubeId }
          className="background-player"
          videoId={ song.youtubeId }
          onReady={ (e) => { e.target.playVideo() } }
        />

      </main>
      <Footer createdByBlock={ true } />
    </article>
  );

}

export default Song;
