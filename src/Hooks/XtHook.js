import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const XTHook = (props) => {
  const [page, setPage] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [hi, setHi] = useState(false);
  const [refreshState, setRefreshState] = useState(false);

  return (
    <Ctx.Provider
      value={{
        page,
        setPage,
        calendarOpen,
        setCalendarOpen,
        hi,
        setHi,
        refreshState,
        setRefreshState,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
