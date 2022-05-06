import { Outlet } from "react-router-dom";
// ------------------------------------------------------------------
const RequireAuth = () => {
  return (
    <>
      This is Dashboard!
      <Outlet />
    </>
  );
};
export default RequireAuth;
// ------------------------------------------------------------------
