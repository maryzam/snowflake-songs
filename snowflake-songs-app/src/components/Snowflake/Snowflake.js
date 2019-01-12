import React from 'react';

import SnowflakeArm from './SnowflakeArm';

const arms = [0, 60, 120, 180, 240, 300];

class Snowflake extends React.PureComponent { 

	render() {
		const { song, size, maximize, animated } = this.props;
		return (
			<svg 
				className="snowflake"
				width={size} height={size} >
				<def>
					<SnowflakeArm
						song={ song }
						size={ size }
						maximize={ maximize } 
						animated={ animated } />
				</def>
				<g transform={ `translate(${size / 2}, ${ size / 2})` }>
					{
						arms.map((angle) => (
							<g key={ angle }
							 	className="line"
							 	transform={`rotate(${angle})`}>
							 	<use href={`#pattern_${ song.id }`}/>
							 </g>
						))
					}
				</g>
			</svg>
		);
	}
}

Snowflake.defaultProps = {
	size: 300,
	maximize: false
};

export default Snowflake;