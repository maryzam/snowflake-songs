import React from 'react';
import Provider from "../utils/dataProvider";

const Song = (props) => {

  const num = parseInt(props.match.params.number, 10);

  const song = Provider.getSong(num);
  const trackURL = "https://open.spotify.com/embed/track/" + song['Spotify ID'];
  console.log(song);

  return (
    <div className="song">

      <svg width="500" height="500">

        <circle cx="250" cy="250" r="200"/>

      </svg>

      <p> {song.SongTitle} </p>
      <iframe src={trackURL} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  );

}

export default Song;
