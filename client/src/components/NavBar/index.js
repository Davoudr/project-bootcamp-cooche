import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AppContext } from "../../other/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { imgUrl } from "../../other/variables";
import Darkmode from "./Darkmode";
// ------------------------------------------------------------------
const NavBar = () => {
  // -----------------------------------
  // auth0
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated, error } =
    useAuth0();
  // -----------------------------------
  let location = useLocation();
  // -----------------
  let navigate = useNavigate();
  // -----------------------------------
  const {
    updateMode,
    userSession,
    setUserSession,
    passwordGenerator,
    setLogInMethod,
  } = useContext(AppContext);
  // -----------------------------------
  //  to make sure userSession is uptodate and db has the user
  // (litterally for the times user uses auth0-google singin/signup)
  useEffect(() => {
    // -----------------
    //  if user has used auth0-google singin/signup
    if (!isLoading && user) {
      // ---------------
      // update userSession by auth0-user if it is not uptodate
      if (userSession && user.email === userSession.email) {
        console.log(`Welcome ${user.name}`);
      } else {
        // -------------
        // now we are sure user is new
        const username = user.email.trim().split("@")[0];
        const newPass = passwordGenerator(10);
        const picUrl =
          user.picture === null ? imgUrl.defaultUserIcon : user.picture;
        // -------------
        // creatin his/her obj for userSession
        const info = {
          username: username,
          email: user.email,
          given_name: user.given_name,
          family_name: user.family_name,
          pic: picUrl,
          //we dont know if she/he is new or not;
          // for now, we update the userSession (navBar needs it)
          // before entring server-res-delays
          userHasThePassword: true,
        };
        // ------------
        // updating userSession
        setUserSession(info);
        // ------------
        // updating db
        const endpointUserObj = {
          username: username,
          email: user.email,
          given_name: user.given_name,
          family_name: user.family_name,
          password: newPass,
          pic: picUrl,
          base64: false,
        };
        // ------------
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
            if (data.status === 201) {
              console.log(`FE / POST / </userAdd> / res / ${data.message}`);
              setUserSession({
                ...userSession,
                //user is new, he/she has loged in using quth0-google;
                // a random-pass will be created
                // and we need to let him/her know what is the password!
                userHasThePassword: newPass,
                id: data.user.id,
              });
            } else {
              console.log(`FE / POST / </userAdd> / res / ${data.message}`);
            }
          });
      }
    }
  }, [user]);
  // -----------------------------------
  const hanleLogout = () => {
    logout();
    setUserSession(null);
  };
  // -----------------
  const hanleSignIn = () => {
    navigate(`/login`);
    // to switch tabs in login page
    setLogInMethod("sign-in");
  };
  // -----------------
  const hanleSignUp = () => {
    navigate(`/login`);
    // to switch tabs in login page
    setLogInMethod("sign-up");
  };
  // -----------------------------------
  // to toggle-update the .dark class for all elements
  // based on last darkmode-state in local storage
  updateMode();
  // ----------------------------------------------------------------
  return (
    <Wrapper>
      <Content>
        <Link to="/" className="logo">
          <span>Cooche</span>
        </Link>
        <NavRight>
          {userSession || (!isLoading && user) ? (
            <>
              <Link to="/dashboard/profile">
                <Item>
                  <Img
                    src={!isLoading && user ? user.picture : userSession.pic}
                  />
                </Item>
              </Link>
              <Link to="/dashboard/profile">
                <Item>
                  {!isLoading && user
                    ? `${user.given_name} ${user.family_name}`
                    : `${userSession.given_name} ${userSession.family_name}`}
                </Item>
              </Link>
              <LogBtn onClick={hanleLogout}>
                <Item>Logout</Item>
              </LogBtn>
            </>
          ) : (
            !isLoading &&
            !user &&
            !userSession &&
            location.pathname !== "/login" && (
              <>
                <LogBtn onClick={hanleSignIn}>
                  <Item>SignIn</Item>
                </LogBtn>
                <LogBtn onClick={hanleSignUp}>
                  <Item>SignUp</Item>
                </LogBtn>
              </>
            )
          )}
          <Darkmode />
        </NavRight>
      </Content>
    </Wrapper>
  );
};
export default NavBar;
// ----------------------------------------------------------------
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// -----------------------------------
const LogBtn = styled.button`
  background-color: transparent;
  box-shadow: none;
  padding: 0;
  margin: 0 1rem;
`;
// -----------------------------------
const Wrapper = styled.div`
  border-radius: 0%;
  height: var(--navbar-height);
  width: var(--website-width);
  color: var(--c21);
  margin: auto;
  width: var(--website-width);
  display: flex;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  // -----------------
  .logo {
    background-color: rgba(0, 0, 0, 0);
    color: var(--c51);
    font-size: var(--font-size-10);
    font-family: var(--f11);
    font-weight: bold;
  }
`;
// -----------------------------------
const NavRight = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;
// -----------------------------------
const Item = styled.li`
  font-size: var(--font-size-5);
  font-family: var(--f12);
  list-style: none;
  color: var(--c13);
  cursor: pointer;
  &:hover {
    color: var(--c51);
    transform: scale(1.03);
  }
`;
// -----------------------------------
const Img = styled.img`
  margin-right: 1rem;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  object-fit: cover;
`;
