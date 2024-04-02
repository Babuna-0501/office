import React, { useContext } from "react";
import upload from "../../assets/Upload_white.svg";
import uploadGray from "../../assets/Upload.svg";
import refreshIcon from "../../assets/refresh.svg";
import css from "./upointheader.module.css";
import UpointHook from "../../Hooks/UpointHook";
import { Button } from "../common";

const UpointHeader = (props) => {
  const upointctx = useContext(UpointHook);
  const permission = Object.values(JSON.parse(props.userData.permission))[0];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button
        variant="primary"
        size="medium"
        icon
        onClick={() => upointctx.setUserreport(true)}
      >
        <img src={upload} alt="upload" />
        Upoint холболт
      </Button>
      {permission.upoint.report && (
        <Button
          variant="primary"
          size="medium"
          icon
          onClick={() => upointctx.setReportSecond(true)}
        >
          <img src={upload} alt="upload" />
          Тайлан
        </Button>
      )}
    </div>
  );
};

export default UpointHeader;
