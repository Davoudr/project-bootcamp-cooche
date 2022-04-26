import GoogleMapReact from "google-map-react";

import styled from "styled-components";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGF2b3VkcmsiLCJhIjoiY2wyNWZzMWRlMDYzZzNpbWxuazd1MnA2NyJ9.ruoIQqWOvRFY11sDuYxNQg";
// ================================================================== main component
const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  // ==================================================================
  const [search, setsearch] = useState("");
  const [suggestedAdresses, setsuggestedAdresses] = useState([]);
  const handleSearch = (ev) => {
    console.log((suggestedAdresses));
    setsearch(ev.target.value);
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${ev.target.value}.json?limit=5&proximity=ip&types=place%2Cpostcode%2Caddress&autocomplete=true&access_token=pk.eyJ1IjoiZGF2b3VkcmsiLCJhIjoiY2wyNWZzMWRlMDYzZzNpbWxuazd1MnA2NyJ9.ruoIQqWOvRFY11sDuYxNQg`
    )
      .then((res) => res.json())
      .then((data) => setsuggestedAdresses(data.features));
  };

  return (
    <Div>
      <input value={search} onChange={handleSearch} />
      {suggestedAdresses.length!==0 && suggestedAdresses.map((suggestion, index)=>{
        return( <div key={index}>{suggestion.place_name}{suggestion.matching_place_name}</div>)
      })}
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </Div>
  );
};
// ==================================================================
export default MapComponent;

const Div = styled.div`
  .map-container {
    height: 400px;
  }
  .sidebar {
    background-color: rgba(35, 55, 75, 0.9);
    color: #fff;
    padding: 6px 12px;
    font-family: monospace;
    z-index: 1;
    /* position: absolute; */
    top: 0;
    left: 0;
    margin: 12px;
    border-radius: 4px;
  }
`;
