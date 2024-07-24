import "./player.css";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoMdShuffle } from "react-icons/io";
import { MdSkipNext, MdSkipPrevious, MdClose } from "react-icons/md";
import { PiMicrophoneStage } from "react-icons/pi";
import { HiOutlineQueueList } from "react-icons/hi2";
import { useContext, useRef} from "react";
import { GlobalContext } from "../../context/Context";
import AddToFavoutites from "../addBtn/add-btn";
import Popup from "../popup/popup";

export default function Player({audioElem}) {
  const {
    isPlaying,
    setIsVisible,
    setIsPlaying,
    currentSong,
    formatTime,
    duration,
    playPause,
    isPopupVisible,
    setIsPopupVisible
  } = useContext(GlobalContext);
  const clickRef = useRef()

  function closePlayer(){
    setIsPlaying(false)
    setIsVisible(false)
  }
  function checkWidth(e){
    let width = clickRef.current.clientWidth
    let offset = e.nativeEvent.offsetX

    const divProgress = offset/width * 100
    audioElem.current.currentTime = divProgress/100 * duration.length
  }
  if (!currentSong) {
    return null
  }
    const artists = currentSong.album?.artists?.map((artist) => {
      return artist.name;
    });
    return (
      <div className="player-container">
        <div className="player-details">
          <div className="song-image-container">
            <img
              src={ '' || currentSong.album?.images[0]?.url}
              alt={currentSong.album?.name ||""}
            />
          </div>
          <div className="song-info">
            <p className="song-name">{currentSong?.name || 'name not available'}</p>
            <p className="artist-name">{artists||'artists not available'}</p>
          </div>
          <AddToFavoutites/>
        </div>

        <div className="player">
          <div className="player-controls">
            <IoMdShuffle size={20} className="shuffle-btn control-btn" />
            <MdSkipPrevious size={20} className="previous-btn control-btn" />
            <div className="Play-pause-btn" onClick={()=>playPause()}>
              {isPlaying ? (
                <FaPause size={12} className="pause-btn control-btn" />
              ) : (
                <FaPlay size={12} className="play-btn control-btn" />
              )}
            </div>
            <MdSkipNext size={20} className="next-btn control-btn" />
          </div>
          <div className="progress-bar">
            <p className="time-played time">
              {
              duration.progress ?
               `${formatTime(duration.progress*1000)}`
              : "00:00"
              }
            </p>
            <div className="bar" onClick={checkWidth} ref={clickRef}>
              <div className="progress" style={{width:`${duration.progress}%`}}></div>
            </div>
            <p className="full-time time">
              {
               currentSong?.duration_ms?
                `${formatTime(currentSong?.duration_ms)}`
              : "--:--" 
              }
            </p>
          </div>
        </div>

        <div className="supplementary-controls">
          <PiMicrophoneStage size={20} className="lyrics-btn control-btn" />
          <HiOutlineQueueList size={20} className="queue-btn control-btn" />
          <MdClose size={20} className="close-btn control-btn"  onClick={()=>{
            closePlayer()
          }}/>
        </div>
        {isPopupVisible && <Popup message="Music not available" onClose={() => setIsPopupVisible(false)} />}
      </div>
    );
}
