import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
// ------------------------------------------------------------
const GoogleLogin = ({text}) => {
  // ----------------------------------------------------------calling auth0 provider
  const { loginWithRedirect } = useAuth0();
  // ----------------------------------------------------------
  return (
    <Wrapper>
      <button className="loginBtn" onClick={() => loginWithRedirect()}>
        <FcGoogle className="icon" size="2rem" />
        <span className="method-name">{text}</span>
      </button>
    </Wrapper>
  );
};
export default GoogleLogin;
// ----------------------------------------------------------
const Wrapper = styled.div`
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
    height: 2.5rem;
    &:active {
      box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
      background-color: var(--c11);
    }
  }
  .icon {
    fill: darkblue;
    size: 50px;
  }
  .method-name {
    font-size: var(--font-size-4);
    color: var(--c41);
  }
`;
