import React, { useEffect, useState } from "react";
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
            deliveryManId: id,
          }),
        };
        console.log({
          order_id: order,
          deliveryManId: id,
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
      status == 200 ? alert("Амжилттай") : alert("Амжилтгүй");
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
    { label: "Захиалгын тохиргоо", content: () => <List2 /> },
    { label: "Захиалгын загвар", content: () => <List3 /> },
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
