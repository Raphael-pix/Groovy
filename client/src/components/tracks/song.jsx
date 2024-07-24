import { useContext, useState } from "react";
import {FaPlay} from 'react-icons/fa'
import { GlobalContext } from "../../context/Context";


export default function Songs({trackItem,index}){

    const {formatTime,playSong} =useContext(GlobalContext)
    const [hover, setHover] = useState(false);
    const [hoveredTrack, setHoveredTrack] = useState(0);


    return <li 
    key={trackItem.track.name} 
    className="track-item"  
    onMouseEnter={() => {
        setHoveredTrack(index);
        setHover(true);
    }} 
    onMouseLeave={(e) => {
        try{
            if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
                setHover(false);
              }
        }catch(error){
            console.log(error)
        }
        }}
    onClick={()=>{
        if(index === hoveredTrack){
            playSong(trackItem.track)
        }
        console.log(trackItem)
    }}
    >
        <p className="track-number">
            {hover && index === hoveredTrack ? <FaPlay /> : trackItem.track.trackNumber || index+1} 
        </p>
        <p className="track-name">
            {trackItem.track.name}
        </p>
        <p  className="no-of-plays">
            {trackItem.track.playcount}
        </p>
        <p className="track-duration">
            { 
            trackItem.track.hasOwnProperty("duration_ms") ?
                formatTime(trackItem.track.duration_ms)
            :
            formatTime(trackItem.track.duration.totalMilliseconds)
            }
        </p>
    </li>
     
}