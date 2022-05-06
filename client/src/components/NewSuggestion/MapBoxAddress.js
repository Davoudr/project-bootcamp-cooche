import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import styled from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { AppContext } from "../../other/AppContext";
// ------------------------------------------------------------------
const MapBoxAddress = () => {
  // -----------------------------------
  const {
    businessInfoReducerActions: { addressFromMapOnChangeHandle },
    darkMode,
  } = useContext(AppContext);
  // -----------------------------------
  const mapContainer = useRef(null);
  const searchContainer = useRef(null);
  const map = useRef(null);
  // -----------------------------------
  //  map-box token
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;
  // -----------------------------------
  useEffect(() => {
    // -----------------
    // initializing the map
    if (!map.current) {
      // initialize map only once
      map.current = new mapboxgl.Map({
        container: "map",
        style: darkMode
          ? "mapbox://styles/mapbox/streets-v11"
          : "mapbox://styles/mapbox/dark-v10",
        center: [-73.610364, 45.497216],
        pitch: 40, // pitch in degrees
        bearing: -40, // bearing in degrees
        zoom: 10,
      });
      // adding some features onLoading the map
      map.current.on("load", () => {
        // --------------
        // 3D buildings layer
        const layers = map.current.getStyle().layers;
        const labelLayerId = layers.find(
          (layer) => layer.type === "symbol" && layer.layout["text-field"]
        ).id;
        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.current.addLayer(
          {
            id: "add-3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              // Use an 'interpolate' expression to
              // add a smooth transition effect to
              // the buildings as the user zooms in.
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );
      });
      // --------------
      // getting lat-lng onclick on map
      //   map.current.on("click", (e) => {
      //     console.log(`A dblclick event has occurred at ${e.lngLat}`);
      //   });
      // -----------------
      // initlizing geocoder (search-bar)
      const geocoder = new MapboxGeocoder({
        // container: searchContainer.current,
        accessToken: mapboxgl.accessToken,
        inputPlaceholder: "Searchddd",
        flyTo: {
          // minimum space around your result
          padding: 5,
          // not to go further than a specific zoom
          maxZoom: 17,
        },
        render: function (item) {
          const maki = item.properties.maki || "marker";
          // rendering customized suggestion dropdown for feocoder
          return `<div className='geocoder-dropdown-item'>
                    <img className='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/${maki}-15.svg'>
                    <span className='geocoder-dropdown-title'>
                    ${item.place_name.split(",")[0]}
                    </span>
                    <span className='geocoder-dropdown-text'>
                    ${
                      item.place_name.split(",")[1] !== undefined
                        ? item.place_name.slice(
                            item.place_name.indexOf(",") + 1
                          )
                        : item.place_name.split(",")[0]
                    }
                    </span>
                    </div>`;
        },
        mapboxgl: mapboxgl,
      });
      // -------------------------------
      // listener for sellecting a single suggestion from geocoder
      geocoder.on("result", function (result) {
        addressFromMapOnChangeHandle({
          address: result.result.place_name,
          lng: result.result.center[0],
          lat: result.result.center[1],
        });
      });
      // listener for all suggestion from geocoder
      geocoder.on("click", function (results) {});
      document
        .getElementById("geocoder")
        .appendChild(geocoder.onAdd(map.current));
    }
  }, []);
  // -----------------------------------
  return (
    <Wrapper>
      <div
        id="geocoder"
        className={`geocoder ${darkMode && "dark"}`}
        ref={searchContainer}
      ></div>
      <div id="map" className="map" ref={mapContainer}></div>
    </Wrapper>
  );
};
export default MapBoxAddress;
// ------------------------------------------------------------------
const Wrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  // -----------------
  .geocoder {
    z-index: 1;
    width: 50%;
    box-shadow: none;
    top: 10px;
    width: 100%;
    outline: none;
    background-color: blue;
    height: 3rem;
    &.dark {
      background-color: var(--c21);
    }
  }
  // -----------------
  .mapboxgl-ctrl-geocoder {
    min-width: 100%;
    max-width: 100%;
    box-shadow: none;
    outline: none;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* flex-flow: column; */
    flex-direction: column;
    &.dark {
      background-color: var(--c21);
    }
  }
  // -----------------
  .geocoder-dropdown-item {
    padding: 5px;
    background-color: var(--c21);
    background-color: var(--c11);
    padding: 0.5rem;
    transition: all ease-out 0.05s;
    &:hover {
      background-color: var(--c41);
      color: var(--c21);
      transition: all 0s;
      padding: 0.5rem;
      transform: scale(1.02);
      transition: all ease-out 0.05s;
      .geocoder-dropdown-title {
        color: var(--c21);
      }
      .geocoder-dropdown-text {
        color: var(--c61);
      }
    }
  }
  // -----------------
  .geocoder-dropdown-title {
    display: inline;
    font-weight: bold;
    font-size: var(--font-size-3);
    color: var(--c41);
  }
  // -----------------
  .geocoder-dropdown-icon {
    fill: red;
    margin-right: 10px;
    display: inline;
  }
  // -----------------
  .geocoder-dropdown-text {
    display: block;
    color: var(--c15);
    font-size: var(--font-size-3);
    margin-left: 2rem;
  }
  // -----------------
  #map {
    margin-top: 2rem;
    width: 100%;
    height: 400px;
    top: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: var(--box-shadow-2);
  }
  // -----------------
  .mapboxgl-control-container {
    outline: none;
  }
`;
