import React, { useContext, useState, useEffect } from "react";
import ProductsReportHook from "../Hooks/ProductsReportHook";
const Channel = (props) => {
    const [channelName, setChannelName] = useState([]);
    const ctx = useContext(ProductsReportHook);
    useEffect(() => {
        let pro = [];
        ctx.sitedata.business_types.filter((item) => {
            props.value.map((t) => {
                if (t === item.business_type_id) {
                    pro.push(item);
                }
            });
        });
        setChannelName(pro);
        if (pro.length === 25) {
            setChannelName([{ business_type_name: "Бүх суваг" }]);
        }
    }, [props]);

    let content = channelName?.map((item, index) => {
        return (
            <span
                key={index}
                style={{
                    fontSize: "12px",
                    color: "#37474F",
                    fontWeight: "400",
                }}
            >
                {item.business_type_name}
                {", "}
            </span>
        );
    });

    return <div>{content}</div>;
};

export default Channel;
