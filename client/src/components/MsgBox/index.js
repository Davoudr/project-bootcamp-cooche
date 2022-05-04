import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../other/AppContext";
import { keyframes } from "styled-components";
// -----------------------------------------------
const MsgBox = () => {
  // -----------------------------------------------
  const { message, setMessage } = useContext(AppContext);
  const pageHandle = (ev) => {
    ev.stopPropagation();
    setMessage({ status: false, title: "", content: "", btnText: "" });
  };
  const boxHandle = (ev) => {
    ev.stopPropagation();
  };
  const btnHandle = (ev) => {
    ev.stopPropagation();
    setMessage({ status: false, title: "", content: "", btnText: "" });
  };
  // -----------------------------------------------
  return (
    <Wrapper onClick={pageHandle}>
      {message && (
        <div className="msg-box" onClick={boxHandle}>
          <span className="title text">{message.title}</span>
          <p className="text msg">{message.content}</p>
          <button className="btn" onClick={btnHandle}>
            {message.btnText}
          </button>
        </div>
      )}
    </Wrapper>
  );
};
export default MsgBox;
// -----------------------------------------------
const theAnimation = keyframes`
    0% { 
    opacity: 0;
    transform: scale(1);
        } 
    33% {
    transform: scale(1.04);
    }
    66% {
    transform: scale(0.98);
    }
    100% {
    opacity: 100%;
    transform: scale(1);
    }
`;
const Wrapper = styled.button`
  animation: ${theAnimation};
  animation-duration: 250ms;
  .btn {
    color: var(--c13);
    padding: 0.5rem 2rem;
    font-weight: bold;
  }
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
    font-weight: bold;
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
    backdrop-filter: blur(19px) saturate(132%);
    -webkit-backdrop-filter: blur(19px) saturate(132%);
    background-color: rgba(61, 64, 91, 0.69);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
`;
