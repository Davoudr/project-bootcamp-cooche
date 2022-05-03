import styled from "styled-components";
import { AppContext } from "../../other/AppContext";
import { useContext, useState } from "react";
const Description = () => {
  const {
    businessInfo,
    darkMode,

    newSuggestionOnChangeHandle,
  } = useContext(AppContext);
  return (
    <Wrapper>
      <label htmlFor="description" form="business-form">
        <span
          className={`description-span connection-type ${!darkMode && "dark"}`}
        >
          Optionally you can add some description about this business. For
          example:
        </span>
        <span
          className={`description-exp connection-type ${!darkMode && "dark"}`}
        >
          - Working hours
        </span>
        <span
          className={`description-exp connection-type ${!darkMode && "dark"}`}
        >
          - Prices
        </span>
        <span
          className={`description-exp connection-type ${!darkMode && "dark"}`}
        >
          - Advantages
        </span>
        <span
          className={`description-exp connection-type ${!darkMode && "dark"}`}
        >
          - Offers
        </span>
        <span
          className={`description-exp connection-type ${!darkMode && "dark"}`}
        >
          - Needs
        </span>
      </label>
      <textarea
        value={businessInfo.description}
        className="descriprion-textArea"
        id="description"
        onChange={newSuggestionOnChangeHandle}
      />
    </Wrapper>
  );
};

export default Description;

const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  .description-span {
    margin-bottom: 1rem;
    display: block;
    &.dark {
      color: var(--c11);
    }
  }
  .connection-type {
    &.dark {
      color: var(--c21);
    }
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
  .input {
    width: 40rem;
    padding-left: 1rem;
    outline: none;
    display: block;
    &.dark {
      background-color: var(--c51);
    }
    &:focus {
      box-shadow: var(--box-shadow-1);
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
    outline: none;
    height: 25rem;
    &.dark{
      background-color: var(--c21);
    }
  }
`;
