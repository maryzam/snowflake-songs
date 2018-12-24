import React from 'react';
import { Link } from 'react-router-dom';

import Snowflake from './Snowflake';

const SnowflakeCard = ({ song, width, height }) => (

			<div className="snowflake-card">

				<Link to={`/song/${song.id}`}>

			        <Snowflake 
			        	song={ song }
			        	width={ width }
			        	height={ height } />

					<div className="titleWrap">
						<p>{ song.title }</p>
					</div>

				</Link>


			</div>

	);

export default SnowflakeCard;
