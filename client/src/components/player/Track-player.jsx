import { useContext, useEffect} from "react";
import Player from "./Player";
import { GlobalContext } from "../../context/Context";


export default function TrackPlayer(){
    const {isPlaying,currentSong,duration,setDuration,audioElem,setIsPopupVisible}=useContext(GlobalContext)

    useEffect(() => {
        if (audioElem.current) {
          if (!currentSong?.preview_url) {
            setIsPopupVisible(true);
            const timer = setTimeout(() => {
              setIsPopupVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
          }
            const playAudio = async () => {
              try {
                audioElem.current.src = currentSong.preview_url;
                await audioElem.current.load(); 
                if (isPlaying) {
                  await audioElem.current.play();
                }
              } catch (error) {
                console.error("Failed to play audio:", error);
              }
            };
            playAudio()
        }
      }, [currentSong]);
      
      useEffect(() => {
        if (audioElem.current) {
          if (isPlaying) {
            audioElem.current.play().catch(error => {
              console.error("Failed to play audio:", error);
            });
          } else {
            audioElem.current.pause();
          }
        }
      }, [isPlaying]);

      function onPlaying(){
        const totalTime = audioElem.current.duration
        const currentTime = audioElem.current.currentTime

        setDuration({...duration, 'progress': currentTime/totalTime * 100, 'length': totalTime})
      }

    if(!currentSong){
        return null
    }

    return <div>
        <audio ref={audioElem} onTimeUpdate={onPlaying}/>
        <Player audioElem={audioElem}/>
    </div>
}
