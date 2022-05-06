import styled from "styled-components";
import { GrNext } from "react-icons/gr";
// ------------------------------------------------------------------
const NextBtn = ({ btntext }) => {
  return (
    <DIV className="info">
      <div className="btn-container">
        <button>
          <span className="text">{btntext}</span>
          <div className="icon-container">
            <div className="icon icon--left">
              <GrNext />
            </div>
            <div className="icon icon--right">
              <GrNext />
            </div>
          </div>
        </button>
      </div>
    </DIV>
  );
};
export default NextBtn;
// ------------------------------------------------------------------
const DIV = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
  // -----------------
  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--bg);
    &:nth-child(1) {
      --btn-bg: #81b29a;
    }
  }
  // -----------------
  button {
    --width: 10rem;
    --height: 2rem;
    border: 0;
    position: relative;
    min-width: var(--width);
    min-height: var(--height);
    border-radius: var(--height);
    color: #fff;
    &.dark {
      color: #3d405b;
    }
    font-family: "Montserrat";
    font-weight: bold;
    background: #f2cc8f;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    // -----------------
    .text,
    .icon-container {
      position: relative;
      z-index: 2;
    }
    // -----------------
    .icon-container {
      --icon-size: 25px;
      position: relative;
      width: var(--icon-size);
      height: var(--icon-size);
      margin-left: 15px;
      transition: transform 500ms ease;
      // -----------------
      .icon {
        position: absolute;
        left: 0;
        top: 0;
        width: var(--icon-size);
        height: var(--icon-size);
        transition: transform 500ms ease, opacity 250ms ease;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        &--left {
          transform: translateX(-200%);
          opacity: 0;
        }
      }
    }
    // -----------------
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: var(--btn-bg);
      border-radius: var(--height);
      z-index: 1;
      transition: transform 500ms ease;
    }
    // -----------------
    &:hover {
      &::after {
        transform: translateX(65%);
      }
      .icon-container {
        transform: translateX(125%);
        .icon {
          &--left {
            transform: translateX(0);
            opacity: 1;
          }
          &--right {
            transform: translateX(200%);
            opacity: 0;
          }
        }
      }
    }
  }

  .support {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 10px;
    display: flex;
    a {
      margin: 0 10px;
      color: #fff;
      font-size: 1.8rem;
      backface-visibility: hidden;
      transition: all 150ms ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;
