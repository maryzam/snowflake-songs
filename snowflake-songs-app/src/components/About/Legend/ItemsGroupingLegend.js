import React from 'react';
import { AnnotationBracket, AnnotationCalloutElbow, AnnotationCalloutCircle } from 'react-annotation';

import Build from "../../../utils/snowflakesBuild";

const annotColor = "grey";
const annotMargin = 10;
const svgMargin = 30;

const buildArmAnnotations = (song, armScales) => {

    const baseAnnot = {
      yPadding: 20,
      dy: 100,
      dx: 50
    };
  
    const armAnnotations = [
      { 
      	position : { x: svgMargin, y: svgMargin + baseAnnot.yPadding, dy: baseAnnot.dy, dx: baseAnnot.dx}, 
        note: { title:"Groups", label:"Sections are grouped by order to enable a nice overlap"}
      }
    ];
    
    //get first section of each group
    const groupsFirstSection = song.sections.filter( (section) => {
      return section.group.order == 0;
    });

    //add empty arrow for each group
    let currentPos = 0;
    groupsFirstSection.forEach( (section,i) => {
      if (i != 0) {
        currentPos += armScales.duration(section.duration);
        armAnnotations.push(
          { 
          	position : { x: svgMargin + currentPos, y: svgMargin + baseAnnot.yPadding, dy: baseAnnot.dy, dx: baseAnnot.dx - currentPos},
            note: { title:"", label:""}
          }
        );

      }
    });
    
    return armAnnotations;
};

const ItemsGroupingLegend = ({ size, song, armScales }) => {
  	
  	const armAnnotations = buildArmAnnotations(song, armScales);

	return (
		<section>
			<p> Items are grouped to overlap : </p>
		    <div className="svg-horiz-centered">
		        <svg width={size} height={size}>
		            <g transform={ `translate(${ svgMargin }, ${ svgMargin }) rotate(${270})`} >
		                { Build.renderSongPattern(song, armScales) }
		            </g>
		            {
		                armAnnotations.map((annot,i) => {
		                  return (
		                    <AnnotationCalloutElbow
		                      key={i}
		                      {...annot.position}
		                      color={annotColor}
		                      note={{
		                        ...annot.note,
		                        "wrap":150,
		                        "lineType":"horizontal"}}
		                      connector={{"type":"line","end":"arrow"}} />
		                  )
		                })
		              }
		        </svg>
		    </div>
		</section>
	);
};

export default ItemsGroupingLegend;