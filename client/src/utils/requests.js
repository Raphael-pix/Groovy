export const URL = "https://spotify23.p.rapidapi.com"
export const DEPRECIATED_API_KEY_3 ="7f9254305bmsh4caf730384d07f5p1d0df5jsncb87eaf4f2f6"
export const API_KEY = "d8e77abb4dmsha4e5f3ab69e9a0ep166b1djsn6ae846fafdbc"
export const DEPRECIATED_API_KEY_1= '26dfee1055msh42e32d854c5bfcdp10afe4jsn53929a03fa09'
export const API_HOST = 'spotify23.p.rapidapi.com'


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