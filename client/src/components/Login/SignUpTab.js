import styled from "styled-components";
import { useContext, useState, useRef } from "react";
import { AppContext } from "../../other/AppContext";
import GoogleLogin from "./GoogleLogin";
import LoadingTiny from "../LoadingTiny";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "../../other/variables";
import ErrBox from "./ErrBox";
import Button from "../Tools/Button";
// ------------------------------------------------------------------
const SignUp = () => {
  // -----------------------------------
  const { loading, setLoading, setMessage, setUserSession } =
    useContext(AppContext);
  // -----------------
  const refToPass = useRef(null);
  const refToAgreement = useRef(null);
  // -----------------
  let navigate = useNavigate();
  // -----------------
  // local states for errors
  const [passConfrmedErr, setPassConfrmedErr] = useState(false);
  const [passLengthErr, setpassLengthErr] = useState(false);
  const [agreementErr, setAgreementErr] = useState(false);
  // -----------------
  // local states for inputs
  const [fileInput, setFileInput] = useState(``);
  const [previewSource, setPreviewSource] = useState(null);
  // -----------------------------------
  //  preparing profile-img to be sent to BE
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleFileInputChange = (ev) => {
    const file = ev.target.files[0];
    previewFile(file);
    setFileInput(ev.target.value);
  };
  // -----------------------------------
  // sing-up form handle
  const handleSubmit = (ev) => {
    ev.preventDefault();
    // ---------------------------------
    // checking if agrement is checked
    if (!ev.target[6].checked) {
      refToAgreement.current.focus();
      setAgreementErr(true);
    } else {
      setAgreementErr(false);
    }
    // ---------------------------------
    // checking if (pass-confitmation ===  pass)
    if (ev.target[3].value !== ev.target[4].value) {
      refToPass.current.focus();
      setPassConfrmedErr(true);
    } else {
      setPassConfrmedErr(false);
    }
    // ---------------------------------
    //  checking if password lenght is not short
    if (ev.target[3].value.length < 7) {
      setpassLengthErr(true);
    } else {
      setpassLengthErr(false);
    }
    // ---------------------------------
    // storing user-info and sending it to BE to be sotored in db
    if (
      ev.target[3].value.length > 7 &&
      ev.target[3].value === ev.target[4].value &&
      ev.target[6].checked
    ) {
      // -------------------------------
      // converting submit-btn contetnt to loading-animation
      setLoading(true);
      // -------------------------------
      // if user is uploading profile-img: informing user from probable delay
      if (previewSource) {
        setMessage({
          status: true,
          title: "Please Wait",
          content:
            "We are uploading your profile photo and it may take up to 10s/1mb!",
          btnText: "Ok",
        });
      }
      // -------------------------------
      // making sure there is a profile image in user-obj
      const picData = previewSource ? previewSource : imgUrl.defaultUserIcon;
      // -------------------------------
      // creating user-obj
      const endpointUserObj = {
        username: ev.target[0].value.trim().split("@")[0],
        email: ev.target[0].value.trim(),
        family_name: ev.target[1].value.trim(),
        given_name: ev.target[2].value.trim(),
        password: ev.target[3].value,
        pic: picData,
        base64: previewSource ? true : false,
        // this key won't save in user-colleciton in db ;
        // this key is  included in order to clarifying for BE
        // if pic-value is url or base64
        // (if it should be converted to url or not)
      };
      // --------------------------------
      // postin user-obj to db
      fetch("/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(endpointUserObj),
      })
        .then((res) => res.json())
        .then((data) => {
          // ----------------------------
          // proper action based on server-res
          if (data.status === 201) {
            console.log(`FE / POST / </userAdd> / res / ${data.message}`);
            setUserSession({
              username: data.user.username,
              email: data.user.email,
              given_name: data.user.given_name,
              family_name: data.user.family_name,
              // this should be set from server-res
              // bcuz server is returning the file-Cloudinary-url
              // as pic-value if there be any profile-pic uploaded by user
              pic: data.user.pic,
              // this is false if user sign-up using google,
              // bcuz he will not set his password by himself;
              // Then, FE will inform him/her in his/her first dashboard-page visiting
              userHasThePassword: true,
              id: data.user.id,
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
  // -----------------------------------
  const handleChangeForm = (ev) => {
    // for having real-time (onChange) err for pass-length
    if (ev.target.id === "password" && ev.target.value.length < 7) {
      setpassLengthErr(true);
    } else {
      setpassLengthErr(false);
    }
  };
  // -----------------------------------
  return (
    <Wrapper>
      <div className="methods">
        <div className="middle-bottom">
          <div className="middle">
            <div className="left">
              <GoogleLogin text={`Sign-Up`} />
            </div>
            <div className="center">
              <div className="line"></div>
              <div className="or">OR</div>
            </div>
            <div className="right">
              {previewSource && (
                <img
                  className="chosen-profile-pic"
                  src={previewSource}
                  alt="profile-pic"
                />
              )}
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
                  onChange={handleFileInputChange}
                  value={fileInput}
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
                  {!loading ? <Button btnText="Register" /> : <LoadingTiny />}
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
// ------------------------------------------------------------------
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: var(--c10);
  position: relative;
  // -----------------
  .chosen-profile-pic {
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    object-fit: cover;
    box-shadow: 0px 10px 15px -3px rgba(61, 64, 91, 0.4);
  }
  // -----------------
  .link {
    color: var(--c51);
  }
  // -----------------
  .checkbox {
    margin-right: 10px;
    transform: scale(1.3);
  }
  // -----------------
  .agreement {
    padding: 10px 0;
    text-align: center;
    width: 200px;
  }
  // -----------------
  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
  // -----------------
  .middle-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  // -----------------
  .err-msg {
    display: none;
    text-align: center;
    color: red;
  }
  // -----------------
  .err {
    padding: 10px;
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: solid 1px red;
    margin-top: 20px;
  }
  // -----------------
  .input {
    font-size: var(--font-size-4);
  }
  // -----------------
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
  // -----------------
  .method-btn {
    margin: 20px 10px;
    background-color: transparent;
    color: var(--c41);
    border-radius: 0%;
  }
  // -----------------
  .active {
    border-bottom: 2px solid var(--c31);
    color: var(--c31);
  }
  // -----------------
  .methods {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
  }
  // -----------------
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
  // -----------------
  .submit-btn {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // -----------------
  .center {
    margin: 20px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  // -----------------
  .or {
    border: 2px solid lightgray;
    border-radius: 50%;
    padding: 10px;
    color: var(--c12);
    background-color: var(--c21);
    font-weight: bold;
    z-index: 1;
  }
  // -----------------
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
  // -----------------
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
  // -----------------
  .left,
  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  // -----------------
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
  }
  // -----------------
  .title {
    top: 50px;
    font-size: var(--font-size-10);
    font-weight: bold;
    font-family: var(--f11);
    color: var(--c11);
  }
  // -----------------
  .err-passLength-active,
  .err-passConfrmed-active,
  .err-agreement-active {
    display: block;
  }
  // -----------------
  .err-active {
    display: flex;
  }
  // -----------------
  .file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  // -----------------
  .file-input::before {
    content: "Choose Photo";
    display: inline-block;
    width: 1px;
    white-space: nowrap;
    cursor: pointer;
  }
  // -----------------
  .file-input:hover::before {
  }
  .file-input:active::before {
  }
  // -----------------
  .file-input {
    background-color: var(--c21);
    padding: 5px;
    padding-left: 10px;
  }
`;
