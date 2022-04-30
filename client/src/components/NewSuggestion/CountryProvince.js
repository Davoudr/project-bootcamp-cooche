import styled from "styled-components";
import { AppContext } from "../../other/AppContext";
import { useContext } from "react";
import {
  locationList,
  categoriesArr,
  nationalitiesArr,
  languagesArr,
} from "../../other/variables";
// ---------------------------------------------------------
const CountryProvince = () => {
  const {
    businessInfo,
    capitalizeFirstLetter,
    setBusinessInfo,
    // ---------------
  } = useContext(AppContext);

  const CountryProvincOnChangeHandle = (ev) => {
    let theKey = ev.target.id;
    let theValue = ev.target.value;
    setBusinessInfo({
      ...businessInfo,
      address: {
        ...businessInfo.address,
        [theKey]: theValue,
      },
    });
  };

  return (
    <Wrapper>
      <div className="cp country-box">
        <lable form="business-form" htmlFor="country" className="cp-lable">
          Country
        </lable>
        <select
          value={businessInfo.address.country}
          onChange={CountryProvincOnChangeHandle}
          id="country"
          className="country-input cp-input"
        >
          {["-----Sellect-----", ...Object.keys(locationList).sort()].map(
            //-----Sellect----- has been considerd like no answer; if you edit it, validation should be edited
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
        <lable form="business-form" htmlFor="province" className="cp-lable">
          Province
        </lable>
        <select
          value={businessInfo.address.province}
          onChange={CountryProvincOnChangeHandle}
          id="province"
          className="province-input cp-input"
        >
          {businessInfo.address.country !== "-----Sellect-----" ? (
            [
              "-----Sellect-----",
              ...locationList[`${businessInfo.address.country}`].provinces,
            ].map(
              //-----Sellect----- has been considerd like no answer; if you edit it, validation should be edited
              (ele, index) => {
                return (
                  <option key={index} value={ele} className="option">
                    {capitalizeFirstLetter(ele)}
                  </option>
                );
              }
            )
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

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  .cp-input {
    width: 15rem;
  }
  .cp-lable {
    width: 3rem;
  }
  .cp,
  .cp-input {
    display: inline;
    height: 3rem;
    font-size: var(--font-size-3);
  }
  .cp-input {
    text-align: center;
  }
  .cp {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }
`;
