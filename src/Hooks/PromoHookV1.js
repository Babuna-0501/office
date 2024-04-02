import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const PromoHookV1 = (props) => {
    const [newPromo, setNewPromo] = useState(false);
    const [promotype, setPromotype] = useState(2);

    return (
        <Ctx.Provider
            value={{ newPromo, setNewPromo, promotype, setPromotype }}
        >
            {props.children}
        </Ctx.Provider>
    );
};

export default Ctx;
