import React from 'react';
import YouTube from 'react-youtube';
import * as d3 from 'd3';

import { DataProvider } from "../providers";

import Header from "./Header/Header";
import Footer from "./Footer";
import Snowflake from "./Snowflake/Snowflake";
import NavigationButton, { BUTTON_TYPES } from "./Navigation/Button";

const scaleValence = d3.scaleLinear().domain([0, 1]).range([0, 100]);

const videoOptions = { playerVars: { autoplay: 1 } };

class Song extends React.PureComponent  {

  state = {
    songId: "",
    isSongReady: false
  }

  static getDerivedStateFromProps(props, state) {
    const { params } = props.match;
    const songId = parseInt(params.id, 10);
    if (songId !== state.songId) {
      return { 
        songId: songId,
        isSongReady: false 
      }
    }
    return null;
  }

  onSongReady = ({ target }) => {
     target.playVideo();
     this.setState({ isSongReady: true });
  }

  render() {
    
    const { isSongReady, songId } = this.state; 

    const song = DataProvider.getSong(songId);
    const lastSong = DataProvider.getSongsCount() - 1;
    const backgroundPosition = Math.floor(scaleValence(song.valence));

    return (
        <article 
          className="single-song colorful-background"
          style={{ backgroundPosition: `${ backgroundPosition }% ${backgroundPosition}%` }}>
          <Header title={ song.name } singer={ song.artist } createdByBlock={ false } />
          <main>

            <div className="content">
              { (songId === 0) ? null : <NavigationButton type={ BUTTON_TYPES.PREV } songId={ songId } /> }
              <div className="grow">
                {
                  isSongReady 
                  ? (
                    <Snowflake 
                        key={ song.id }
                        song={ song }
                        size={ 500 } 
                        maximize={ true }
                        animated={ true } />
                  ) : (
                    <div className="preloader"></div>
                  )
                }
              </div>
              { (songId === lastSong) ? null : <NavigationButton type={ BUTTON_TYPES.NEXT } songId={ songId } /> }
            </div>

            <YouTube 
              key={ song.youtubeId }
              className="background-player"
              videoId={ song.youtubeId }
              onReady={ this.onSongReady } 
              onStateChange={ this.onPlayerStateChanged } 
            />

          </main>
          <Footer createdByBlock={ true } />
        </article>
    );    
  }
}

export default Song;
