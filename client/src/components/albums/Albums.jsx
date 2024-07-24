import "./albums.css"
import {useContext,useEffect, useState} from "react"
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/Context"
import useFetch from "../../hooks/useFetch"
import { URL,requests,options } from "../../utils/requests"

export default function Album({title,parameters}){
    
    const {truncate} = useContext(GlobalContext)
    const [albums, setAlbums] = useState(() => {
        const savedAlbums = localStorage.getItem('albums');
        return savedAlbums ? JSON.parse(savedAlbums) : [];
      });
    const params = parameters
    const {data,loading,error}=useFetch(`${URL}${requests.getTrackReccomandations}?limit=${params.albums_limit}&seed_tracks=${params.albums_seed_tracks}&seed_artists=${params.albums_seed_artists}&seed_genres=${params.albums_seed_genres}​`,options)
    useEffect(() => {
        if (data !== null) {
          setAlbums(data.tracks);
          localStorage.setItem('albums', JSON.stringify(data.tracks));
        }
      }, [data]);
      //problem : when reloading the page or moving back and forth from different pages the ablums are changed
      

    return <div className="container">
        <h1 className="title">{title}</h1>
        <div className="AnT-container">
            {
               // eslint-disable-next-line array-callback-return
               albums && albums.length > 0 && 
               (()=>{
                const albumIds = []
               return albums.map((albumItem)=>{
                const artists =  albumItem.album.artists.map((item)=>{
                    return item.name
               })
               if(albumIds.includes(albumItem.album.id)){
                return null
               }
               albumIds.push(albumItem.album.id)
                const year = new Date(`${albumItem.album.release_date}`)
                if(year.getFullYear() >= 2018){
                    return <div className="album-container" key={albumItem.album.id}>
                        <Link to={`/album-details/${albumItem.album.id}`}>
                        
                            <div className="album-image-container">
                                <img src={albumItem.album.images[0].url} alt={albumItem.album.name} />
                            </div>
                            <p className="album-name">{truncate(albumItem.album.name,25)}</p>
                            <p className="artist">{
                                artists.join(", ")
                            }</p>
                            <p className="release-date">
                                {year.getFullYear()}
                            </p>
                        </Link>
                        </div>
                }
                })
            })()
            }

        </div>
    </div>
}