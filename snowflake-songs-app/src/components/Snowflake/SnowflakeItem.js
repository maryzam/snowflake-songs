import React, { Fragment } from 'react';

const buildPath = (d, scales) => {
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

const SnowflakeItem = ({ section, scales, animated = false, offset = 0 }) => {

	const shouldScale = animated && (section.group.id > 2 || section.group.order > 0);
	return (
		<path 
			d={ buildPath(section, scales) }
			transform={ `translate(0, ${ offset })${ shouldScale ? "scale(0)": ""}` }
			opacity={ animated ? 0.1 : 1 }>
			{
				animated 
					? (<Fragment>
						<animate attributeName="opacity" 
							from="0.1" to="1" fill="freeze"
							begin={ `${section.start}s` } 
							dur={ `${section.duration}s` }
							repeatCount={ 1 } />
							{
								shouldScale 
								? (<Fragment>
									<animateTransform attributeName="transform"
										type="translate" fill="freeze"
										from={ `0, ${ offset }`} 
										to={ `0, ${ offset }` }
										begin={ `${section.start}s` } 
										dur={ `${section.duration}s` }
										repeatCount={ 1 } />
									<animateTransform attributeName="transform"
									    type="scale"
										from="0 0" to="1 1" fill="freeze"
										begin={ `${section.start}s` } 
										dur={ `${section.duration}s` }
										repeatCount={ 1 } additive="sum" />
									</Fragment>) 
								: null
							}								            
							</Fragment>) 
					: null
				}
			</path>
		);
}

export default SnowflakeItem;