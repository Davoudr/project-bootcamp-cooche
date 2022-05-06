import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import styled from "styled-components";
// ------------------------------------------------------------------
const SelectOption = ({
  name,
  fomeName,
  value,
  defaultValue,
  onChangeHandle,
  optionsArr
}) => {
  const { capitalizeFirstLetter } = useContext(AppContext);
  // -----------------------------------
  return (
    <Wrapper>
      <label from={`${fomeName}-form`} htmlFor={name.toLowerCase()} className="label">
      {capitalizeFirstLetter(name)}
      </label>
      <select
        value={value}
        onChange={onChangeHandle}
        id={name.toLowerCase()}
        className="input"
      >
        {[defaultValue, ...optionsArr].map(
          (ele, index) => {
            return (
              <option key={index} value={ele} className="option">
                {capitalizeFirstLetter(ele)}
              </option>
            );
          }
        )}
      </select>
    </Wrapper>
  );
};
export default SelectOption;
// ------------------------------------------------------------------
const Wrapper = styled.div`
  .input,
  .label {
    height: 2.5rem;
    width: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  // -----------------------------------
  .input {
    border: 1.5px solid var(--c51);
    border-radius: 12rem;
    padding: 0 1rem;
    background-color: transparent;
    outline: none;
  }

`;
