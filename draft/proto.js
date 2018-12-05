
const width = 500;
const height = 500;

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

d3.json("data/all-songs.json")
	.then((data) => {

		// 1. prepare data & scales
		const scales = prepareScales(data);

		//2. prepare svg
		const container = d3.select("#root")
							.append("svg")
								.attr("width", width)
								.attr("height", height)
							.append("g")
								.attr("transform", `translate(${width / 2}, ${ height / 2})`);

		let songId = 0;		
		const timer = setInterval(() => {
			const song = data[songId];
			renderSong(container, song, scales);
			songId++;
			if (songId >= data.length) {
				songId = 0;
				clearTimeout(timer);
			}
		}, 300);
	})
	.catch((err) => {
		console.error(err);
	});

function renderSong(container, songData, scales) {

		container.selectAll("*").remove();

		let pos = 0;
		container
			.append("defs")
			.append("g")
				.attr("id", "pattern")
			.selectAll(".section")
				.data(songData.sections).enter()
				.append("path")
					.attr("d", d => buildItem(d, scales))
					.attr("transform", (d, i) => {
						const res = `translate(0, ${ pos })`;
						pos = pos + scales.duration(d.duration) + 2;
						return res;
					})
					.style("stroke", "#cbcbcb")
					.style("fill", "#c6e1e4");

		const lines = container
			.selectAll(".line")
			.data([0, 60, 120, 180, 240, 300]).enter()
			.append("g")
				.attr("class", "line")
				.attr("transform", (d) => `rotate(${d})`);

		lines
			.append("use")
			.attr("xlink:href", "#pattern");
}

function prepareScales(data) {
		const maxHeight = height / (4);
		const maxWidth = maxHeight * 0.2;
		const sections = data.flatMap(item => item.sections);
		const loudnessRange = d3.extent(sections, d => d.loudness);
		const scaleLoudness = d3.scaleLinear()
									.domain(loudnessRange)
									.range([0, maxWidth]);

		const moderatoTempo = 80;
		const tempoRange = d3.extent(sections, d => d.tempo);
		const scaleTempo = d3.scaleLinear()
							.domain([moderatoTempo, tempoRange[1]])
							.range([0, -3]);

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

		const maxDuration = d3.max(sections, d => d.duration);
		const scaleDuration = d3.scaleLinear()
									.domain([0, maxDuration])
									.range([0, maxHeight]);
		return {
			loudness: scaleLoudness,
			tempo: scaleTempo,
			key: scaleKey,
			duration: scaleDuration
		};
};
 