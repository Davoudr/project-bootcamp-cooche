import { createContext } from "react";
import { useState } from "react";
export const AppContext = createContext(null);
export const AppProvider = ({ children }) => {
  const [logInMethod, setLogInMethod] = useState("sign-in");
  const [userInfo, setUserInfo] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [googleLoginPass, setGoogleLoginPass] = useState(null);
  // -----------------------random password generator
  const randStr =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$&";
  const passGenerator = (num) => {
    let password = "";
    let rand = 0;
    for (let i = 0; i < num; i++) {
      rand = Math.floor(Math.random() * (randStr.length - 1));
      password = password.concat(randStr[rand]);
    }
    return password
  };
    // -----------------------
  return (
    <AppContext.Provider
      value={{
        passGenerator,
        googleLoginPass,
        setGoogleLoginPass,
        userInfo,
        setUserInfo,
        showMsg,
        setShowMsg,
        logInMethod,
        setLogInMethod,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
