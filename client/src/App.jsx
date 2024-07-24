import { Routes,Route, useLocation } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main'; 
import Navbar from './components/Navbar/Navbar';
import SideBar from './components/SideBar/sidebar';
import Home from './pages/home';
import Albums from './pages/albums/index';
import Favorites from './pages/favourites'
import Genres from './pages/genres'
import Recents from './pages/recents'
import AlbumDetails from './pages/album-details'
import PlaylistDetails from './pages/playlist-details'
import ArtistDetails from './pages/artist-details'
import TrackPlayer from './components/player/Track-player';
import { useContext} from 'react';
import { GlobalContext } from './context/Context';
import Podcasts from './pages/podacasts/Podcasts';
import Login from './pages/forms/signin';
import Signup from './pages/forms/signup';


function App() {
 const {isPlaying,isVisible}=useContext(GlobalContext)
 const location = useLocation()

 const isAuthRoute = location.pathname === '/accounts/login' || location.pathname === '/accounts/create-account';

  return (
    <div className="App">
      {isAuthRoute ? 
      <Routes>
        <Route path="/accounts/login" element={<Login/>} />
        <Route path="/accounts/create-account" element={<Signup/>} />
      </Routes>
      :
      <>
      <SideBar/>
      <Main>
        <Navbar className="navbar-section"/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/albums' element={<Albums/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/genres' element={<Genres/>}/>
          <Route path='/recents' element={<Recents/>}/>
          <Route path='/album-details/:id' element={<AlbumDetails/>}/>
          <Route path='/playlist-details/:id' element={<PlaylistDetails/>}/>
          <Route path='/artist-details/:id' element={<ArtistDetails/>}/>
          <Route path='/podacasts' element={<Podcasts/>}/>
        </Routes>
      </Main>
      {
        isVisible || isPlaying ? 
           <TrackPlayer/>
        : null
     }
     </>
    }
    </div>
  );
}

export default App;
