import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { URL,requests,options} from "../../utils/requests"
import "./hero.css"
import {FaHeart,FaAngleLeft,FaAngleRight} from "react-icons/fa"


export default function Hero(){
    
    const [heroData,setHeroData]=useState([])
    const [visiblePoster,setVisiblePoster]=useState(0)

   const params = {
    id:"37i9dQZF1DX5Vy6DFOcx00",
    }

    const {data,loading,error}=useFetch(`${URL}${requests.getPlaylistTracks}?id=${params.id}`,options)

    useEffect(()=>{
        if(data !== null){
            setHeroData(data.items)
        }
    },[data])
    function handleNext(){
        setVisiblePoster(prevVisiblePoster => (prevVisiblePoster === heroData.length - 1 ? 0 : prevVisiblePoster + 1));
    }
    function handlePrevious(){
        setVisiblePoster(prevVisiblePoster => (prevVisiblePoster === 0 ? heroData.length - 1 : prevVisiblePoster - 1));
    }
   
    
    return <div className="hero-container">

        {
            heroData.map((dataItem,index)=>{
                const albumTrack =dataItem.track
                const artists = albumTrack.album.artists.map(artist=>{
                    return artist.name
                })
                const bgImage = `${albumTrack.album.images[0].url}`
                return <div style={{backgroundImage:"url(./images/background.jpg)"}} className={index === visiblePoster ? "current-poster" : "current-poster hide-current-poster"} key={albumTrack.album.name}>
                    <div className="darken"></div>
                    <div className="album-info-container">
                        <h1 className="album-title">Trending hits</h1>


                        <div className="album-info-section">
                            <div className="album-image">
                                <img src={bgImage} alt={albumTrack.album.name} />
                            </div>
                            <div className="album-info">
                                <h2 className="album-name">{albumTrack.album.name}</h2>
                                <h3 className="artists-name">{artists.join(", ")}</h3>
                                <div className="buttons">
                                    <button className="listen">listen now</button>
                                    <div className="heart-icon">
                                        <FaHeart size={14}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    <div className="hero-icons">
                        <div className="hero-icon left" onClick={()=>handlePrevious()}>
                            <FaAngleLeft size={26} className='left-icon'/>
                        </div>
                        <div className="hero-icon right" onClick={()=>handleNext()}>
                            <FaAngleRight size={26} className='right-icon'/>
                        </div>
                     </div>
                </div>
            })
        }
     <div className="fade-bottom"></div>
    </div>
}