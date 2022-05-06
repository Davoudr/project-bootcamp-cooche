import styled from "styled-components";
import { useState } from "react";
import React from "react";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";
import { AppContext } from "../../other/AppContext";
import { useContext } from "react";
import Button from "../Tools/Button";
import MapBoxAddress from "./MapBoxAddress";
import NextBtn from "./NextBtn";
import CountryProvince from "./CountryProvince";
// ------------------------------------------------------------------
const Address = () => {
  // -----------------------------------
  //  to switch between two method of finding the addres
  const [addressMethod, setAddresMethod] = useState("Google-Finder");
  // -----------------------------------
  const { businessInfo, nextBtnHandle } = useContext(AppContext);
  // -----------------------------------
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
      {businessInfo.address.address.length > 0 && (
        <div className="full-address-box">
          <span className="light-text">The full address is:</span>
          <span className="search-result">
            -- {businessInfo.address.address} --
          </span>
        </div>
      )}
      <div className="country-province">
        <CountryProvince />
      </div>
      <div className="tool-container">
        <label form="business-form" htmlFor="address" className="address-label">
          Address
        </label>
        {addressMethod === "Google-Finder" ? (
          <GooglePlacesAutocomplete />
        ) : (
          <MapBoxAddress />
        )}
      </div>
    </Div>
  );
};
export default Address;
// ------------------------------------------------------------------
const Div = styled.div`
  width: 100%;
  padding: 2rem;
  // -----------------
  .address-label {
    width: 100%;
    text-align: left;
    display: block;
    margin: 0.7rem 0 1rem;
    font-size: var(--font-size-3);
    &.dark {
      color: var(--c21);
    }
  }
  // -----------------
  .country-province {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
  }
  // -----------------
  .method-btn {
    background-color: transparent;
  }
  // -----------------
  .tool-container {
    width: 100%;
  }
  // -----------------
  .address-method {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
    margin: 3rem 2rem;
  }
  // -----------------
  .detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    min-height: 3rem;
  }
  // -----------------
  .detail-label {
    margin-right: 3rem;
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    &.dark {
      color: var(--c12);
    }
  }
  // -----------------
  .address-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    padding: 2rem;
  }
  // -----------------
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
  // -----------------
  .light-text {
    color: var(--c13);
    display: block;
    text-align: center;
    font-size: var(--font-size-3);
  }
  // -----------------
  .search-result {
    display: block;
    text-align: center;
    font-size: var(--font-size-4);
  }
  // -----------------
  .btn-box {
    width: 100%;
    display: flex;
    padding: 0;
    margin-bottom: 1rem;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: row;
  }
  // -----------------
  .next-info {
    color: var(--c15);
    padding: 0;
    margin: 0;
    background-color: transparent;
    box-shadow: none;
  }
`;
