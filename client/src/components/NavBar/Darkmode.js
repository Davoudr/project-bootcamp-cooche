import { MdDarkMode } from "react-icons/md";
import { RiSunCloudyLine } from "react-icons/ri";
import { useSpring, animated } from "react-spring";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
import styled from "styled-components";
import useSound from "use-sound";
import clickSound from "../../assets/sound/click.mp3";
// ------------------------------------------------------------------
const Darkmode = () => {
  // -----------------------------------
  const { darkMode, setDarkMode } = useContext(AppContext);
  // -----------------------------------
  const [play] = useSound(clickSound, { volume: 0.25 });
  // -----------------------------------
  const sunStyle = useSpring({
    transform: darkMode ? "scale(1)" : "scale(1.3)",
    config: {
      mass: 3.1,
      tension: 339,
      friction: 12,
    },
  });
  // -----------------
  const moonStyle = useSpring({
    left: darkMode ? "40px" : "0px",
    config: {
      tension: 180,
      friction: 12,
    },
  });
  // -----------------------------------
  const handleClickDarkMode = (ev) => {
    play();
    setDarkMode(!darkMode);
  };
  // -----------------------------------
  return (
    <>
      <ModeBtn style={sunStyle} onClick={handleClickDarkMode}>
        <RiSunCloudyLine
          className={`mode ${!darkMode && "mode-active"}`}
          size="1.5rem"
          fill="var(--c13)"
        />
      </ModeBtn>
      <ModeBtn style={moonStyle} onClick={handleClickDarkMode}>
        <MdDarkMode
          className={`moon ${darkMode && "mode-active"}`}
          size="1.5rem"
          fill="var(--c1)"
        />
      </ModeBtn>
    </>
  );
};
export default Darkmode;
// ------------------------------------------------------------------
const ModeBtn = styled(animated.button)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: transparent;
  box-shadow: none;
  padding: 0;
  &:active {
    background-color: transparent;
    box-shadow: none;
    transform: rotate(60deg);
  }
  // -----------------
  .mode-active {
    display: none;
  }
`;
