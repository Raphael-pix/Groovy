import Hero from "../../components/hero/Hero";
import Row from "../../components/Row/Row";
import Album from "../../components/albums/Albums";
import Tracks from "../../components/tracks/Tracks";


export default function Home (){
    return <div>
        <Hero className="hero-section"/>
        <Row title="top artists" className="row-section"/>
        <Album title="popular albums" parameters={{albums_limit: '100',albums_seed_tracks: '0e7ipj03S05BNilyu5bRzt', albums_seed_artists: '3xs0LEzcPXtgNfMNcHzLIP',albums_seed_genres: 'hip hop'}}/>
        <Tracks title="trending songs" id="37i9dQZEVXbNG2KDcFcKOF"/>
        <Tracks title="recent releases" id="37i9dQZEVXbrns52jyNYpL"/>
    </div>
}
