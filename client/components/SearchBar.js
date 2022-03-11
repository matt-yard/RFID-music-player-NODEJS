import React, { useState } from "react";
import { spotifyApi } from "../../util/Spotify";
import SearchResults from "./Searchresults";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    spotifyApi.setAccessToken(
      "BQAbQRqZRHdQw7mPFtY6Drs0OBXwal1SYCXPpb9iDbmW6a6xpFh0zp1amovYVl9A0ZV-2710cR9pR4J-1q8E2q2ezD50rrny3VmMY4FVLp_jwINReS4LT1pwEzJEGgAFbBo2hQ6a78yDtyQdZtAVCEPZfGikBar754iD08JX3O6WWRectAcXRwj63BckAExn3ehrzRRwF2EvgsFoKU3LkslSN_4fpgnGg_hpE30Xz__L88YJMcmGol7j9WfviaUMhdFOXLkqVNU2R_JblOTBZLLaoA8LOZwX"
    );
    const search = async () => {
      const { body } = await spotifyApi.searchTracks(searchTerm);
      setSearchResults(body.tracks.items);
      console.log(body);
    };
    search();
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a song, album, or artist"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchBar;
