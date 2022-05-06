import Header from "../Header";
import styled from "styled-components";
import Filter from "./Filter";
import Map from "./Map";
// ------------------------------------------------------------------
const Home = () => {
  return (
    <Wrapper>
      <Header />
      <div className="page">
        <Filter />
        <Map />
      </div>
    </Wrapper>
  );
};
export default Home;
// ------------------------------------------------------------------
const Wrapper = styled.div`
  .page {
    display: block;
    margin: auto;
    width: var(--website-width);
  }
`;
