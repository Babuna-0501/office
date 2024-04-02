import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const UpointHook = (props) => {
  const [report, setReport] = useState(false);
  const [reportSecond, setReportSecond] = useState(false);
  const [userreport, setUserreport] = useState(false);
  // const [toggle, setToggle] = useState(false);

  return (
    <Ctx.Provider
      value={{
        report,
        setReport,
        reportSecond,
        setReportSecond,
        userreport,
        setUserreport,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
