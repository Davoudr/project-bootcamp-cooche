import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import MenuBtn from "./MenuBtn";
import styled from "styled-components";
// ========================================================================
const Menu = () => {
  // ========================================================================
  const { pages, setPages, darkMode, validationErr, setvalidationErr } =
    useContext(AppContext);
  // --------------------------------------------------
  const handleLeftMenu = (ev, tab) => {
    setPages(tab);
    return false;
  };
  // ========================================================================
  return (
    <Wrapper className="menu">
      <button
        className={`btn  ${pages === "infoTab" && "active-tab"}`}
        type="button"
        onClick={(ev) => handleLeftMenu(ev, "infoTab")}
      >
        <MenuBtn
          darkMode={darkMode}
          trigger={validationErr.information}
          btnText="Information"
          className="btn"
        />
      </button>
      <button
        className={`btn  ${pages === "address" && "active-tab"}`}
        type="button"
        onClick={(ev) => handleLeftMenu(ev, "address")}
      >
        <MenuBtn
          darkMode={darkMode}
          trigger={validationErr.address}
          btnText="Address"
          className="btn"
        />
      </button>
      <button
        className={`btn  ${pages === "connections" && "active-tab"}`}
        type="button"
        onClick={(ev) => handleLeftMenu(ev, "connections")}
      >
        <MenuBtn
          darkMode={darkMode}
          trigger={validationErr.connections}
          btnText="Connecitons"
          className="btn"
        />
      </button>
      <button
        className={`btn  ${pages === "description" && "active-tab"}`}
        type="button"
        onClick={(ev) => handleLeftMenu(ev, "description")}
      >
        <MenuBtn
          darkMode={darkMode}
          trigger={false}
          btnText="Description"
          className="btn"
        />
      </button>
    </Wrapper>
  );
};
export default Menu;
// ========================================================================
const Wrapper = styled.div`
 
  .menu {
    background-color: var(--c21);
    width: 10rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding-top: 1rem;
    gap: 1rem;
    min-height: 50rem;
    text-align: center;
    margin-left: 3rem;

  }
  .btn {
    width: 100%;
    background-color: transparent;
    margin-bottom: 0;
    font-size: var(--font-size-3);
    font-family: var(--f12);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: none;
    transition: all ease-in-out 0.5s;
    margin-bottom: 0.5rem;
  }
  .active-tab {
    margin-bottom: 5rem;
  }
`;
