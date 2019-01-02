import React from 'react';
import { AnnotationBracket, AnnotationCalloutElbow, AnnotationCalloutCircle } from 'react-annotation';

import Provider from "../../utils/dataProvider";
import Build from "../../utils/snowflakesBuild";

import Snowflake from '../Snowflake/Snowflake';
import Header from "../Header/Header";
import Footer from "../Footer";

import ValenceLegend from './Legend/ValenceLegend';
import SnowflakeArmOverall from './Legend/SnowflakeArmOverall';
import SnowflakeItemsOverall from './Legend/SnowflakeItemsOverall';
import SingleItemLegend from './Legend/SingleItemLegend';
import ItemsGroupingLegend from './Legend/ItemsGroupingLegend';

import Methodology from './Methodology';

const sizeSnowflakes = 300;
const songExample = Provider.getSong(1);
const sectionsNumber = songExample.sections.length;

const armScales = Build.updateScales(sizeSnowflakes * 4, Build.prepareScales());

const About = () => (
    <div>
    
      <Header />
      
      <main className="about">

        <article>
          <h2> Legend & Explanation </h2>
          <div className="svg-horiz-centered">
            <Snowflake
              song={ songExample }
              size={ sizeSnowflakes }
              maximize={ true }
            />
          </div>
          
          <ValenceLegend />

          <SnowflakeArmOverall 
            size={ sizeSnowflakes } 
            song={ songExample } 
            armScales={ armScales } />

          <SnowflakeItemsOverall 
            size={ sizeSnowflakes } 
            song={ songExample } 
            armScales={ armScales } />

          <SingleItemLegend 
            size={ sizeSnowflakes } 
            song={ songExample } />

          <ItemsGroupingLegend 
            size={ sizeSnowflakes } 
            song={ songExample } 
            armScales={ armScales } />
         
          <p> Items and others experiments can be found in the draft folder on github. </p>

        </article>

        <Methodology />
         
      </main>
      
      <Footer />

    </div>
);
	


export default About;
