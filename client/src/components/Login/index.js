import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import SignIn from "./SignInTab";
import SignUp from "./SignUpTab";
// ----------------------------------------------------------
const Login = () => {
  // ----------------------------------------------------------
  const { user } = useAuth0();
  const { logInMethod, setLogInMethod } = useContext(AppContext);
  // ----------------------------------------------------------
  return user ? (
    <Navigate to="/dashboard" />
  ) : (
    <Wrapper>
      <div className="login">
        <div className="header">
          <span className="title">Choose a Login Method</span>
          <div className="methods-div">
            <button
              className={`method-btn ${logInMethod === "sign-in" && "active"}`}
              onClick={() => setLogInMethod("sign-in")}
            >
              SignIn
            </button>
            <button
              className={`method-btn ${logInMethod === "sign-up" && "active"}`}
              onClick={() => setLogInMethod("sign-up")}
            >
              SignUp
            </button>
          </div>
        </div>
        <div className="methods">
          {logInMethod === "sign-in" ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </Wrapper>
  );
};
export default Login;
// ----------------------------------------------------------
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 50px;
  min-width: var(--min-normal-width);
  background-color: var(--c10);
  height: calc(100vh - var(--navbar-height));
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  .method-btn {
    margin: 20px 10px;
    background-color: transparent;
    color: var(--c41);
    border-radius: 0%;
  }
  .active {
    border-bottom: 2px solid var(--c31);
    color: var(--c31);
  }
  .methods {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
  .login {
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* flex-flow: column; */
    flex-direction: column;
    box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: var(--border-radius3);
    padding: 50px;
    min-width: var(--min-normal-width-inside);
    position: relative;
    transition: all ease-out 0.25s;
  }
  .title {
    top: 50px;
    font-size: var(--font-size-10);
    font-weight: bold;
    font-family: var(--f11);
    color: var(--c11);
  }
`;
