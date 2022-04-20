import styled from "styled-components";
import { AppContext } from "../../other/AppContext";
import { useContext, useState } from "react";
import LoadingTiny from "../LoadingTiny";
import {
  categoriesArr,
  nationalitiesArr,
  languagesArr,
  citiesArr,
  socialMediaArr,
} from "../../other/variables";
import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
import { BsPhone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { AiOutlineFacebook } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import NextBtn from "./NextBtn";
import MenuBtn from "./MenuBtn";
import Button from "../Tools/Button";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/themes/material.css";
import "tippy.js/animations/scale.css";
// ======================================================================================component
/**
 * The main component for the New Suggestion page.
 * @returns The main component for the New Suggestion page.
 */
const NewSuggestion = () => {
  // ====================================================================================useContext
  const {
    businessInfo,
    setBusinessInfo,
    setDarkMode,
    updateMode,
    darkMode,
    capitalizeFirstLetterInArr,
    capitalizeFirstLetter,
    arrOfStrToLowerCase,
    loading,
    setLoading,
    message,
    setMessage,
    userSession,
    setUserSession,
  } = useContext(AppContext);
  const [validationErr, setvalidationErr] = useState({
    information: false,
    connections: false,
  });
  const [languagesValue, setLanguagesValue] = useState([]);
  // ======================================================================================auto-suggestion by Google Places Api
  // ------------------------------------------------------useStates
  const [googleAddress, setGoogleAddress] = useState("");
  const [coordinates, setcoordinates] = useState({ lat: null, lng: null });
  const [fullAddress, setFullAddress] = useState([]);
  // -----------------------------------------------------handleChange
  const googleAddressHandleChange = (ev) => {
    setGoogleAddress(ev);
  };
  // -----------------------------------------------------calling Api
  const setGoogleAddressHandleSelect = async (ev) => {
    const results = await geocodeByAddress(ev); // suggestion detail
    const latLng = await getLatLng(results[0]); // suggestion ll
    setFullAddress(results);
    setGoogleAddress(ev);
    setcoordinates(latLng);
    console.log(results, latLng);
    // .then((latLng) => console.log("Success", latLng))
    // .catch((error) => console.error("Error", error));
  };
  // ------------------------------------------------------creating full address from google-res to be shown in the form
  let locationType = "";
  if (fullAddress.length > 0) {
    fullAddress[0].types.forEach((ele) => {
      locationType = locationType.concat(`, ${ele}`);
    });

    locationType = locationType.slice(2).replace(`_`, ` `);
  }
  // ====================================================================================submit
  const handleSubmit = (ev) => {
    ev.preventDefault();
    // ----------------------------------------------converting submit-btn contetnt to loading-animation
    setLoading(true);
    // ----------------------------------------------retrieving information
    switch (true) {
      // -------------------------first-tab validation
      case businessInfo.name.length === 0 ||
        businessInfo.category === "-----Sellect-----" ||
        businessInfo.nationality === "-----Sellect-----" ||
        languagesValue.length === 0:
        setMessage({
          status: true,
          title: "Missing Information",
          content:
            "Please note that all the fields which have red-asterisk, should be filled! You can choose INFORMATION tab from laft menu to go back and complete missing informations; Thank You!",
          btnText: "Ok",
        });
        setLoading(false); // for turning loading status of submint button
        setInterval(() => {
          setvalidationErr({ connections: false, information: true });
        }, 3000); // for visual effect of error
        break;
      // -------------------------second-tab validation
      case businessInfo.phone.length === 0 &&
        businessInfo.email.length === 0 &&
        businessInfo.website.length === 0 &&
        businessInfo.facebook.length === 0 &&
        businessInfo.instagram.length === 0 &&
        businessInfo.twitter.length === 0:
        setMessage({
          status: true,
          title: "Missing Information",
          content:
            "Please provide at least one option for connecting to this bussiness! You can choose CONNECTION tab from to go back and complete missing informations; Thank You!",
          btnText: "Ok",
        });
        setLoading(false); // for turning loading status of submint button
        setInterval(() => {
          setvalidationErr({
            information: false,
            connections: true,
          });
        }, 3000); // for visual effect of error
        break;
      default:
        setvalidationErr({
          information: false,
          connections: false,
        });
        // -------------------------till here data is validated! now it is going to be added to db
        const endpointBusinessObj = {
          creator: {
            id: "",
            username: userSession.username,
            email: userSession.email,
          },
          date: new Date(),
          name: businessInfo.name,
          category: businessInfo.category,
          nationality: businessInfo.nationality,
          languages: languagesValue,
          address: {
            address: fullAddress ? fullAddress[0] : "",
            lat: fullAddress ? coordinates.lat : "",
            lng: fullAddress ? coordinates.lng : "",
          },
          connections: {
            phone: businessInfo.phone,
            email: businessInfo.email,
            website: businessInfo.website,
            facebook: businessInfo.facebook,
            instagram: businessInfo.instagram,
            twitter: businessInfo.twitter,
          },
          description: businessInfo.description,
          feedbacks: {
            rates: [],
            like: [],
            dislike: [],
            comments: [],
          },
        };
        // -------------------------postin user-obj to db
        fetch("/business/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(endpointBusinessObj),
        })
          .then((res) => res.json())
          .then((data) => {
            // ------------------------proper action based on server-res
            if (data.status === 201) {
              console.log(`FE / POST / </userAdd> / res / ${data.message}`);
              setBusinessInfo({
                category: "",
                name: "",
                nationality: "",
                phone: "",
                email: "",
                website: "",
                facebook: "",
                instagram: "",
                twitter: "",
                description: "",
                languages: [],
              });
              ev.target.reset();
              setMessage({
                status: true,
                title: "Done",
                content: "The bussiness is added successfully!",
                btnText: "Ok",
              });
              setLoading(false);
            } else {
              setLoading(false);
              setMessage({
                status: true,
                title: "Error",
                content: data.message,
                btnText: "Ok",
              });
            }
          })
          .catch((err) => console.log("Error in add new user:", err));
    }
  };
  // ======================================================================================onChage for all inputs
  // ------------------------------------------------------input : language
  // ----------------------variable for the input
  const langOptions = languagesArr.map((lang) => {
    return { label: capitalizeFirstLetter(lang), value: lang };
  });
  const animatedComponents = makeAnimated();
  // ----------------------func to get language-input value
  const reactSelectToValue = (ev) => {
    let theValue = ev.map((ele) => {
      return ele.value;
    });
    return theValue;
  };
  // ----------------------handleChange
  const languagesHandleChange = (ev) => {
    setLanguagesValue(reactSelectToValue(ev));
  };
  // ------------------------------------------------------rest of the inputs
  const onchangeHandle = (ev) => {
    let theKey = ev.target.id;
    let theValue = ev.target.value;
    setBusinessInfo({ ...businessInfo, [theKey]: theValue });
  };

  // ------------------------------------------------------some states to perfomrm switching between tabs
  const [pages, setPages] = useState("details");
  const handleInfoBtn = (ev) => {
    setPages("details");
    return false;
  };
  const handleConnecitonBtn = (ev) => {
    setPages("connections");
    return false;
  };
  const handleDescriptionBtn = (ev) => {
    setPages("description");
    return false;
  };
  const nextBtnHandle = (ev) => {
    pages === "details" ? setPages("connections") : setPages("description");
  };
  // ------------------------------------------------------clear-form button handle
  const handleClrearForm = (ev) => {
    document.getElementById("business-form").reset();
    setBusinessInfo({
      category: "",
      name: "",
      nationality: "",
      phone: "",
      email: "",
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
      description: "",
      languages: [],
    });
    setLanguagesValue([]);
  };
  // ======================================================================================
  return (
    // -----------------------------------------------------------------containers
    <Wrapper pages={pages}>
      <div className="card">
        <div className="content">
          <form
            id="business-form"
            onSubmit={handleSubmit}
            autoComplete="on"
            className="business-form"
          >
            <div className="columns">
              {/* ---------------------------------------------------------left menu*/}
              <div className="menu">
                <button
                  className="btn  info-btn"
                  type="button"
                  onClick={handleInfoBtn}
                >
                  <MenuBtn
                    darkMode={darkMode}
                    trigger={validationErr.information}
                    btnText="Information"
                    className="btn info-btn"
                  />
                </button>
                <button
                  className="btn connections-btn"
                  type="button"
                  onClick={handleConnecitonBtn}
                >
                  <MenuBtn
                    darkMode={darkMode}
                    trigger={validationErr.connections}
                    btnText="Connecitons"
                    className="btn info-btn"
                  />
                </button>
                <button
                  className="btn description-btn"
                  type="button"
                  onClick={handleDescriptionBtn}
                >
                  <MenuBtn
                    darkMode={darkMode}
                    trigger={false}
                    btnText="Description"
                    className="btn info-btn"
                  />
                </button>
              </div>
              {/* ---------------------------------------------------------3 tabs */}
              <div className="pages">
                {/* ----------------------------------------------1st tab*/}
                {pages === "details" && (
                  <div className="details">
                    {/* --------------------------------next-btn*/}
                    <div className="btn-box">
                      <div className=" next-info" onClick={nextBtnHandle}>
                        <NextBtn btntext="Next" />
                      </div>
                    </div>
                    {/* --------------------------------name*/}
                    <div className="name-box detail">
                      <label
                        htmlFor="name"
                        form="business-form"
                        className={`detail-label ${!darkMode && "dark"}`}
                      >
                        Business name<span className="asterisk">*</span>
                      </label>
                      <input
                        value={businessInfo.name}
                        onChange={onchangeHandle}
                        className="input business_name detail-input"
                        id="name"
                        type="text"
                        placeholder=""
                        autoFocus
                      />
                    </div>
                    {/* --------------------------------category*/}
                    <div className="category-box detail">
                      <label
                        htmlFor="category"
                        form="business-form"
                        className={`detail-label ${!darkMode && "dark"}`}
                      >
                        Category<span className="asterisk">*</span>
                      </label>
                      <select
                        value={businessInfo.category}
                        onChange={onchangeHandle}
                        id="category"
                        className="category detail-input input"
                      >
                        {["-----Sellect-----", ...categoriesArr].map(
                          //-----Sellect----- has been considerd like no answer; if you edit it, validation should be edited
                          (ele, index) => {
                            return (
                              <option
                                key={index}
                                value={ele}
                                className="category detail-input input"
                              >
                                {capitalizeFirstLetter(ele)}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                    {/* --------------------------------nationality*/}
                    <div className="nationality-box detail">
                      <label
                        htmlFor="nationality"
                        form="business-form"
                        className={`detail-label ${!darkMode && "dark"}`}
                      >
                        Nationality<span className="asterisk">*</span>
                      </label>
                      <select
                        value={businessInfo.nationality}
                        onChange={onchangeHandle}
                        id="nationality"
                        className="nationality detail-input input"
                      >
                        {["-----Sellect-----", ...nationalitiesArr].map(
                          //-----Sellect----- has been considerd like no answer; if you edit it, validation should be edited
                          (ele, index) => {
                            return (
                              <option
                                key={index}
                                value={ele}
                                className="nationality detail-input input"
                              >
                                {capitalizeFirstLetter(ele)}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                    {/* --------------------------------language*/}
                    <div className="language-box detail">
                      <label
                        htmlFor="languages"
                        form="business-form"
                        className={`lng-label detail-label ${
                          !darkMode && "dark"
                        }`}
                      >
                        Languages supported<span className="asterisk">*</span>
                      </label>
                      <Select
                        onChange={languagesHandleChange}
                        id="react-select"
                        className="languages detail-input "
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={langOptions}
                        required
                      />
                    </div>
                    {/* --------------------------------addres*/}
                    <div className="address-box detail">
                      <label
                        htmlFor="address"
                        form="business-form"
                        className={`address-label detail-label ${
                          !darkMode && "dark"
                        }`}
                      >
                        Address
                      </label>
                      <div>
                        <PlacesAutocomplete
                          value={googleAddress}
                          onChange={googleAddressHandleChange}
                          onSelect={setGoogleAddressHandleSelect}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div key={suggestions.description}>
                              <input
                                {...getInputProps({
                                  placeholder: "Search Places ...",
                                  className: "location-search-input",
                                })}
                                className="input address detail-input"
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
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                        {fullAddress.length > 0 && (
                          <div className="full-address-box">
                            <span className="address-type light-text">
                              This address is for the types of:
                            </span>
                            <span className="address-type types">
                              -- {locationType} --
                            </span>{" "}
                            <span className="full-address light-text">
                              The full address is:
                            </span>
                            <span className="full-address">
                              -- {fullAddress[0].formatted_address} --
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* ----------------------------------------------2nd tab*/}
                {pages === "connections" && (
                  <div className="connections">
                    {/* --------------------------------next-btn*/}
                    <div className="btn-box">
                      <div className="next-info" onClick={nextBtnHandle}>
                        <NextBtn btntext="Next" />
                      </div>
                    </div>
                    <div>
                      {/* ------------------------------phone*/}
                      <div className="connection-box">
                        <label
                          htmlFor="phone"
                          form="business-form"
                          className="phone connection-label label"
                        >
                          <BsPhone
                            fill={darkMode ? "#808080" : "#cdcdcd"}
                            size={"1.5rem"}
                          />
                          <span
                            className={`connection-type ${!darkMode && "dark"}`}
                          >
                            Phone Number
                          </span>
                        </label>
                        <input
                          value={businessInfo.phone}
                          className="input phone conneciton-input"
                          id="phone"
                          type="tel"
                          placeholder=""
                          onChange={onchangeHandle}
                        />
                      </div>
                      {/* ------------------------------email*/}
                      <div className="connection-box">
                        <label
                          htmlFor="email"
                          form="business-form"
                          className="email connection-label label"
                        >
                          <MdOutlineMail
                            fill={darkMode ? "#808080" : "#cdcdcd"}
                            size={"1.5rem"}
                          />
                          <span
                            className={`connection-type ${!darkMode && "dark"}`}
                          >
                            E-Mail
                          </span>
                        </label>
                        <input
                          value={businessInfo.email}
                          className="input email conneciton-input"
                          id="email"
                          type="email"
                          placeholder="cooche@gmail.com"
                          onChange={onchangeHandle}
                        />
                      </div>
                      {/* ------------------------------website*/}
                      <div className="connection-box">
                        <label
                          htmlFor="website"
                          form="business-form"
                          className="website connection-label label"
                        >
                          <GiWorld
                            fill={darkMode ? "#808080" : "#cdcdcd"}
                            size={"1.5rem"}
                          />
                          <span
                            className={`connection-type ${!darkMode && "dark"}`}
                          >
                            Website
                          </span>
                        </label>
                        <input
                          value={businessInfo.website}
                          className="input website conneciton-input"
                          id="website"
                          type="url"
                          placeholder="www.cooche.com"
                          onChange={onchangeHandle}
                        />
                      </div>
                      {/* ------------------------------facebook*/}
                      <div className="connection-box">
                        <label
                          htmlFor="facebook"
                          form="business-form"
                          className="fb connection-label label"
                        >
                          <AiOutlineFacebook fill="#1b74e4" size={"1.5rem"} />
                          <span
                            className={`connection-type ${!darkMode && "dark"}`}
                          >
                            facebook
                          </span>
                        </label>
                        <input
                          value={businessInfo.facebook}
                          className="input fb conneciton-input"
                          id="facebook"
                          type="url"
                          placeholder="https://facebook.com/cooche"
                          onChange={onchangeHandle}
                        />
                      </div>
                      {/* ------------------------------instagram*/}
                      <div className="connection-box">
                        <label
                          htmlFor="instagram"
                          form="business-form"
                          className="instagram connection-label label"
                        >
                          <IoLogoInstagram fill="#ed4956" size={"1.5rem"} />
                          <span
                            className={`connection-type ${!darkMode && "dark"}`}
                          >
                            Instagram
                          </span>
                        </label>
                        <input
                          value={businessInfo.instagram}
                          className="input instagram conneciton-input"
                          id="instagram"
                          type="url"
                          placeholder="https://www.instagram.com/cooche"
                          onChange={onchangeHandle}
                        />
                      </div>
                      {/* ------------------------------twitter*/}
                      <div className="connection-box">
                        <label
                          htmlFor="twitter"
                          form="business-form"
                          className="twitter connection-label label"
                        >
                          <FaTwitter fill="#1d9bf0" size={"1.5rem"} />
                          <span
                            className={`connection-type ${!darkMode && "dark"}`}
                          >
                            Twitter
                          </span>
                        </label>
                        <input
                          value={businessInfo.twitter}
                          className="input twitter conneciton-input"
                          id="twitter"
                          type="url"
                          placeholder="https://twitter.com/cooche"
                          onChange={onchangeHandle}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* ----------------------------------------------3rd tab*/}
                {pages === "description" && (
                  <div className="description-box">
                    {/* ------------------------------label*/}
                    <label
                      htmlFor="description"
                      form="business-form"
                      className="description-label"
                    >
                      <span
                        className={`description-title description-span connection-type ${
                          !darkMode && "dark"
                        }`}
                      >
                        Optionally you can add some description about this
                        business. For example:
                      </span>
                      <span
                        className={`description-exp connection-type ${
                          !darkMode && "dark"
                        }`}
                      >
                        - Working hours
                      </span>
                      <span
                        className={`description-exp connection-type ${
                          !darkMode && "dark"
                        }`}
                      >
                        - Prices
                      </span>
                      <span
                        className={`description-exp connection-type ${
                          !darkMode && "dark"
                        }`}
                      >
                        - Advantages
                      </span>
                      <span
                        className={`description-exp connection-type ${
                          !darkMode && "dark"
                        }`}
                      >
                        - Offers
                      </span>
                      <span
                        className={`description-exp connection-type ${
                          !darkMode && "dark"
                        }`}
                      >
                        - Needs
                      </span>
                    </label>
                    {/* ------------------------------textAre*/}
                    <textarea
                      value={businessInfo.description}
                      className="input descriprion descriprion-textArea"
                      id="description"
                      onChange={onchangeHandle}
                    />
                    {/* ------------------------------buttons*/}
                    <div className="container-btns">
                      <div className="btns-div">
                        <button type="button" onClick={handleClrearForm}>
                          <Button btnText="Clear" />
                        </button>
                        <button className="btn submit-btn" type="submit">
                          {!loading ? (
                            <Button btnText="Add" />
                          ) : (
                            <Button btnText={<LoadingTiny />} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
export default NewSuggestion;

const Wrapper = styled.div`
  width: var(--website-width);
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: column;
  margin-top: 1rem;

  .menu {
    background-color: var(--c21);
    width: 10rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding-top: 1rem;
    gap: 1rem;
    min-height: 50rem;
    text-align: center;
    margin-left: 3rem;
  }
  .btn {
    width: 100%;
    background-color: transparent;

    font-size: var(--font-size-3);
    font-family: var(--f12);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: none;
  }
  .box {
  }
  .columns {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 4fr;
  }
  .detail-label {
    margin-right: 3rem;
    height: 2rem;
    display: flex;

    justify-content: flex-start;
    align-items: center;
    /* flex-flow: row; */
    flex-direction: row;
  }
  .detail-input {
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* flex-flow: row; */
    flex-direction: row;
  }
  .address,
  .input,
  .full-address-box {
    width: 40rem;
    padding-left: 1rem;
    outline: none;
    &.dark {
      background-color: var(--c51);
    }
    &:focus {
      box-shadow: var(--box-shadow-1);
    }
  }
  .address-results {
    margin-top: 0.2rem;
    padding: 0 0.2rem;
  }
  .address-result {
  }
  .address-label {
  }
  .detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    min-height: 3rem;
  }
  .suggestion-item--active {
    background-color: var(--c41);
    color: var(--c21);
    transition: all 0s;
    padding: 0.5rem;
    transform: scale(1.05);
  }
  .suggestion-item {
    background-color: var(--c11);
    padding: 0.5rem;
  }
  .details {
    padding: 1rem;
    padding: 2rem;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  .connections {
    padding: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
  }
  .conneciton-input {
    width: 40rem;
    height: 2rem;
    padding-left: 1rem;
  }
  .connection-label {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .connection-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .form {
  }
  .lable {
    text-align: left;
  }
  .input {
    display: block;
  }
  .business-form {
  }
  .content {
  }
  .card {
    background-color: var(--c10);
    z-index: 1;
    border-radius: var(--border-radius6);
    box-shadow: var(--box-shadow-1);
    position: relative;
    &.dark {
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(17, 25, 40, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.125);
      align-items: stretch;
    }
  }

  .address-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    margin-top: 0.5rem;
  }
  .language-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
  .full-address,
  .address-type {
    display: block;
  }
  .types {
    margin-bottom: 2rem;
  }
  .full-address-box {
    text-align: left;
    height: auto;
    min-height: 2rem;
    padding: 2rem 1rem;
    backdrop-filter: blur(5px);
    &.dark {
      background-color: var(--c51);
    }
    background-color: var(--c21);
  }
  .light-text {
    color: var(--c13);
  }
  .detail-label {
    &.dark {
      color: var(--c12);
    }
  }
  .language-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
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
  .pages {
  }
  .lng-label {
    margin-right: 4.2rem;
  }
  .info-btn {
    margin-bottom: ${(props) => (props.pages === "details" ? "5rem" : "0")};
    transition: all ease-in-out 0.5s;
  }
  .connections-btn {
    margin-bottom: ${(props) => (props.pages === "connections" ? "5rem" : "0")};
    transition: all ease-in-out 0.5s;
  }
  .description-btn {
    transition: all ease-in-out 0.5s;
    margin-bottom: ${(props) => (props.pages === "description" ? "5rem" : "0")};
  }
  .connection-type {
    margin-left: 2rem;
    &.dark {
      color: var(--c21);
    }
  }
  .description-box {
    padding: 2rem;
  }
  .description-exp {
    display: block;
    list-style-type: square;
    margin-left: 2rem;
    margin-bottom: 0.5rem;
    &.dark {
      color: var(--c11);
    }
  }
  .description-span {
    margin-bottom: 1rem;
    display: block;
    &.dark {
      color: var(--c11);
    }
  }
  .descriprion-textArea {
    width: 100%;
    resize: none;
    border: none;
    border-radius: var(--border-radius5);
    margin: 2rem 0;
    height: 20rem;
    padding: 2rem;
    box-shadow: var(--box-shadow-1);
  }
  .next-info {
    color: var(--c15);
    padding: 0;
    margin: 0;
    background-color: transparent;
    box-shadow: none;
  }
  .submit-btn {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .asterisk {
    color: var(--c31);
    margin-left: 0.2rem;
    font-size: var(--font-size-4);
    font-weight: bold;
  }
  .btns-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 20rem;
  }
  .container-btns {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
