import React from "react";
import css from "./index.module.css";

const SideMenu = (props) => {
  const { style } = props;
  let sidebarWidth = "550px";
  if (style.width) {
    sidebarWidth = style?.width;
  }

  return (
    <div className={css.container}>
      <div
        onClick={() => {
          props.setIsSideMenu(false);
        }}
        style={{
          top: "0px",
          left: "0px",
          position: "absolute",
          width: `calc(100% - ${sidebarWidth})`,
          height: "100%",
          zIndex: "1000",
        }}
      ></div>
      <div className={css.sidebar} style={style}>
        {props.children}
      </div>
    </div>
  );
};

export default SideMenu;
