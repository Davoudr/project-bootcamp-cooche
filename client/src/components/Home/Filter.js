import {
  locationList,
  categoriesArr,
  nationalitiesArr,
  languagesArr,
} from "../../other/variables";
import styled from "styled-components";
import { AppContext } from "../../other/AppContext";
import { useContext } from "react";
import SearchIcon from "./SearchIcon";
import SelectOption from "./SelectOption";
// -----------------------------------------------------
const Filter = () => {
  const {
    objGeneratorForMabBox,
    setLoading,
    filterValue,
    setFilterValue,
    setMessage,
    setAllServices,
  } = useContext(AppContext);
  // -----------------------------------  // handle-onChenge
  const filterOnChangeHandle = (ev) => {
    let theKey = ev.target.id;
    // if value is the default-value, we need to chenge it to empty-string
    let theValue =
      ev.target.value === "-----Sellect-----" ? "" : ev.target.value;
    // we need to empty both country and province
    // if user select the default-value for country
    if (theKey === "country" && theValue === "") {
      setFilterValue({ ...filterValue, province: "", country: "" });
    } else {
      // normal handle-onChange function
      setFilterValue({ ...filterValue, [theKey]: theValue });
    }
  };
  // -----------------------------------  // handle-onClieck for seach button
  const handleSearch = (ev) => {
    //  to render a loading during loading filtered-data
    setLoading(true);
    //  to fetch filtered-data from endpoint
    fetch("/business/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(filterValue),
    })
      .then((res) => res.json())
      .then((data) => {
        // -----------------
        // having proper action based on endpoint-response
        switch (true) {
          // ---------------
          // if not-found
          case data.status === 400:
            setTimeout(() => {
              setLoading(false);
              setAllServices(null);
              setMessage({
                status: true,
                title: "No service found",
                content:
                  "Filtering by a different felter may result in finding services!",
                btnText: "Ok",
              });
            }, 3000);
            break;
          // ---------------
          // if found
          case data.status === 200:
            setAllServices(objGeneratorForMabBox(data.data));
            setTimeout(() => {
              setLoading(false);
            }, 3000);
            break;
          // ---------------
          // not predicted state
          default:
            setMessage({
              status: true,
              title: "Try again!",
              content: "Something goes wrong, please try again!!",
              btnText: "Ok",
            });
            setLoading(false);
            break;
        }
      });
  };
  // -----------------------------------
  return (
    <Wrapper>
      <div id="cover">
        <div className="tb">
          <div className="td">
            <form id="filter-form" className="filter-form">
              <div className="filter-and-label">
                <SelectOption
                  name={"category"}
                  fomeName={"filter"}
                  value={filterValue.category}
                  onChangeHandle={filterOnChangeHandle}
                  optionsArr={categoriesArr}
                  defaultValue={"-----Sellect-----"}
                />
              </div>
              <div className="filter-and-label">
                <SelectOption
                  name={"country"}
                  fomeName={"filter"}
                  value={filterValue.country}
                  onChangeHandle={filterOnChangeHandle}
                  optionsArr={Object.keys(locationList).sort()}
                  defaultValue={"-----Sellect-----"}
                />
              </div>
              <div className="filter-and-label">
                <SelectOption
                  name={"province"}
                  fomeName={"filter"}
                  value={filterValue.province}
                  onChangeHandle={filterOnChangeHandle}
                  optionsArr={
                    filterValue.country
                      ? locationList[`${filterValue.country}`].provinces
                      : []
                  }
                  defaultValue={
                    filterValue.country ? "-----Sellect-----" : "Select Country"
                  }
                />
              </div>
              <div className="filter-and-label">
                <SelectOption
                  name={"nationality"}
                  fomeName={"filter"}
                  value={filterValue.nationality}
                  onChangeHandle={filterOnChangeHandle}
                  optionsArr={nationalitiesArr}
                  defaultValue={"-----Sellect-----"}
                />
              </div>
              <div className="filter-and-label">
                <SelectOption
                  name={"language"}
                  fomeName={"filter"}
                  value={filterValue.language}
                  onChangeHandle={filterOnChangeHandle}
                  optionsArr={languagesArr}
                  defaultValue={"-----Sellect-----"}
                />
              </div>
            </form>
          </div>
          <div className="td" id="s-cover">
            <button onClick={handleSearch} className="search-btn" type="button">
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Filter;
// ------------------------------------------------------------------
const Wrapper = styled.div`
  margin: 5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // -----------------
  .search-btn {
    background-color: transparent;
  }
  // -----------------
  .filter-form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem 2rem;
  }
  // -----------------
  .filter-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // -----------------
  .filter-and-label {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  // -----------------
  .tb {
    display: table;
    width: 100%;
  }
  // -----------------
  .td {
    display: table-cell;
    vertical-align: middle;
  }
  // -----------------
  .button {
    color: #fff;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
  }
  // -----------------
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
  // -----------------
  #s-cover {
    width: 1px;
    padding-left: 35px;
  }
  // -----------------
  button {
    position: relative;
    display: block;
    width: 84px;
    height: 96px;
    cursor: pointer;
  }
  // -----------------
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
