import Header from "../Header";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import styled from "styled-components";
import Filter from "./Filter";
import Map from "./Map";
// ------------------------------------
const Home = () => {
  const {
    passwordAlertFunc,

    userSession,
    passwordGoogleSingUp,
  } = useContext(AppContext);
  // -----------------

  // -----------------
  return (
    <Wrapper>
      <Header />
      <div className="page">
        <Filter/>
        <Map/>
      </div>
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.div`
  .page {
    display: block;
    margin: auto;
    width: var(--website-width);
  }
`;
