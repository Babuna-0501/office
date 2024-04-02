import React from "react";
import { Button } from "../../../components/common";

const OrderDownload = props => {
	return (
    <div>
      <Button
        variant="primary"
        size="medium"
        style={{
          backgroundColor: "#2ab674",
          marginTop: "10px",
          padding: "10px",
        }}
        onClick={() => {
          props.handleDownload();
        }}
      >
        Захиалгын түүх татах
      </Button>
    </div>
  );
};

export default OrderDownload;