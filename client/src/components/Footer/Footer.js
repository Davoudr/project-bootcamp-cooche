import styled from "styled-components";
// --------------------------------------------------------------
const Footer = () => {
  return (
    <Div>
      <Links>
        <a className="link" href="https://en.wikipedia.org/wiki/Contractual_term">
          <span></span>
        </a>
        <a className="link" href="https://en.wikipedia.org/wiki/Privacy_policy">
          <span>Privacy policy</span>
        </a>
        <a className="link" href="https://en.wikipedia.org/wiki/HTTP_cookie">
          <span>Cookies policy</span>
        </a>
        <a className="link" href="https://en.wikipedia.org/wiki/Copyright">
          <span>Copyrights</span>
        </a>
        <a className="link" href="https://en.wikipedia.org/wiki/Notification">
          <span>Notification</span>
        </a>
      </Links>
      <Date>Copyright © 2010-2030 Bacon Company B.C. All rights reserved.</Date>
    </Div>
  );
};
// --------------------------------------------------------------
export default Footer;
// --------------------------------------------------------------
const Div = styled.div`
  text-align: center;
  display: block;
  margin: auto;
  position: relative;
  z-index: 100;
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1); */
  .link{
      color: var(--c41);
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
  font-size: var(--font-size-3);
`;

const Date = styled.div`
  font-size: var(--font-size-2);
`;
