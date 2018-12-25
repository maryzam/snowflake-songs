import source from "../data/all-songs.json";

const groupSections = (songData) => {
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

const splitSongTitle = (songTitle) => {
   const parts = songTitle.split('–');
   if (parts.length < 2) {
      return { Title: songTitle };
   }

   return {
    Autor: parts[0],
    Title: parts[1]
   };
}

const processSong = (song, id) => {
  const songInfo = splitSongTitle(song.Song);
  return Object.assign({ id }, groupSections(song), { Song: songInfo });
}
// our data doen't change dynamically
// so we don't need to recalculate it on each request to data provider
const songs = source.map(processSong);

const getTitles = () => songs.map((d) => d.Song);
const getAllSongs = () => songs;
const getSong = (id) => songs[id];

export default {
	getTitles,
  getAllSongs,
  getSong
};
