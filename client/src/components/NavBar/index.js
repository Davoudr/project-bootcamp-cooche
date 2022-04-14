import styled from "styled-components";
import test from "../../img/test.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../other/AppContext";
import { useAuth0 } from "@auth0/auth0-react";

// ----------------------------------------------------------------
const NavBar = () => {
  let location = useLocation();
const {loginWithRedirect, logout, user, isLoading}=useAuth0();

console.log(user)
// ----------------------------------------------------------------
  return (
    <Wrapper>
      <Link to="/" className="logo">
        Cooche
      </Link>
      <NavRight>
        {!isLoading && user ?   (
          <>
            <Item>
              <Img src={user.picture} />
            </Item>
            <Item>{`${user.given_name} ${user.family_name}`}</Item>
            <LogBtn onClick={()=>logout()}>
              <Item >Logout</Item>
            </LogBtn>
          </>
        ) : (
          !isLoading && !user && location.pathname !== "/login" && (
            <Link to="/login">
              <Item>Login</Item>
            </Link>
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
