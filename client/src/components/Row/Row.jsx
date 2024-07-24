import {useEffect, useState} from "react"
import useFetch from "../../hooks/useFetch"
import { URL,requests,options } from "../../utils/requests"
import "./row.css"
import { Link } from "react-router-dom";


export default function Row({title}){

    const [artistsId,setArtistsId]=useState("")
    const [artists,setArtists]=useState([])
    const params = {
        id:"37i9dQZF1DXcBWIGoYBM5M",
        offset:0,
        limit:12,
        }
    

    const {data,loading,error}=useFetch(`${URL}${requests.getPlaylistTracks}?id=${params.id}&offset=${params.offset}&limit=${params.limit}`,options)
   
    async function fetchArtists(){
   
            try{
                const response = await fetch(`${URL}${requests.getArtists}?ids=${artistsId}`,options)
                const data =await response.json()
                setArtists(data.artists)
            }catch(err){
                console.log(err)
            }
    }
    useEffect(()=>{
        if(artistsId !== ""){
            fetchArtists()
        }
    },[artistsId])


    function getArtists(){
        const cpyArtists = []
        data.items.map(dataItem=>{
           const artistsArray= dataItem.track.artists
           artistsArray.map(artists=>{
                if(cpyArtists.includes(artists.id)){
                    return null
                }
                cpyArtists.push(artists.id)
                setArtistsId(cpyArtists.join())
           })
        })
    }
    useEffect(()=>{
        if(data !== null){
            getArtists()
        }
    },[data])

    function shortenMillionsNumber(number) {
        // Check if the number is in millions
        if (number >= 1000000) {
            // Convert the number to millions with one decimal place
            const millionNumber = (number / 1000000).toFixed(1);
    
            // Check if the number has a fractional part
            if (millionNumber % 1 === 0) {
                // If it's a whole number, remove the decimal part
                return `${parseInt(millionNumber)} M`;
            } else {
                // If it has a decimal part, keep one decimal place
                return `${millionNumber} M`;
            }
        } else {
            // If the number is not in millions, return the original number
            return number.toString();
        }
    }
    

    return <div className="row-container">
        <h1 className="row-title">{title}</h1>
        <div className="artist-row-container">
            {
                artists.map((artist)=>{
                    return <div className="artist-container" key={artist.id}>
                         <Link to={`/artist-details/${artist.id}`}>
                            <img src={artist.images[1].url} alt={artist.name} className="artist-image"/>
                            <p className="artist-name">{artist.name}</p>
                            <p className="artist-followers">{`${shortenMillionsNumber(artist.followers.total)} followers`}</p>
                        </Link>
                    </div>
                })
            }
        </div>


    </div>
}