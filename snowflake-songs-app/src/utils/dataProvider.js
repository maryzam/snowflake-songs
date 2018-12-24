import source from "../data/all-songs.json";

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

// our data doen't change dynamically
// so we don't need to recalculate it on each request to data provider
const songs = source.map((song, id) => Object.assign({ id }, groupSections(song)));

const getTitles = () => songs.map((d) => d.Song);
const getAllSongs = () => songs;
const getSong = (id) => songs[id];

export default {
	getTitles,
  getAllSongs,
  getSong
};
