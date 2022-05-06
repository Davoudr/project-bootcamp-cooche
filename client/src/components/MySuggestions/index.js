import styled from "styled-components";
// ------------------------------------------------------------------
const MySuggestions = () => {
  return (
    <Wrapper>
      <div className="card">
        <div className="content">
          <div className="info"></div>
        </div>
      </div>
    </Wrapper>
  );
};
export default MySuggestions;
// ------------------------------------------------------------------
const Wrapper = styled.div`
  width: var(--website-width);
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: column;
  margin-top: 1rem;
  // -----------------
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  // -----------------
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  // -----------------
  .card {
    background-color: var(--c10);
    height: 300px;
    z-index: 1;
    border-radius: var(--border-radius6);
    border-start-start-radius: 10rem;
    box-shadow: var(--box-shadow-1);
    &.dark {
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(17, 25, 40, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.125);
    }
  }
`;
// -----------------------------------
