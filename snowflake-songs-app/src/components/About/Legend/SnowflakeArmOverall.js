import React from 'react';

import SnowflakeArm from "../../Snowflake/SnowflakeArm";

const SnowflakeArmOverall = ({ song, width, height }) => (
	<section>
  	<p> Snowflakes have six arms, which are the same one repeated and rotated for 6 angles.</p>
    <div className="svg-horiz-centered">
     	<svg width={ width }  height={ height }>
        <g transform={ `translate(0, ${ height / 2})rotate(270)` }>
          <SnowflakeArm 
              song={ song }
              size={ width * 2 }
              maximize={ true } 
              animated={ false } />
          </g>
      </svg>
    </div>
  </section>
);

export default SnowflakeArmOverall;