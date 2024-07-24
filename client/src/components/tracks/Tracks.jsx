import "./style.css";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { URL, requests, options } from "../../utils/requests";
import { FaPause, FaPlay } from "react-icons/fa";
import { GlobalContext } from "../../context/Context";

export default function Tracks({ title, id }) {
  const [tracks, setTracks] = useState([]);
  const params = {
    id: id,
  };
  const [hoveredCover, setHoveredCover] = useState(0);
  const {playSong,isPlaying,currentSong,playPause}= useContext(GlobalContext)

  const { data, loading, error } = useFetch(
    `${URL}${requests.getPlaylistTracks}?id=${params.id}`,
    options
  );

  useEffect(() => {
    if (data !== null) {
      setTracks(data.items);
    }
  }, [data]);

  function truncate(str, n) {
    if (str.length <= n) return str; // Return the original string if its length is less than or equal to n

    // Find the last space character within the substring up to length n
    const lastSpaceIndex = str.substr(0, n).lastIndexOf(" ");

    // If no space is found or the last space is at the end, truncate normally
    if (lastSpaceIndex === -1 || lastSpaceIndex === n - 1) {
      return str.substr(0, n - 1) + "...";
    } else {
      // Otherwise, truncate at the last space character
      return str.substr(0, lastSpaceIndex) + "...";
    }
  }

  return (
    <div className="container">
      <h1 className="title">{title}</h1>
      <div className="track-main-container">
        {tracks &&
          tracks.length > 0 &&
          tracks.map((trackItem, index) => {
            const albumTrack = trackItem.track;
            const artists = albumTrack.album.artists.map((artist) => {
              return artist.name;
            });
            return (
              <div className="track-container" key={albumTrack.id} 
              onClick={()=>{
                if(index === hoveredCover){
                  playSong(albumTrack)
                }
                }}
              onMouseEnter={()=>{
                setHoveredCover(index)
              }}
                >
                <div className="track-image-container">
                  <img
                    src={albumTrack.album.images[0].url}
                    alt={albumTrack.album.name}
                  />
                  
                    <div className="play-pause-btn-container" onClick={()=>playPause()}>
                    {
                      albumTrack.id === currentSong?.id && isPlaying ?
                      <FaPause size={14} className="pause-btn" />:
                      <FaPlay size={14} className="play-btn" /> 
                    }
                    </div>
                </div>
                <p className="track-name">
                  {truncate(albumTrack.name, 25)}
                </p>
                <p className="artist">{artists.join(", ")}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
