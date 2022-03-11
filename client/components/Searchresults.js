import React from "react";
import { Link } from "react-router-dom";
import { setSelectedTrack } from "../store/selectedTrack";
import { useDispatch } from "react-redux";

const SearchResults = (props) => {
  const { results } = props;
  const dispatch = useDispatch();
  return (
    <div>
      {!results.length ? (
        <div></div>
      ) : (
        <div className="search-results-container">
          {results.map((result) => {
            return (
              <Link to={`/songs/${result.id}`}>
                <div
                  className="song-tile"
                  onClick={() => dispatch(setSelectedTrack(result))}
                >
                  <img src={result.album.images[2].url} />

                  <p>
                    {result.name} by {result.artists[0].name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
