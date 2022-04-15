import React from 'react';
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import {auth0} from './variables'

const Auth0ProviderWithNavigate = ({ children }) => {
//   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

let navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  };

  return (
    <Auth0Provider
      domain= {auth0.domain}
      clientId={auth0.clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;