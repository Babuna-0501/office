import React, { useState, useMemo, useEffect, useContext } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";

import Image from "./compontent/Image";
import IDcomponents from "./compontent/id";
import Price from "./compontent/Price";
import Name from "./compontent/Name";
import Quantity from "./compontent/Quantity";
import SmallTableDeletebtn from "./compontent/SmallTableDeleteBtn";
import PromoHook from "../Hooks/PromoHook";

const SmallTable = (props) => {
  // console.log("props", props);
  const [productData, setProductData] = useState([]);
  // console.log("productdata", productData);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "_id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellRenderer: IDcomponents,
    },
    {
      field: "img",
      headerName: "IMG1",
      cellRenderer: Image,
      autoHeight: true,
    },
    {
      field: "name",
      headerName: "Бүтээгдэхүүн нэр",
      cellRenderer: Name,
    },
    { field: "brandName", headerName: "Брэнд", cellRenderer: Name },
    { field: "price", headerName: "Үнэ", cellRenderer: Price },
    { field: "sku", headerName: "SKU", cellRenderer: Name },
    { field: "bar_code", headerName: "Баркод", cellRenderer: Name },
    { field: "stock", headerName: "Ширхэг", cellRenderer: Quantity },
    // {
    //   field: "Delete",
    //   headerName: "Delete",
    //   colId: "action",
    //   cellRenderer: SmallTableDeletebtn,
    //   cellRendererParams: {
    //     clicked: function (field) {
    //       alert(`${field} was clicked`);
    //     },
    //   },
    // },
  ]);
  const promoctx = useContext(PromoHook);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      resizable: true,
      sortable: true,
      filterParams: {
        buttons: ["reset", "apply"],
        debounceMs: 500,
      },
      floatingFilter: true,
    };
  }, []);
  const defaultRow = {
    height: 60,
    display: "flex",
    alignItems: "center",
  };

  ///// delete one product
  const onCellClicked = (params) => {
    // console.log("params", params);
    // Handle click event for action cells
    // console.log("++++++++++++++aaaaaaaaaaaaaaaaaaa");
    if (
      params.column.colId === "action" &&
      params.event.target.dataset.action
    ) {
      let action = params.event.target.dataset.action;
      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data],
        });
      }
    }
  };
  useEffect(() => {
    // console.log("props.data", props.data);
    let data = [];
    setProductData(props.data);
    // promoctx.setWillUpdateProd({
    //   products: productData[0]._id,
    // });

    // props.newProduct(productData);
  }, [props.data]);
  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "50vh" }}>
      <AgGridReact
        rowData={productData} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef}
        rowHeight={defaultRow}
        onCellClicked={onCellClicked}
      />
    </div>
  );
};

export default SmallTable;
