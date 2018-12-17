
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

		data.forEach((song) => { groupSections(song); });

		// 1. prepare data & scales
		const scales = prepareScales(data);

		//2. prepare grid & svg
		const columns = 3;
		const rows = Math.ceil(data.length / columns);

		const container = d3.select("#root")
							.append("svg")
								.attr("width", width * columns)
								.attr("height", height * rows);

		// render song's snowflakes
		data.forEach((song, id) => {
			const currentColumn = id % 3;
			const currentRow = Math.floor(id / 3);
			const ph = container
							.append("g")
							.attr("transform", `translate(${width * (0.5 +  currentColumn)}, ${ height * (0.5 + currentRow)})`);
			renderSong(ph, song, id, scales);
		});
	})
	.catch((err) => {
		console.error(err);
	});

function groupSections(songData) {
	// shared constants
	const maxGroupCount = 5;
	const maxPerGroup = 4;
	// related to the song
	const sectionTotal = songData.sections.length;
	const groupTotal = sectionTotal > maxGroupCount ? maxGroupCount : sectionTotal;
	const groupSize = Math.ceil(sectionTotal / groupTotal);
	const maxGroupDuration = Math.ceil(songData.duration_ms / groupTotal) / 1000;
	// gropping
	let currentGroup = 0;
	let currentOrder = 0;
	let currentDuration = 0;
	songData.sections.forEach((section, idx) => {

		if (currentDuration > maxGroupDuration || currentOrder >= groupSize) {
			currentOrder = 0;
			currentDuration = 0;
			currentGroup = currentGroup + 1;
		}

		section["group"] = {
			id: currentGroup,
			order: currentOrder,
		};
		
		currentOrder = currentOrder + 1;
		currentDuration = currentDuration + section.duration;
	});

	return songData;
}

function renderSong(container, songData, songId, scales) {
		console.log(songData);
		container.selectAll("*").remove();
		let currentPos = 0;
		let currentGroup = 0;

		container
			.append("defs")
			.append("g")
				.attr("id", `pattern_${songId}`)
			.selectAll(".section")
				.data(songData.sections).enter()
				.append("path")
					.attr("d", d => buildItem(d, scales))
					.attr("transform", (d, i) => {
						const res = `translate(0, ${ currentPos })`;
						if (currentGroup != d.group.id) {
							currentGroup = d.group.id;
							currentPos = currentPos + scales.duration(d.duration) + 2;
						}
						return res;
					})
					.style("stroke", "#cbcbcb")
					.style("fill", d => scales.groupColor(d.group.order))
					.style("fill-opacity", 0.5);

		const lines = container
			.selectAll(".line")
			.data([0, 60, 120, 180, 240, 300]).enter()
			.append("g")
				.attr("class", "line")
				.attr("transform", (d) => `rotate(${d})`);

		lines
			.append("use")
			.attr("xlink:href", `#pattern_${songId}`);

		container
			.append("text")
				.attr("transform", `translate(0, ${30 - height / 2})`)
				.style("text-anchor", "middle")
				.style("fill", "#ffffff")
				.style("font-family", "monospace")
			.selectAll("tspan")
			.data(songData.Song.split("–")).enter()
				.append("tspan")
				.text(d => d)
				.attr("x", 0)
				.attr("dy", (d, idx) => idx * 15);
}

function prepareScales(data) {
		const maxHeight = height / (5);
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

		const maxDuration = d3.max(sections, d => d.group.order == 0 ? d.duration : 0);
		const scaleDuration = d3.scaleLinear()
									.domain([0, maxDuration])
									.range([0, maxHeight]);


		const scaleGroupColor = d3.scaleOrdinal()
								.domain([0, 1, 2, 3, 4])
								.range(["#8BA7B3", "#F0D6E3", "#F2BABD"]);

		return {
			loudness: scaleLoudness,
			tempo: scaleTempo,
			key: scaleKey,
			duration: scaleDuration,
			groupColor: scaleGroupColor
		};
};
 