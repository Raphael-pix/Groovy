import { useContext, useState } from "react";
import "./navbar.css"
import { IoMdSearch,IoMdSettings,IoMdNotifications } from "react-icons/io";
import { URL,requests,options } from "../../utils/requests";
import { Link, NavLink} from "react-router-dom";
import { GlobalContext } from "../../context/Context";


export default function Navbar(){
    
    const [searchResults,setSeacrchResults]=useState(null)
    const [inputValue,setInputValue]=useState("")
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const {user} = useContext(GlobalContext)

    const params ={
        type:"multi",
        offset:0,
        limit:10,
        numberOfTopResults:5
    }

    const menu =[
        {
            id:1,
            label:"music",
            to:'/'
        },
        {
            id:2,
            label:"podcasts",
            to:'/podcasts'
        }
    ]

   

    function handleChange(value){
        setInputValue(value)
        if(inputValue.length>=3){
            searchInfo(value)
        }
    }
   

    async function searchInfo(value){
        setLoading(true)
        if (value !== ""){
        
            try{
                const response = await fetch(`${URL}${requests.getSearch}?q=${value}&type=${params.type}&offset=${params.offset}&limit=${params.limit}&numberOfTopResults=${params.numberOfTopResults}`,options)
                const data =await response.json()
                setSeacrchResults(data)
                setLoading(false)
            }catch(err){
                setError(err)
                console.log(error)
                setLoading(false)
            }
        }else{
            setSeacrchResults(null)
        }

    }

    return <div className="navbar-container">
        <div className="navbar">
            <div className="navbar-options">
                {
                    menu.map(menuItem=>(
                        <NavLink to={menuItem.to} className="link"key={menuItem.id} style={({isActive})=>{return {color: isActive? "#4174ff" : ""}}}>
                        <p key={menuItem.id} >{menuItem.label}</p>
                        </NavLink>
                    ))
                }
            </div>

            <div className="searchbar-container">
                <div className="searchbar">
                    <IoMdSearch size={20} className="icons search-bar-icon"/>
                    <input type="text" placeholder="Type here to search" className="search-input" value={inputValue} onChange={(e)=>handleChange(e.target.value)}/>
                </div>
                <div className="search-results">
                    <div className="results-list">
                        {
                            searchResults && searchResults !== null ? 
                                searchResults.artists.items.map(dataItem => (
                                    <div className="search-result-item" key={dataItem.data.profile.name}>
                                        <img src={dataItem.data.visuals.avatarImage.sources[0].url} alt={dataItem.data.profile.name} className="search-value-profile"/>
                                        <p className="search-value-name">{dataItem.data.profile.name}</p>
                                    </div>
                                ))
                            : null
                        }
                    </div>
                </div>
            </div>

            <div className="personal">
                <IoMdNotifications className="icons notification-icon" size={20}/>
                <IoMdSettings className="icons settings-icon" size={20}/>
                {
                    user ?
                    <div className="profile-container">
                        {/* <img src="../images/profile-card.jpg" alt="profile" /> */}
                        <p>{user.user.name || 'user'}</p>
                    </div>
                    : 
                    <Link to='/accounts/create-account'>
                        <button className="signup-btn">Sign Up</button>
                    </Link>
                }
            </div>
            
        </div>
    </div>
}