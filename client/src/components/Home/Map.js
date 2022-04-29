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
import icon from "../../img/marker.png";
const Map = () => {
  const {
    darkMode,
    theAddress,
    setTheAddress,

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
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.043929, 38.910525],
        },
        properties: {
          phoneFormatted: "(202) 387-9338",
          phone: "2023879338",
          address: "1512 Connecticut Ave NW",
          city: "Washington DC",
          country: "United States",
          crossStreet: "at Dupont Circle",
          postalCode: "20036",
          state: "D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.0672, 38.90516896],
        },
        properties: {
          phoneFormatted: "(202) 337-9338",
          phone: "2023379338",
          address: "3333 M St NW",
          city: "Washington DC",
          country: "United States",
          crossStreet: "at 34th St NW",
          postalCode: "20007",
          state: "D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.002583742142, 38.887041080933],
        },
        properties: {
          phoneFormatted: "(202) 547-9338",
          phone: "2025479338",
          address: "221 Pennsylvania Ave SE",
          city: "Washington DC",
          country: "United States",
          crossStreet: "btwn 2nd & 3rd Sts. SE",
          postalCode: "20003",
          state: "D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-76.933492720127, 38.99225245786],
        },
        properties: {
          address: "8204 Baltimore Ave",
          city: "College Park",
          country: "United States",
          postalCode: "20740",
          state: "MD",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.097083330154, 38.980979],
        },
        properties: {
          phoneFormatted: "(301) 654-7336",
          phone: "3016547336",
          address: "4831 Bethesda Ave",
          cc: "US",
          city: "Bethesda",
          country: "United States",
          postalCode: "20814",
          state: "MD",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.359425054188, 38.958058116661],
        },
        properties: {
          phoneFormatted: "(571) 203-0082",
          phone: "5712030082",
          address: "11935 Democracy Dr",
          city: "Reston",
          country: "United States",
          crossStreet: "btw Explorer & Library",
          postalCode: "20190",
          state: "VA",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.10853099823, 38.880100922392],
        },
        properties: {
          phoneFormatted: "(703) 522-2016",
          phone: "7035222016",
          address: "4075 Wilson Blvd",
          city: "Arlington",
          country: "United States",
          crossStreet: "at N Randolph St.",
          postalCode: "22203",
          state: "VA",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-75.28784, 40.008008],
        },
        properties: {
          phoneFormatted: "(610) 642-9400",
          phone: "6106429400",
          address: "68 Coulter Ave",
          city: "Ardmore",
          country: "United States",
          postalCode: "19003",
          state: "PA",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-75.20121216774, 39.954030175164],
        },
        properties: {
          phoneFormatted: "(215) 386-1365",
          phone: "2153861365",
          address: "3925 Walnut St",
          city: "Philadelphia",
          country: "United States",
          postalCode: "19104",
          state: "PA",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.043959498405, 38.903883387232],
        },
        properties: {
          phoneFormatted: "(202) 331-3355",
          phone: "2023313355",
          address: "1901 L St. NW",
          city: "Washington DC",
          country: "United States",
          crossStreet: "at 19th St",
          postalCode: "20036",
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
        `<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`
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
      console.log(ev.target.id, `link-${feature.properties.id}`);
      if (ev.target.id === `link-${feature.properties.id}`) {
        flyToStore(feature);
        createPopUp(feature);
      }
    });

    // const activeItem = document.getElementsByClassName("active");
    // if (activeItem[0]) {
    //   activeItem[0].classList.remove("active");
    // }
    // ev.parentNode.classList.add("active");
  };

  return (
    <Wrapper theIcon={icon}>
      <div className="map-and-side">
        <div className="sidebar">
          <div className="heading">
            <h1>Our locations</h1>
          </div>
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
                  >{`${store.properties.address}`}</button>
                  <div>{`${store.properties.city} ${
                    store.properties.phone && store.properties.phoneFormatted
                  }`}</div>
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
    background-image: url(${(props) => props.theIcon});
  }
  /* Marker tweaks */
  .mapboxgl-popup-close-button {
    display: none;
  }

  .mapboxgl-popup-content {
    font: 400 15px/22px "Source Sans Pro", "Helvetica Neue", sans-serif;
    padding: 0;
    width: 180px;
  }

  .mapboxgl-popup-content h3 {
    background: #91c949;
    color: #fff;
    margin: 0;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    font-weight: 700;
    margin-top: -15px;
  }

  .mapboxgl-popup-content h4 {
    margin: 0;
    padding: 10px;
    font-weight: 400;
  }

  .mapboxgl-popup-content div {
    padding: 10px;
  }

  .mapboxgl-popup-anchor-top > .mapboxgl-popup-content {
    margin-top: 15px;
  }

  .mapboxgl-popup-anchor-top > .mapboxgl-popup-tip {
    border-bottom-color: #91c949;
  }

  .listings {
    height: 100%;
    overflow: auto;
    padding-bottom: 60px;
  }

  .listings .item {
    border-bottom: 1px solid #eee;
    padding: 10px;
    text-decoration: none;
  }

  .listings .item:last-child {
    border-bottom: none;
  }

  .listings .item .title {
    display: block;
    color: #00853e;
    font-weight: 700;
  }

  .listings .item .title small {
    font-weight: 400;
  }

  .listings .item.active .title,
  .listings .item .title:hover {
    color: #8cc63f;
  }

  .listings .item.active {
    background-color: #f8f8f8;
  }

  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    border-left: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    background: #00853e;
    border-radius: 0;
  }
  .map-and-side {
    width: 100%;

    display: flex;
    gap: 16px;
  }
  .sidebar {
    flex-grow: 1;
    height: 100%;
  }
  .heading {
    background: #fff;
    border-bottom: 1px solid #eee;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
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
