import React from 'react';
import { AnnotationBracket, AnnotationCalloutCircle } from 'react-annotation';

import { ScalesProvider } from "../../../providers";
import SnowflakeItem from "../../Snowflake/SnowflakeItem";

const annotColor = "grey";
const annotMargin = 10;

const SingleItemLegend = ({ size, section }) => {

  	const heightItem = size * 1.3;
  	const scales = ScalesProvider.getScales(size * 10);

 	const itemAnnotations = [
	    { 
	    	position : { x: scales.loudness(section.loudness)/2, y: 0, dy: 0, dx: 0}, 
	     	subject: { height: scales.duration(section.duration) },
	      	note: { title:"Duration", label: "is encoded as height of the item",  wrap: 60 }
	    },
	    { 
	    	position : { 
	    		x: - scales.loudness(section.loudness)/2, 
	    		y: scales.duration(section.duration) + annotMargin, 
	    		dy: 0, dx: 0 }, 
	      	subject: { width: scales.loudness(section.loudness) },
	      	note: { title:"Loudness", label: "is encoded as width of the item" }
	    },
	    { 
	    	position : { 
	    		x: - scales.loudness(section.loudness)/2 - annotMargin, 
	    		y: 0, dy: 0, dx: 0 }, 
	      	subject: { 
	      		height: scales.key(section.key) * scales.duration(section.duration), 
	      		depth: -10 },
	      	note: { title:"Key", label: "is encoded as the height of the mid point", wrap: 60 }
	    }
	];

	return (
		<section>
	        <p> Every section result in an item giving its specific properties, where scales range are computed from the whole songs list: </p>
	        <div className="svg-horiz-centered">
	          <svg width={ size } height={ heightItem }>
	            <g transform={ `translate(${ size/2 }, ${ heightItem/2 - scales.duration(section.duration)/2 })`} >
		            <g className="snowflake-section">
		    			<SnowflakeItem 
		    				section={ section }
		    				scales={ scales }
		    			/>
	        		</g>
	        		{
		                itemAnnotations.map((annot,i) => {
		                  return (
		              		<AnnotationBracket
		              			  key={i}
		                      {...annot.position}
		                      color={annotColor}
		                      note={{ ...annot.note }}
		                      subject={{
		                        ...annot.subject,
		                        "type":"curly"
		                      }}
		                    />
		                  )
		                })
		        	}
		        			
	        	<AnnotationCalloutCircle
	                x={annotMargin}
	                y={annotMargin}
	                dy={-30}
	                dx={30}
	                color={annotColor}
	                note={{"title":"Tempo",
	                  "label":"is encoded as the curviness",
	                  "lineType":"horizontal"}}
	                subject={{ "radius":20, "radiusPadding":3 }}
	              />
	            
	            </g>
	          </svg>
	        </div>
	        
	        <p> In each section, <b>Key</b> represent the overall keu of the section from 0 (C key) to 11 (B key) following the <a href="https://en.wikipedia.org/wiki/Pitch_class"> pitch class notation</a>. 
	        <b>Tempo</b> attribute is encoded as concave for a low tempo and convex for a high one.</p>
        </section>
	);
};

export default SingleItemLegend;