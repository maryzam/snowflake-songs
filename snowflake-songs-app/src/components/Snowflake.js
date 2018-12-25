import React from 'react';
import * as d3 from 'd3';

import Provider from "../utils/dataProvider";

const rays = [0, 60, 120, 180, 240, 300];

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

const prepareScales = () => {
	const data = Provider.getAllSongs();
	const sections = data.flatMap(item => item.sections);

	const loudnessRange = d3.extent(sections, d => d.loudness);
	const scaleLoudness = d3.scaleLinear().domain(loudnessRange);

	const moderatoTempo = 80;
	const tempoRange = d3.extent(sections, d => d.tempo);
	const scaleTempo = d3.scaleLinear().domain([moderatoTempo, tempoRange[1]]).range([0, -3]);

	if (scaleTempo(tempoRange[0]) > 1.5) {
		scaleTempo.domain([tempoRange[0], moderatoTempo]).range([1.5, 0]);
	}		

	const keys = {};
	sections.forEach(s => { keys[s.key] = true });
	const allKeys = Object.keys(keys).sort((f, s) => f - s);
	const scaleKey = d3.scalePoint()
							.domain(allKeys)
							.range([0, 1])
							.padding(1);

	const maxDuration = d3.max(sections, d => d.group.order == 0 ? d.duration : 0);
	const scaleDuration = d3.scaleLinear().domain([0, maxDuration]);

	const scaleGroupColor = d3.scaleOrdinal()
								.domain([0, 1, 2, 3, 4])
								.range(["#216594", "#913371", "#DE7F5F"]);

	return {
		loudness: scaleLoudness,
		tempo: scaleTempo,
		key: scaleKey,
		duration: scaleDuration,
		groupColor: scaleGroupColor
	};
};

class Snowflake extends React.PureComponent { 

	scales = prepareScales();

	render() {
		const { song, size } = this.props;
		this.updateScales(size)
		return (
			<svg className="snowflake"
				width={size} height={size} >
				<def>
					{ this.renderSongPattern(song, size) }
				</def>
				<g transform={ `translate(${size / 2}, ${ size / 2})` }>
					{
						rays.map((angle) => (
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

	renderSongPattern(song) {
		let currentPos = 0;
		let currentGroup = 0;

		return (
			<g id={`pattern_${ song.id }`} className="section">
				{
					song.sections.map((section) => {

						const element = (
							<path 
								key={ section.start }
								d={ buildItem(section, this.scales) }
								transform={ `translate(0, ${ currentPos })` }
								fill={ this.scales.groupColor(section.group.order) }
								/>
						);

						if (currentGroup != section.group.id) {
							currentGroup = section.group.id;
							currentPos = currentPos + this.scales.duration(section.duration) + 2;
						}

						return element;
					})
				}
			</g>
		);
	}

	updateScales(size) {
		const maxHeight = size / (5);
		const maxWidth = maxHeight * 0.2;
		this.scales.loudness.range([0, maxWidth]);
		this.scales.duration.range([0, maxHeight]);
	}
}

export default Snowflake;