import React from 'react';

import { ScalesProvider } from "../../providers";
import SnowflakeItem from "./SnowflakeItem";

const scales = ScalesProvider.getScales();

class SnowflakeArm extends React.PureComponent { 

	render() {

		const { song, size, maximize, animated } = this.props;
		
		this.updateScales(size, song, maximize);
		
		let currentPos = 0;
		let currentGroup = 0;
		let nextShift = scales.duration(song.sections[0].duration);
		return (
			<g id={`pattern_${ song.id }`} className="snowflake-section">
				{
					song.sections.map((section) => {
						if (currentGroup !== section.group.id) {
							currentGroup = section.group.id;
							currentPos = currentPos + nextShift + 2;
							nextShift = scales.duration(section.duration);
						}
						return (
							<SnowflakeItem
								info={ `${section.group.id}_${section.group.order}` }
								key={ section.start }
								section={ section }
								animated={ animated }
								offset={ currentPos }
							/>);
					})
				}
			</g>
		);
	}

	updateScales(size, song, maximize) {
		ScalesProvider.updateScales(size);
		if (maximize) {
			const scaleCoeff = this.getScaleCoeff(song, size);
			ScalesProvider.updateScales(size * scaleCoeff);
		}
	}

	getScaleCoeff(song, size) {
		let groupHeight = 0;
		let maxHeight = 0;
		let currentGroup = 0;
		let totalGroups = 0;
		song.sections.forEach((section) => {
			let currentSectionHeight = scales.duration(section.duration);
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