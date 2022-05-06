import styled from "styled-components";
// ------------------------------------------------------------------
const Footer = () => {
  return (
    <Div>
      <Links>
        <a
          className="link"
          href="https://en.wikipedia.org/wiki/Contractual_term"
        >
          <span className="link">Contractual term</span>
        </a>
        <a className="link" href="https://en.wikipedia.org/wiki/Privacy_policy">
          <span className="link">Privacy policy</span>
        </a>
        <a className="link" href="https://en.wikipedia.org/wiki/HTTP_cookie">
          <span className="link">Cookies policy</span>
        </a>
        <a className="link" href="https://en.wikipedia.org/wiki/Copyright">
          <span className="link">Copyrights</span>
        </a>
        <a className="link" href="https://en.wikipedia.org/wiki/Notification">
          <span className="link">Notification</span>
        </a>
      </Links>
      <Date>
        Copyright © 2010-2030 Cooche Company B.C. All rights reserved.
      </Date>
    </Div>
  );
};
export default Footer;
// ------------------------------------------------------------------
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
  background-color: transparent;
  margin-top: 11rem;
`;
// -----------------------------------
const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
  font-size: var(--font-size-3);
  // -----------------
  .link {
    color: var(--c13);
  }
`;
// -----------------------------------
const Date = styled.div`
  font-size: var(--font-size-2);
  color: var(--c14);
`;
