import styled, { keyframes } from "styled-components";
// ------------------------------------------------------------------
const MenuBtn = ({ trigger, btnText, darkMode }) => {
  return (
    <DIV className="info" trigger={trigger}>
      <div
        className={`button ${trigger && "button-acive"} ${
          darkMode && "darkMode"
        }`}
      >
        <span
          className={`span ${trigger && "span-acive"} ${
            darkMode && "darkMode"
          }`}
        >
          {btnText}
        </span>
      </div>
    </DIV>
  );
};
export default MenuBtn;
// ------------------------------------------------------------------
const rotate = keyframes`
0%
	{transform: rotate(0deg) translate3d(0, 0, 0)}
25%
	{transform: rotate(3deg) translate3d(0, 0, 0)}
50%
	{transform: rotate(-3deg) translate3d(0, 0, 0)}
75%
	{transform: rotate(1deg) translate3d(0, 0, 0)}
100%
	{transform: rotate(0deg) translate3d(0, 0, 0)}
`;
// -----------------------------------
const storm = keyframes`
0%
	{transform: translate3d( 0, 0, 0) translateZ(0)}
25%
	{transform: translate3d( 1px, 0, 0) translateZ(0)}
50%
	{transform: translate3d( -13px, 0, 0) translateZ(0)}
75%
	{transform: translate3d( 12px, 0, 0) translateZ(0)}
100%
	{transform: translate3d( 0, 0, 0) translateZ(0);}
`;
// -----------------------------------
const DIV = styled.div`
  width: 100%;
  height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // -----------------
  .button {
    position: relative;
    outline: none;
    text-decoration: none;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    height: 3rem;
    width: 300px;
    opacity: 1;
    background-color: #ffffff;
    &.dark {
      background-color: #3d405b;
      color: #f4f1de;
    }
    &.button-acive {
      animation: ${rotate} 2s ease-in-out both;
      box-shadow: var(--box-shadow-0);
    }
  }
  // -----------------
  .span {
    color: #3d405b;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.7px;
    &.span-acive {
      animation: ${storm} 2s ease-in-out both;
      animation-delay: 0.2s;
    }
    &.dark {
      color: #f4f1de;
    }
  }
`;
