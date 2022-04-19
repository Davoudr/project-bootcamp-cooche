import styled from "styled-components";
import logo from "../../img/world-points.png";
// -------------------------------------------
const Header = () => {
  return (
    <Wrapper>
      <Content>
        <img src={logo} className="logo-pic" alt="logo"/>
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
  .text{
      margin-left: 3rem;
      color: var(--c41);
      font-family: var(--f11);
  }
`;
