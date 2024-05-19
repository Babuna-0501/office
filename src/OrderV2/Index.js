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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2pdf from "html2pdf.js";

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
        "НИЙТ",
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
  
    const contentHtml = generateHtmlContent(list);
  
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10); // Format the date as yyyy-mm-dd
  
    html2pdf()
      .set({
        margin: 1,
        filename: `Тайлан ${formattedDate}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      })
      .from(contentHtml)
      .save();
  };
  
  const generateHtmlContent = (data) => {
    let html = '<div class="pdf-content">';
    html += '<div class="container-p">';
    html += '<div class="header-p">';
    html += '<div class="header-cell">№</div>';
    html += '<div class="header-cell">Дугаар</div>';
    html += '<div class="header-cell">Барааны нэр</div>';
    html += '<div class="header-cell">Тоо ширхэг</div>';
    html += '<div class="header-cell">Нэгж үнэ</div>';
    html += '<div class="header-cell">Нийт үнэ</div>';
    html += '<div class="header-cell">Эцсийн нийт үнэ</div>';
    html += '<div class="header-cell">Үйлчилгээний газрын нэр</div>';
    html += '<div class="header-cell">Утас</div>';
    html += '<div class="header-cell">Хариуцсан ХТ</div>';
    html += '<div class="header-cell">Түгээгч</div>';
    html += '<div class="header-cell">Дэлгэрэнгүй хаяг</div>';
    html += '</div>';
  
    html += '<div class="table-container">';
    for (let row of data) {
      html += '<div class="row">';
      for (let cell of row) {
        html += `<div class="cell">${cell}</div>`;
      }
      html += '</div>';
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
  
    return html;
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
    try {
      let status = 500;
      const ordersToUpdate = filterState.checked ? filteredData.map((e) => e.order_id) : selectedOrders;
      
      for (const order of ordersToUpdate) {
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
        const response = await fetch(url, requestOptions);
        const result = await response.json();
  
        setFilterState((prev) => ({
          ...prev,
          update: filterState.update == null ? true : !filterState.update,
        }));
        
        status = result.code;
        console.log(result);
      }
  
      status === 200 ? alert("Амжилттай") : alert("Амжилтгүй");
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
    {
      label: "Захиалгын тохиргоо",
      content: () => (
        <List2
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
      ),
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
