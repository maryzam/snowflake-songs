import React from 'react';
import { Link } from 'react-router-dom';

import Snowflake from './Snowflake/Snowflake';

const SnowflakeCard = ({ song, size }) => (

			<div className="snowflake-card">

				<Link to={`/song/${song.id}`}>

			        <Snowflake 
			        	song={ song }
			        	size={ size } />

					<div className="title-wrap">
						<p>{ song.name }</p>
						<p><small>{ song.artist }</small></p>
					</div>

				</Link>


			</div>

	);

export default SnowflakeCard;
