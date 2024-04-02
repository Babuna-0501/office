import { useState, createContext } from "react";

export const HeaderContext = createContext(null);

export const HeaderProvider = ({ children }) => {
  const [showRefreshBtn, setShowRefreshBtn] = useState(false);
  const [headerContent, setHeaderContent] = useState(<></>);

  const value = {
    showRefreshBtn,
    setShowRefreshBtn,
    headerContent,
    setHeaderContent,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};
