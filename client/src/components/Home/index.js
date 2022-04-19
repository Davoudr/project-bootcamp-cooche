import Header from "../Header";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import styled from "styled-components";
const Home = () => {
  const {
    passwordAlertFunc,

    userSession,
    passwordGoogleSingUp,

  } = useContext(AppContext);
  // -----------------

  // -----------------
  return (
    <>
      <Header /> <Wrapper></Wrapper>
    </>
  );
};
export default Home;

const Wrapper = styled.div`
  display: block;
  margin: auto;
  width: var(--website-width);
`;
