import React, { useContext, useState } from "react";

import css from "./list.module.css";
import Edit from "../assets/EditSquare.svg";
import AppHook from "../Hooks/AppHook";
import { styles } from "./style";
import settingIcon from "../assets/Setting.svg";
import Serinumber from "./Serinumber";
import carsvg from "../assets/car.svg";
import { async } from "q";
import myHeaders from "../components/MyHeader/myHeader";
import { useEffect } from "react";

const List = (props) => {
  const appctx = useContext(AppHook);
  const [showOpen, setShowOpen] = useState(false);
  const [data, setData] = useState(null);

  const ShowHideHandler = () => {
    console.log("clicked");
  };
  const SettingHandler = () => {
    console.log("clicked");
  };
  const ShowHandlier = (e) => {
    setData(e);
    setShowOpen(true);
  };
  const getProducts = async () => {
    const baseUrl = "https://api2.ebazaar.mn/api/warehouse/get/new";
    const queryParams = new URLSearchParams({
      id: props?.warehouseId,
      allProducts: true,
      poruductLimit: 40,
      productPage: props.page,
    });

    const url = `${baseUrl}?${queryParams}`;

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (props.warehouseId) {
      try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const res = await response.json();
        const data = res.data[0].products;
        props.setProducts([...props.products, ...data]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };
  useEffect(() => {
    getProducts();
  }, [props.page, props.warehouseId]);

  return (
    <div className={css.listcontainer}>
      <div className={css.wrapper}>
        {props?.warehouse?.map((e, i) => {
          return (
            <div className={css.container} key={i}>
              <div
                style={{
                  ...styles.allWidthContainer,

                  display: "flex",
                }}
              >
                <div
                  style={{ ...styles.companyContainer, paddingLeft: "10px" }}
                >
                  <input type="checkbox" />
                </div>
                <div
                  style={{
                    ...styles.numberContainer,
                    padding: "0px 8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#37474F",
                    }}
                  >
                    {e.name}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.notifContainer,
                    padding: "0px 8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#37474F",
                    }}
                  >
                    {e.type}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.notifContainer,
                    padding: "0px 8px",
                  }}
                >
                  <div onClick={ShowHideHandler}>
                    {e.type === 1 ? (
                      <img
                        src="https://admin.ebazaar.mn/media/on.svg"
                        alt="open "
                      />
                    ) : (
                      <img
                        src="https://admin.ebazaar.mn/media/off.svg"
                        alt="close"
                      />
                    )}
                  </div>
                </div>
                <div
                  style={{
                    ...styles.createdContainer,
                    padding: "0px 8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#37474F",
                    }}
                  >
                    {e.manager}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.registerContainer,
                    padding: "0px 8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#37474F",
                    }}
                  >
                    {e.supplier_name}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.serviceContainer,
                    padding: "0px 8px",
                    display: "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#37474F",
                    }}
                  >
                    {e.supplier_name}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#37474F",
                    width: "50px",
                  }}
                >
                  <img
                    src={Edit}
                    onClick={() => {
                      getProducts();
                      props.setWarehouseId(e?._id);
                      appctx.setTabOpenstate(true);
                      props.setSelectedWarehouse(e);
                    }}
                    alt="edit"
                  />
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#37474F",
                    width: "50px",
                  }}
                >
                  <img src={settingIcon} alt="edit" onClick={SettingHandler} />
                </span>
                <span
                  style={{
                    display: appctx.userData.id === 351 ? "block" : "hidden",
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#37474F",
                    width: "50px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={carsvg}
                    style={{
                      // width: "40px",
                      height: "25px",
                    }}
                    alt="edit"
                    onClick={() => ShowHandlier(e)}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {showOpen && <Serinumber setShowOpen={setShowOpen} data={data} />}
    </div>
  );
};

export default List;
