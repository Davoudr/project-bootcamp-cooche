import { Navigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const auth = true;

  return !auth ? (
    <Navigate to="/login" />
  ) : (
    <>
      This is dashboard!
      <Outlet />
    </>
  );
};
export default Dashboard;
