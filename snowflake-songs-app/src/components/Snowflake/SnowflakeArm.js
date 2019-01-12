import React, { Fragment } from 'react';
import * as d3 from 'd3';

import Provider from "../../utils/dataProvider";
import SnowflakeItem from "./SnowflakeItem";

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

	const maxDuration = d3.max(sections, d => d.group.order === 0 ? d.duration : 0);
	const scaleDuration = d3.scaleLinear().domain([0, maxDuration]);

	return {
		loudness: scaleLoudness,
		tempo: scaleTempo,
		key: scaleKey,
		duration: scaleDuration
	};
};

class SnowflakeArm extends React.PureComponent { 

	scales = prepareScales();

	render() {

		const { song, size, maximize, animated } = this.props;
		
		this.updateScales(size, song, maximize);
		
		let currentPos = 0;
		let currentGroup = 0;
		return (
			<g id={`pattern_${ song.id }`} className="snowflake-section">
				{
					song.sections.map((section) => {
						const element = (
							<SnowflakeItem
								section={ section }
								scales={ this.scales }
								animated={ animated }
								offset={ currentPos }
							/>);
						if (currentGroup !== section.group.id) {
							currentGroup = section.group.id;
							currentPos = currentPos + this.scales.duration(section.duration) + 2;
						}
						return element;
					})
				}
			</g>
		);
	}

	updateScales(size, song, maximize) {
		const maxHeight = size / (5);
		const maxWidth = maxHeight * 0.2;
		this.scales.loudness.range([0, maxWidth]);
		this.scales.duration.range([0, maxHeight]);
		// we need to recalculate it one more time to fit exactly to fill whole svg
		if (maximize) {
			const scaleCoeff = this.getScaleCoeff(song, size);
			this.scales.loudness.range([0, Math.round(maxWidth * scaleCoeff)]);
			this.scales.duration.range([0, Math.round(maxHeight * scaleCoeff)]);
		}
	}

	getScaleCoeff(song, size) {
		let groupHeight = 0;
		let maxHeight = 0;
		let currentGroup = 0;
		let totalGroups = 0;
		song.sections.forEach((section) => {
			let currentSectionHeight = this.scales.duration(section.duration);
			if (currentGroup !== section.group.id) {
				currentGroup = section.group.id
				groupHeight = groupHeight + currentSectionHeight;
				totalGroups++;
			} 
			maxHeight = Math.max(maxHeight, (groupHeight + currentSectionHeight));
		});
		maxHeight = maxHeight + totalGroups * 2;
		return (size / 2 / maxHeight);
	}
}

SnowflakeArm.defaultProps = {
	size: 300,
	maximize: false,
	animated: false
};

export default SnowflakeArm;