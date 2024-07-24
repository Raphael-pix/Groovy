import "./artist-details.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { URL, requests, options } from "../../utils/requests";
import { FaPlay } from "react-icons/fa";
import { IoMdShuffle } from "react-icons/io";
import Songs from "../../components/tracks/song";

export default function ArtistData() {
  const { id } = useParams();
  const [artistDetails, setArtistDetails] = useState(null);

  const {
    data: artistData,
    loading: artistLoading,
    error: artistError,
  } = useFetch(`${URL}${requests.getArtistsOverview}?id=${id}`, options);

  useEffect(() => {
    if (artistData !== null) {
      setArtistDetails(artistData.data.artist);
    }
  }, [artistData]);

  if (artistDetails && artistDetails !== null) {
    return (
      <div className="container">
        <div
          className="artist-details-container"
          style={{
            "--main-color":
              artistDetails.visuals.headerImage.extractedColors.colorRaw.hex,
          }}
        >
          <div
            className="hero-section"
            style={{
              background: `url(${artistDetails.visuals.headerImage.sources[0].url}) center`,
              backgroundSize: 'cover'
            }}
          >
            <div className="artist-details">
              {artistDetails.profile.verified ? (
                <div className="verified">
                  <img
                    src="../../../images/ic--round-verified.svg"
                    alt="verified icon"
                    width={24}
                    height={24}
                  />
                  verified
                </div>
              ) : null}
              <h1 className="artist-details-name">
                {artistDetails.profile.name}
              </h1>
              <p className="monthly-listeners">
                {artistDetails.stats.monthlyListeners} monthly listeners
              </p>
            </div>
            <div className="fade"></div>
          </div>
          <div className="main-section">
            <div className="controls">
              <div className="play-btn-details-container">
                <FaPlay className="details-play-btn" size={16} />
              </div>
              <IoMdShuffle className="shuffle-btn" size={32} />
              <button className="follow-btn">follow</button>
            </div>

            <div className="popular-tracks">
              <ol className="track-list">
                {artistDetails.discography.topTracks.items.map(
                  (trackItem, index) => {
                    return <Songs trackItem={trackItem} index={index}/> 
                  }
                )}
              </ol>
            </div>

            <div className="discography"></div>
          </div>
        </div>
      </div>
    );
  } else return null;
}
