import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import Image from "./compontent/Image";
import DateRender from "./DateRender";

import id from "./compontent/id";
import Name from "./compontent/Name";
import Price from "./compontent/Price";

import PromoHook from "../Hooks/PromoHook";
import css from "./addnewdiscount.module.css";

const TableGiftProd = (props) => {
  const ref = useRef();

  const promoctx = useContext(PromoHook);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "_id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellRenderer: id,
    },
    {
      field: "suppName",
      headerName: "Нийлүүлэгч",
      cellRenderer: Name,
    },
    {
      field: "image",
      headerName: "IMG",
      cellRenderer: Image,
      autoHeight: true,
    },

    {
      field: "name",
      headerName: "Бүтээгдэхүүний нэр",
      cellRenderer: Name,
      filter: "agTextColumnFilter",
    },
    {
      field: "categoryName",
      headerName: "Ангилал",
      cellRenderer: Name,
    },
    {
      field: "brandName",
      headerName: "Брэнд",
      cellRenderer: Name,
    },
    {
      field: "price",
      headerName: "Үнэ",
      cellRenderer: Price,
    },
    {
      field: "created_date",
      headerName: "Үүссэн огноо",
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
      field: "sku",
      headerName: "SKU",
      cellRenderer: Name,
    },
    {
      field: "bar_code",
      headerName: "Баркод",
      cellRenderer: Name,
    },
  ]);

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

    props.setSelectedRows(selectedRows);
  }, []);
  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <input
          className={css.inputTwo}
          placeholder="Хайх"
          value={promoctx.searchValue}
          onChange={(e) => promoctx.setSearchValue(e.target.value)}
        />
      </div>
      <div
        className="ag-theme-alpine"
        style={{
          width: "100%",
          height: "50vh",
        }}
      >
        <AgGridReact
          ref={ref}
          rowData={props?.data}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          defaultColDef={defaultColDef}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

export default TableGiftProd;
