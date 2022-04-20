import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const MyProfile = () => {
  const { userSession } = useContext(AppContext);
  const [profileSellected, setProfileSellected] = useState(false);
  const location = useLocation();
  if (location.pathname === "/dashboard/profile") {
    setTimeout(()=>{setProfileSellected(true)}, 500)
  }
  return (
    <Wrapper profileSellected={profileSellected}>
      <div className="card">
        <Img src={userSession.pic}></Img>
        <div className="content">
          <div className="info">
            <span className="name">{`${userSession.given_name} ${userSession.family_name}`}</span>
            <span className="username">
              username: {`${userSession.username}`}
            </span>
            <span className="email">{`${userSession.email}`}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default MyProfile;

const Wrapper = styled.div`
  width: var(--website-width);
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: column;
  margin-top: 1rem;
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .name {
    font-size: var(--font-size-10);
    color: var(--c51);
  }
  .username {
    color: var(--c13);
  }
  .email {
    color: var(--c14);
  }
  transform: all ease-in 2s;
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: all ease-out 2s;
  }
  .card {
    
    background-color: var(--c10);
    height: 300px;
    z-index: 1;
    border-radius: var(--border-radius6);
    border-start-start-radius: ${  (props) => (props.profileSellected ?  "10rem" : "var(--border-radius6)" )  };
    border-bottom-right-radius:  ${  (props) => (props.profileSellected ?  "10rem" : "var(--border-radius6)" )  };
    /* border-radius:  ${  (props) => (props.profileSellected ?  "10rem" : "var(--border-radius6)" )  };; */
    box-shadow: var(--box-shadow-1);
    &.dark {
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(17, 25, 40, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.125);
    }
    transition: all ease-in-out 1.5s;
  }
  .lng-label{
  background-color: red;
  }
`;

const Img = styled.img`
  height: 100px;
  border-radius: 50%;
  position: relative;
  box-shadow: var(--box-shadow-3);
  position: absolute;
  
`;
