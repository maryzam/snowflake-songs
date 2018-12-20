import React from 'react';

import SnowflakeCard from "./SnowflakeCard";

import Provider from "../utils/dataProvider";

function renderSongs() {
    {/*const data = [...Array(20).keys()]*/}

    const data = Provider.getMainInfo();
    console.log(data);

    return data.map( (d) => {
    		return <SnowflakeCard song={d}/>;
    });
}

const Songs = () => (
    <div className="wrapper">
      <div className="songs-container">

      {renderSongs.call(this)}

      </div>
  </div>

	);

export default Songs;
