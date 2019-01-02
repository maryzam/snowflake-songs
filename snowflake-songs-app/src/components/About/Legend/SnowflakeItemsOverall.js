import React from 'react';
import Build from "../../../utils/snowflakesBuild";

const svgMargin = 30;
const itemsByRow = 4;

const SnowflakeItemsOverall = ({ size, song }) => {

  	const itemsListScales = Build.updateScales(size * 3, Build.prepareScales());
	const itemsSpace = size / itemsByRow ;

	return (
		<section>
	        <p> 
	        	Snowflakes arms are built from  the song's list of sections. 
	        	Those are parts of the song that have different attributes as duration, tempo, key and loudness.
	        </p>
	       
	        <div className="svg-horiz-centered">
	          <svg width={size} height={size}>
	            <g transform={ `translate(${ svgMargin }, ${ svgMargin })`} >
	              	<g id={`pattern_${ song.id }`} className="snowflake-section">
	        		{
	        			song.sections.map((section,i) => (
	        					<path 
	        						key={ section.start }
	        						d={ Build.buildItem(section, itemsListScales) }
	        						transform={ `translate(${ i % itemsByRow * itemsSpace }, ${ Math.floor(i / itemsByRow) * itemsSpace })` }
	        					/>)
	        				)
	        		}
	        		</g>
	            </g>
	          </svg>
	        </div>
	    </section>
    );
};

export default SnowflakeItemsOverall;