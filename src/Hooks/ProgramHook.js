import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const ProgramHook = (props) => {
  const [showProgram, setShowProgram] = useState(true);

  return (
    <Ctx.Provider value={{ showProgram, setShowProgram }}>
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
