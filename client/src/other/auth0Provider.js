import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { auth0 } from "./variables";
// ------------------------------------------------------------------
const Auth0ProviderWithNavigate = ({ children }) => {
  // -----------------------------------
  let navigate = useNavigate();
  // -----------------------------------
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };
  // -----------------------------------
  return (
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
