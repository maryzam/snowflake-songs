const maxWidth = 25;
const maxHeight = 50;
const maxCount = 10;

d3.json("data/all-songs.json")
	.then((data) => {

		// 1. prepare data

		const sections = data.flatMap(item => item.sections);
	
		const sectionsByKey = {};
		sections.forEach(s => {
			sectionsByKey[s.key] = sectionsByKey[s.key] || [];
			if (sectionsByKey[s.key].length < maxCount) {
				sectionsByKey[s.key].push(s);
			}
		});

		const tempoRange = d3.extent(sections, d => d.tempo);
		const loudnessRange = d3.extent(sections, d => d.loudness);

		// 2. prepare scales

		const scaleLoudness = d3.scaleLinear()
									.domain(loudnessRange)
									.range([0, maxWidth]);

		// moderato - 110 (see https://en.wikipedia.org/wiki/Tempo)
		// scale relative position to the basic element width
		const scaleTempo = d3.scaleLinear()
								.domain(tempoRange)
								.range([-1, 1]);

		const allKeys = Object.keys(sectionsByKey).sort((f, s) => f - s);
		const scaleKeys = d3.scalePoint()
							.domain(allKeys)
							.range([maxWidth, 0])
							.padding(1);

		// render basic elements

		// add interactive generator

	})
	.catch((err) => {
		console.error(err);
	});