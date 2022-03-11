import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTrack } from "../store/selectedTrack";
import axios from "axios";

const SingleSong = () => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.selectedTrack);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    return () => {
      dispatch(setSelectedTrack({}));
    };
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/songs", {
        spotifyId: track.id,
        type: track.type,
      });
      setIsLoading(false);
      console.log(data);
      setResponse(data);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  console.log(track);
  return (
    <div id="single-song">
      <img src={track.album.images[0].url} />
      <h1>{track.name}</h1>
      <h3>By {track.artists[0].name}</h3>
      <button onClick={handleClick} disabled={isLoading}>
        Assign to Card
      </button>
      {isLoading ? <h3>Waiting for a card to scan...</h3> : ""}
      {response.id ? (
        <div id="success-message">
          <p>Success! You can now use this card to play {track.name}!</p>
        </div>
      ) : error.status ? (
        <div id="error-message">
          <p>Something went wrong. Try again, or use a different card</p>
        </div>
      ) : (
        <h3></h3>
      )}
    </div>
  );
};

export default SingleSong;
