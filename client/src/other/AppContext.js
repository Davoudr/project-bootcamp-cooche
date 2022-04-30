import { createContext } from "react";
import { useState } from "react";
import usePersistedSessionState from "../hook/usePersistedSessionState";
import usePersistedLocalState from "../hook/usePersistedLocalState";
// ======================================================================= export
export const AppContext = createContext(null);
export const AppProvider = ({ children }) => {
  // ===============================================================================================================
  // ---------------------------------------------------------------------------------------------------------------
  // ===============================================================================================================
  // ===================================================================== to hvae message-alert
  const [message, setMessage] = useState({
    status: false,
    title: "",
    content: "",
    btnText: "",
  });
  // ====================================================================== to have loading
  const [loading, setLoading] = useState(false);
  // ====================================================================== to have dark-mode
  // to handle dark mode - all elements can have a .dark style! in ther css
  const [darkMode, setDarkMode] = usePersistedLocalState(false, "darkmode");
  // on loading the website, we will use this func to toggle-update the .dark class for all elements based on last darkmode-state in local storage
  const updateMode = () => {
    const allElements = document.getElementsByTagName("*");
    if (darkMode) {
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].classList.remove("dark");
      }
    }
    if (!darkMode) {
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].classList.add("dark");
      }
    }
  };
  // ====================================================================== to capitalize strings
  // ---------------------------------------------
  // a func to capitalaize first letter of the str
  const capitalizeFirstLetter = (string) =>
    string.trim().charAt(0).toUpperCase() + string.slice(1);
  // ---------------------------------------------
  // a func to conver arr of str to lowercase
  const arrOfStrToLowerCase = (arr) =>
    arr.map((ele) => ele.trim().toLowerCase());
  // ---------------------------------------------
  // a func to capitalaize fist leter of all str in an Arr
  const capitalizeFirstLetterInArr = (arr) =>
    arr.map((ele) => capitalizeFirstLetter(ele));
  // ====================================================================== current-user info
  const [userSession, setUserSession] = usePersistedSessionState(null, "user");
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
  // ===============================================================================================================
  // -----------------------------------------------------/login----------------------------------------------------
  // ===============================================================================================================
  // -----------------------to switch between the tabs of sign-in/sign-up
  const [logInMethod, setLogInMethod] = useState("sign-in");
  // -----------------------to give password to thoes users who sign0up using auth0-google
  const [passwordGoogleSingUp, setPasswordGoogleSingUp] = useState({
    newUser: false,
    thePassword: null,
  });
  // -----------------------random password generator
  const randStr =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$&";
  const passwordGenerator = (num) => {
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
      userSession &&
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
  // ===============================================================================================================
  // ------------------------------------------/dashboard/new-suggestion/-------------------------------------------
  // ===============================================================================================================
  // ---------------------------------------------
  // to avoid loosing data in case of err and missing form-field-data, usePersistedSessionState is used and will be cleard by each submit or clear button
  const [businessInfo, setBusinessInfo] = usePersistedSessionState(
    {
      category: "",
      name: "",
      nationality: "",
      phone: "",
      email: "",
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
      description: "",
      languages: [],
    },
    "businessForm"
  );

  // ---------------------------------------------
  //  0n-change handle for inputs in nuew-suggestion form of /dashboard
  const newSuggestionOnChangeHandle = (ev) => {
    let theKey = ev.target.id;
    let theValue = ev.target.value;
    setBusinessInfo({ ...businessInfo, [theKey]: theValue });
  };
  // ---------------------------------------------
  // to switch between tabs in dashboard/new-suggestion
  const [pages, setPages] = useState("infoTab");
  // ---------------------------------------------
  // for new-suggestion form input validation
  const [validationErr, setvalidationErr] = useState({
    information: false,
    address: false,
    connections: false,
  });
  // ---------------------------------------------
  // language sellect value
  const [languagesValue, setLanguagesValue] = useState([]);
  // ---------------------------------------------
  //  for new-suggestion/information/address
  const [theAddress, setTheAddress] = useState(null);
  // ---------------------------------------------
  // font the next-page-button
  const nextBtnHandle = (ev) => {
    const tabs = ["infoTab", "address", "connections", "description"];
    let nextPage = tabs[tabs.indexOf(pages) + 1];
    setPages(nextPage);
  };
  // ===============================================================================================================
  // ---------------------------------------------------------------------------------------------------------------
  // ===============================================================================================================
  return (
    <AppContext.Provider
      value={{
        newSuggestionOnChangeHandle,
        nextBtnHandle,
        // ---------------
        theAddress,
        setTheAddress,
        // ---------------
        // ---------------
        // ---------------
        languagesValue,
        setLanguagesValue,
        // ---------------
        validationErr,
        setvalidationErr,
        // ---------------
        pages,
        setPages,
        // ---------------
        businessInfo,
        setBusinessInfo,
        // ---------------
        capitalizeFirstLetterInArr,
        capitalizeFirstLetter,
        arrOfStrToLowerCase,
        // ---------------
        passwordAlertFunc,
        passwordGenerator,
        // ---------------
        updateMode,
        darkMode,
        setDarkMode,
        // ---------------
        userSession,
        setUserSession,
        // ---------------
        loading,
        setLoading,
        // ---------------
        message,
        setMessage,
        // ---------------
        logInMethod,
        setLogInMethod,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
