import React from 'react';
import Provider from "../utils/dataProvider";

import Snowflake from "./Snowflake";
import TrackFrame from "./TrackFrame";

import NavigationButton, { BUTTON_TYPES } from "./Navigation/Button";

const Song = ({ match }) => {

  const id = parseInt(match.params.id, 10);
  const song = Provider.getSong(id);
  const lastSong = Provider.getSongsCount() - 1;

  return (
    <div className="single-song">

      <div className="content">

        { (id === 0) ? null : <NavigationButton type={ BUTTON_TYPES.PREV } songId={ id } /> }

        <div className="grow">
          <Snowflake 
              song={ song }
              size={ 500 } 
              maximize={ true }/>
        </div>

        { (id === lastSong) ? null : <NavigationButton type={ BUTTON_TYPES.NEXT } songId={ id } /> }

      </div>
      
      <TrackFrame 
          song={ song }
          width={ 500 }
          height={ 80 } />

    </div>
  );

}

export default Song;
