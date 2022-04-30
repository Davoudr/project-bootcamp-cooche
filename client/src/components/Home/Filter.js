import styled from "styled-components";
import Select from "react-select";
import {
  locationList,
  categoriesArr,
  nationalitiesArr,
  languagesArr,
} from "../../other/variables";
import { useState } from "react";
import { AppContext } from "../../other/AppContext";
import { useContext } from "react";
import { BiSearchAlt } from "react-icons/bi";
import SearchIcon from "./SearchIcon";
// -----------------------------------------------------
const Filter = () => {
  const { capitalizeFirstLetter } = useContext(AppContext);
  const [filterValue, setFilterValue] = useState({});
  const filterOnChangeHandle = (ev) => {
    let theKey = ev.target.id;
    let theValue = ev.target.value;
    setFilterValue({ ...filterValue, [theKey]: theValue });
  };
  // -----------------------------------------------------
  return (
    <Wrapper>
      <div id="cover">
        <form method="get" action="">
          <div className="tb">
            <div className="td">
              <form id="filter-form" className="filter-form">
                <div className="filter-and-lable">
                  <lable from="filter-form" htmlFor="category" className="lable">
                    Category
                  </lable>
                  <select
                    value={filterValue.category}
                    onChange={filterOnChangeHandle}
                    id="category"
                    className="category-input input"
                  >
                    {["-----Sellect-----", ...categoriesArr.sort()].map(
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
                <div className="filter-and-lable">
                  <lable from="filter-form" htmlFor="category" className="lable">
                    Country
                  </lable>
                  <select
                    value={filterValue.country}
                    onChange={filterOnChangeHandle}
                    id="country"
                    className="country-input input"
                  >
                    {[
                      "-----Sellect-----",
                      ...Object.keys(locationList).sort(),
                    ].map(
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
                <div className="filter-and-lable">
                  <lable from="filter-form" htmlFor="category" className="lable">
                    Province
                  </lable>
                  <select
                    value={filterValue.province}
                    onChange={filterOnChangeHandle}
                    id="province"
                    className="province-input input"
                  >
                    {filterValue.country ? (
                      [
                        "-----Sellect-----",
                        ...locationList[`${filterValue.country}`].provinces,
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
                <div className="filter-and-lable">
                  <lable from="filter-form" htmlFor="category" className="lable">
                    Language
                  </lable>
                  <select
                    value={filterValue.language}
                    onChange={filterOnChangeHandle}
                    id="language"
                    className="language-input input"
                  >
                    {["-----Sellect-----", ...languagesArr].map(
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
                <div className="filter-and-lable">
                  <lable from="filter-form" htmlFor="category" className="lable">
                    Nationality
                  </lable>
                  <select
                    value={filterValue.nationality}
                    onChange={filterOnChangeHandle}
                    id="nationality"
                    className="nationality-input input"
                  >
                    {nationalitiesArr.map((ele, index) => {
                      return (
                        <option key={index} value={ele} className="option">
                          {capitalizeFirstLetter(ele)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </form>
            </div>
            <div className="td" id="s-cover">
              <SearchIcon/>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};
export default Filter;

const Wrapper = styled.div`
  margin: 5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
.search{
  size: 5rem
}
  .filter-form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem 2rem;
  }
  .filter-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .filter-and-lable {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .input,
  .lable {
    height: 2.5rem;
    width: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .input {
    border: 1.5px solid var(--c51);
    border-radius: 12rem;
    padding: 0 1rem;
    background-color: transparent;
    outline: none;
  }

  .tb {
    display: table;
    width: 100%;
  }

  .td {
    display: table-cell;
    vertical-align: middle;
  }

  .button {
    color: #fff;

    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
  }

  #cover {
    top: 50%;
    left: 0;
    right: 0;
    width: auto;
    padding: 0 1rem;
    background-color: var(--c61);
    border-radius: 20px;
    box-shadow: 0 10px 40px var(--c61), 0 0 0 20px var(--c21);
  }

  #s-cover {
    width: 1px;
    padding-left: 35px;
  }

  button {
    position: relative;
    display: block;
    width: 84px;
    height: 96px;
    cursor: pointer;
  }

  #s-circle {
    position: relative;
    top: -8px;
    left: 0;
    width: 43px;
    height: 43px;
    margin-top: 0;
    border-width: 15px;
    border: 15px solid #fff;
    background-color: transparent;
    border-radius: 50%;
    transition: 0.5s ease all;
  }
`;
