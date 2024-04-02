import React, { useState, useEffect, useContext } from "react";
import CSV from "./CSV";
import writeXlsxFile from "write-excel-file";
import UpointHook from "../Hooks/UpointHook";
import myHeaders from "../components/MyHeader/myHeader";
const schema = [
  {
    column: "ID",
    type: String,
    value: (d) => d.ID,
  },
  {
    column: "User ID",
    type: String,
    value: (d) => d.User_ID,
  },
  {
    column: "Олгосон оноо",
    type: String,
    value: (d) => d.Added_point,
  },
  {
    column: "Зарцуулсан оноо",
    type: String,
    value: (d) => d.Consume_point,
  },
  {
    column: "Олгосон онооны буцаалт",
    type: String,
    value: (d) => d.returnAddedPoint,
  },
  {
    column: "Зарцуулалтын онооны буцаалт",
    type: String,
    value: (d) => d.returnconsumePoint,
  },
  {
    column: "Захиалга үүссэн өдөр",
    type: String,
    value: (d) => d.Added_date,
  },
  {
    column: "Олгосон өдөр",
    type: String,
    value: (d) => d.bonus_point_date,
  },
];

const output = (lines, dates) => {
  writeXlsxFile(lines, {
    schema,
    fileName: `UPOINT_${dates}.xlsx`,
  });
};

function Report(props) {
  let [exporting, setExporting] = useState(false);
  let [data, setData] = useState(true);
  let [preparing, setPreparing] = useState(false);

  let [foo, setFoo] = useState(false);

  const upointCTX = useContext(UpointHook);
  let csv = [
    [
      "ID",
      "User_ID",
      "Added_point",
      "Consume_point",
      "returnAddedPoint",
      "returnconsumePoint",
      "Added_date",
      "bonus_point_date",
    ],
  ];
  let [blah, setBlah] = useState(csv);

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

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://api2.ebazaar.mn/api/upoint/data?start_date=${start_date.value}&end_date=${end_date.value}`,

        requestOptions
      )
        .then((r) => r.json())
        .then((response) => {
          let csv = [];
          response.data.map((item) => {
            let dat1, dat2, dat3;
            if (item.bonus_point_date === null) {
              dat1 = "";
              dat2 = "";
              dat3 = "";
            } else {
              dat1 = item.bonus_point_date.slice(0, 19);
              dat2 = dat1.split("T")[0];
              dat3 = dat1.split("T")[1];
            }

            const ID = item.order_id;
            const User_ID = item.user_id;
            const addedPoint = item.original_added_bonus_point; /// olgoson onoo
            const consumePoint = item.consume_point; /// zartsuulaltin onoo
            const returnAddedPoint = item.return_bonus_point; /// olgoltiin butsaalt
            const returnconsumePoint = item.return_consume_point; ////  zartsuulaltiin butsaalt

            const dateOne = item.date;
            const dateTwo = `${dat2} ${dat3}`;
            let template = {
              ID: String(ID),
              User_ID: String(User_ID),
              Added_point: String(addedPoint),
              Consume_point: String(consumePoint),
              returnAddedPoint: String(returnAddedPoint),
              returnconsumePoint: String(returnconsumePoint),
              Added_date: String(dateOne),
              bonus_point_date: String(dateTwo),
            };
            csv.push(template);
          });
          // console.log("upoint response", response.data);

          output(csv, start_date.value + "_" + end_date.value);
          setExporting(false);
        });
    }
  };
  useEffect(() => {
    //getOrders()
  }, []);

  let renderHTML =
    foo && data && blah.length > 1 ? (
      <>
        <CSV data={blah} />
      </>
    ) : (
      <>
        <span id="close" onClick={() => upointCTX.setReportSecond(false)}>
          Close
        </span>
        <div>
          <label>Эхлэх огноо</label>
          <input type="date" className="dateselect" id="date_start" />
        </div>
        <div>
          <label>Дуусах огноо</label>
          <input type="date" className="dateselect" id="date_end" />
        </div>
        <div className="margintop1rem">
          {exporting ? (
            <span>Түр хүлээнэ үү ... </span>
          ) : (
            <span className="btn-tech" onClick={() => exporter()}>
              Тайлан бэлтгэх
            </span>
          )}
        </div>
      </>
    );
  return (
    <div id="formwithtransparentbackground">
      <div id="form">{renderHTML}</div>
      <div id="transparentbackground"></div>
    </div>
  );
}

export default Report;
