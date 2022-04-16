import styled from "styled-components";
import test from "../../img/test.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../other/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { imgUrl } from "../../other/variables";
// ----------------------------------------------------------------
const NavBar = () => {
  // -------------------------------
  let location = useLocation();
  let navigate = useNavigate();
  const {
    message,
    setMessage,
    userSession,
    setUserSession,
    userInfo,
    setUserInfo,
    passGenerator,
    setLogInMethod,
    loading,
    setLoading,
  } = useContext(AppContext);
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated, error } =
    useAuth0();
  // -------------------------------
  useEffect(() => {
    if (user !== undefined) {
      const username = user.email.trim().split("@")[0];
      if (userInfo !== null && username === userInfo.username) {
        console.log(`Welcome ${user.name}`);
      } else {
        const newPass = passGenerator(10);
        const picture =
          user.picture === null ? imgUrl.defaultUserIcon : user.picture;
        const info = new FormData();
        info.append("username", username);
        info.append("email", user.email);
        info.append("family_name", user.family_name);
        info.append("given_name", user.given_name);
        info.append("password", newPass);
        info.append("pic", picture);

        setUserInfo(info);
        setUserSession({
          ...userSession,
          username: username,
          family_name: user.family_name,
          given_name: user.given_name,
          pic: picture,
        });

        fetch("http://localhost:8000/user/add", {
          method: "POST",
          body: info,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 201) {
              console.log(`FE / POST / </userAdd> / res / ${data.message}`);
              setUserSession({
                ...userSession,
                userHasThePassword: newPass,
              });
            } else {
              console.log(`FE / POST / </userAdd> / res / ${data.message}`);
            }
          });
      }
    }
  }, [user]);

  // -------------------------------
  const hanleLogout = () => {
    setUserInfo(null);
    setUserSession(null);
    logout();
  };

  const hanleSignIn = () => {  
    navigate(`/login`);
    setLogInMethod("sign-in")
  }

  const hanleSignUp = () => { 
    navigate(`/login`);
    setLogInMethod("sign-up");
   }
  // ----------------------------------------------------------------
  return (
    <Wrapper>
      <Link to="/" className="logo">
        Cooche
      </Link>
      <NavRight>
        {userSession || (!isLoading && user) ? (
          <>
            <Item>
              <Img src={!isLoading && user ? user.picture : userSession.pic} />
            </Item>
            <Item>
              {!isLoading && user
                ? `${user.given_name} ${user.family_name}`
                : `${userSession.given_name} ${userSession.family_name}`}
            </Item>
            <LogBtn onClick={hanleLogout}>
              <Item>Logout</Item>
            </LogBtn>
          </>
        ) : (
          !isLoading &&
          !user &&
          !userSession &&
          location.pathname !== "/login" && (
            // <Link to="/login">
            //   <Item>LogIn SignUp</Item>
            // </Link>
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
      </NavRight>
    </Wrapper>
  );
};
export default NavBar;
// ----------------------------------------------------------------
const LogBtn = styled.button`
  background-color: transparent;
  box-shadow: none;
`;
const Wrapper = styled.div`
  border-radius: 0%;
  height: var(--navbar-height);
  background-color: var(--c41);
  color: var(--c21);
  display: flex;
  align-items: center;
  justify-content: space-around;
  .logo {
    background-color: rgba(0, 0, 0, 0);
    color: var(--c51);

    font-size: var(--font-size-10);
    font-family: var(--f11);
    font-weight: bold;
  }
`;

const NavRight = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;
const Item = styled.li`
  font-size: var(--font-size-5);
  font-family: var(--f12);
  list-style: none;
  margin-right: 20px;
  color: var(--c13);
  cursor: pointer;
`;
const Img = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  object-fit: cover;
`;
