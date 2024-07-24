import axios from "axios"
import { useState,useContext, useEffect} from "react"
import Songs from "../../components/tracks/song"
import { GlobalContext } from "../../context/Context"

export default function Favorites(){
    
    const {favourites,setFavourites} = useContext(GlobalContext)
    const [loading,setLoading] = useState(false)


    async function fetchFavourites(){
        setLoading(true)
        try{
         const response = await axios.get('http://localhost:5000/api/favourites')
         const result = await response.data
         if(result){
            setLoading(false)
            setFavourites(result.favouritesList)
        }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchFavourites()
    },[])

    if(loading){
        return <div>loading</div>
    }
    return <div className="favourites-conatiner">
       {
        favourites.length === 0 ? 
            <p style={{color:'white',fontWeight:'600',fontSize:'40px',display:'flex',justifyContent:'center',alignItems:'center',margin:'40px auto'}}>Favourites is empty. Please add songs</p>
        :
        favourites && favourites.length ?
        favourites.map((favouriteItem,index)=>{
            return <Songs trackItem={favouriteItem} index={index} key={favouriteItem._id}/>
        }) : 
         null
       }
    </div>
}