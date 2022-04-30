import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as turf from "@turf/turf";
import styled from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { AppContext } from "../../other/AppContext";
import icon from "../../assets/img/location-icon-1.png";
import Select from "react-select";
import { BsInfoCircleFill, BsInfoCircle } from "react-icons/bs";
import { IoSchoolOutline, IoSchool } from "react-icons/io";

const Map = () => {
  const {
    filterValue,
    darkMode,

  

    // ---------------
  } = useContext(AppContext);
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;
  // ----------------------------------------------
  const mapContainer = useRef(null);
  const searchContainer = useRef(null);
  const map = useRef(null);

  let stores = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.034084142948, 38.909671288923],
        },
        properties: {
          phoneFormatted: "(202) 234-7336",
          phone: "2022347336",
          address: "1471 P St NW",
          city: "Washington DC",
          country: "United States",
          crossStreet: "at 15th St NW",
          postalCode: "20005",
          state: "D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.049766, 38.900772],
        },
        properties: {
          phoneFormatted: "(202) 507-8357",
          phone: "2025078357",
          address: "2221 I St NW",
          city: "Washington DC",
          country: "United States",
          crossStreet: "at 22nd St NW",
          postalCode: "20037",
          state: "D.C.",
        },
      },
    ],
  };

  /* Assign a unique ID to each store */
  stores.features.forEach(function (store, i) {
    store.properties.id = i;
  });

  // --------------------------
  function flyToStore(currentFeature) {
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    });
  }

  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<div><h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4></div>`
      )
      .addTo(map.current);
  }
  // ---------------------------

  useEffect(() => {
    // -----------------------------------------------------initializing the map
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

      map.current.on("load", () => {
        // -----------------------------------------------------3D buildings
        // Insert the layer beneath any symbol layer.
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

        map.current.addSource("places", {
          type: "geojson",
          data: stores,
        });

        stores.features.map((store) => {
          /* Create a div element for the store. */
          const el = document.createElement("div");
          /* Assign a unique `id` to the store. */
          el.id = `marker-${store.properties.id}`;
          /* Assign the `marker` class to each store-div for styling. */
          el.className = "marker";
          el.innerHTML = `<img src=${icon}>`;

          el.addEventListener("click", (e) => {
            /* Fly to the point */
            flyToStore(store);
            /* Close all other popups and display popup for clicked store */
            createPopUp(store);
            /* Highlight listing in sidebar */
            const activeItem = document.getElementsByClassName("active");
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove("active");
            }
            const listing = document.getElementById(
              `listing-${store.properties.id}`
            );
            listing.classList.add("active");
          });

          // Create a marker using the div element
          // defined above and add it to the map.
          new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(store.geometry.coordinates)
            .addTo(map.current);
        });
      });
    }
  }, []);

  const handleLink = (ev) => {
    stores.features.map((feature) => {
      if (ev.target.id === `link-${feature.properties.id}`) {
        flyToStore(feature);
        createPopUp(feature);
      }
    });

    const activeItem = document.getElementsByClassName("active");
    if (activeItem[0]) {
      activeItem[0].classList.remove("active");
    }
    ev.target.classList.add("active");
    console.log(ev.target);
  };

  return (
    <Wrapper>
      <div className="heading">
        <h1 className="title">
          The services
          {filterValue.category && ` related to the  ${filterValue.category},`}
          {filterValue.province && ` in  ${filterValue.province}`}
          {filterValue.nationality &&
            ` provided by ${filterValue.nationality} people`}
          {filterValue.language &&
            ` offering customer service in ${filterValue.language}`}
        </h1>
      </div>
      <div className="map-and-side">
        <div className="sidebar">
          <div id="listings" className="listings">
            {stores.features.map((store, index) => {
              return (
                <div
                  key={index}
                  className="item"
                  id={`listing-${store.properties.id}`}
                >
                  <button
                    onClick={handleLink}
                    className="title"
                    id={`link-${store.properties.id}`}
                  >
                    {" "}
                    <div className="profile">
                      {darkMode ? (
                        <BsInfoCircleFill size="2rem" />
                      ) : (
                        <BsInfoCircle size="2rem" />
                      )}
                    </div>
                    {`${store.properties.address}`}
                    <div>{`${store.properties.city} ${
                      store.properties.phone && store.properties.phoneFormatted
                    }`}</div>
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
};

export default Map;

const Wrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  .mapboxgl-popup {
    padding-bottom: 50px;
  }
  .marker {
    border: none;
    cursor: pointer;
    height: 56px;
    width: 56px;
  }
  /* Marker tweaks */
  .mapboxgl-popup-close-button {
    display: none;
  }

  .mapboxgl-popup-content {
    font: 400 15px/22px "Source Sans Pro", "Helvetica Neue", sans-serif;
    padding: 0;
    width: 180px;
    background-color: transparent;
  }
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
    /* backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(209, 213, 219, 0.3);
    color: var(--c41); */
  }
  .mapboxgl-popup-content h3 {
    background: var(--c31);

    margin: 0;
    padding: 10px;
    border-radius: var(--border-radius5);
    margin-top: -15px;
  }

  .mapboxgl-popup-content h4 {
    margin: 0;
    padding: 1rem;
  }

  .mapboxgl-popup-anchor-top > .mapboxgl-popup-content {
    margin-top: 15px;
  }

  .mapboxgl-popup-anchor-top > .mapboxgl-popup-tip {
    border-bottom-color: #91c949;
  }

  .listings {
  }

  .listings .item {
    text-decoration: none;

    margin: 1rem;
    display: flex;

    justify-content: space-between;
    background-color: transparent;
  }

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
      box-shadow: var(--box-shadow-1);
    }
  }
  .profile {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    transition: all ease-in 100ms;
    &:hover {
      transform: scale(1.2);
      color: var(--c61);
    }
  }
  .listings .item .title small {
  }

  .listings .item.active .title,
  .listings .item .title.active,
  .listings .item .title:hover {
    color: var(--c21);
    background-color: var(--c41);
  }

  .listings .item.active {
  }

  .map-and-side {
    width: 100%;

    display: flex;
    gap: 16px;
  }
  .sidebar {
    margin-right: 1.5rem;
    overflow: auto;
    margin-top: 2.5rem;
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
  }
  .heading {
    border-bottom: 1px solid #eee;
    line-height: 60px;
    padding: 0 10px;
    text-align: center;
    padding: 2rem;

    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    &.dark {
      backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(17, 25, 40, 0.75);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.125);
      .title {
        color: var(--c31);
      }
    }
  }
  .title {
    font-family: var(--f13);
    font-weight: normal;
    color: var(--c41);
  }

  #map {
    margin-top: 2rem;
    width: 50rem;
    height: 50rem;
    /* top: 0;
    bottom: 0; */
    border-radius: 50%;
    box-shadow: var(--box-shadow-2);
  }
`;
