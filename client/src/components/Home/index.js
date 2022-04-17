import Header from "../Header";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";
const Home = () => {
  const {
    passwordAlertFunc,
  
    userSession,
    passwordGoogleSingUp,
    setPasswordGoogleSingUp,
  } = useContext(AppContext);
  // -----------------

  // -----------------
  return (
    <>
      <Header />
      This is home!
    </>
  );
};
export default Home;
