import { MdExplore,MdVolumeUp,MdOutlineCreateNewFolder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoAlbums,IoReload} from "react-icons/io5";
import "./sidebar.css"
import { NavLink } from "react-router-dom";

export default function SideBar(){

    const menu = [
        {
            id:1,
            label:"explore",
            icon:<MdExplore/>,
            to:"/"
        },
        {
            id:2,
            label:"genres",
            icon:<MdVolumeUp/>,
            to:"/genres"
        },
        {
            id:3,
            label:"albums",
            icon:<IoAlbums/>,
            to:"/albums"
        },
    ]

    const library = [
        {
            id:1,
            label:"Recent",
            icon:<IoReload/>,
            to:"/recents"
        },
        {
            id:3,
            label:"favourites",
            icon:<FaHeart/>,
            to:"/favorites"
        },
    ]
    const playlist = [
        {
            id:1,
            label:"create new",
            icon:<MdOutlineCreateNewFolder/>,
            to:"/new"
        },
    ]

    return <div className="sidebar-container">

        <div className="name sidebar-content">
            <img src="../images/logo.svg" alt="logo" />
            <p>Groovy</p>
        </div>

        <div className="menu sidebar-content">
            <h1 className="title">menu</h1>
            <ul className="menu-list list">
                {
                    menu.map(menuItem=>(
                        <li className="menu-item list-item" key={menuItem.id}>
                            <NavLink to = {menuItem.to} className="link"  style={({isActive})=>{return {color: isActive? "#4174ff" : ""}}}>
                                {menuItem.icon}
                                {menuItem.label}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>

        <div className="library sidebar-content">
        <h1 className="title">library</h1>
            <ul className="library-list list">
                {
                    library.map(libraryItem=>(
                        <li className="library-item list-item" key={libraryItem.id}>
                            <NavLink to = {libraryItem.to} className="link"   style={({isActive})=>{return {color: isActive? "#4174ff" : ""}}}>
                                {libraryItem.icon}
                                {libraryItem.label}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>

        <div className="playlist sidebar-content">
        <h1 className="title">playlist</h1>
            <ul className="playlist-list list">
                {
                    playlist.map(playlistItem=>(
                            <li className="playlist-item list-item" key={playlistItem.id}>
                                <NavLink to = {playlistItem.to} className="link"  style={({isActive})=>{return {color: isActive? "#4174ff" : ""}}}>
                                    {playlistItem.icon}
                                    {playlistItem.label}
                                </NavLink>
                            </li>
                    ))
                }
            </ul>
        </div>

    </div>
}