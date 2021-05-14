import apiurl from "../apiurl";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import ListGroup from "react-bootstrap/ListGroup";
import SearchResultItemChannel from "../components/SearchResultItemChannel";
import SearchResultItemVideo from "../components/SearchResultItemVideo";
import "../css/searchresult.css";
import { motion } from "framer-motion";
import { searchRouteTransition } from "../functions/routeAnimation";

const SearchResults = ({ location }) => {
  const [search, setSearch] = useState({ searchFor: "", searchQuery: "" });
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    document.title = "Search";
  }, []);
  const getQueryParams = () => {
    let string = location.search;

    /*
            regex to grab the search queries from the url  
        */
    let pattern = /\?type\=([\w]+)\&query\=([\w]+)/;

    let regex = pattern.exec(string);

    return new Promise((resolve) => {
      resolve({ searchFor: regex[1], searchQuery: regex[2] });
    });
  };

  useEffect(() => {
    setSearchResults([]);
    getQueryParams().then(({ searchFor, searchQuery }) => {
      if (searchFor.length === 0 || searchQuery.length === 0) return;

      apiurl
        .get("/api/videos/search/", {
          params: { searchFor, searchQuery },
        })
        .then((resp) => {
          if (resp.data) {
            //console.log(resp.data);
            setSearchResults(resp.data);
            setSearch({ searchFor, searchQuery });
          }
        });
    });
  }, [location]);

  return (
    <div>
      <motion.div
        variants={searchRouteTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        className="outer-div"
      >
        <Container className="mt-5">
          <ListGroup variant="flush">
            {searchResults.success ? (
              searchResults.results.map((r) =>
                search.searchFor.toLowerCase() === "videos" ? (
                  <SearchResultItemVideo
                    key={r.id}
                    searchFor={search.searchFor}
                    video={r}
                  />
                ) : (
                  <SearchResultItemChannel key={r.id} channel={r} />
                )
              )
            ) : (
              <h1>{searchResults.message}</h1>
            )}
          </ListGroup>
        </Container>
      </motion.div>
    </div>
  );
};

export default SearchResults;
