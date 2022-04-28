import styled from "styled-components";
import { AppContext } from "../../other/AppContext";
import { useContext, useState } from "react";
import NextBtn from "./NextBtn";
import { BsPhone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { AiOutlineFacebook } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
const Connections = () => {
  const {
    pages,
    setPages,
    businessInfo,
    setBusinessInfo,
    darkMode,
  } = useContext(AppContext);

  const onchangeHandle = (ev) => {
    let theKey = ev.target.id;
    let theValue = ev.target.value;
    setBusinessInfo({ ...businessInfo, [theKey]: theValue });
  };
  const nextBtnHandle = (ev) => {
    const tabs = ["infoTab", "address", "connections", "description"];
    let nextPage = tabs[tabs.indexOf(pages) + 1];
    setPages(nextPage);
  };

  return (
    <Wrapper>
      <div className="btn-box">
        <div className="next-info" onClick={nextBtnHandle}>
          <NextBtn btntext="Next" />
        </div>
      </div>
      <div>
        <div className="connection-box">
          <label
            htmlFor="phone"
            form="business-form"
            className="phone connection-label label"
          >
            <BsPhone fill={darkMode ? "#808080" : "#cdcdcd"} size={"1.5rem"} />
            <span className={`connection-type ${!darkMode && "dark"}`}>
              Phone Number
            </span>
          </label>
          <input
            value={businessInfo.phone}
            className="input phone conneciton-input"
            id="phone"
            type="tel"
            placeholder=""
            onChange={onchangeHandle}
          />
        </div>

        <div className="connection-box">
          <label
            htmlFor="email"
            form="business-form"
            className="email connection-label label"
          >
            <MdOutlineMail
              fill={darkMode ? "#808080" : "#cdcdcd"}
              size={"1.5rem"}
            />
            <span className={`connection-type ${!darkMode && "dark"}`}>
              E-Mail
            </span>
          </label>
          <input
            value={businessInfo.email}
            className="input email conneciton-input"
            id="email"
            type="email"
            placeholder="cooche@gmail.com"
            onChange={onchangeHandle}
          />
        </div>
        {/* ------------------------------website*/}
        <div className="connection-box">
          <label
            htmlFor="website"
            form="business-form"
            className="connection-label"
          >
            <GiWorld fill={darkMode ? "#808080" : "#cdcdcd"} size={"1.5rem"} />
            <span className={`connection-type ${!darkMode && "dark"}`}>
              Website
            </span>
          </label>
          <input
            value={businessInfo.website}
            className="input conneciton-input"
            id="website"
            type="url"
            placeholder="www.cooche.com"
            onChange={onchangeHandle}
          />
        </div>

        <div className="connection-box">
          <label
            htmlFor="facebook"
            form="business-form"
            className="connection-label"
          >
            <AiOutlineFacebook fill="#1b74e4" size={"1.5rem"} />
            <span className={`connection-type ${!darkMode && "dark"}`}>
              facebook
            </span>
          </label>
          <input
            value={businessInfo.facebook}
            className="input conneciton-input"
            id="facebook"
            type="url"
            placeholder="https://facebook.com/cooche"
            onChange={onchangeHandle}
          />
        </div>

        <div className="connection-box">
          <label
            htmlFor="instagram"
            form="business-form"
            className="connection-label"
          >
            <IoLogoInstagram fill="#ed4956" size={"1.5rem"} />
            <span className={`connection-type ${!darkMode && "dark"}`}>
              Instagram
            </span>
          </label>
          <input
            value={businessInfo.instagram}
            className="input conneciton-input"
            id="instagram"
            type="url"
            placeholder="https://www.instagram.com/cooche"
            onChange={onchangeHandle}
          />
        </div>

        <div className="connection-box">
          <label
            htmlFor="twitter"
            form="business-form"
            className="connection-label"
          >
            <FaTwitter fill="#1d9bf0" size={"1.5rem"} />
            <span className={`connection-type ${!darkMode && "dark"}`}>
              Twitter
            </span>
          </label>
          <input
            value={businessInfo.twitter}
            className="input conneciton-input"
            id="twitter"
            type="url"
            placeholder="https://twitter.com/cooche"
            onChange={onchangeHandle}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Connections;

const Wrapper = styled.div`
  .connection-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .connection-label {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .connection-type {
    margin-left: 2rem;
    &.dark {
      color: var(--c21);
    }
  }

  .input {
    width: 40rem;
    padding-left: 1rem;
    outline: none;
    display: block;
    &.dark {
      background-color: var(--c51);
    }
    &:focus {
      box-shadow: var(--box-shadow-1);
    }
  }
  .conneciton-input {
    width: 40rem;
    height: 2rem;
    padding-left: 1rem;
  }
`;
