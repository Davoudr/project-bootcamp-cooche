import { useState, useEffect } from "react";
// --------------------------------------------------------
const usePersistedSessionState = (defaultValue, key) => {
  
  const [value, setValue] = useState(() => {
    // grabbing from sessionStorage
    const storedValue = window.sessionStorage.getItem(key);
    // checking if it is null
    const parsedValue =
      storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    // returning to state
    return parsedValue;
  });
  
  // storing the value in local storage and keeping it updated!
  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};
// --------------------------------------------------------
export default usePersistedSessionState;






