import styled from "styled-components";
import logo from "../../assets/img/world-points.png";
import bg from "../../assets/img/yellow-city.png";
// ------------------------------------------------------------------
const DashboardHeader = () => {
  return (
    <Wrapper>
      <Content>
        <img className="bg" src={bg} alt="background" />
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
export default DashboardHeader;
// ------------------------------------------------------------------
const Wrapper = styled.div`
  z-index: -2;
  position: relative;
  width: 100%;
  background-color: var(--c61);
  height: var(--header-height);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  // -----------------
  .bg {
    position: absolute;
    z-index: -1;
    height: calc(0.8 * var(--header-height));
    bottom: 0;
  }
`;
// -----------------------------------
const Content = styled.div`
  width: var(--website-width);
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  height: var(--header-height);
  // -----------------
  .logo-pic {
    height: var(--header-height);
    width: var(--header-height);
    fill: var(--c31);
  }
  // -----------------
  .title {
    font-size: var(--font-size-10);
    display: block;
    font-weight: bold;
  }
  // -----------------
  .sub-title {
    font-size: var(--font-size-5);
    display: block;
    color: var();
  }
  // -----------------
  .text {
    margin-left: 3rem;
    color: var(--c51);
    font-family: var(--f11);
  }
`;
// -----------------------------------
