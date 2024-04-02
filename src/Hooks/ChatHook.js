import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const ChatHook = (props) => {
    const [chatopen, setChatopen] = useState(false);
    const [messengeropen, setMessengeropen] = useState(false);

    return (
        <Ctx.Provider
            value={{ chatopen, setChatopen, messengeropen, setMessengeropen }}
        >
            {props.children}
        </Ctx.Provider>
    );
};

export default Ctx;
