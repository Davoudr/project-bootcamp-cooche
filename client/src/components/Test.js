import { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../other/AppContext";
const Test = ({titleText, contectText, btnText}) => {
  const { showMsg, setShowMsg } = useContext(AppContext);

  const pageHandle = (ev) => {
    ev.stopPropagation();
    setShowMsg(false);
  };
  const boxHandle = (ev) => {
    ev.stopPropagation();
  };
  const btnHandle = (ev) => {
    ev.stopPropagation();
    setShowMsg(false);
  };
  return (
    <Wrapper onClick={pageHandle}>
      {showMsg && (
        <div className="msg-box" onClick={boxHandle}>
          <span className="title text">{titleText}</span>
          <p className="text msg">
           {contectText}
          </p>
          <button onClick={btnHandle}>{btnText}</button>
        </div>
      )}
    </Wrapper>
  );
};

export default Test;

const Wrapper = styled.button`
  &:active {
    box-shadow: none;
    background-color: transparent;
  }
  /* position: absolute; */
  width: 100vw;
  height: calc(100vh - var(--navbar-height));
  background-color: transparent;
  backdrop-filter: blur(2px);
  z-index: 10;
  .text {
    color: var(--c10);
  }
  .title {
    font-size: var(--font-size-7);
  }
  .msg {
    z-index: 11;
    font-weight: normal;
    font-size: var(--font-size-4);
    margin: 40px 10px;
    /* padding: auto; */
  }
  .msg-box {
    padding: 30px;
    min-height: 200px;
    max-width: 500px;
    min-width: 300px;
    background-color: grey;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    display: flex;

    justify-content: space-around;
    align-items: center;
    /* flex-flow: column; */
    flex-direction: column;
  }
`;
