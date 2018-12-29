import React from 'react';
import Provider from "../utils/dataProvider";

import Snowflake from './Snowflake';
import Header from "./Header/Header";
import Footer from "./Footer";

const About = () => {
  
  const sizeSnowflakes = 300;
  const songExample = Provider.getSong(1);
  console.log(songExample);
  
  
  return (
    <div>
    
      <Header />
      
      <main className="about">


        <h2> Legend </h2>

        <p> Each snowflake is built from song attributes. Each one have six arms, which are the same one repeated and rotated for 6 angles.</p>
        
        <Snowflake
          song={ songExample }
          size={ sizeSnowflakes }
          maximize={ true }
        />
        
        <p> Snowflakes arms are built from  the song's list of sections. Those are parts of the song that have different attributes as well as duration, tempo, key and loudness. </p>
        <p> Every section result in an item giving its specific properties : </p>

        <p> Items and others experiments can be found in the draft folder on github. </p>

        <br></br>


        <h2> Methodology </h2>


        <p> Starting from the topic of Christams songs, we spend some time searching for data and nice stories. One great inspiration was the <a href="https://insights.spotify.com/us/">Spotify Insights blog.</a> </p>

        <p> We purposefully choose not to use lyrics. After some thoughts, we decided to use the Spotify API to easily retrieve songs data. Spotify API offer a quite detailed song data for each song track :
        <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/">audio features</a> <i>(global song attributes)</i>
        and <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/">audio analysis</a> <i>(detail song attribute by sections and even smaller segements)</i>.
        We used python with Jupyter Notebook and <a href="https://spotipy.readthedocs.io/en/latest/">Spotipy library</a> to easily retrieve data given a playlist or a list of song with their tracks ID.</p>

       <p> The main steps then were the following : </p>
       <ol>
         <li> Get to know audio features & analysis attributes </li>
         <li> Select attributes to encode in the visualisation. Our main choices here were to use sections only <i>(segments were really small duration parts of songs)</i> and keep some of the global attributes <i> (X, X and X)</i> </li>
         <li> Retrive data with Spotify API and Spotipy library, deleted unused attributes and convert the list to JSON. </li>
       </ol>
       
    </main>
    
    <Footer />

    </div>
	);
	
}

export default About;
