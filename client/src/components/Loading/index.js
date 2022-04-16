import styled, { keyframes } from "styled-components";
// --------------------------------------------
const Loading = () => {
  return <LoadingDiv/>;
};
export default Loading;
// --------------------------------------------
const breakout = keyframes`
  0%,
  40% {
    border-width: 25px; }
  60% {
    border-color: var(--c61);
    border-width: 6px;
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1); }
  100% {
    border-color: var(--c31);
    opacity: 0;
    -webkit-transform: scale(2);
            transform: scale(2); }
  `
// --------------------------------------------
const LoadingDiv = styled.div`

  position: relative;
  height: 50px;
  width: 50px;
  &:before {
    animation: ${breakout} 1.5s infinite;
    display: block;
    content: "";
    height: 100%;
    width: 100%;
    border: 6px solid var(--c12);
    border-radius: 100%;
  }
`;
