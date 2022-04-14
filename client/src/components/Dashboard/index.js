import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const Dashboard = () => {

  const {loginWithRedirect, logout, user, isLoading}=useAuth0();
  return !user ? (
    <Navigate to="/login" />
  ) : (
    <>
      This is dashboard!
      <Outlet />
    </>
  );
};
export default Dashboard;
