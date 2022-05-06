import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import GoogleLogin from "./GoogleLogin";
import { useState } from "react";
import ErrBox from "./ErrBox";
import { useNavigate } from "react-router-dom";
import LoadingTiny from "../LoadingTiny";
import Button from "../Tools/Button";
// ------------------------------------------------------------------
const SignInTab = () => {
  // -----------------------------------
  let navigate = useNavigate();
  // -----------------
  const { loading, setLoading, setUserSession } = useContext(AppContext);
  // -----------------
  // local states
  const [userInputSignIn, setuserInputSignIn] = useState({
    email: "",
    password: "",
  });
  // -----------------
  // local states
  const [err, setErr] = useState({
    email: { state: false, text: "" },
    password: { state: false, text: "" },
  });
  // -----------------------------------
  const signInHandle = (ev) => {
    ev.preventDefault();
    // ---------------
    // sending login-info to BE
    setLoading(true);
    fetch("/user/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userInputSignIn),
    })
      .then((res) => res.json())
      .then((data) => {
        // ---------------
        // proper action based on server-res
        switch (true) {
          // ---------------
          // no user found
          case data.status === 400:
            setErr({
              password: { state: false, text: "" },
              email: { state: true, text: data.message },
            });
            setLoading(false);
            break;
          // ---------------
          // wrong password
          case data.status === 401:
            setErr({
              email: { state: false, text: "" },
              password: { state: true, text: data.message },
            });
            setLoading(false);
            break;
          // ---------------
          // user is found
          default:
            setErr({
              email: { state: false, text: "" },
              password: { state: false, text: "" },
            });
            setLoading(false);
            setUserSession(data.user);
            navigate(`/`, { replace: true });
            break;
        }
      });
  };
  // ------------------------------------------------------------------
  return (
    <Wrapper>
      <div className="methods">
        <div className="left">
          <GoogleLogin text={`Sign-In`} />
        </div>
        <div className="center">
          <div className="line"></div>
          <div className="or">OR</div>
        </div>{" "}
        <div className="right">
          <form className="right" autoComplete="on" onSubmit={signInHandle}>
            <input
              className="input"
              type="email"
              placeholder="E-Mail address"
              onChange={(ev) => {
                setuserInputSignIn({
                  ...userInputSignIn,
                  email: ev.target.value,
                });
              }}
              autoFocus
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={(ev) => {
                setuserInputSignIn({
                  ...userInputSignIn,
                  password: ev.target.value,
                });
              }}
              required
            />
            <button className="submit-btn" type="submit">
              {!loading ? <Button btnText="Sign In" /> : <LoadingTiny />}
            </button>
          </form>
          <div className="err-box">
            <ErrBox conditions={[err.email, err.password]} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default SignInTab;
// ------------------------------------------------------------------
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: var(--c10);
  // ------------
  .err-box {
    width: 200px;
  }
  // ------------
  .methods {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
  // ------------
  .left,
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
  // ------------
  .center {
    margin: 20px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  // ------------
  .or {
    border: 2px solid lightgray;
    border-radius: 50%;
    padding: 10px;
    color: var(--c12);
    background-color: var(--c21);
    font-weight: bold;
    z-index: 1;
  }
  // ------------
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
  // ------------
  .input {
    font-size: var(--font-size-4);
    font-family: var(--f12);
  }
  // ------------
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
  // ------------
  .submit-btn {
    border: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--f12);
    background-color: transparent;
  }
  // ------------
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
  }
`;
