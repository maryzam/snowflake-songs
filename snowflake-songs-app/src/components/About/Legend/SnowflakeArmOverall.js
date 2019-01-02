import React from 'react';
import Build from "../../../utils/snowflakesBuild";

const svgMargin = 30;

const SnowflakeArmOverall = ({ size, song, armScales }) => (
	<section>
	<p> Snowflakes have six arms, which are the same one repeated and rotated for 6 angles.</p>
        
    <div className="svg-horiz-centered">
    	<svg 
    		width={ size } 
    		height={ size/4 }>
            <g transform={ `translate(${ svgMargin }, ${ svgMargin })rotate(${270})`} >
              {
              	Build.renderSongPattern(song, armScales) 
              }
            </g>
        </svg>
    </div>

    </section>
);

export default SnowflakeArmOverall;