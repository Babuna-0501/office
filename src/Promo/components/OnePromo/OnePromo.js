import React from "react";
import css from "./onepromo.module.css";

const OnePromo = (props) => {
    console.log("item props", props);
    return (
        <div className={css.container}>
            <div>
                <span>{props.item?.discount_data?.title}</span>
            </div>
        </div>
    );
};

export default OnePromo;
