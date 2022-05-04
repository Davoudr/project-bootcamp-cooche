import styled from "styled-components";
import { AppContext } from "../../other/AppContext";
import { useContext, useState } from "react";
import LoadingTiny from "../LoadingTiny";
import React, { Component } from "react";
import Button from "../Tools/Button";
import Address from "./Address";
import Menu from "./Menu";
import InformationTab from "./InformationTab";
import Connections from "./Connections";
import Description from "./Description";
// ======================================================================================component
const NewSuggestion = () => {
  // ====================================================================================useContext
  const {
    businessInfoReducerActions: { newSuggestionResetFormHandle },

    arrOfStrToLowerCase,

    languagesValue,
    setLanguagesValue,
    setvalidationErr,
    validationErr,
    pages,
    setPages,
    businessInfo,
    darkMode,
    loading,
    setLoading,
    setMessage,
    userSession,
  } = useContext(AppContext);
  // ====================================================================================submit
  const handleSubmit = (ev) => {
    ev.preventDefault();
    // ----------------------------------------------converting submit-btn contetnt to loading-animation
    setLoading(true);
    // ----------------------------------------------retrieving information
    switch (true) {
      // -------------------------first-tab validation
      case businessInfo.name.length === 0 ||
        businessInfo.category.length === 0 ||
        businessInfo.nationality.length === 0 ||
        languagesValue.length === 0:
        setMessage({
          status: true,
          title: "Missing Information",
          content:
            "Please note that all the fields which have red-asterisk in INFORMATION tab, should be filled!",
          btnText: "Ok",
        });
        setLoading(false); // for turning loading status of submint button
        setTimeout(() => {
          setvalidationErr({
            information: true,
            address: false,
            connections: false,
          });
        }, 2000); // for visual effect of error
        break;
      // -------------------------second-tab validation
      case businessInfo.address.country.length === 0 ||
        businessInfo.address.province.length === 0 ||
        businessInfo.address.address.length === 0:
        setMessage({
          status: true,
          title: "Missing Information",
          content:
            "Please note that for the address, filling the country and the province is requried!",
          btnText: "Ok",
        });
        setLoading(false); // for turning loading status of submint button
        setTimeout(() => {
          setvalidationErr({
            information: false,
            address: true,
            connections: false,
          });
        }, 2000); // for visual effect of error
        break;
      // -------------------------third-tab validation
      case businessInfo.connections.phone.length === 0 &&
        businessInfo.connections.email.length === 0 &&
        businessInfo.connections.website.length < 5 &&
        businessInfo.connections.facebook.length < 26 &&
        businessInfo.connections.instagram.length < 27 &&
        businessInfo.connections.twitter.length < 21:
        setMessage({
          status: true,
          title: "Missing Information",
          content:
            "Please provide at least one option for connecting to this bussiness!",
          btnText: "Ok",
        });
        setLoading(false); // for turning loading status of submint button
        setTimeout(() => {
          setvalidationErr({
            information: false,
            address: false,
            connections: true,
          });
        }, 2000); // for visual effect of error
        break;
      default:
        setvalidationErr({
          information: false,
          address: false,
          connections: false,
        });
        // -------------------------till here data is validated! now it is going to be added to db
        const endpointBusinessObj = {
          creator: {
            id: userSession.id,
          },
          date: new Date(),
          name: businessInfo.name.toLowerCase(),
          category: businessInfo.category.toLowerCase(),
          nationality: businessInfo.nationality.toLowerCase(),
          languages: arrOfStrToLowerCase(businessInfo.languages),
          address: {
            address: businessInfo.address.address,
            lat: businessInfo.address.lat,
            lng: businessInfo.address.lng,
            country: businessInfo.address.country.toLowerCase(),
            province: businessInfo.address.province.toLowerCase(),
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
        console.log(endpointBusinessObj);
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
              newSuggestionResetFormHandle();
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
  // ------------------------------------------------------clear-form button handle
  const handleClrearForm = (ev) => {
    document.getElementById("business-form").reset();
    newSuggestionResetFormHandle();
    setLanguagesValue([]);
  };
  // ======================================================================================
  return (
    // --------------------------------------------------------------------containers
    <Wrapper pages={pages}>
      <div className="card">
        <form id="business-form" onSubmit={handleSubmit} autoComplete="on">
          <div className="columns">
            {/* ---------------------------------------------------------left menu*/}
            <div className="left-menu">
              <Menu />
            </div>
            {/* ---------------------------------------------------------3 tabs */}
            <div>
              {/* ----------------------------------------------1st tab*/}
              {pages === "infoTab" && (
                <div className="infoTab">
                  <InformationTab />
                </div>
              )}
              {/* ----------------------------------------------1st tab*/}
              {pages === "address" && (
                <div className="address">
                  <Address />
                </div>
              )}
              {/* ----------------------------------------------3nd tab*/}
              {pages === "connections" && (
                <div className="connections">
                  <Connections />
                </div>
              )}
              {/* ----------------------------------------------4th tab*/}
              {pages === "description" && (
                <div className="description-box">
                  <Description />
                  {/* ------------------------------buttons*/}
                  <div className="container-btns">
                    <div className="btns-div">
                      <button
                        className="btn"
                        type="button"
                        onClick={handleClrearForm}
                      >
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
  .btn {
    background-color: transparent;
  }
  .columns {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 4fr;
  }

  .input {
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
  .address {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
  }
  .infoTab {
    padding: 1rem;
    padding: 2rem;
    margin: auto;
    display: flex;

    justify-content: space-around;
    align-items: stretch;
    /* flex-flow: column; */
    flex-direction: column;
  }
  .connections {
    padding: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
  }
  .label {
    text-align: left;
  }
  .input {
    display: block;
  }
  .card {
    background-color: var(--c10);
    z-index: 1;
    border-radius: var(--border-radius6);
    box-shadow: var(--box-shadow-1);
    min-height: 50rem;
    padding-bottom: 3rem;
    &.dark {
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(17, 25, 40, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.125);
      align-items: stretch;
    }
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
  .description-box {
    padding: 2rem;
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
  .left-menu {
    margin: 5rem 0 0 2rem;
    width: 13rem;
  }
`;
