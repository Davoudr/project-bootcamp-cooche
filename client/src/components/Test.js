import { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { AppContext } from "../other/AppContext";
// --------------------------------------------

const Test = () => {
  const {  userSession } = useContext(AppContext);
//   function hexToBase64(str) {
//     return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
// }
  const pic = userSession.pic
  // const srcImg = 'data:image/png;base64,' + hexToBase64(pic.data);;
  // console.log("asda", pic , "pppppppppp" , srcImg);
  return (
    <Div>
      <img  className="image" src={pic} alt="test"/>
    </Div>
  );
};
export default Test;
// --------------------------------------------
const Div = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--c61);

  .image{
    height: 200px;
    width: 200px;
    background-color: red;
  }
`;
// --------------------------------------------
