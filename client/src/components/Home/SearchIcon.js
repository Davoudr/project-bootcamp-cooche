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


  const {darkMode, loading} = useContext (AppContext);


  const searchAnimate = useSpring({
    transform: loading ? "rotate(45deg) scale(0.9)" : "rotate(0deg) scale(1)",
    left: loading ? "5px" : "0px",
    bottom: loading ? "5px" : "0px",
    config: {
      tension: 280,
      friction: 60
    },
  });



  return (
    <Wrapper style={searchAnimate}  active={loading}>
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
const Wrapper = styled(animated.div)`

  .search {
    animation: ${(props) => props.active && animation} infinite;
    animation-duration: 1500ms;
  }
`;
