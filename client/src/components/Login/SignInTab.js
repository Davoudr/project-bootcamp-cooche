import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import GoogleLogin from "./GoogleLogin";
// ----------------------------------------------------------
const SignInTab = () => {
  // ----------------------------------------------------------
  const {} = useContext(AppContext);
  // ----------------------------------------------------------
  return (
    <Wrapper>
      <div className="methods">
        <div className="left">
          <GoogleLogin text={`Google Sign-In`} />
        </div>
        <div className="center">
          <div className="line"></div>
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input
            className="input"
            type="text"
            placeholder="Username"
            autoFocus
          />
          <input className="input" type="text" placeholder="Password" />
          <button className="submit-btn">Sign In</button>
        </div>
      </div>
    </Wrapper>
  );
};
export default SignInTab;
// ----------------------------------------------------------
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  /* min-width: var(--min-normal-width); */
  background-color: var(--c10);
  .methods {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
  .left,
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
  .center {
    margin: 20px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .or {
    border: 2px solid lightgray;
    border-radius: 50%;
    padding: 10px;
    color: var(--c12);
    background-color: var(--c21);
    font-weight: bold;
    z-index: 1;
  }
  .line {
    height: 70%;
    width: 1px;
    position: absolute;
    background-color: var(--c11);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .input {
    font-size: var(--font-size-4);
  }
  .input,
  .submit-btn {
    border: 2px solid var(--c11);
    border-radius: var(--border-radius2);
    height: 2.5rem;
    padding-left: 10px;
    width: 200px;
    font-size: var(--font-size-4);
    color: var(--c41);
  }
  .submit-btn {
    border: none;
  }
  .login {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: var(--border-radius3);
    padding: 50px;
    min-width: var(--min-normal-width-inside);
    position: relative;
    transition: all ease-out 0.5s;
  }
`;
