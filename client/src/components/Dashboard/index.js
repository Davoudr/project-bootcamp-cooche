import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { AppContext } from "../../other/AppContext";

const Dashboard = () => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const {
    passwordAlertFunc,
    userInfo,
    userSession,
    passwordGoogleSingUp,
    setPasswordGoogleSingUp,
  } = useContext(AppContext);
  // ------------------------------
  passwordAlertFunc();
  // -------------------

  return !userInfo && !userSession ? (
    <Navigate to="/login" />
  ) : (
    <>
      This is dashboard!
      <Outlet />
    </>
  );
};
export default Dashboard;
