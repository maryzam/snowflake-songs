import React from 'react';
import * as d3 from 'd3';

const buildItem = (d, scales) => {
			const itemHeight = scales.duration(d.duration);
			const itemHalfWidth = scales.loudness(d.loudness) / 2;
			const midPos = scales.key(d.key) * itemHeight;
			const slopePos = scales.tempo(d.tempo) * itemHalfWidth + itemHalfWidth;

			return `M 0 ${itemHeight} 
					Q ${-slopePos} ${midPos * 1.1} ${-itemHalfWidth} ${midPos} 
					Q ${-slopePos} ${midPos * 0.9} 0 0
					Q ${slopePos} ${midPos * 0.9} ${itemHalfWidth} ${midPos} 
					Q ${slopePos} ${midPos * 1.1}0 0 ${itemHeight}`;
		};

const rays = [0, 60, 120, 180, 240, 300];

class Snowflake extends React.PureComponent { 

	render() {
		const { song, width, height } = this.props;
		return (
			<svg width={width} height={height} >
				<def>
					{ this.renderSongPattern(song, width, height) }
				</def>
				<g>
					{
						rays.map((angle) => (
							<g key={ angle }
							 	className="line"
							 	translate={`rotate(${angle})`}>
							 	<use href={`#pattern_${ song.id }`}/>
							 </g>
						))
					}
				</g>
			</svg>
		);
	}

	renderSongPattern(song, width, height) {
		return (
			<g id={`pattern_${ song.id }`}>
				{
					song.section
				}
			</g>
		);
	}
}

export default Snowflake;