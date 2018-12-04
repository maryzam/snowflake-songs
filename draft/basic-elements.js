const maxWidth = 50;
const maxHeight = 100;
const maxCountPerRow = 100;
const yOffset = 20;

d3.json("data/all-songs.json")
	.then((data) => {

		// 1. prepare data

		const sections = data.flatMap(item => item.sections);
	
		const counter = {}
		const demoSections = [];
		sections.forEach((s) => {
			counter[s.key] = counter[s.key] || 0;
			if (counter[s.key] < maxCountPerRow) {
				s.order = counter[s.key];
				demoSections.push(s);
			}
			counter[s.key]++;
		});

		// 2. prepare scales
		const loudnessRange = d3.extent(sections, d => d.loudness);
		const scaleLoudness = d3.scaleLinear()
									.domain(loudnessRange)
									.range([0, maxWidth]);

		// moderato - 110 (see https://en.wikipedia.org/wiki/Tempo)
		// scale relative position to the basic element width
		const moderatoTempo = 110;
		const tempoRange = d3.extent(sections, d => d.tempo);
		const scaleTempo = d3.scaleLinear()
							.domain([moderatoTempo, tempoRange[1]])
							.range([0, 1]);

		if (scaleTempo(tempoRange[0]) < -2) {
			scaleTempo.domain([tempoRange[0], moderatoTempo]).range([-2, 0]);
		}		

		const allKeys = Object.keys(counter).sort((f, s) => f - s);
		const scaleKey = d3.scalePoint()
							.domain(allKeys)
							.range([0, 1])
							.padding(1);

		// render basic elements
		const maxPerRow = d3.max(Object.keys(counter), (d) => counter[d]);
		const container = d3.select("#root")
							.append("svg")
								.attr("width", maxWidth * maxPerRow)
								.attr("height", (maxHeight + yOffset) * allKeys.length);
		// add interactive generator
		const buildItem = (d) => {
			const itemHeight = maxHeight;
			const itemHalfWidth = scaleLoudness(d.loudness) / 2;
			const midPos = scaleKey(d.key) * itemHeight;
			const slopePos = scaleTempo(d.tempo) * itemHalfWidth;
			return `M 0 ${itemHeight} 
					Q ${-slopePos} ${midPos} ${-itemHalfWidth} ${midPos} 
					Q ${-slopePos} ${midPos} 0 0
					Q ${slopePos} ${midPos} ${itemHalfWidth} ${midPos} 
					Q ${slopePos} ${midPos}0 0 ${itemHeight}`;
		};

		container
			.selectAll(".element")
			.data(demoSections).enter()
			.append("path")
				.attr("class", "element")
				.attr("d", (d) => buildItem(d))
				.attr("transform", (d, i) => `translate(${maxWidth / 2 + d.order * maxWidth}, ${ (maxHeight + yOffset) * d.key })`)
				.style("fill", "#b6c6d6")
				.style("stroke", "steelblue");
	})
	.catch((err) => {
		console.error(err);
	});