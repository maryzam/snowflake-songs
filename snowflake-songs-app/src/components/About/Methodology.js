import React from 'react';

const Metodology = () => (
	<article>
		
        <h2> Methodology </h2>

        <p> Starting from the topic of Christams songs, we spend some time searching for data and nice stories. One great inspiration was the <a target="_blank" rel="noopener noreferrer"  href="https://insights.spotify.com/us/">Spotify Insights blog</a>. And finally a great New Year's playlist won the deal ! </p>

        <p> We purposefully choose not to use lyrics. After some thoughts, we decided to use the Spotify API to easily retrieve songs data. Spotify API offer a quite detailed song data for each song track : 
        <a target="_blank" rel="noopener noreferrer" href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/">audio features</a> - global song attributes -
          and  <a target="_blank" rel="noopener noreferrer" href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/">audio analysis</a> - detail song attribute by song's sections and even smaller parts (segments).
        We used python with Jupyter Notebook and <a target="_blank" rel="noopener noreferrer" href="https://spotipy.readthedocs.io/en/latest/">Spotipy library</a> to easily retrieve data given a playlist or a list of song with their tracks ID.</p>

       <p> The main steps then were the following: </p>
       <ol>
         <li> Get to know audio features & analysis attributes </li>
         <li> Select attributes to encode in the visualisation. Our main choice here was to only use sections as segments were really small duration parts of songs, and use some of the global attributes - mainly Valence. </li>
         <li> Retrive data with Spotify API and Spotipy library, deleted unused attributes and convert the list to JSON. </li>
       </ol>

	</article>
);

export default Metodology;