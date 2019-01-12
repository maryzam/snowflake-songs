import React from 'react';

const ValenceLegend = () => (
	
	<section>
	
		<p> 
			Each snowflake is built from a song audio attributes : some from the overall song and some from song parts. 
	        The background of the song encode its overall <b>Valence</b>, which describes its musical positiveness :
	    </p>
	        
	    <div className="color-legend">
	       <div className="color-legend-text left"> <p> 0 : sound more sad, depressed, angry </p> </div>
	       <div className="color-legend-text right"> <p> 1 : sound more happy, cheerful, euphoric </p> </div>
	    </div>
	    
	    <div className="colorful-rectangle"></div>

    </section>
);

export default ValenceLegend;