import Album from "../../components/albums/Albums";


export default function Albums(){
    return <div>
        <Album title="popular albums" parameters={{albums_limit: '100',albums_seed_tracks: '0e7ipj03S05BNilyu5bRzt', albums_seed_artists: '3xs0LEzcPXtgNfMNcHzLIP',albums_seed_genres: 'hip hop'}}/>
         <Album title="african" parameters={{albums_limit: '100',albums_seed_tracks: '3JozQbIWMHBTKIghXKehVy,20343pokdYcX08GtQQfaqX', albums_seed_artists: '3ZpEKRjHaHANcpk10u6Ntq,5yOvAmpIR7hVxiS6Ls5DPO',albums_seed_genres: 'afro beats'}}/>
        <Album title="House" parameters={{albums_limit: '100',albums_seed_tracks: '0nrRP2bk19rLc0orkWPQk2,698ItKASDavgwZ3WjaWjtz', albums_seed_artists: '1vCWHaC5f2uS3yhpwWbIA6,7vk5e3vY1uw9plTHJAMwjN',albums_seed_genres: 'house'}}/>
        <Album title="Trending" parameters={{albums_limit: '100',albums_seed_tracks: '0e7ipj03S05BNilyu5bRzt', albums_seed_artists: '3xs0LEzcPXtgNfMNcHzLIP',albums_seed_genres: 'hip hop'}}/>
    </div>
}