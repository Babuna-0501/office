import React, { useContext, useState, useEffect } from "react";
import css from "./importinfo.module.css";
import Input from "./Input";
import MerchantReportStore from "../../Hooks/MerchantReportHook";
import readXlsxFile from "read-excel-file";

const ImportInfo = () => {
  const ctx = useContext(MerchantReportStore);
  const [importData, setImportData] = useState([]);
  const cancelHandler = () => {
    setImportData([]);
    ctx.setImportData(false);
  };
  console.log("importdata", importData.rows);

  const readExcel = () => {
    const id = (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
    document
      .getElementById("root")
      .insertAdjacentHTML(
        "beforeEnd",
        '<form method="post" enctype="multipart/form‐data" id="' +
          id +
          '" name=' +
          id +
          '><input type="file" id="read" /></form>'
      );

    document.getElementById("read").click();
    document.getElementById("read").addEventListener(
      "change",
      () => {
        const schema = {
          companyname: {
            prop: "companyname",
            type: String,
          },
          register: {
            prop: "register",
            type: String,
          },
          description: {
            prop: "description",
            type: String,
          },
          channel: {
            prop: "channel",
            type: String,
          },
          name: {
            prop: "name",
            type: String,
          },
          phone: {
            prop: "phone",
            type: Number,
          },
          city: {
            prop: "city",
            type: String,
          },
          district: {
            prop: "district",
            type: String,
          },
          khoroo: {
            prop: "khoroo",
            type: String,
          },
          address: {
            prop: "address",
            type: String,
          },
        };
        readXlsxFile(document.getElementById("read").files[0], { schema }).then(
          (rows) => {
            setImportData(rows);
          }
        );
      },
      false
    );
    // setImporter(true);
  };
  useEffect(() => {
    if (ctx.importData) {
      readExcel();
    }
  }, [ctx.importData]);
  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <h1>Харилцагчийн мэдээлэл импорт </h1>
      </div>

      <div className={css.middleContainer}>
        <div className={css.wrapper}>
          <div>Компани нэр</div>
          <div>Регистр</div>
          <div>Үйл ажиллагааны чиглэл</div>
          <div>Суваг</div>
          <div>Нэр</div>
          <div>Утас</div>
          <div>Хот</div>
          <div>Дүүрэг</div>
          <div>Хороо</div>
          <div>Хаяг</div>
        </div>
        <div className={css.datacontainer}>
          {importData.rows &&
            importData.rows.map((item) => {
              return (
                <div className={css.datawrapper} key={Math.random()}>
                  <div>{item.companyname}</div>
                  <div>{item.register}</div>
                  <div>{item.description}</div>
                  <div>{item.channel}</div>
                  <div>{item.name}</div>
                  <div>{item.phone}</div>
                  <div>{item.city}</div>
                  <div>{item.district}</div>
                  <div>{item.khoroo}</div>
                  <div>{item.address}</div>
                </div>
              );
            })}
        </div>
      </div>

      <div className={css.buttonscontainer}>
        <button className={css.cancel} onClick={cancelHandler}>
          Цуцлах
        </button>
        <button className={css.add}>Хадгалах</button>
      </div>
    </div>
  );
};

export default ImportInfo;
