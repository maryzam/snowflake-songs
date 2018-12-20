import songs from "../data/all-songs.json";

const songTitle = 'SongTitle';
const spotifyID = 'Spotify ID';


function getTitles() {
	return songs.map((d) => (d[songTitle]));
}

function getMainInfo() {
  return songs.map( (d,i) => {
    return {
      id: i,
      title: d[songTitle],
      spotifyID: d[spotifyID]
    }
  });
}

function getSong(id) {
  return songs[id];
}

export default {
	getTitles,
  getMainInfo,
  getSong
};
