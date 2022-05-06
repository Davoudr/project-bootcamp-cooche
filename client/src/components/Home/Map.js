import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import styled from "styled-components";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { AppContext } from "../../other/AppContext";
import icon from "../../assets/img/location-icon-1.png";
import { BsInfoCircleFill, BsInfoCircle } from "react-icons/bs";
import Text from "./Text";
import { keyframes } from "styled-components";
// ------------------------------------------------------------------
const Map = () => {
  // -----------------------------------
  const { capitalizeFirstLetter, loading, allServices, darkMode } =
    useContext(AppContext);
  // -----------------------------------
  // map-box token
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;
  // useRef to asign element for map-box map and countainer
  const mapContainer = useRef(null);
  const map = useRef(null);
  // -----------------------------------
  // map-box / funciton to fly to the given location-obj
  const flyToStore = (currentFeature) => {
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 17,
    });
  };
  // -----------------------------------
  // map-box / function to create popUp on the map
  const createPopUp = (currentFeature) => {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    // to check if there is already a popup on the map and if so, remove it
    if (popUps[0]) {
      popUps[0].remove();
    }
    // create popUp for the given obj
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<div><h3>${currentFeature.properties.name}</h3><h4>${currentFeature.properties.address}</h4></div>`
      )
      .addTo(map.current);
  };
  // -----------------------------------
  // creating map
  useEffect(() => {
    // initializing the map if filtered-data is loaded
    if (allServices && !loading) {
      // -----------------
      map.current = new mapboxgl.Map({
        container: "map",
        style: darkMode
          ? "mapbox://styles/mapbox/streets-v11"
          : "mapbox://styles/mapbox/dark-v10",
        center: allServices.features[0].geometry.coordinates,
        pitch: 40, // pitch in degrees
        bearing: -40, // bearing in degrees
        zoom: 10,
      });
      // -----------------
      // to set some features onLoading the map
      map.current.on("load", () => {
        // ---------------
        // to set 3D layer for buildings
        const layers = map.current.getStyle().layers;
        const labelLayerId = layers.find(
          (layer) => layer.type === "symbol" && layer.layout["text-field"]
        ).id;
        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data from OpenStreetMap.
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
        // -----------------
        // adding filtered-data source to the map
        map.current.addSource("places", {
          type: "geojson",
          data: allServices,
        });
        // creating marker on the map for each obj from arr of data
        allServices.features.map((business) => {
          const el = document.createElement("div");
          el.id = `marker-${business.properties.id}`;
          el.className = "marker";
          el.innerHTML = `<img src=${icon}>`;
          // adding onClick event-listener to each marker
          el.addEventListener("click", (e) => {
            // to fly to the point
            flyToStore(business);
            // to close all other popups and display popup for clicked business
            createPopUp(business);
            // to change highlight listing in sidebar to the sellected marker
            const activeItem = document.getElementsByClassName("active");
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove("active");
            }
            const listing = document.getElementById(
              `listing-${business.properties.id}`
            );
            listing.classList.add("active");
          });
          // to create a marker using the div element defined above and add it to the map.
          new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(business.geometry.coordinates)
            .addTo(map.current);
        });
      });
    }
  }, [allServices, loading]);
  // -----------------
  // handle-onClick for listings in sidebar
  const handleLink = (ev) => {
    // creating pop-up and fly to the point
    allServices.features.map((element) => {
      if (ev.target.id === `link-${element.properties.id}`) {
        flyToStore(element);
        createPopUp(element);
      }
    });
    // conditional class for conditional styling
    const activeItem = document.getElementsByClassName("active");
    if (activeItem[0]) {
      activeItem[0].classList.remove("active");
    }
    ev.target.classList.add("active");
  };
  // -----------------------------------
  switch (true) {
    // showing loading while filtered-data is not loaded
    case loading:
      return (
        <LoadingDiv>
          <Text />
        </LoadingDiv>
      );
    // showing map and linst of locaitons if filtered-data is not empjy
    case allServices && !loading:
      return (
        <Wrapper active={loading}>
          <div className="map-and-side">
            <div className="sidebar">
              <div id="listings" className="listings">
                {allServices.features.map((businessObj, index) => {
                  return (
                    <div
                      key={index}
                      className="item"
                      id={`listing-${businessObj.properties.id}`}
                    >
                      {/* each business in lisstings */}
                      <button
                        onClick={handleLink}
                        className="title"
                        id={`link-${businessObj.properties.id}`}
                      >
                        {/* button to navigate to the businesss's page */}
                        <div className="profile">
                          {darkMode ? (
                            <BsInfoCircleFill size="2rem" />
                          ) : (
                            <BsInfoCircle size="2rem" />
                          )}
                        </div>
                        {/* content for the pop-up */}
                        <div>{`${capitalizeFirstLetter(
                          businessObj.properties.name
                        )}`}</div>
                        <div>{`${capitalizeFirstLetter(
                          businessObj.properties.country
                        )} ${capitalizeFirstLetter(
                          businessObj.properties.province
                        )}`}</div>
                        <div>
                          {capitalizeFirstLetter(
                            businessObj.properties.address
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div id="map" className="map ball" ref={mapContainer}>
              <span className="shadow"></span>
            </div>
          </div>
        </Wrapper>
      );
    default:
      return <></>;
  }
};
export default Map;
// ------------------------------------------------------------------
const theAnimation = keyframes`
    0% { 
    opacity: 0;
    margin-top: 10rem;
        } 
        100% {
    opacity: 100%;
    margin-top: 0rem;}
`;
// -----------------
const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// -----------------
const Wrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  // -----------------
  .mapboxgl-popup {
    padding-bottom: 50px;
  }
  // -----------------
  .marker {
    border: none;
    cursor: pointer;
    height: 56px;
    width: 56px;
  }
  // -----------------
  .mapboxgl-popup-close-button {
    display: none;
  }
  // -----------------
  .mapboxgl-popup-content {
    font: 400 15px/22px "Source Sans Pro", "Helvetica Neue", sans-serif;
    padding: 0;
    width: 180px;
    background-color: transparent;
  }
  // -----------------
  .mapboxgl-popup-content div {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    border-radius: var(--border-radius7);
    padding: 10rem;
    background-color: var(--c21);
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(61, 64, 91, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.125);
    color: var(--c10);
    font-size: var(--font-size-3);
    font-family: var(--f13);
    font-weight: bold;
    text-align: center;
    padding: 10px;
  }
  // -----------------
  .mapboxgl-popup-content h3 {
    background: var(--c31);
    margin: 0;
    padding: 10px;
    border-radius: var(--border-radius5);
    margin-top: -15px;
  }
  // -----------------
  .mapboxgl-popup-content h4 {
    margin: 0;
    padding: 1rem;
  }
  // -----------------
  .mapboxgl-popup-anchor-top > .mapboxgl-popup-content {
    margin-top: 15px;
  }
  // -----------------
  .mapboxgl-popup-anchor-top > .mapboxgl-popup-tip {
    border-bottom-color: #91c949;
  }
  // -----------------
  .listings {
  }
  // -----------------
  .listings .item {
    text-decoration: none;
    margin: 1rem;
    display: flex;
    justify-content: space-between;
    background-color: transparent;
  }
  // -----------------
  .listings .item .title {
    position: relative;
    display: block;
    color: var(--c10);
    font-weight: 700;
    transition: all ease 100ms;
    background-color: var(--c51);
    box-shadow: var(--box-shadow-4);
    height: 10rem;
    width: 100%;
    border-radius: var(--border-radius8);
    font-weight: normal;
    &:active {
    }
  }
  // -----------------
  .profile {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    transition: all ease-in 100ms;
    &:hover {
      transform: scale(1.2);
      color: var(--c61);
    }
    &:active {
      transform: scale(1.1);
    }
  }
  // -----------------
  .listings .item .title small {
  }
  // -----------------
  .listings .item.active .title,
  .listings .item .title.active {
    color: var(--c21);
    background-color: var(--c41);
    box-shadow: var(--box-shadow-6);
  }
  // -----------------
  .listings .item .title:hover {
    color: var(--c21);
    background-color: var(--c41);
  }
  // -----------------
  .listings .item.active {
  }
  // -----------------
  .map-and-side {
    animation: ${theAnimation};
    animation-duration: 4000ms;
    width: 100%;
    display: flex;
  }
  // -----------------
  .sidebar {
    overflow: auto;
    padding: 1rem 0;
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: var(--border-radius8);
    border: 1px solid rgba(209, 213, 219, 0.3);
    flex-grow: 1;
    height: 100%;
    max-height: 50rem;
    box-shadow: var(--box-shadow-2);
    &.dark {
      backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(17, 25, 40, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.125);
      color: var(--c21);
    }
    &::-webkit-scrollbar {
      width: 0.5rem;
      background-color: transparent;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--c51);
      border-radius: 20px;
    }
  }
  // -----------------
  #map {
    min-width: 50rem;
    max-width: 50rem;
    width: 50rem;
    height: 50rem;
    margin-left: 2rem;
    border-radius: 50%;
    box-shadow: var(--box-shadow-2);
  }
`;
