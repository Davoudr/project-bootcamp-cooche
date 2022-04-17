import { createContext } from "react";
import { useState } from "react";
import usePersistedState from "../hook/usePersistedState";
// -----------------------
export const AppContext = createContext(null);
export const AppProvider = ({ children }) => {
  // -----------------------
  const [logInMethod, setLogInMethod] = useState("sign-in");

  const [message, setMessage] = useState({
    status: false,
    title: "",
    content: "",
    btnText: "",
  });
  const [loading, setLoading] = useState(false);
  // ======================================================================
  const [userSession, setUserSession] = usePersistedState(null, "user");
  // any setUserSession must consider obj-rest; this state must have these keys
  // setUserSession({
  //   username: <sth>,
  //   email: <sth>,
  //   given_name: <sth>,
  //   family_name: <sth>,
  //   pic: <sth>, // this should be set from server-res bcuz server is returning the file-Cloudinary-url as pic-value if there be any profile-pic uploaded by user
  //   userHasThePassword: true/pssword, // this is equdl to password if user sign-up using google, bcuz he will not set his password by himself; Then, FE will inform him/her in his/her first dashboard-page visiting using passwordAlertFunc
  // });

  // app should use userSession not auth0-user, bcuz user may signin/signup usinf from
  // meanwhile we will update userSession if there be any auth0-user which means user has used auth0-google signin/signup!
  // ======================================================================
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
