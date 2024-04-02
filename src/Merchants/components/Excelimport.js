import React from "react";
import readXlsxFile from "read-excel-file";

const Excelimport = () => {
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
          price: {
            prop: "price",
            type: Number,
          },
          barcode: {
            prop: "barcode",
            type: String,
          },
          active: {
            prop: "active",
            type: String,
          },
          sku: {
            prop: "sku",
            type: String,
          },
          name: {
            prop: "name",
            type: String,
          },
          description: {
            prop: "description",
            type: String,
          },
          incase: {
            prop: "incase",
            type: Number,
          },
          stock: {
            prop: "stock",
            type: Number,
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
  return <div>Excelimport</div>;
};

export default Excelimport;
