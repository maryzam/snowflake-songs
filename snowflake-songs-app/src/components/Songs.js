import React from 'react';
import Provider from "../utils/dataProvider";
import SnowflakeCard from "./SnowflakeCard";

const Songs = () => {
    const data = Provider.getMainInfo();
    return (
      <div className="wrapper">
        <div className="songs-container">
          {
            data.map((d) => (<SnowflakeCard 
              key={d.id} 
              song={d} 
              width={ 200 }
              height={ 200 } />
            ))            
          }
        </div>
      </div>
  );
};

export default Songs;
