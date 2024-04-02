import css from "./headerContent.module.css";
import Right from "../assets/Arrow - Right.svg";
import { useContext } from "react";
import AppHook from "../Hooks/AppHook";
import WarehouseIndex from "../components/Warehouse/WarehouseIndex";

export const HeaderContent = (props) => {
  const appctx = useContext(AppHook);

  console.log("warehousesubpage", props.subPage);

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <div style={{ display: "flex" }}>
          <div
            onClick={() => {
              appctx.setTabOpenstate(false);
              props.setSubPage();
              props.setSelectedWareHouse();
            }}
            className={css.headerText}
          >
            Агуулах
          </div>
          {(props.subPage?.length !== 0 || props.subPage !== undefined) && (
            <div className={css.headerText}>
              <img
                src={Right}
                alt="arrow"
                style={{
                  height: "20px",
                  margin: "0 10px",
                  lineHeight: "20px",
                }}
              />
              <span
                style={{
                  width: "300px",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#37474F",
                }}
              >
                {props.subPage}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={css.rightSide}>
        <WarehouseIndex userData={props.userData} />
      </div>
    </div>
  );
};
