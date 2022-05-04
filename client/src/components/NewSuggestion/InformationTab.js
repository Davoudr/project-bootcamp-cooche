import NextBtn from "./NextBtn";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import makeAnimated from "react-select/animated";
import {
  categoriesArr,
  nationalitiesArr,
  languagesArr,
  socialMediaArr,
} from "../../other/variables";
import { useState } from "react";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";
import Select from "react-select";

import AsyncSelect from "react-select/async";
// ========================================================================
const InformationTab = () => {
  // ========================================================================
  const {
    businessInfoReducerActions: {
      newSuggestionOnChangeHandle,
      languagesHandleChange,
    },
    languagesValue,
    darkMode,
    businessInfo,
    nextBtnHandle,
    capitalizeFirstLetter,
  } = useContext(AppContext);

  // ------------------------------------------------------input : language
  // ----------------------variable for the input
  const langOptions = languagesArr.map((lang) => {
    return { label: capitalizeFirstLetter(lang), value: lang };
  });
  const animatedComponents = makeAnimated();

  return (
    <Wrapper>
      <div className="btn-box">
        <div className=" next-info" onClick={nextBtnHandle}>
          <NextBtn btntext="Next" />
        </div>
      </div>

      <div className="detail">
        <label
          htmlFor="name"
          form="business-form"
          className={`detail-label ${!darkMode && "dark"}`}
        >
          Business name<span className="asterisk">*</span>
        </label>
        <input
          value={businessInfo.name}
          onChange={newSuggestionOnChangeHandle}
          className="input detail-input"
          id="name"
          type="text"
          placeholder=""
          autoFocus
        />
      </div>

      <div className="detail">
        <label
          htmlFor="category"
          form="business-form"
          className={`detail-label ${!darkMode && "dark"}`}
        >
          Category<span className="asterisk">*</span>
        </label>
        <select
          value={businessInfo.category}
          onChange={newSuggestionOnChangeHandle}
          id="category"
          className="detail-input input"
        >
          {["-----Sellect-----", ...categoriesArr].map((ele, index) => {
            return (
              <option key={index} value={ele} className="detail-input input">
                {capitalizeFirstLetter(ele)}
              </option>
            );
          })}
        </select>
      </div>

      <div className=" detail">
        <label
          htmlFor="nationality"
          form="business-form"
          className={`detail-label ${!darkMode && "dark"}`}
        >
          Nationality<span className="asterisk">*</span>
        </label>
        <select
          value={businessInfo.nationality}
          onChange={newSuggestionOnChangeHandle}
          id="nationality"
          className=" detail-input input"
        >
          {["-----Sellect-----", ...nationalitiesArr].map((ele, index) => {
            return (
              <option key={index} value={ele} className=" detail-input input">
                {capitalizeFirstLetter(ele)}
              </option>
            );
          })}
        </select>
      </div>

      <div className="language-box detail">
        <label
          htmlFor="languages"
          form="business-form"
          className={`lng-label detail-label ${!darkMode && "dark"}`}
        >
          Languages supported<span className="asterisk">*</span>
        </label>
        <Select
          value={languagesValue}
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
    </Wrapper>
  );
};

export default InformationTab;

const Wrapper = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: stretch;
  /* flex-flow: column; */
  flex-direction: column;
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
  .detail-input {
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* flex-flow: row; */
    flex-direction: row;
    &.dark {
      background-color: var(--c21);
    }
  }
  .detail {
    width: 100%;
    display: flex;

    justify-content: space-between;
    align-items: center;

    min-height: 3rem;
  }
  .asterisk {
    color: var(--c31);
    margin-left: 0.2rem;
    font-size: var(--font-size-4);
    font-weight: bold;
  }

  .language-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
  .lng-label {
    margin-right: 4.2rem;
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
