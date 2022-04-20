import styled, { keyframes, text } from "styled-components";
import { AppContext } from "../../other/AppContext";
import { useContext } from "react";
import { GrNext } from "react-icons/gr";
const Button = ({ btnText }) => {
  const { darkMode } = useContext(AppContext);

  return (
    <DIV className={`info ${darkMode && "dark"}`}>
      <div className="frame">
        <div className="custom-btn theBtn">
          <span className="span">{btnText}</span>
        </div>
      </div>
    </DIV>
  );
};
export default Button;

const DIV = styled.div`
  .span {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .frame {
    width: 90%;
    text-align: center;
  }
  button {
    margin: auto;
    outline: none;
    display: flex;

    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
  }
  .custom-btn {
    width: 200px;
    height: 40px;
    padding: 10px 25px;
    border: 2px solid #000;
    font-family: "Lato", sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
  }

  .theBtn {
    background: #3d405b;
    color: #fff;
    line-height: 42px;
    padding: 0;
    border: none;
    display: flex;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 1.4rem;
  }

  .theBtn:hover {
    background: transparent;
    color: #000;
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  }
  .dark .theBtn:hover {
    background: transparent;
    color: #f4f1de;
    box-shadow: 7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  }
  .theBtn:before,
  .theBtn:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #000;
    transition: 400ms ease all;
  }
  .dark .theBtn:before,
  .dark .theBtn:after {
    content: "";
    background: #f2cc8f;
  }
  .theBtn:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  .theBtn:hover:before,
  .theBtn:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`;
