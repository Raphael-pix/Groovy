import { useContext, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { GlobalContext } from "../../context/Context";
import axios from 'axios'

export default function AddToFavoutites(){
    
    const {currentSong,favourites,setFavourites,isFavourites,setIsFavourites}= useContext(GlobalContext)

    async function toggleSong(currentSong, favourites, setFavourites, isFavourites, setIsFavourites){

        if(isFavourites){
            removeFromFavorites(currentSong?.id)
            const updatedFavourites = favourites.filter(favouriteItem => favouriteItem.track_id !== currentSong.id)
            setFavourites(updatedFavourites)
            setIsFavourites(false)
        }else{
            addToFavourites()
            const newFavourite = {
                track_id: currentSong?.id,
                track : currentSong
            }
            const updatedFavourites = [...favourites, newFavourite];
            setFavourites(updatedFavourites);
            setIsFavourites(true);
        }
    }


    async function addToFavourites(){
        try{
            const response = await axios.post('http://localhost:5000/api/add',{
                track_id: currentSong?.id,
                track : currentSong
            })
            const result = await response.data
            if(result){
                console.log('song added successfully')
            }
           }catch(err){
            console.log(err)
           }
    }

    async function removeFromFavorites(getCurrentId){
        try{
            const response = await axios.delete(`http://localhost:5000/api/remove/${getCurrentId}`)
            const result = response.data
            if(result){
                console.log('song removed successfully')
            }
        }catch(err){
            console.log(err)
        }
    }
    function checkIfInFavourite() {
        const isFavourite = favourites.some(favouriteItem => 
            favouriteItem.track_id === currentSong?.id
        );
        setIsFavourites(isFavourite);
      }
    
    useEffect(()=>{
        if(currentSong){
            checkIfInFavourite()
        }
    },[currentSong])
    
    return <>
        <FaHeart size={14} style={{color: isFavourites ? '#FF0800' : 'white'}} className="favourite-btn control-btn" onClick={()=>toggleSong(currentSong, favourites, setFavourites, isFavourites, setIsFavourites)} />
    </>
}

//onClick={toggleSong(currentSong, favourites, setFavourites, isFavourites, setIsFavourites)}