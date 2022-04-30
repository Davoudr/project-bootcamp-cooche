import styled, { keyframes } from "styled-components";
import logo from "../../assets/img/world-points.png";
// -------------------------------------------
const Header = () => {
  return (
    <Wrapper>
      <Content>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <img src={logo} className="logo-pic" alt="logo" />
        <div className="text">
          <span className="title">
            Connect easily and fast with your cominity
          </span>
          <span className="sub-title">To answer your needs</span>
        </div>
      </Content>
    </Wrapper>
  );
};
export default Header;
// -------------------------------------------
const animate = keyframes`
	   0%{
        transform: translateY(calc(var(--header-height) - 50px)) rotate(720deg);
        opacity: 0;
       
    }
    50%{
      opacity: 1;
    }

       100%{
        transform: translateY(0) rotate(0deg);
        opacity: 0;
     display: none;
    }


`;
const Wrapper = styled.div`
  width: 100%;
  background-color: var(--c61);
  height: var(--header-height);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* flex-flow: row; */
  flex-direction: row;
`;

const Content = styled.div`
  width: var(--website-width);
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  height: var(--header-height);
  .logo-pic {
    height: var(--header-height);
    width: var(--header-height);
    fill: var(--c31);
  }
  .title {
    font-size: var(--font-size-10);
    display: block;
    font-weight: bold;
  }
  .sub-title {
    font-size: var(--font-size-5);
    display: block;
  }
  .text {
    margin-left: 3rem;
    color: var(--c41);
    font-family: var(--f11);
  }

  .circles {
    z-index: 1;
    position: absolute;
    top: var(--navbar-height);
    left: 0;
    width: 100%;
    height: var(--header-height);
    width: 100%;

  
  }

  .circles li {
    position: absolute;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: ${animate} 25s linear infinite;
    border-radius: 20%;
    opacity: 0;
  }

  .circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 5s;
    animation-duration: 10s;
  }

  .circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 10s;
    animation-duration: 15s;
  }

  .circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 30s;
    animation-duration: 12s;
  }

  .circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 7s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 20s;
    animation-duration: 16s;
  }

  .circles li:nth-child(6) {
    left: 75%;
    width: 70px;
    height: 70px;
    animation-delay: 2s;
    animation-duration: 17s;
  }

  .circles li:nth-child(7) {
    left: 35%;
    width: 40px;
    height: 40px;
    animation-delay: 0s;
    animation-duration: 20s;
  }

  .circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 8s;
    animation-duration: 27s;
  }

  .circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 12s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10) {
    left: 85%;
    width: 90px;
    height: 90px;
    animation-delay: 17s;
    animation-duration: 11s;
  }
`;
