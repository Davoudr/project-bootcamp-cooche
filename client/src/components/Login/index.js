import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import styled from "styled-components";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";

const Login = () => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const {
    logInMethod,
    setLogInMethod,
    userInfo,
    setUserInfo,
    passConfirmed,
    setPassConfirmed,
  } = useContext(AppContext);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    ev.target.reset();
  };
  const handleChange = (ev) => {
    let theKey = ev.target.id;
    let theValue = ev.target.value;
    setUserInfo({ ...userInfo, [theKey]: theValue });
  };

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
          {logInMethod === "sign-in" ? (
            <>
              <div className="left">
                <button
                  className="loginBtn fb-div"
                  onClick={() => loginWithRedirect()}
                >
                  <FcGoogle className="icon" size="2rem" />
                  <span className="method-name">Google Sign In</span>
                </button>
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
            </>
          ) : (
            <>
              <div className="middle">
                <div className="left">
                  <button
                    className="loginBtn"
                    onClick={() => loginWithRedirect()}
                  >
                    <FcGoogle className="icon" size="2rem" />
                    <span className="method-name">Google Sign Up</span>
                  </button>
                </div>
                <div className="center">
                  <div className="line"></div>
                  <div className="or">OR</div>
                </div>
                <div className="right">
                  <form
                    onSubmit={handleSubmit}
                    // onChange={onchangeHandle}
                    autocomplete="on"
                    className="form"
                  >
                    <input
                      className="input"
                      id="email"
                      type="email"
                      placeholder="E-Mail"
                      onChange={handleChange}
                      autoFocus
                      required
                    />
                    <input
                      className="input"
                      id="family_name"
                      type="text"
                      placeholder="Family Name"
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="input"
                      id="given_name"
                      type="text"
                      placeholder="Given Name"
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="input"
                      id="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="input"
                      id="lname"
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                    <button className="submit-btn" type="submit">
                      Register
                    </button>
                  </form>
                </div>
              </div>
              <div className="bottom">
                <div className="agreement"></div>
                <div className="err"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
export default Login;

const Wrapper = styled.div`
  height: calc(100vh - var(--navbar-height));
  display: flex;

  justify-content: space-around;
  align-items: center;
  /* flex-flow: column; */
  flex-direction: column;
  padding: 50px;
  min-width: var(--min-normal-width);
  background-color: var(--c10);

  .input {
    font-size: var(--font-size-4);
  }
  .header {
    display: flex;

    justify-content: space-around;
    align-items: center;
    /* flex-flow: column; */
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
  .methods-div {
  }
  .methods {
    display: flex;

    justify-content: center;
    align-items: center;
    /* flex-flow: row; */
    flex-direction: row;
    height: 100%;
  }

  .method-name {
    font-size: var(--font-size-4);
    color: var(--c41);
  }
  .input,
  .submit-btn {
    border: 2px solid var(--c11);
    border-radius: var(--border-radius2);
    height: 3.5rem;
    padding-left: 10px;

    width: 200px;
    font-size: var(--font-size-4);
    color: var(--c41);
  }

  .submit-btn {
    border: none;
  }
  .loginBtn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    color: var(--c15);
    gap: 10px;
    width: 220px;
    padding: 16px 25px;
    border-radius: var(--border-radius2);
    background-color: var(--c21);
    box-shadow: 5px 5px 5px -3px rgba(0, 0, 0, 0.1);
    transition: all ease 0.1s;
    &:active {
      box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
      background-color: var(--c11);
    }
  }

  .center {
    margin: 20px;
    height: 100%;
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
    transition: all ease-out 0.5s;
  }
  .left,
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
  .form {
    display: flex;

    justify-content: center;
    align-items: center;
    /* flex-flow: column; */
    flex-direction: column;
    gap: 5px;
  }
  .icon {
    fill: darkblue;
    size: 50px;
  }

  .title {
    top: 50px;
    font-size: var(--font-size-10);
    font-weight: bold;
    font-family: var(--f11);
    color: var(--c11);
  }
`;
