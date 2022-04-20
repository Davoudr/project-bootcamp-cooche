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

  height: calc(100vh - var(--navbar-height));
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
   
  }
  .method-btn {
    font-family: var(--f11);
    margin: 20px 10px;
    background-color: transparent;
    color: var(--c14);
    border-radius: 0%;
    font-weight: bold;
    padding-bottom: 1rem;
    &.dark{
      color: var(--c12);
    }
    
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
   min-height: 25rem;
   .dark{
    backdrop-filter: blur(0px) saturate(200%);
    -webkit-backdrop-filter: blur(0px) saturate(200%);
    background-color: rgba(17, 25, 40, 0.02);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.005);
   }
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
    transition: all ease-out 0.25s;
    backdrop-filter: blur(0px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.52);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    &.dark{
      backdrop-filter: blur(0px) saturate(200%);
    -webkit-backdrop-filter: blur(0px) saturate(200%);
    background-color: rgba(17, 25, 40, 0.52);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);

    }
    
  }
  .title {
    top: 50px;
    font-size: var(--font-size-10);
    font-weight: bold;
    font-family: var(--f11);
    color: var(--c11);
    
  }
`;
