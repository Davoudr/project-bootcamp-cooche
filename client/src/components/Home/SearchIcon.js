import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useState } from "react";
import { keyframes } from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
// --------------------------------------

// --------------------------------------
const SearchIcon = () => {


  const {darkMode} = useContext (AppContext);
  const [click, setClick] = useState(true);

//   const searchAnimate = useSpring({
//     transform: click ? "rotate(50deg) scale(0.8)" : "rotate(0deg) scale(1)",
//     left: click ? "5px" : "0px",
//     bottom: click ? "5px" : "0px",
//     config: {
//       mass: 3.1,
//       tension: 339,
//       friction: 12,
//     },
//   });



  return (
    <Wrapper click={click}>
        <BiSearchAlt size="4rem" className="search" fill={darkMode ? "white" : "#3D405B"}/>
    </Wrapper>
  );
};
export default SearchIcon;
// --------------------------------------
const animation = keyframes`
	   
 0% { 
     
    bottom: 0px;
    transform: rotate(10deg) scale(1.0);
  } 
  50%{
    bottom: 10px;
    transform: rotate(-40deg) scale(1.1);
  }
 
 100% {     bottom: 00px;
    transform: rotate(10deg) scale(1.0);}
`;
const Wrapper = styled.div`
  .search {
    animation: ${(props) => props.click && animation} infinite;
    animation-duration: 2000ms;
  }
`;
