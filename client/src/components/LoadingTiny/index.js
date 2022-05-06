import styled, { keyframes } from "styled-components";
// ------------------------------------------------------------------
const LoadingTiny = () => {
  return <LoadingDiv/>;
};
export default LoadingTiny;
// ------------------------------------------------------------------
const ani = keyframes`
   50% {
      box-shadow: 21px 0 0 3px, 42px 0 0 8px, 63px 0 0 3px;
   }

   100% {
      box-shadow: 21px 0 0 0, 42px 0 0 3px, 63px 0 0 8px;
   }
  `;
// --------------------------------------------
const LoadingDiv = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: var(--c31);
  box-shadow: 21px 0 0 8px, 42px 0 0 3px, 63px 0 0 0;
  transform: translateX(-42px);
  animation: ${ani} 0.5s infinite alternate linear;
`;
