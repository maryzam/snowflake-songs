import React, { Fragment } from 'react';
import * as d3 from 'd3';

import Provider from "../../utils/dataProvider";

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

	const maxDuration = d3.max(sections, d => d.group.order === 0 ? d.duration : 0);
	const scaleDuration = d3.scaleLinear().domain([0, maxDuration]);

	return {
		loudness: scaleLoudness,
		tempo: scaleTempo,
		key: scaleKey,
		duration: scaleDuration
	};
};

class SnowflakeRay extends React.PureComponent { 

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
						const shouldScale = animated && (section.group.id > 2 || section.group.order > 0);
						const element = (
							<path 
								key={ section.start }
								d={ buildItem(section, this.scales) }
								transform={ `translate(0, ${ currentPos })${ shouldScale ? "scale(0)": ""}` }
								opacity={ animated ? 0.1 : 1 }
							>
								{
									animated 
									? (
										<Fragment>
											<animate attributeName="opacity" 
								               from="0.1" to="1" fill="freeze"
								               begin={ `${section.start}s` } 
								               dur={ `${section.duration}s` }
								               repeatCount={ 1 } />
								            {
								            	shouldScale ?
								            	(
								            		<Fragment>
								            		<animateTransform attributeName="transform"
													    type="translate" fill="freeze"
														from={ `0, ${ currentPos }`} 
														to={ `0, ${ currentPos }` }
														begin={ `${section.start}s` } 
													    dur={ `${section.duration}s` }
													    repeatCount={ 1 } />
											        <animateTransform attributeName="transform"
													    type="scale"
														from="0 0" to="1 1" fill="freeze"
														begin={ `${section.start / 10}s` } 
													    dur={ `${section.duration / 10}s` }
													    repeatCount={ 1 } additive="sum" />
													</Fragment>
								            	) : null
								            }								            
							            </Fragment>
               						) : null
								}
							</path>
						);

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

SnowflakeRay.defaultProps = {
	size: 300,
	maximize: false,
	animated: false
};

export default SnowflakeRay;