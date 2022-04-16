import styled from "styled-components";
import { useContext, useState, useRef } from "react";
import { AppContext } from "../../other/AppContext";
import GoogleLogin from "./GoogleLogin";
import LoadingTiny from "../LoadingTiny";
import { useNavigate } from "react-router-dom";
import MsgBox from "../MsgBox";
import { imgUrl } from "../../other/variables";
import ErrBox from "./ErrBox";
// --------------------------------------------------------------------------
const SignUp = () => {
  // --------------------------------------------------------------------------
  const {
    userInfo,
    setUserInfo,
    loading,
    setLoading,
    message,
    setMessage,
    userSession,
    setUserSession,
  } = useContext(AppContext);
  const refToPass = useRef(null);
  let navigate = useNavigate();
  const refToAgreement = useRef(null);
  const [passConfrmedErr, setPassConfrmedErr] = useState(false);
  const [passLengthErr, setpassLengthErr] = useState(false);
  const [agreementErr, setAgreementErr] = useState(false);
  // --------------------------------------------------------------------------
  const handleSubmit = (ev) => {
    ev.preventDefault();
    // ------------------------------checking if agrement is checked
    if (!ev.target[6].checked) {
      refToAgreement.current.focus();
      setAgreementErr(true);
    } else {
      setAgreementErr(false);
    }
    // ------------------------------checking if (pass-confitmation ===  pass)
    if (ev.target[3].value !== ev.target[4].value) {
      refToPass.current.focus();
      setPassConfrmedErr(true);
    } else {
      setPassConfrmedErr(false);
    }
    // ------------------------------checking if password lenght is not short
    if (ev.target[3].value.length < 7) {
      setpassLengthErr(true);
    } else {
      setpassLengthErr(false);
    }
    // ------------------------------storing user-info and sending it to BE to be sotored in db
    if (
      ev.target[3].value.length > 7 &&
      ev.target[3].value === ev.target[4].value &&
      ev.target[6].checked
    ) {
      setLoading(true);
      const info = new FormData();
      info.append("username", ev.target[0].value.trim().split("@")[0]);
      info.append("email", ev.target[0].value.trim());
      info.append("family_name", ev.target[1].value.trim());
      info.append("given_name", ev.target[2].value.trim());
      info.append("password", ev.target[3].value);
      info.append("pic", ev.target[5].files[0]);

      fetch("http://localhost:8000/user/add", {
        method: "POST",
        body: info,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            console.log(`FE / POST / </userAdd> / res / ${data.message}`);

            setUserInfo(info);
            setUserSession({
              username: ev.target[0].value.trim().split("@")[0],
              family_name: ev.target[1].value.trim(),
              given_name: ev.target[2].value.trim(),
              pic:
                ev.target[5].files[0] === undefined
                  ? imgUrl.defaultUserIcon
                  : ev.target[5].files[0],
              userHasThePassword: true,
            });

            navigate(`/`, { replace: true });
            setLoading(false);
            ev.target.reset();
          } else {
            setLoading(false);
            setMessage({
              status: true,
              title: "Please Sign-In",
              content: data.message,
              btnText: "Ok",
            });
          }
        })
        .catch((err) => console.log("Error in add new user:", err));
    }
  };
  // --------------------------------------------------------------------------for having real-time (onChange) err for pass-length
  const handleChangeForm = (ev) => {
    if (ev.target.id === "password" && ev.target.value.length < 7) {
      setpassLengthErr(true);
    } else {
      setpassLengthErr(false);
    }
  };
  // --------------------------------------------------------------------------
  return (
    <Wrapper>
      <div className="methods">
        <div className="middle-bottom">
          <div className="middle">
            <div className="left">
              <GoogleLogin text={`Google Sign-Up`} />
            </div>
            <div className="center">
              <div className="line"></div>
              <div className="or">OR</div>
            </div>
            <div className="right">
              <form
                onSubmit={handleSubmit}
                onChange={handleChangeForm}
                autoComplete="on"
                className="form"
              >
                <input
                  className="input"
                  id="email"
                  type="email"
                  placeholder="E-Mail"
                  autoFocus
                  required
                />
                <input
                  className="input"
                  id="family_name"
                  type="text"
                  placeholder="Family Name"
                  required
                />
                <input
                  className="input"
                  id="given_name"
                  type="text"
                  placeholder="Given Name"
                  required
                />
                <input
                  className="input"
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                <input
                  className="input"
                  id="passConfrmed"
                  type="password"
                  placeholder="Confirm Password"
                  ref={refToPass}
                  required
                />
                <input
                  type="file"
                  className="input file-input"
                  id="pic"
                  name="pic"
                />
                <div className="agreement">
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="agreement"
                    ref={refToAgreement}
                  />
                  I agree to the{" "}
                  <a
                    className="link"
                    href="https://policies.google.com/terms?hl=en-US"
                  >
                    terms of services
                  </a>
                </div>
                <button className="submit-btn" type="submit">
                  {!loading ? `Register` : <LoadingTiny />}
                </button>
              </form>
            </div>
          </div>
          <div className="bottom">
            <ErrBox
              conditions={[
                { state: passLengthErr, text: "Password length is short!" },
                {
                  state: passConfrmedErr,
                  text: "Password confirmation does'nt match!",
                },
                {
                  state: agreementErr,
                  text: "For sign-up you need to agree to the terms of service!",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default SignUp;
// --------------------------------------------------------------------------
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: var(--c10);
  position: relative;
  .link {
    color: var(--c51);
  }
  .checkbox {
    margin-right: 10px;
    transform: scale(1.3);
  }
  .agreement {
    padding: 10px 0;
    text-align: center;
    width: 200px;
  }
  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
  .middle-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .err-msg {
    display: none;
    text-align: center;
    color: red;
  }
  .err {
    padding: 10px;
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: solid 1px red;
    margin-top: 20px;
  }
  .input {
    font-size: var(--font-size-4);
  }
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
    /* flex-flow: row; */
    flex-direction: row;
    height: 100%;
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
    border: none;
  }

  .submit-btn {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
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
    flex-direction: column;
    gap: 5px;
  }
  .title {
    top: 50px;
    font-size: var(--font-size-10);
    font-weight: bold;
    font-family: var(--f11);
    color: var(--c11);
  }
  .err-passLength-active {
    display: block;
  }
  .err-passConfrmed-active {
    display: block;
  }
  .err-agreement-active {
    display: block;
  }
  .err-active {
    display: flex;
  }
  .file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .file-input::before {
    content: "Choose Photo";
    display: inline-block;
    width: 1px;
    white-space: nowrap;
    cursor: pointer;
  }
  .file-input:hover::before {
  }
  .file-input:active::before {
  }
  .file-input {
    background-color: var(--c21);
    padding: 5px;
    padding-left: 10px;
  }
`;
