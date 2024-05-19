import React, { useContext, useEffect, useState } from "react";
import Tab from "./components/tab/Tab";
import List1 from "./List/List1";
import List2 from "./List/List2";
import List3 from "./List/List3";
import DateFilter from "./components/date/date"; // Renamed Date component
import Sidebar from "./components/sidebar/sidebar";
import "./style.css";
import { getDates } from "./data/info";
import myHeaders from "./components/MyHeader/myHeader";
import ReportBtn from "./components/reportBtn.js/reportBtn";
import { ExportModal } from "./components/modal/modal";
import { Workbook } from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const App = (props) => {
  const [filterState, setFilterState] = useState({
    order_id: null,
    status: null,
    phone: null,
    tradeshop_name: null,
    order_date: null,
    delivery_date: null,
    business_type: null,
    city: null,
    district: null,
    address: null,
    khoroo: null,
    srcode: null,
    origin: null,
    vat: null,
    salesman: null,
    deliveryman: null,
    butsaalt: null,
    manager: null,
    arigSupplier: null,
    checked: null,
    startDate: null,
    selectedDate: null,
    endDate: null,
    update: null,
  });

  const [fieldsData, setFieldsData] = useState([]);

  const [tablePosition, setTablePosition] = useState({
    order: {
      field: [],
      report: [],
    },
    product: {
      field: [],
      report: [],
    },
  });

  useEffect(() => {
    if (props.userData && tablePosition.order.field.length > 0) {
      setFieldsData(tablePosition.order.field);
    } else if (props.userData) {
      setFieldsData([
        {
          id: 1,
          position: 1,
          title: "Дугаар",
          permission: true,
          show: true,
        },
        {
          id: 2,
          position: 2,
          title: "Статус",
          permission: true,
          show: true,
        },
        {
          id: 3,
          position: 3,
          title: "Захиалга",
          permission: true,
          show: true,
        },
        {
          id: 4,
          position: 4,
          title: "Захиалсан өдөр",
          permission: true,
          show: true,
        },
        {
          id: 5,
          position: 5,
          title: "Хүргүүлэх өдөр",
          permission: true,
          show: true,
        },
        {
          id: 6,
          position: 6,
          title: "paidamount",
          permission: true,
          show: false,
        },
        {
          id: 7,
          position: 7,
          title: "Тэмдэглэл",
          permission: true,
          show: true,
        },
        {
          id: 8,
          position: 8,
          title: "Утас",
          permission: true,
          show: true,
        },
        {
          id: 9,
          position: 9,
          title: "Захиалсан",
          permission: true,
          show: true,
        },
        {
          id: 10,
          position: 10,
          title: "Суваг",
          permission: true,
          show: true,
        },
        {
          id: 11,
          position: 11,
          title: "--Хот/аймаг--",
          permission: true,
          show: true,
        },
        {
          id: 12,
          position: 12,
          title: "--Дүүрэг/сум--",
          permission: true,
          show: true,
        },
        {
          id: 13,
          position: 13,
          title: "Хороо",
          permission: true,
          show: true,
        },
        {
          id: 14,
          position: 14,
          title: "Дэлгэрэнгүй хаяг",
          permission: true,
          show: true,
        },
        {
          id: 15,
          position: 15,
          title: "Төлбөрийн хэлбэр",
          permission: true,
          show: true,
        },
        {
          id: 16,
          position: 16,
          title: "Pick Pack",
          permission: true,
          show: true,
        },
        {
          id: 17,
          position: 17,
          title: "Origin",
          permission: true,
          show: true,
        },
        {
          id: 18,
          position: 18,
          title: "VAT",
          permission: true,
          show: true,
        },
        {
          id: 19,
          position: 19,
          title: "ХТ код/нэр",
          permission: true,
          show: true,
        },
        {
          id: 20,
          position: 20,
          title: "Түгээгч код/нэр",
          permission: true,
          show: true,
        },
        {
          id: 21,
          position: 21,
          title: "Менежер",
          permission: true,
          show: true,
        },
        {
          id: 22,
          position: 22,
          title: "Буцаалт",
          permission: true,
          show: true,
        },
        // {
        //   id: 23,
        //   position: 23,
        //   title: "VAT",
        //   permission: true,
        //   show: false,
        // },
        // {
        //   id: 24,
        //   position: 24,
        //   title: "user_date",
        //   permission: true,
        //   show: false,
        // },
        // {
        //   id: 25,
        //   position: 25,
        //   title: "Хариуцагч",
        //   permission: true,
        //   show: true,
        // },
        // {
        //   id: 26,
        //   position: 26,
        //   title: "Хариуцагч нэр",
        //   permission: true,
        //   show: true,
        // },
        // {
        //   id: 27,
        //   position: 27,
        //   title: " Утасны дугаар",
        //   permission: true,
        //   show: true,
        // },
        // {
        //   id: 28,
        //   position: 28,
        //   title: "Түгээгч",
        //   permission: true,
        //   show: true,
        // },
        // {
        //   id: 29,
        //   position: 29,
        //   title: "Ачилт",
        //   permission: true,
        //   show: true,
        // },
        // {
        //   id: 30,
        //   position: 30,
        //   title: "Захиалга устгах",
        //   permission: true,
        //   show: true,
        // },
        // {
        //   id: 31,
        //   position: 31,
        //   title: "Утасны захиалга",
        //   permission: true,
        //   show: true,
        // },
        // {
        //   id: 32,
        //   position: -1,
        //   title: "Буцаалт",
        //   permission: true,
        //   show: true,
        // },
        // {
        //   id: 33,
        //   position: 33,
        //   title: "ХТ код",
        //   permission: true,
        //   show: true,
        // },
      ]);
    }
    console.log(fieldsData);
  }, [tablePosition.order.field, tablePosition.order.report, props.userData]);
  useEffect(() => {
    try {
      if (props.userData && props.userData?.tablePosition) {
        setTablePosition(JSON.parse(props.userData?.tablePosition));
      }
    } catch (error) {
      console.log("tablePosition error");
    }
  }, [props.userData]);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Филтэр хийж байгаа датаг энэ стэйтэд хадгаллаа.
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [exportOpen, setExportOpen] = useState(false);
  const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
  };

  const exportExcel = () => {
    const workbook = new Workbook();
    let date = new Date();
    workbook.creator = "test";
    workbook.created = date;
    workbook.modified = date;
    let items = filterState.checked
      ? filteredData
      : filteredData.filter((f) => selectedOrders.includes(f.order_id));
    workbook.views = [
      {
        x: 0,
        y: 0,
        width: 10000,
        height: 20000,
        firstSheet: 0,
        activeTab: 0,
        visibility: "visible",
      },
    ];
    const worksheet = workbook.addWorksheet("Тайлан");
    worksheet.columns = [
      {
        header: "№",
        key: "number",
      },
      {
        header: "Дугаар",
        key: "id",
      },
      {
        header: "Тоо ширхэг",
        key: "",
      },
      {
        header: "Нэгж үнэ",
        key: "amount",
      },
      {
        header: "Нийт үнэ",
        key: "price",
      },
      {
        header: "Эцсийн нийт үнэ",
        key: "allPrice",
      },
      {
        header: "Үйлчилгээний газрын нэр",
        key: "tradeshop",
      },
      {
        header: "Утас",
        key: "phone",
      },
      {
        header: "Хариуцсан ХТ",
        key: "haritsagch",
      },
      {
        header: "Түгээгч",
        key: "deliverman",
      },
      {
        header: "Дэлгэрэнгүй хаяг",
        key: "address",
      },
    ];
    let qr = 0;
    let pr = 0;
    items.map((item, i) => {
      let quantity = 0;
      let price = 0;
      item.line.map((l) => {
        quantity += l.quantity;
        price += l.amount;
        qr += l.quantity;
        pr += l.amount;
      });
      worksheet.addRow({
        number: i + 1,
        id: item.order_id,
        name: "НИЙТ",
        quantity: quantity,
        unitPrice: "",
        price: price,
        allPrice: price,
        tradeshop: item.tradeshop_name,
        phone: item.tradeshop_name,
        haritsagch: "",
        deliverman: item.deliverman,
        address: item.address,
      });
      item.line.map((l, index) => {
        worksheet.addRow({
          number: index + 1,
          id: "",
          name: l.product_name,
          quantity: l.quantity,
          unitPrice: l.price,
          price: l.amount,
          allPrice: price,
          tradeshop: "",
          phone: "",
          haritsagch: "",
          deliverman: "",
          address: "",
        });
      });
    });
    worksheet.addRow({
      number: "",
      id: "",
      name: "GRAND TOTAL",
      quantity: qr,
      unitPrice: "",
      price: pr,
      allPrice: pr,
      tradeshop: "",
      phone: "",
      haritsagch: "",
      deliverman: "",
      address: "",
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 10); // Format the date as yyyy-mm-dd
      a.download = `Тайлан ${formattedDate}`;

      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const exportPdf = () => {
    const doc = new jsPDF();

    // Set font to support UTF-8 characters
    doc.setFont("Arial", "normal");

    let list = [];
    let qr = 0;
    let pr = 0;
    let items = filterState.checked
      ? filteredData
      : filteredData.filter((f) => selectedOrders.includes(f.order_id));
    items.map((item, i) => {
      let quantity = 0;
      let price = 0;
      item.line.map((l) => {
        quantity += l.quantity;
        price += l.amount;
        qr += l.quantity;
        pr += l.amount;
      });
      list.push([
        i + 1,
        item.order_id,
        "НИЙТ", // Assuming "НИЙТ" is a UTF-8 Cyrillic text
        quantity,
        "",
        price,
        price,
        item.tradeshop_name,
        item.tradeshop_name,
        "",
        item.deliverman,
        item.address,
      ]);
      item.line.map((l, index) => {
        list.push([
          index + 1,
          "",
          l.product_name,
          l.quantity,
          l.price,
          l.amount,
          price,
          "",
          "",
          "",
          "",
          "",
        ]);
      });
    });
    list.push(["", "", "GRAND TOTAL", qr, "", pr, pr, "", "", "", "", ""]);
    autoTable(doc, {
      head: [
        [
          "№",
          "ID",
          "Product name",
          "Quantity",
          "Unit price",
          "Total price",
          "Grand total price",
          "Store name",
          "Phone",
          "Salesman",
          "Deliverman",
          "Address",
        ],
      ],
      body: list,
    });
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10); // Format the date as yyyy-mm-dd
    doc.save(`Тайлан ${formattedDate}`);
  };

  const handleFilterChange = (selectedFilter, startDate, endDate) => {
    const dataToFilter = [...selectedFilter];

    const filteredData = filterDataByDateRange(
      dataToFilter,
      startDate,
      endDate
    );

    setFilterState((prev) => ({
      ...prev,
      startDate: startDate,
      endDate: endDate,
      filteredData: filteredData,
    }));
  };

  const updateOrdersDeliver = async (id) => {
    // tugeegchiin id

    try {
      let status = 500;
      (filterState.checked
        ? filteredData.map((e) => e.order_id)
        : selectedOrders
      ).map(async (order) => {
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
          body: JSON.stringify({
            order_id: order,
            backOfficeUser: id.toString(),
          }),
        };
        console.log({
          order_id: order,
          backOfficeUser: id,
        });
        let url = `https://api2.ebazaar.mn/api/order/update`;
        await fetch(url, requestOptions)
          .then((r) => r.json())
          .then((result) => {
            setFilterState((prev) => ({
              ...prev,
              update: filterState.update == null ? true : !filterState.update,
            }));
            status = result.code;
            console.log(result);
          })
          .catch((error) => console.log("error++++", error));
      });
      status == 200 ? alert("Амжилттай") : alert("Амжилттай");
    } catch (error) {
      alert("Амжилтгүй");
      console.log(error);
      setFilterState((prev) => ({ ...prev, update: null }));
    }
  };
  useEffect(() => {
    if (filterState.checked != null && filterState.checked) {
      setSelectedOrders(filteredData.map((e) => e.order_id));
    } else {
      setSelectedOrders([]);
    }
  }, [filterState.checked]);

  const tabs = [
    {
      label: "Захиалгын жагсаалт",
      content: () => (
        <div>
          <List1
            fieldsData={fieldsData}
            userData={props.userData}
            data={data}
            setData={setData}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </div>
      ),
    },
    {
      label: "Захиалгын тохиргоо",
      content: () => {
        console.log(props.userData);
        return (
          <List2
            userData={props.userData}
            fieldsData={fieldsData}
            setFieldsData={setFieldsData}
            data={data}
            setData={setData}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        );
      },
    },
    { label: "Захиалгын тайлан", content: () => <List3 /> },
  ];

  const openExport = () => {};

  return (
    <div className="Container">
      <div className="sidebarWrapper">
        <DateFilter
          handleFilterChange={handleFilterChange}
          selectedFilter={filterState.selectedDate}
        />
        <Sidebar
          onClick={(e) => {
            setFilterState((prev) => ({ ...prev, arigSupplier: e }));
          }}
        />
      </div>
      <Tab
        tabs={tabs}
        view={selectedOrders.length > 0 || filterState.checked}
        updateOrdersDeliver={updateOrdersDeliver}
      />

      <ReportBtn
        onClick={() => {
          setExportOpen(true);
        }}
      />

      <ExportModal
        cancel={() => {
          setExportOpen(false);
        }}
        exportExcel={() => {
          exportExcel();
          setExportOpen(false);
        }}
        exportPdf={() => {
          exportPdf();
          // setExportOpen(false);
        }}
        open={exportOpen}
        payload={
          filterState.checked
            ? filteredData
            : filteredData.filter((d) => selectedOrders.includes(d.order_id))
        }
        print={() => {}}
      />
    </div>
  );
};

export default App;
