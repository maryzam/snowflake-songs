import React from 'react';
import { AnnotationBracket, AnnotationCalloutElbow, AnnotationCalloutCircle } from 'react-annotation';

import Provider from "../utils/dataProvider";
import Build from "../utils/snowflakesBuild";

import Snowflake from './Snowflake/Snowflake';
import Header from "./Header/Header";
import Footer from "./Footer";

const setUpArmLegend = () => {
  
}

const About = () => {
  
  const sizeSnowflakes = 300;
  const heightItem = sizeSnowflakes*1.3;
  const songExample = Provider.getSong(1);
  console.log(songExample);
  const sectionsNumber = songExample.sections.length ;
  const itemsByRow = 4;
  const itemsSpace = sizeSnowflakes / itemsByRow ;
  const sectionExample = songExample.sections[0];
  
  const armScales = Build.updateScales(sizeSnowflakes*4, Build.prepareScales());
  const itemsListScales = Build.updateScales(sizeSnowflakes*3, Build.prepareScales());
  const itemScales = Build.updateScales(sizeSnowflakes*10, Build.prepareScales());
  
  const svgMargin = 30;
  const annotColor = "grey";
  const annotMargin = 10;
  
  const buildArmAnnotations = () => {

    const baseAnnot = {
      yPadding: 20,
      dy: 100,
      dx: 50
    };
  
    const armAnnotations = [
      { position : { x: svgMargin, y: svgMargin + baseAnnot.yPadding, dy: baseAnnot.dy, dx: baseAnnot.dx}, 
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
          { position : { x: svgMargin + currentPos, y: svgMargin + baseAnnot.yPadding, dy: baseAnnot.dy, dx: baseAnnot.dx - currentPos},
            note: { title:"", label:""}
          }
        );

      }
    });
    
    return armAnnotations;
  };

  const armAnnotations = buildArmAnnotations();
  
  const itemAnnotations = [
    { position : { x: itemScales.loudness(sectionExample.loudness)/2, y: 0, dy: 0, dx: 0}, 
      subject: { height: itemScales.duration(sectionExample.duration) },
      note: { title:"Duration", label: "is encoded as height of the item",  wrap: 60 }
    },
    { position : { x: - itemScales.loudness(sectionExample.loudness)/2, y: itemScales.duration(sectionExample.duration) + annotMargin, dy: 0, dx: 0}, 
      subject: { width: itemScales.loudness(sectionExample.loudness) },
      note: { title:"Loudness", label: "is encoded as width of the item" }
    },
    { position : { x: - itemScales.loudness(sectionExample.loudness)/2 - annotMargin, y: 0, dy: 0, dx: 0}, 
      subject: { height: itemScales.key(sectionExample.key) * itemScales.duration(sectionExample.duration), depth: -10 },
      note: { title:"Key", label: "is encoded as the height of the mid point", wrap: 60 }
    }
  ];
  
  return (
    <div>
    
      <Header />
      
      <main className="about">

        <h2> Legend & Explanation </h2>
        
        <div className="svg-horiz-centered">
          <Snowflake
            song={ songExample }
            size={ sizeSnowflakes }
            maximize={ true }
          />
        </div>
        
        <p> Each snowflake is built from a song audio attributes : some from the overall song and some from song parts. 
        The background of the song encode its overall <b>Valence</b>, which describes its musical positiveness :</p>
        
        <div className="color-legend">
          <div className="color-legend-text left"> <p> 0 : sound more sad, depressed, angry </p> </div>
          <div className="color-legend-text right"> <p> 1 : sound more happy, cheerful, euphoric </p> </div>
        </div>
        <div className="colorful-rectangle"></div>
        
        <br></br>

        <p> Snowflakes have six arms, which are the same one repeated and rotated for 6 angles.</p>
        
        <div className="svg-horiz-centered">
          <svg width={sizeSnowflakes} height={sizeSnowflakes/4}>
            <g transform={ `translate(${ svgMargin }, ${ svgMargin }) rotate(${270})`} >
              {Build.renderSongPattern(songExample, armScales) }
            </g>
          </svg>
        </div>
        
        <br></br>

        <p> Snowflakes arms are built from  the song's list of sections. Those are parts of the song that have different attributes as duration, tempo, key and loudness. </p>
        <div className="svg-horiz-centered">
          <svg width={sizeSnowflakes} height={sizeSnowflakes}>
            <g transform={ `translate(${ svgMargin }, ${ svgMargin })`} >
              <g id={`pattern_${ songExample.id }`} className="snowflake-section">
        				{
        				  
        				  songExample.sections.map((section,i) => {

        				    const element = (
        							<path 
        								key={ section.start }
        								d={ Build.buildItem(section, itemsListScales) }
        								transform={ `translate(${ i % itemsByRow * itemsSpace }, ${ Math.floor(i / itemsByRow) * itemsSpace })` }
        								/>
        						);
        						
        						return element;
        				  })
        				}
        			</g>
            </g>
          </svg>
        </div>
        
        <p> Every section result in an item giving its specific properties, where scales range are computed from the whole songs list. : </p>
        <div className="svg-horiz-centered">
          <svg width={sizeSnowflakes} height={heightItem}>
            <g transform={ `translate(${ sizeSnowflakes/2 }, ${ heightItem/2 - itemScales.duration(sectionExample.duration)/2 })`} >
              <g id={`pattern_${ songExample.id }`} className="snowflake-section">
    							<path 
    								key={ sectionExample.start }
    								d={ Build.buildItem(sectionExample, itemScales) }
    								/>
        			</g>
        			
        			{
                itemAnnotations.map((annot,i) => {
                  return (
              			<AnnotationBracket
              			  key={i}
                      {...annot.position}
                      color={annotColor}
                      note={{
                        ...annot.note 
                      }}
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
                subject={{"radius":20,"radiusPadding":3}}
              />
            
            </g>
          </svg>
        </div>
        
        <p> In each section, <b>Key</b> represent the overall keu of the section from 0 (C key) to 11 (B key) following the <a href="https://en.wikipedia.org/wiki/Pitch_class"> pitch class notation</a>. 
        <b>Tempo</b> attribute is encoded as concave for a low tempo and convex for a high one.</p>
        
        <br></br>
       
        <p> Items are grouped to overlap : </p>
        <div className="svg-horiz-centered">
          <svg width={sizeSnowflakes} height={sizeSnowflakes}>
              <g transform={ `translate(${ svgMargin }, ${ svgMargin }) rotate(${270})`} >
                {Build.renderSongPattern(songExample, armScales) }
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

        <p> Items and others experiments can be found in the draft folder on github. </p>

        <br></br>


        <h2> Methodology </h2>


        <p> Starting from the topic of Christams songs, we spend some time searching for data and nice stories. One great inspiration was the <a href="https://insights.spotify.com/us/">Spotify Insights blog</a>. And finally a great New Year's playlist won the deal ! </p>

        <p> We purposefully choose not to use lyrics. After some thoughts, we decided to use the Spotify API to easily retrieve songs data. Spotify API offer a quite detailed song data for each song track : 
        <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/">audio features</a> - global song attributes -
          and  <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/">audio analysis</a> - detail song attribute by song's sections and even smaller parts (segments).
        We used python with Jupyter Notebook and <a href="https://spotipy.readthedocs.io/en/latest/">Spotipy library</a> to easily retrieve data given a playlist or a list of song with their tracks ID.</p>

       <p> The main steps then were the following : </p>
       <ol>
         <li> Get to know audio features & analysis attributes </li>
         <li> Select attributes to encode in the visualisation. Our main choice here was to only use sections as segments were really small duration parts of songs, and use some of the global attributes - mainly Valence. </li>
         <li> Retrive data with Spotify API and Spotipy library, deleted unused attributes and convert the list to JSON. </li>
       </ol>
       
    </main>
    
    <Footer />

    </div>
	);
	
}

export default About;
