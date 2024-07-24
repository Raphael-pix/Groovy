import "./genres.css"
import {useEffect, useState} from "react"
import useFetch from "../../hooks/useFetch"
import { URL,requests,options } from "../../utils/requests"


export default function Genres({title}){

    const [genres,setGenres]=useState([])
    

    const {data,loading,error}=useFetch(`${URL}${requests.getExplore}`,options)

    function getGenres(){
        setGenres(data.data.browseStart.sections.items[0].sectionItems.items)
    }
    useEffect(()=>{
        if(data !== null){
            getGenres()
        }
    },[data])
    

    return <div className="container">
        <h1 className="title">broswe all</h1>
        <div className="genres-container">
            {
                genres && genres.length > 0 && genres.map((genreItem)=>{

                    const genreData = genreItem?.content?.data?.data
                    console.log(genreData)
                    
                   if(genreData?.hasOwnProperty("cardRepresentation")){
                        return <div className="genre-container" style={{backgroundColor:`${genreData?.cardRepresentation?.backgroundColor?.hex}`}}>
                            <h1 className="genre-title">{genreData?.cardRepresentation?.title?.transformedLabel}</h1>
                            <img src={genreData?.cardRepresentation?.artwork?.sources[0]?.url} alt={genreData?.title?.transformedLabel} className="genre-image"/>
                        </div>                 
                    }
                })
            }

        </div>
    </div>
}