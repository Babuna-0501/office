import React, { useState } from "react";

const Ctx = React.createContext();

export const MerchantEditHook = (props) => {
  // const [editMerchant, setEditMerchant] = useState(false);

  return (
    <Ctx.Provider
    // value={{
    //   newMerchant,
    //   setNewMerchant,
    // }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
