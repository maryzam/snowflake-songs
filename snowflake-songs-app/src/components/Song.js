import React from 'react';
import Provider from "../utils/dataProvider";

import Snowflake from "./Snowflake";
import TrackFrame from "./TrackFrame";

const Song = ({ match }) => {

  const id = parseInt(match.params.id, 10);
  const song = Provider.getSong(id);

  return (
    <div className="song">

      <Snowflake 
          song={ song }
          size={ 500 } 
          maximize={ true }/>

      <TrackFrame 
        song={ song }
        width={ 500 }
        height={ 80 } />

    </div>
  );

}

export default Song;
