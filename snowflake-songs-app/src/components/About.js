import React from 'react';
import { AnnotationBracket, AnnotationCalloutElbow } from 'react-annotation';

import Provider from "../utils/dataProvider";
import Build from "../utils/snowflakesBuild";

import Snowflake from './Snowflake';
import Header from "./Header/Header";
import Footer from "./Footer";

const setUpArmLegend = () => {
  
}

const About = () => {
  
  const sizeSnowflakes = 300;
  const songExample = Provider.getSong(1);
  const sectionExample = songExample.sections[0];
  
  const armScales = Build.updateScales(sizeSnowflakes*4, Build.prepareScales());
  const svgMargin = 30;
  const annotColor = "grey";
  
  const buildArmAnnotations = () => {

    const baseAnnot = {
      yPadding: 20,
      dy: 100,
      dx: 50
    };
  
    const armAnnotations = [
      { x: svgMargin, y: svgMargin + baseAnnot.yPadding, dy: baseAnnot.dy, dx: baseAnnot.dx, 
        note: { title:"Groups", label:"Sections are grouped by order to enable a nice overlap"}
      }
    ];
    
    //get first section of each group
    const groupsFirstSection = songExample.sections.filter( (section) => {
      return section.group.order == 0;
    });
  
    //add empty arrow for each group
    let currentPos = 0;
    groupsFirstSection.forEach( (section,i) => {
      
      if (i != 0) {
        currentPos += armScales.duration(section.duration);
        
        armAnnotations.push(
          { x: svgMargin + currentPos, y: svgMargin + baseAnnot.yPadding, dy: baseAnnot.dy, dx: baseAnnot.dx - currentPos,
            note: { title:"", label:""}
          }
        );

      }
    });
    console.log(armAnnotations);
    
    return armAnnotations;
  };
  
  const armAnnotations = buildArmAnnotations();
  
  return (
    <div>
    
      <Header />
      
      <main className="about">


        <h2> Legend </h2>

        <p> Each snowflake is built from song attributes. Each one have six arms, which are the same one repeated and rotated for 6 angles.</p>
        
        <div className="svgHorizCentered">
          <Snowflake
            song={ songExample }
            size={ sizeSnowflakes }
            maximize={ true }
          />
          
          <svg width={sizeSnowflakes} height={sizeSnowflakes}>
            <g transform={ `translate(${ svgMargin }, ${ svgMargin }) rotate(${270})`} >
              {Build.renderSongPattern(songExample, armScales) }
            </g>
            
            {
              armAnnotations.map((annot,i) => {
                return (
                  <AnnotationCalloutElbow
                    key={i}
                    x={annot.x}
                    y={annot.y}
                    dy={annot.dy}
                    dx={annot.dx}
                    color={annotColor}
                    editMode={true}
                    note={{
                      "title":annot.note.title,
                      "label":annot.note.label,
                      "wrap":170,
                      "lineType":"horizontal"}}
                    connector={{"type":"line","end":"arrow"}} />
                )
              })
            }
            
            

          </svg>
        </div>
        
        <p> Snowflakes arms are built from  the song's list of sections. Those are parts of the song that have different attributes as well as duration, tempo, key and loudness. </p>
        <p> Every section result in an item giving its specific properties : </p>
        
        <div className="svgHorizCentered">

          <svg width={sizeSnowflakes} height={sizeSnowflakes}>
            <g transform={ `translate(${ svgMargin }, ${ svgMargin })`} >
              <g id={`pattern_${ songExample.id }`} className="snowflake-section">
        				{
        				  songExample.sections.map((section,i) => {

        				    const element = (
        							<path 
        								key={ section.start }
        								d={ Build.buildItem(section, armScales) }
        								transform={ `translate(${ i * 40 }, ${ section.group.id * 100 })` }
        								/>
        						);
        						
        						return element;
        				  })
        				}
        			</g>
            </g>
          </svg>
        </div>

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
