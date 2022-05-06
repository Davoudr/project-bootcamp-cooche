import styled from "styled-components";
import { AppContext } from "../../other/AppContext";
import { useContext } from "react";
import { locationList } from "../../other/variables";
// ------------------------------------------------------------------
const CountryProvince = () => {
  const {
    businessInfoReducerActions: { countryProvincOnChangeHandle },
    businessInfo,
    capitalizeFirstLetter,
  } = useContext(AppContext);
  // -----------------------------------
  return (
    <Wrapper>
      <div className="cp country-box">
        <label form="business-form" htmlFor="country" className="cp-label">
          Country
        </label>
        <select
          value={businessInfo.address.country}
          onChange={countryProvincOnChangeHandle}
          id="country"
          className="country-input cp-input"
        >
          {["-----Sellect-----", ...Object.keys(locationList).sort()].map(
            (ele, index) => {
              return (
                <option key={index} value={ele} className="option">
                  {capitalizeFirstLetter(ele)}
                </option>
              );
            }
          )}
        </select>
      </div>
      <div className="cp province-box">
        <label form="business-form" htmlFor="province" className="cp-label">
          Province
        </label>
        <select
          value={businessInfo.address.province}
          onChange={countryProvincOnChangeHandle}
          id="province"
          className="province-input cp-input"
        >
          {businessInfo.address.country.length > 0 &&
          businessInfo.address.country !== "-----Sellect-----" ? (
            [
              "-----Sellect-----",
              ...locationList[`${businessInfo.address.country}`].provinces,
            ].map((ele, index) => {
              return (
                <option key={index} value={ele} className="option">
                  {capitalizeFirstLetter(ele)}
                </option>
              );
            })
          ) : (
            <option value={"-----Sellect-----"} className="option">
              Select Country
            </option>
          )}
        </select>
      </div>
    </Wrapper>
  );
};
export default CountryProvince;
// ------------------------------------------------------------------
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  // -----------------
  .cp-input {
    width: 15rem;
    &.dark {
      background-color: var(--c21);
    }
  }
  // -----------------
  .cp-label {
    width: 3rem;
    &.dark {
      color: var(--c21);
    }
  }
  // -----------------
  .cp,
  .cp-input {
    display: inline;
    height: 3rem;
    font-size: var(--font-size-3);
  }
  // -----------------
  .cp-input {
    text-align: center;
  }
  // -----------------
  .cp {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }
`;
