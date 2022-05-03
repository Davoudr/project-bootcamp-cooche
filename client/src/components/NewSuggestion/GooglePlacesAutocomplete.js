import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
import { useState } from "react";
import styled from "styled-components";
const GooglePlacesAutocomplete = () => {
  const {
    addressFromMapOnChangeHandle,
    businessInfo,
  
    darkMode,
    // ---------------
  } = useContext(AppContext);

  // ======================================================================================auto-suggestion by Google Places Api
  // ------------------------------------------------------useStates
  const [googleAddress, setGoogleAddress] = useState("");
  // -----------------------------------------------------handleChange
  const googleAddressHandleChange = (ev) => {
    setGoogleAddress(ev);
  };
  // -----------------------------------------------------calling Api
  const setGoogleAddressHandleSelect = async (ev) => {
    const results = await geocodeByAddress(ev); // suggestion detail
    const latLng = await getLatLng(results[0]); // suggestion ll

    addressFromMapOnChangeHandle({
      address: results[0].formatted_address,
      lat: latLng.lat,
      lng: latLng.lng,
    });

    setGoogleAddress(ev);
    // .then((latLng) => console.log("Success", latLng))
    // .catch((error) => console.error("Error", error));
  };
  // ------------------------------------------------------creating full address from google-res to be shown in the form
  return (
    <Wrapper>
      <PlacesAutocomplete
        value={googleAddress}
        onChange={googleAddressHandleChange}
        onSelect={setGoogleAddressHandleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div key={suggestions.description}>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
              className={`google-address-input  address detail-input ${
                !darkMode && "dark"
              }`}
            />
            <div className="autocomplete-dropdown-container address address-results">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                return (
                  <div
                    className="address address-result"
                    key={suggestion.description}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span className="one-result">{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </Wrapper>
  );
};
export default GooglePlacesAutocomplete;

const Wrapper = styled.div`
  .suggestion-item--active {
    background-color: var(--c41);
    color: var(--c21);
    transition: all 0s;
    padding: 0.5rem;
    transform: scale(1.02);
    transition: all ease-out 0.05s;
  }
  .suggestion-item {
    background-color: var(--c11);
    padding: 0.5rem;
    margin: 0.1rem 0;
    transition: all ease-out 0.05s;
  }
  .google-address-input {
    height: 3rem;
    width: 100%;
    padding-left: 1rem;
    font-size: var(--font-size-3);
    outline: none;
    &.dark {
      background-color: var(--c21);
    }
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
  .address-results {
    width: 100%;
    margin: 0.2rem 0 2rem;
    padding: 0 0.2rem;
  }
`;
