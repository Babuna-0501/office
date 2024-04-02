import React, { useState } from "react";
import upload from "../../assets/Upload_white.svg";
import css from "./upointheader.module.css";
import { Modal } from "antd";
import writeXlsxFile from "write-excel-file";
import { Button } from "../common";

const WheelHeader = () => {
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const schema = [
    {
      column: "amount",
      type: String,
      value: (d) => d.amount,
    },
    {
      column: "order_ids",
      type: String,
      value: (d) => d.order_ids,
    },
    {
      column: "reward",
      type: String,
      value: (d) => d.reward,
    },
    {
      column: "target",
      type: String,
      value: (d) => d.target,
    },
    {
      column: "tradeshop_id",
      type: String,
      value: (d) => d.tradeshop_id,
    },
    {
      column: "tradeshop_name",
      type: String,
      value: (d) => d.tradeshop_name,
    },
    {
      column: "user_number",
      type: String,
      value: (d) => d.user_number,
    },
  ];
  const output = (lines, dates) => {
    writeXlsxFile(lines, {
      schema,
      fileName: `Bayariin_misheel_INFO_${dates}.xlsx`,
    });
  };

  const exporter = () => {
    const start_date = document.getElementById("date_start");
    const end_date = document.getElementById("date_end");
    const borderColor = document.getElementById("date_start").style.borderColor;
    start_date.style.borderColor =
      start_date.value === "" ? "red" : borderColor;
    end_date.style.borderColor = end_date.value === "" ? "red" : borderColor;
    if (start_date.value === "" || end_date.value === "") {
      setTimeout(() => {
        start_date.style.borderColor = borderColor;
        end_date.style.borderColor = borderColor;
      }, 2000);
      return;
    } else {
      setExporting(true);
      var myHeaders = new Headers();
      myHeaders.append(
        "ebazaar_token",
        localStorage.getItem("ebazaar_admin_token")
      );
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://api2.ebazaar.mn/api/marathons/get?end_date=${end_date.value}&start_date=${start_date.value}`,
        requestOptions
      )
        .then((r) => r.json())
        .then((response) => {
          // console.log("response", response);
          let csv = [];
          response.data.map((item) => {
            const amount = item.amount;
            const order_ids = item.order_ids;
            const reward = item.reward;
            const target = item.target;
            const tradeshop_id = item.tradeshop_id;
            const tradeshop_name = item.tradeshop_name;
            const user_number = item.user_number;
            let template = {
              amount: String(amount),
              order_ids: String(order_ids),
              reward: String(reward),
              target: String(target),
              tradeshop_id: String(tradeshop_id),
              tradeshop_name: String(tradeshop_name),
              user_number: String(user_number),
            };
            csv.push(template);
          });

          // console.log(csv);

          output(csv, start_date.value + "_" + end_date.value);
          setExporting(false);
        });
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button
        variant="primary"
        size="medium"
        icon
        onClick={() => {
          setOpen(true);
        }}
      >
        <img src={upload} alt="upload" />
        Тайлан
      </Button>
      <Modal
        title={
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            Тайлан татах
          </div>
        }
        centered
        open={open}
        onOk={() => {
          exporter();
        }}
        onCancel={() => setOpen(false)}
        width="600px"
        okText={
          exporting ? (
            <span>Түр хүлээнэ үү ... </span>
          ) : (
            <span>Тайлан бэлтгэх</span>
          )
        }
        cancelText={"Цуцлах"}
        bodyStyle={{ padding: "5px 30px" }}
      >
        <div>
          <label>Эхлэх огноо</label>
          <input type="date" className="dateselect" id="date_start" />
        </div>
        <div>
          <label>Дуусах огноо</label>
          <input type="date" className="dateselect" id="date_end" />
        </div>
      </Modal>
    </div>
  );
};

export default WheelHeader;
