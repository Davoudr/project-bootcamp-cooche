import { AppContext } from "../../other/AppContext";
import { useContext } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Loading from "../Loading";
const Text = () => {
  const { filterValue } = useContext(AppContext);

  return (
    <Wrapper>
      <div className="heading">
        <h1 className="title first-line">
          The services
          {filterValue.category && ` related to the  ${filterValue.category},`}
          {(filterValue.country || filterValue.province) && ` located in `}
          {filterValue.country && filterValue.country}
          {filterValue.province && `/${filterValue.province}`}
        </h1>
        <h1 className="title scond-line">
          {filterValue.nationality &&
            `provided by ${filterValue.nationality} people`}
          {filterValue.language &&
            ` offering customer service in ${filterValue.language}`}
        </h1>
        <div className="loading">
          <Loading />
        </div>
      </div>
    </Wrapper>
  );
};
export default Text;
const theAnimation = keyframes`
    0% { 
    opacity: 0;
    margin-top: 10rem;
        } 
        100% {
    opacity: 100%;
    margin-top: 0rem;}
`;
const Wrapper = styled.div`
  width: 100%;
  .loading {
    text-align: center;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
  }
  .heading {
    border-bottom: 1px solid #eee;
    line-height: 60px;
    padding: 0 10px;
    text-align: center;
    padding: 2rem;
    animation: ${theAnimation};
    /* animation-duration: 4000ms;
    backdrop-filter: blur(16px) saturate(180%); */
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    &.dark {
      backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(17, 25, 40, 0.75);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.125);
      .title {
        color: #d9d9d9;
        /* background: #e8e8e8; */
        text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.1),
          1px 1px 1px rgba(0, 0, 0, 0.5);
        color: #d9d9d9;
        /* background: #e8e8e8; */
      }
    }
  }

  .title {
    font-family: var(--f13);
    font-weight: 200;
    color: transparent;
    background: #666666;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    text-shadow: 0px 3px 3px rgba(255, 255, 255, 0.5);
  }
  .first-line {
    font-size: var(--font-size-5);
  }
  .scond-line {
    font-size: var(--font-size-8);
  }
`;
