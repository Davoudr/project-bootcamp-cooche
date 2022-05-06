import styled from "styled-components";
// ------------------------------------------------------------------
const ErrBox = ({ conditions }) => {
  // -----------------------------------
  const ifShowErrDiv = conditions.some((condition) => condition.state === true);
  // -----------------------------------
  return (
    <ShowErrDiv>
      <div
        className="err"
        style={ifShowErrDiv ? { display: "flex" } : { display: "none" }}
      >
        {conditions.map((condition, index) => {
          return (
            <span
              key={index}
              className="err-msg"
              style={
                condition.state ? { display: "block" } : { display: "none" }
              }
            >
              {condition.text}
            </span>
          );
        })}
      </div>
    </ShowErrDiv>
  );
};
export default ErrBox;
// ------------------------------------------------------------------
const ShowErrDiv = styled.div`
  // -----------------
  .err-msg {
    display: none;
    text-align: center;
    color: red;
  }
  // -----------------
  .err {
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: solid 1px red;
    margin-top: 20px;
  }
  // -----------------
  .err-passLength-active {
    display: block;
  }
  // -----------------
  .err-passConfrmed-active {
    display: block;
  }
  // -----------------
  .err-agreement-active {
    display: block;
  }
  // -----------------
  .err-active {
    display: flex;
  }
`;
