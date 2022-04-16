import { createContext } from "react";
import { useState } from "react";
import usePersistedState from "../hook/usePersistedState";
// -----------------------
export const AppContext = createContext(null);
export const AppProvider = ({ children }) => {
  // -----------------------
  const [logInMethod, setLogInMethod] = useState("sign-in");
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState({
    status: false,
    title: "",
    content: "",
    btnText: "",
  });
  const [loading, setLoading] = useState(false);
  const [userSession, setUserSession] = usePersistedState(null, "user");
  const [passwordGoogleSingUp, setPasswordGoogleSingUp] = useState({
    newUser: false,
    thePassword: null,
  });

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
    return password;
  };
  // -----------------------informing user of random password
  // -----------------------which will be created if user do sign-up using google-acount!
  const passwordAlertFunc = () => {
    if (
      typeof userSession.userHasThePassword === "string" &&
      userSession.userHasThePassword.length > 0
    ) {
      setMessage({
        status: true,
        title: "PASSWORD",
        content: `Your acount has been created using Google-SignUp; Your profile has a random password, keep it safe: ${userSession.userHasThePassword}`,
        btnText: "I made a not of it! Close",
      });
      setUserSession({
        ...userSession,
        userHasThePassword: true,
      });
    }
  };
  // -----------------------
  return (
    <AppContext.Provider
      value={{
        passwordAlertFunc,
        passwordGoogleSingUp,
        setPasswordGoogleSingUp,
        userSession,
        setUserSession,
        loading,
        setLoading,
        passGenerator,
        userInfo,
        setUserInfo,
        message,
        setMessage,
        logInMethod,
        setLogInMethod,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
