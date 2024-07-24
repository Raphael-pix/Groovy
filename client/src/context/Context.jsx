import { createContext } from "react";
import { useState, useRef } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [albums, setAlbums] = useState([]);
  const [albumsDetails, setAlbumsDetails] = useState(null);
  const [albumsTrackDetails, setAlbumsTrackDetails] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [isFavourites, setIsFavourites] = useState([]);
  const [signupData, setSignupData] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [user,setUser] = useState(null);
  const [isPopupVisible,setIsPopupVisible]=useState(false)
  const audioElem = useRef(null);
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

  function formatTime(milliseconds) {
    // Convert milliseconds to seconds
    const totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format the time as "m:ss"
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    return formattedTime;
  }
  function playSong(getSongData) {
    setCurrentSong(getSongData);
    setIsPlaying(true);
    setIsVisible(true);
  }
  function playPause() {
    if (isPlaying) {
      audioElem.current.pause();
    } else {
      audioElem.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <GlobalContext.Provider
      value={{
        albums,
        setAlbums,
        truncate,
        albumsDetails,
        setAlbumsDetails,
        albumsTrackDetails,
        setAlbumsTrackDetails,
        formatTime,
        isPlaying,
        setIsPlaying,
        currentSong,
        setCurrentSong,
        songs,
        setSongs,
        isVisible,
        setIsVisible,
        playSong,
        duration,
        setDuration,
        audioElem,
        playPause,
        favourites,
        setFavourites,
        isFavourites,
        setIsFavourites,
        signupData,
        setSignupData,
        loginData,
        setLoginData,
        user,
        setUser,
        isPopupVisible,
        setIsPopupVisible
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
