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

		// scale relative position to the basic element width
		const moderatoTempo = 80;
		const tempoRange = d3.extent(sections, d => d.tempo);
		const scaleTempo = d3.scaleLinear()
							.domain([moderatoTempo, tempoRange[1]])
							.range([0, -3]);

		if (scaleTempo(tempoRange[0]) > 1.5) {
			scaleTempo.domain([tempoRange[0], moderatoTempo]).range([1.5, 0]);
		}		

		const allKeys = Object.keys(counter).sort((f, s) => f - s);
		const scaleKey = d3.scalePoint()
							.domain(allKeys)
							.range([1, 0])
							.padding(1);

		// render basic elements
		const maxPerRow = d3.max(Object.keys(counter), (d) => counter[d]);
		const container = d3.select("#root")
							.append("svg")
								.attr("width", 100 + maxWidth * maxPerRow)
								.attr("height", (maxHeight + yOffset) * allKeys.length);
		// add interactive generator
		const buildItem = (d) => {
			const itemHeight = maxHeight;
			const itemHalfWidth = scaleLoudness(d.loudness) / 2;
			const midPos = scaleKey(d.key) * itemHeight;
			const slopePos = scaleTempo(d.tempo) * itemHalfWidth + itemHalfWidth;
			return `M 0 ${itemHeight} 
					Q ${-slopePos} ${midPos * 1.1} ${-itemHalfWidth} ${midPos} 
					Q ${-slopePos} ${midPos * 0.9} 0 0
					Q ${slopePos} ${midPos * 0.9} ${itemHalfWidth} ${midPos} 
					Q ${slopePos} ${midPos * 1.1}0 0 ${itemHeight}`;
		};

		const xOffset = maxWidth / 2 + 30;
		const items = container
			.selectAll(".element")
			.data(demoSections).enter()
			.append("g")
				.attr("class", "element")
				.attr("transform", (d, i) => 
					`translate(${xOffset + d.order * maxWidth}, ${ (maxHeight + yOffset) * d.key })`);
		items
			.append("path")
				.attr("d", (d) => buildItem(d))
				.style("fill", "#b6c6d6")
				.style("stroke", "steelblue");

		items
			.append("text")
			.text(d => `${Math.round(d.tempo)}bpm`)
			.attr("dy", 10)
			.style("font-size", "10px")
			.style("text-anchor", "middle");

		// add key labels
		container
			.selectAll(".key")
			.data(allKeys).enter()
			.append("text")
			.text((d) => `key:${d}`)
			.attr('transform', d => `translate(0,${ (maxHeight + yOffset) * d + maxHeight / 2})`)
			.style("font-size", "10px");
	})
	.catch((err) => {
		console.error(err);
	});