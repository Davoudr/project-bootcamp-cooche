import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import React, { useRef } from "react";

import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";
import { AppContext } from "../../other/AppContext";
import { useContext } from "react";
import Button from "../Tools/Button";
import MapBoxAddress from "./MapBoxAddress";
import NextBtn from "./NextBtn";

// import Geocoder from 'react-mapbox-gl-geocoder';

// import Geocoder from "react-map-gl-geocoder";
// import 'mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// ================================================================== main component
const Address = () => {
  const [addressMethod, setAddresMethod] = useState("Google-Finder");

  const {
    nextBtnHandle,
    pages,
    setPages,
    theAddress,
    setTheAddress,
    // ---------------
  } = useContext(AppContext);

  return (
    <Div>
      <div className="btn-box">
        <div className="next-info" onClick={nextBtnHandle}>
          <NextBtn btntext="Next" />
        </div>
      </div>
      <div className="address-method">
        <button
          className="method-btn"
          type="button"
          onClick={() => setAddresMethod("Google-Finder")}
        >
          <Button className="address-method-btn" btnText="Google Finder" />
        </button>
        <button
          className="method-btn"
          type="button"
          onClick={() => setAddresMethod("Locatiocn-on-Map")}
        >
          <Button className="address-method-btn" btnText="Location on Map" />
        </button>
      </div>
      {theAddress !== null && (
        <div className="full-address-box">
          <span className="address-type light-text">
            This address is for the types of:
          </span>
          <span className="address-type types search-result">
            -- {theAddress.type} --
          </span>{" "}
          <span className="light-text">The full address is:</span>
          <span className="search-result">-- {theAddress.address} --</span>
        </div>
      )}
      <div className="tool-container">
        {addressMethod === "Google-Finder" ? (
          <GooglePlacesAutocomplete />
        ) : (
          <MapBoxAddress />
        )}
      </div>
    </Div>
  );
};
// ==================================================================
export default Address;

const Div = styled.div`
  width: 100%;
  padding:  2rem;
  .method-btn {
    background-color: transparent;
  }
  .tool-container {
    width: 100%;
  }
  .address-method {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    margin: 3rem 2rem;
  }
  .detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    min-height: 3rem;
  }
  .detail-label {
    margin-right: 3rem;
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* flex-flow: row; */
    flex-direction: row;
    &.dark {
      color: var(--c12);
    }
  }
  .address-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    padding: 2rem;
  }
  .full-address-box {
    border-radius: var(--border-radius9);
    border: 1px solid var(--c51);
    margin-bottom: 2rem;
    padding-left: 1rem;
    outline: none;
    background-color: var(--c21);
    text-align: left;
    height: auto;
    min-height: 2rem;
    padding: 2rem 1rem;
    backdrop-filter: blur(5px);
    display: block;
    &.dark {
      background-color: var(--c51);
    }
    &:focus {
      box-shadow: var(--box-shadow-1);
    }
    width: 100%;
  }
  .address-type {
    display: block;
  }
  .types {
    margin-bottom: 2rem;
    /* display: inline-block; */
  }
  .light-text {
    color: var(--c13);
    display: block;
    text-align: center;
    font-size: var(--font-size-3);
  }
  .search-result {
    display: block;
    text-align: center;
    font-size: var(--font-size-4);
  }
  .btn-box {
    width: 100%;
    display: flex;
    padding: 0;
    margin-bottom: 1rem;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: row;
  }
  .next-info {
    color: var(--c15);
    padding: 0;
    margin: 0;
    background-color: transparent;
    box-shadow: none;
  }
`;
