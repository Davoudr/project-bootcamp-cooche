import { createContext } from "react";
import { useState } from "react";
export const AppContext = createContext(null);
export const AppProvider = ({ children }) => {


const [logInMethod, setLogInMethod] = useState ("sign-in");
const [userInfo, setUserInfo] = useState (null);
const [showMsg, setShowMsg] = useState(false);
const [passConfirmed, setPassConfirmed]= useState(false);

  return (
    <AppContext.Provider
      value={{
        userInfo, setUserInfo,
        passConfirmed, setPassConfirmed,
        showMsg, setShowMsg,
        logInMethod, setLogInMethod
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
