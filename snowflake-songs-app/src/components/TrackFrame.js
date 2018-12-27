import React from 'react';
import Provider from "../utils/dataProvider";

const TrackFrame = ({ song, width, height }) => {

  const trackUrl = Provider.getSongUrl(song.id);

  return (
  	<div>
	    <iframe 
	        id={`frame_${song.id}`}
	        src={ trackUrl } 
	        width={ width } height={ height } 
	        frameBorder="0" 
	        allowtransparency="true" 
	        allow="encrypted-media"></iframe>
  	</div>
  );

};

export default TrackFrame;