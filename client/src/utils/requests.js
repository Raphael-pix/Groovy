export const URL = import.meta.env.VITE_API_URL
export const DEPRECIATED_API_KEY_3 =import.meta.env.VITE_API_KEY_3
export const API_KEY = import.meta.env.VITE_API_KEY
export const DEPRECIATED_API_KEY_1= import.meta.env.VITE_API_KEY_2
export const API_HOST = import.meta.env.VITE_API_HOST


export const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
    }
};

export const requests = {
    getSearch:"/search/",
    getExplore:"/browse_all/",
    
    getAlbums:"/albums/",
    getAlbumMetaData:"/album_metadata/",
    getAlbumTracks:"/album_tracks/",
    
    getArtists:"/artists/",
    getArtistsOverview:"/artist_overview/",
    getArtistsDiscographyOverview:"/artist_discography_overview/",
    getArtistsAlbums:"/artist_albums/",
    getArtistsSingles:"/artist_singles/",
    getArtistsAppearsOn:"/artist_appears_on/",
    getArtistsDiscoveredOn:"/artist_discovered_on/",
    getArtistsFeaturing:"/artist_featuring/",
    getArtistsRelated:"/artist_related/",

    getTracks:"/tracks/",
    getTrackCredits:"/track_credits/",
    getTrackLyrics:"/track_lyrics/",
    getTrackReccomandations:"/recommendations/",

    getPlaylists:"/playlist/",
    getPlaylistTracks:"/playlist_tracks/",

    getGenre:"/genre_view/",
}