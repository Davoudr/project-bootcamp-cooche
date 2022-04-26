import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import DeckGL, { GeoJsonLayer } from "deck.gl";
// import Geocoder from 'react-mapbox-gl-geocoder';

// import Geocoder from "react-map-gl-geocoder";
// import 'mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// ================================================================== main component
const Address = () => {
  const mapContainer = useRef(null);
  const searchContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZGF2b3VkcmsiLCJhIjoiY2wyNWZzMWRlMDYzZzNpbWxuazd1MnA2NyJ9.ruoIQqWOvRFY11sDuYxNQg";

  useEffect(() => {
    if (!map.current) {
      // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-79.4512, 43.6568],
        zoom: 13,
      });
      const geocoder = new MapboxGeocoder({
        container: searchContainer.current,
        accessToken: mapboxgl.accessToken,
        language: "EN",
        mapboxgl: mapboxgl,
      });
      map.current.addControl(geocoder);
    }
  }, []);
  return (
    <Div>
      <div id="map" ref={mapContainer}></div>
      <div id="geocoder" className="geocoder" ref={searchContainer}></div>
    </Div>
  );
};
// ==================================================================
export default Address;

const Div = styled.div`
  .geocoder {
    position: absolute;
    z-index: 1;
    /* width: 50%;
    left: 50%; */
    margin-left: -25%;
    top: 10px;
  }
  .mapboxgl-control-container {
    min-width: 200px;
    position: absolute;
    z-index: 150;
    left: -50px;
  }
  .mapboxgl-ctrl-geocoder {
    transition: all ease 10s;
    z-index: 1000;
    position: absolute;
    margin-top: 410px;
  }
  #map {
    position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    width: 200px;
    margin: auto;
    margin-top: 75px;
    width: 50%;
  }
`;
