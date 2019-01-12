import React from 'react';

import Build from "../../../utils/snowflakesBuild";
import SnowflakeItem from "../../Snowflake/SnowflakeItem";

const svgMargin = 30;
const itemsByRow = 4;

const SnowflakeItemsOverall = ({ size, song }) => {

  	const scales = Build.updateScales(size * 3, Build.prepareScales());
	const itemsSpace = size / itemsByRow ;

	return (
		<section>
	        <p> 
	        	Snowflakes arms are built from  the song's list of sections. 
	        	Those are parts of the song that have different attributes as duration, tempo, key and loudness.
	        </p>
	       
	        <div className="svg-horiz-centered">

	          <svg width={size} height={size}>
	        
	            <g className="snowflake-section" transform={ `translate(${ svgMargin }, ${ svgMargin })`} >
	        	{
	        		song.sections.map((section,i) => {
	        			const x = i % itemsByRow * itemsSpace;
	        			const y = Math.floor(i / itemsByRow) * itemsSpace;
	        			return (
		        			<g key={ section.start } transform={ `translate(${ x }, ${ y })` }>
		        				<SnowflakeItem
		        					section={ section }
		        					scales={ scales }
		        				/>
		        			</g>
		        		);
	        		})
	        	}
	        	</g>
	          </svg>
	        </div>
	    </section>
    );
};

export default SnowflakeItemsOverall;