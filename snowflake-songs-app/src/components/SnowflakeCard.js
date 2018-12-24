import React from 'react';
import { Link } from 'react-router-dom';

import Snowflake from './Snowflake';

const SnowflakeCard = ({ song, size }) => (

			<div className="snowflake-card">

				<Link to={`/song/${song.id}`}>

			        <Snowflake 
			        	song={ song }
			        	size={ size } />

					<div className="titleWrap">
						<p>{ song.Song }</p>
					</div>

				</Link>


			</div>

	);

export default SnowflakeCard;
