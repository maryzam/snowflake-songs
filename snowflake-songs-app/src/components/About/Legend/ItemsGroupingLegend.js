import React from 'react';
import { AnnotationCalloutElbow } from 'react-annotation';

import { ScalesProvider } from "../../../providers";
import SnowflakeArm from "../../Snowflake/SnowflakeArm";

const annotColor = "grey";

const prepareAnotations = (song, scales, offset) => {
    const baseAnnot = {
      yPadding: 20,
      dy: 100,
      dx: 50
    };

    const armAnnotations = [
      { 
        position : { 
          x: 0,
          y: offset + baseAnnot.yPadding, 
          dy: baseAnnot.dy, 
          dx: baseAnnot.dx
        }, 
        note: { 
          title:"Groups", 
          label:"Sections are grouped by order to enable a nice overlap"
        }
      }
    ];

    let currentPos = 0;
    song.sections.forEach((section) => {
        if (section.group.order !== 0) { return; }
        armAnnotations.push(
        { 
            position : { 
              x: currentPos, 
              y: offset + baseAnnot.yPadding, 
              dy: baseAnnot.dy, 
              dx: baseAnnot.dx - currentPos
            },
            note: { title:"", label:"" }
        });
        currentPos += scales.duration(section.duration);
    });

    return armAnnotations;
}

const ItemGroupsAnnotation = ({song, offset}) => {

  const armScales = ScalesProvider.getScales();
  const annotations = prepareAnotations(song, armScales, offset);

  return annotations.map((annotation, id) => (
    <AnnotationCalloutElbow key={id}
      {...annotation.position}
      color={ annotColor }
      note={{ ...annotation.note,
        "wrap":150,
        "lineType":"horizontal"}}
         connector={{"type":"line","end":"arrow"}} 
    />)
  );
}

const ItemsGroupingLegend = ({ size, width, height, song, armScales }) => {

	return (
		<section>
			<p> Items are grouped to overlap : </p>
		    <div className="svg-horiz-centered">
		        <svg width={ width } height={ height }>
		            <g transform={ `translate(0, ${ height / 4 }) rotate(${270})`} >
		              <SnowflakeArm 
                    song={ song }
                    size={ width * 2 }
                    maximize={ true } 
                    animated={ false } />
		            </g>
		            <ItemGroupsAnnotation 
                  song={ song }
                  armScales={ armScales }
                  offset= { height / 4}
                />
		        </svg>
		    </div>
		</section>
	);
};

export default ItemsGroupingLegend;