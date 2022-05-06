import styled from "styled-components";
import { GiShrug } from "react-icons/gi";
// ------------------------------------------------------------------
const Err404 = () => {
  return (
    <Div>
      <GiShrug size={"10rem"} />
      <span className="errTitle">404 . Not Found</span>
      <span className="errMsg">
        Please try refreshing the page, <br />
        or
        <a className="supportLink" href="https://help.twitter.com/en/forms">
          {" "}
          contact support{" "}
        </a>
        if the problem persists.
      </span>
    </Div>
  );
};
export default Err404;
// ---------------------------------------------------------------------
const Div = styled.div`
  width: 100vw;
  height: 70vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  size: 300px;
  border: solid 1px lightgray;
  // -----------------
  .supportLink {
    color: blue;
  }
  // -----------------
  .errTitle {
    margin: 100px 0 40px;
    color: black;
    font-size: 1.5rem;
    font-weight: bold;
  }
  // -----------------
  .errMsg {
  }
`;
