import "./albumDetails.css";
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { URL, requests, options } from "../../utils/requests";
import { FaPlay, FaRegClock } from "react-icons/fa";
import { IoMdShuffle, IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import Songs from "../../components/tracks/song";

export default function AlbumDetails() {
  const { id } = useParams();
  const [albumDetails, setAlbumsDetails] = useState(null);
  const [albumsTrackDetails, setAlbumsTrackDetails] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const {
    data: albumData,
    loading: albumLoading,
    error: albumError,
  } = useFetch(`${URL}${requests.getAlbumMetaData}?id=${id}`, options);
  // eslint-disable-next-line no-unused-vars
  const {
    data: trackData,
    loading: trackLoading,
    error: trackError,
  } = useFetch(
    `${URL}${requests.getAlbumTracks}?id=${id}&offset=0&limit=300`,
    options
  );

  useEffect(() => {
    if (albumData !== null) {
      setAlbumsDetails(albumData.data.album);
    }
  }, [albumData]);

  useEffect(() => {
    if (trackData !== null) {
      setAlbumsTrackDetails(trackData.data.album.tracks.items);
    }
  }, [trackData]);

  if (albumDetails && albumDetails !== null) {
    const artists = albumDetails.artists?.items?.map((item) => {
      return item?.profile?.name;
    });
    const year = new Date(`${albumDetails.date.isoString}`);
    return (
      <div className="container">
        <div
          className="album-details-container"
          style={{
            "--background-color":
              albumDetails?.coverArt?.extractedColors?.colorRaw?.hex,
          }}
        >
          <div className="hero-section">
            <img
              src={albumDetails?.coverArt?.sources[0]?.url}
              alt={albumDetails?.name}
              className="album-cover-image"
            />
            <div className="album-details">
              <h1 className="album-details-name">{albumDetails?.name}</h1>
              <p className="album-details-artists">{artists.join(', ')}</p>
              <p className="album-details-release-date">{year.getFullYear()}</p>
            </div>
            <div className="fade-bottom"></div>
          </div>
          <div className="tracks-in-albums">
            <div className="controls">
              <div className="play-btn-details-container">
                <FaPlay className="details-play-btn" size={18} />
              </div>
              <IoMdShuffle className="shuffle-btn" size={36} />
              <IoIosAddCircleOutline className="addToFavorite-btn" size={36} />
              <MdOutlineDownloadForOffline className="download-btn" size={36} />
            </div>
            <div className="tracks">
              <div className="track-header">
                <p className="track-number">#</p>
                <p className="track-name">Title</p>
                <p className="no-of-plays">Plays</p>
                <p className="track-duration">
                  <FaRegClock />
                </p>
              </div>
              <ol className="track-list">
                {albumsTrackDetails.map((trackItem, index) => {
                  return <Songs trackItem={trackItem} index={index}/>
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
}
