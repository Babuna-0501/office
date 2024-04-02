import React, { useState, useContext, useEffect, useRef } from "react";
import css from "./shop.module.css";
import { styles } from "./style";
import LendHook from "../../Hooks/LendHook";
import ProductReportHook from "../../Hooks/ProductsReportHook";

const ShopOther = ({
    item,

    props,

    allShops,
    setAllShops,
}) => {
    const lendctx = useContext(LendHook);
    const sitedatactx = useContext(ProductReportHook);

    const [districtname, setDistrictname] = useState(null);
    const [busType, setBusType] = useState(null);
    const [businesType, setBusinesType] = useState(null);
    const [pricevalue, setPricevalue] = useState(null);
    const inputRef = useRef();
    let supid = props.props.data.userData.company_id.replaceAll("|", "");

    // let hi =
    //   sitedatactx.sitedata.business_types[
    //     `${Number(
    //       data[`${props.props.data.userData.company_id.replaceAll("|", "")}`]
    //         .tradeshops[0].channel
    //     )}`
    //   ];
    // console.log("busiznesstype", hi);

    useEffect(() => {
        setPricevalue(Number(item.total_amount));
        sitedatactx.sitedata.location.map((x) => {
            if (
                Number(x.location_id) ===
                Number(
                    item[`${supid == 1 ? 13884 : supid}`].tradeshops["0"]
                        .address.district
                )
            ) {
                setDistrictname(x.location_name);
                return;
            }
            return;
        });
    }, [item]);
    useEffect(() => {
        sitedatactx.sitedata.business_types.map((x) => {
            if (
                Number(x.business_type_id) ===
                Number(
                    item[`${supid == 1 ? 13884 : supid}`].tradeshops["0"]
                        .channel
                )
            ) {
                setBusinesType(x.channel_name);
                return;
            }
            return;
        });
    }, [item]);

    useEffect(() => {
        if (lendctx.allDelguur) {
            let id = item.c_id + "";
            let data = [];
            lendctx.allDelguur.map((x) => {
                if (x.shopID === id) {
                    if (x.total_amount) {
                        data.push({
                            zone_id: x.zone_id,
                            zone_name: x.zone_name,
                            tradeshop_id: x.t_id,
                            value: Number(x.total_amount),
                        });
                    }
                }
            });
            lendctx.setShopLeasing((prev) => [...prev, ...data]);
        }
    }, [item]);

    // let khoroo =
    //   sitedatactx.sitedata.location[
    //     data[`${props.props.data.userData.company_id.replaceAll("|", "")}`]
    //       .tradeshops["0"].address.khoroo
    //   ];
    // console.log("item", item);
    let khoroo = "Khoroo";

    const ChangeHandler = (e) => {
        setPricevalue(inputRef.current.value);
        let newArr = [...allShops];
        newArr.find((x) => x._id === item._id).total_amount = Number(
            inputRef.current.value
        );
        lendctx.setAllDelguur(newArr);
        setAllShops(newArr);
    };
    //   console.log("lendctx.zoneMap", lendctx.zoneMap);
    return (
        <div className={css.container}>
            <div
                style={{ ...styles.checkboxcontainer }}
                className={css.headerwrapper}
            >
                <span>
                    {lendctx.zoneMap?.map((x) =>
                        x.value == item.zoneid ? x.label : ""
                    )}
                </span>
            </div>
            <div
                style={{ ...styles.checkboxcontainer }}
                className={css.headerwrapper}
            >
                {/* <span>{item.u_first_name}</span> */}
                <span>
                    {item[`${supid == 1 ? 13884 : supid}`].tradeshops[0].name}
                </span>
            </div>
            <div
                style={{ ...styles.channelContainer }}
                className={css.headerwrapper}
            >
                <span>{businesType ? businesType : ""}</span>
            </div>
            <div
                style={{
                    ...styles.workContainer,
                }}
                className={css.headerwrapper}
            >
                {/* <span>{businesType?.business_type_name}</span> */}
                <span>{busType ? busType : ""}</span>
            </div>
            <div
                style={{
                    ...styles.companyContainer,
                }}
                className={css.headerwrapper}
            >
                <span>
                    {item[`${supid == 1 ? 13884 : supid}`].customer_name}
                </span>
            </div>
            <div
                style={{
                    ...styles.districtContainer,
                }}
                className={css.headerwrapper}
            >
                <span>{districtname ? districtname : "11"}</span>
            </div>
            <div
                style={{
                    ...styles.khorooContainer,
                }}
                className={css.headerwrapper}
            >
                <span>{khoroo ? khoroo : ""}</span>
            </div>
            <div
                style={{
                    ...styles.addressContainer,
                }}
                className={`${css.headerwrapper} ${css.addressFull}`}
                title={item.address}
            >
                <span>
                    {
                        item[`${supid == 1 ? 13884 : supid}`].tradeshops["0"]
                            .address.detail
                    }
                </span>
            </div>
            <div
                style={{
                    ...styles.lendContainer,
                }}
                className={`${css.headerwrapper} ${css.headerInput}`}
            >
                <input
                    ref={inputRef}
                    type="number"
                    value={pricevalue}
                    placeholder="0₮"
                    min={0}
                    onChange={ChangeHandler}
                />
            </div>
        </div>
    );
};

export default ShopOther;
