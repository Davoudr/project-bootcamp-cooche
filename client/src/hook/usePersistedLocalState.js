import { useState, useEffect } from "react";
// this is a actually a empowered useState as returns [value, setValue]
// empowered using:
// 1. chooeses to set the initial useState with either last-value or default-value (by having if-func as setState)
// 2. keeping state alive by saving it in local storage using useEffect (which let not to lose the state after unmounting the component!)
const usePersistedLocalState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    const parsedValue =
      storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    return parsedValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};
export default usePersistedLocalState;






