import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import DashboardHeader from "./DashboardHeader";
import styled from "styled-components";



// ------------------------------
const Dashboard = () => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const { passwordAlertFunc, userSession } = useContext(AppContext);
  // ------------------------------
  passwordAlertFunc();
  // -------------------

  return !userSession ? (
    <Navigate to="/login" />
  ) : (
    <Wrapper>
      <DashboardHeader />
      <div className="contetnt">
        <div className="tabs">
          <Nlink  to="/dashboard/profile">
            <button className="tab-btn" alt="button">
              Profile
            </button>
          </Nlink>
          <Nlink to="/dashboard/new-suggestions">
            <button  className="tab-btn" alt="button">
              New Suggestio
            </button>
          </Nlink>
          <Nlink  to="/dashboard/my-suggestions">
            <button className="tab-btn" alt="button">
              My suggestions
            </button>
          </Nlink>
          <Nlink  to="/dashboard/bookmark-list">
            <button className="tab-btn" alt="button">
              Bookmark List
            </button>
          </Nlink>
        </div>
      </div>
      <Outlet />
    </Wrapper>
  );
};
export default Dashboard;
const Nlink = styled(NavLink)`
  &.active {
    .tab-btn {
      &::before {
        transform: translate(0%, 0%);
        width: 100%;
        height: 100%;
        background: var(--c51);
        border-radius: 10px;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
    }
  }
`;
const Wrapper = styled.div`
  position: relative;
  z-index: 10;
  
  .tabs {
    box-shadow: var(--box-shadow-2);
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 0.9rem;
    
    position: relative;
    background-color: var(--c41);
    border-radius: var(--border-radius10);
  }
  .contetnt {
    width: var(--website-width);
    margin: auto;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    /* flex-flow: column; */
    flex-direction: column;
    margin-top: 1rem;
  }
  .tab-btn {
    
    all: unset;
    width: 10rem;
    height: 2rem;
    font-size: var(--font-size-3);
    background: transparent;
    border: none;
    position: relative;
    color: var(--c21);
    cursor: pointer;
    z-index: 1;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  .tab-btn:active {
    /* transform: scale(0.99); */
  }
  .tab-btn::after,
  .tab-btn::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -99999;
    transition: all 0.4s;
  }

  .tab-btn::before {
    transform: translate(0%, 0%);
    width: 100%;
    height: 100%;
    background: var(--c41);
    border-radius: 10px;
  }

  .tab-btn::after {
    transform: translate(10px, 10px);
    width: 35px;
    height: 35px;
    background: #ffffff15;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 50px;
  }

  /* .tab-btn:hover::before {
    transform: translate(5%, 20%);
    width: 110%;
    height: 110%;
  } */

  .tab-btn:hover::after {
    border-radius: 10px;
    transform: translate(0, 0);
    width: 100%;
    height: 100%;
  }

  .tab-btn:active::after {
    transition: 0s;
    transform: translate(0, 5%);
  }
`;
