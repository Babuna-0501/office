import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import DateRender from "./DateRender";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";

import Locations from "./compontent/Locations";
import ProductName from "./ProductName";

import PromoHook from "../Hooks/PromoHook";

import "./table.css";
import Category from "./compontent/Category";
import SKU from "./compontent/SKU";
import Deletebutton from "./compontent/Deletebutton";
import { useEffect } from "react";

const actionCellRenderer = (params) => {
  let eGui = `<button class="action-button delete" data-action="delete" > delete </button>)`;

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
  } else {
    // dangerouslySetInnerHTML={{ __html: eGui}}
  }

  return eGui;
};

const timeOperation = (name, operation) => {
  let aggCallCount = 0;
  let compareCallCount = 0;
  let filterCallCount = 0;
  var start = new Date().getTime();
  operation();
  var end = new Date().getTime();
  console.log(
    name +
      " finished in " +
      (end - start) +
      "ms, aggCallCount = " +
      aggCallCount +
      ", compareCallCount = " +
      compareCallCount +
      ", filterCallCount = " +
      filterCallCount
  );
};
var numberValueFormatter = function (params) {
  return params.value;
};

const Table = (props) => {
  const promoctx = useContext(PromoHook);
  const ref = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "supplierName",
      headerName: "Нийлүүлэгч",
      checkboxSelection: true,
      headerCheckboxSelection: true,

      cellRenderer: ProductName,
    },
    {
      field: "discount_data.title",
      headerName: "Урамшууллын нэр",
      cellRenderer: ProductName,
    },
    // { field: "products", headerName: "Бүтээгдэхүүн", cellRenderer: Product },
    {
      field: "productName",
      headerName: "Барааны нэр",
      cellRenderer: ProductName,
    },
    {
      field: "productBarcode",
      headerName: "Баркод",
      cellRenderer: ProductName,
    },
    {
      field: "skus",
      headerName: "Бүтээгдэхүүн ID",
      cellRenderer: SKU,
    },
    {
      field: "start_date",
      headerName: "Эхлэх огноо",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (dateFromFilter, cellValue) => {
          if (cellValue === null) {
            return 0;
          }

          const dataPartsOne = cellValue.split("T")[0];
          const dataParts = dataPartsOne.split("-");

          const year = Number(dataParts[0]);
          const month = Number(dataParts[1]) - 1;
          const day = Number(dataParts[2]);
          const cellDate = new Date(year, month, day);
          if (cellDate < dateFromFilter) {
            return -1;
          } else if (cellDate > dateFromFilter) {
            return 1;
          }
          return 0;
        },
      },
      cellRenderer: DateRender,
    },
    {
      field: "end_date",
      headerName: "Дуусах огноо",
      filter: "agDateColumnFilter",

      filterParams: {
        comparator: (dateFromFilter, cellValue) => {
          if (cellValue === null) {
            return 0;
          }

          const dataPartsOne = cellValue.split("T")[0];
          const dataParts = dataPartsOne.split("-");

          const year = Number(dataParts[0]);
          const month = Number(dataParts[1]) - 1;
          const day = Number(dataParts[2]);
          const cellDate = new Date(year, month, day);
          if (cellDate < dateFromFilter) {
            return -1;
          } else if (cellDate > dateFromFilter) {
            return 1;
          }
          return 0;
        },
      },
      cellRenderer: DateRender,
    },
    { field: "catName", headerName: "Суваг", cellRenderer: Category },
    { field: "location", headerName: "Бүсчлэл", cellRenderer: Locations },
    {
      field: "delete",
      headerName: "Устгах",
      minWidth: 150,
      // cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action",
      cellRenderer: Deletebutton,
      cellRendererParams: {
        clicked: function (field) {
          alert(`${field} was clicked`);
        },
      },
    },
  ]);

  ///// delete one product
  const onCellClicked = (params) => {
    // Handle click event for action cells
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

  ////

  const onBtExport = useCallback(() => {
    ref.current.api.exportDataAsExcel();
  }, []);
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
  const onSelectionChanged = useCallback(() => {
    const selectedRows = ref.current.api.getSelectedRows();
    // console.log("selectedRows+++++", selectedRows);
    promoctx.setSelectedRowData(selectedRows);
    // promoctx.setDeleteRowProduct(selectedRows);
  }, []);

  const onBtDelete = useCallback(() => {
    var api = ref.current.api;
    // console.log("api", api);
    // get the first child of the
    var selectedRows = api.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      alert(
        `Устгах бүтээгдэхүүн сонгогдоогүй байна. Та нэг бүтээгдэхүүн сонгоно уу`
      );
      return;
    }
    // console.log("selectedRows ===========", selectedRows);

    timeOperation("Delete", function () {
      api.applyTransaction({ remove: selectedRows });
      var myHeaders = new Headers();
      myHeaders.append(
        "ebazaar_token",
        localStorage.getItem("ebazaar_admin_token")
      );
      myHeaders.append("Content-Type", "application/json");
      let id = selectedRows[0]._id;

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          discount_id: id,
          is_active: 0,
        }),
      };
      // console.log("promo delete", requestOptions);

      fetch(`https://api2.ebazaar.mn/api/discount/delete`, requestOptions)
        .then((r) => r.json())
        .then((res) => {
          if (res.code === 200) {
            promoctx.setDeleteBTN(false);
          }
        })
        .catch((error) => {
          alert(`Устгахад алдаа гарлаа. ${error}`);
        });
    });
  }, []);
  useEffect(() => {
    if (promoctx.deleteBTN) {
      onBtDelete();
    } else if (!promoctx.deleteBTN) {
      return;
    }
  }, [promoctx?.deleteBTN]);
  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: "100%",
        height: "calc(100% - 53px)",
      }}
    >
      <AgGridReact
        ref={ref}
        rowData={props.data} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef}
        rowSelection={"single"}
        onSelectionChanged={onSelectionChanged}
        onCellClicked={onCellClicked}
        // pagination={true}
        // paginationPageSize={50}
      />
    </div>
  );
};

export default Table;
