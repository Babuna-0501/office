import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const MerchantRegisterHook = (props) => {
  const [newMerchant, setNewMerchant] = useState(false);

  return (
    <Ctx.Provider
      value={{
        newMerchant,
        setNewMerchant,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
