import React from 'react';
import { Link } from 'react-router-dom'


const SnowflakeCard = (props) => (

			<div className="snowflake-card">

				<Link to={`/song/${props.song.id}`}>

	        <svg width="200" height="200">

					<circle cx="100" cy="100" r="80"/>

					{/*
	        <rect width="200" height="200" />
					*/}

	        </svg>

					<div className="titleWrap">
						<p>{props.song.title}</p>
					</div>

				</Link>


			</div>

	);

export default SnowflakeCard;
