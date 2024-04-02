import React, { useState, useContext } from "react";
import PromoHookV1 from "../../../Hooks/PromoHookV1";

const Header = () => {
    const promoctx = useContext(PromoHookV1);
    return (
        <div>
            <button
                onClick={() => {
                    promoctx.setNewPromo(true);
                }}
            >
                Nemeh
            </button>
        </div>
    );
};

export default Header;
