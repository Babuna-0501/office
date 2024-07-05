import React, { useEffect, useState, useRef } from "react";
import Tab from "./components/tab/Tab";
import List1 from "./List/List1";
import List2, { defaultHeaderList } from "./List/List2";
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
import * as XLSX from 'xlsx';
import City from "./data/city.json";
import District from "./data/district.json";
import List4 from "./List/List4";
import ListHeader from "./screen/ListHeader";


export const b2bs = ["|14233|", "|14191|", "|14178|", "|14045|", "|1|"];
export const tsastaltaindol = "|14233|";
export const nerst = "|14191|";

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
    payment_status: null,
  });

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Филтэр хийж байгаа датаг энэ стэйтэд хадгаллаа.
  const [users, setUsers] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [exportOpen, setExportOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [sfa, setSfa] = useState(false);
  const usersMapRef = useRef({}); 
  let b2b = b2bs.includes(props.userData.company_id);
  const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const getArigSuppliers = async () => {
    try {
      const url2 = `https://api2.ebazaar.mn/api/backoffice/suppliers`;
      const requestOptions2 = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const res = await fetch(url2, requestOptions2);
      const resJson = await res.json();

      const suppliersList = resJson.data.map((item) => ({
        value: item.id,
        label: item.name,
        media: item.media,
        available: item.available,
      }));

      setSuppliers(suppliersList);
      let sfa = false;

      sfa = JSON.parse(resJson.data[0]?.available).sfa;
      setSfa(sfa);
  
      console.log("Supplier list:", suppliersList);
    } catch (err) {
      console.log("Error fetching suppliers:", err);
    }
  };
  useEffect(() => {
    let sfa = false;

    try {
      if (suppliers.length > 0)
        sfa = JSON.parse(
          selectedItem == null
            ? suppliers[0]?.available
            : suppliers.filter((s) => s.value == selectedItem)?.[0]
                ?.available ?? suppliers[0]?.available
        ).sfa;
    } catch (error) {
      console.log(error);
    }
    console.log("sfa", sfa);
    setSfa(sfa);
  }, [selectedItem, suppliers]);

  useEffect(() => {
    getArigSuppliers();
  }, []);

  const [fieldsData, setFieldsData] = useState([
    {
      order: {
        field: [],
        report: [],
      },
      product: {
        field: [],
        report: [],
      },
    },
  ]);

  useEffect(() => {
    if (props.userData && props.userData?.tablePosition) {
      try {
        let tablePosition = JSON.parse(props.userData.tablePosition);
        setFieldsData(tablePosition);
      } catch (error) {
        setFieldsData({
          order: {
            field: defaultHeaderList,
            report: [],
          },
          product: {
            field: [],
            report: [],
          },
        });
      }
    } else {
      setFieldsData({
        order: {
          field: defaultHeaderList,
          report: [],
        },
        product: {
          field: [],
          report: [],
        },
      });
    }
  }, [props.userData]);

  useEffect(() => {
    const fetchUsers = async () => {
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch("https://api2.ebazaar.mn/api/backoffice/users", requestOptions);
        const userData = await response.json();

        const usersMap = userData?.data?.reduce((acc, user) => {
          acc[user.user_id] = user.first_name;
          return acc;
        }, {});

        usersMapRef.current = usersMap;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []); 

  useEffect(() => {
    const updateUserDetails = () => {
      const updatedUsersData = users.map((item) => ({
        ...item,
        sales_man: usersMapRef.current[item.sales_man],
        deliver_man: usersMapRef.current[item.deliver_man],
      }));

      setUsers(updatedUsersData);
    };

    if (Object.keys(usersMapRef.current).length > 0) {
      updateUserDetails();
    }
  }, [users]); 


  const cityMapping = City.City.reduce((acc, city) => {
    acc[city.location_id] = city.location_name;
    return acc;
  }, {});
  
  const districtMapping = District.District.reduce((acc, district) => {
    acc[district.location_id] = district.location_name;
    return acc;
  }, {});
  
  const exportExcel = () => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    let items = filterState.checked
      ? filteredData
      : filteredData.filter((f) => selectedOrders.includes(f.order_id));
  
    const wsData = [
      ["№", "Дугаар", "Барааны нэр", "Тоо ширхэг", "Нэгж үнэ", "Төлсөн", "Нийт үнэ", "Үйлчилгээний газрын нэр", "Утас", "Хариуцсан ХТ", "Түгээгч", "Дэлгэрэнгүй хаяг"]
    ];
  
    let qr = 0;
    let pr = 0;
    let deliverFee = 6000;
    let paids = 0;
  
    items.forEach((item, i) => {
      let quantity = 0;
      let price = 0;
      let paid = item.order_data != undefined ? Number(JSON.parse(item.order_data)?.prePayment)  ?? 0 : 0;
      paids += paid;
  
      item.line.forEach((l) => {
        quantity += l.quantity;
        price += l.amount;
        qr += l.quantity;
        pr += l.amount;
  
        if (item.supplier_id === 14268) {
          pr += deliverFee;
        }
      });
  
      const tradeshopCityName = cityMapping[item.tradeshop_city] || item.tradeshop_city;
      const tradeshopDistrictName = districtMapping[item.tradeshop_district] || item.tradeshop_district;
  
      wsData.push([
        i + 1,
        item.order_id,
        "",
        quantity,
        "",
        paid,
        "",
        // item.supplier_id === 14268 ? price + deliverFee : price,
        item.tradeshop_name,
        item.phone,
        usersMapRef.current[item.sales_man],
        usersMapRef.current[item.deliver_man],
        item.address + ',' + tradeshopCityName + ',' + tradeshopDistrictName,  
      ]);
  
      item.line.forEach((l) => {
        wsData.push([
          "",
          "",
          l.product_name,
          l.quantity,
          l.price,
          "",
          item.supplier_id === 14268 ? l.amount + deliverFee - paid : l.amount,
          "",
          "",
          usersMapRef.current[item.sales_man],
          "",
          "",
        ]);
      });
    });
  
    wsData.push([
      "",
      "",
      "GRAND TOTAL",
      qr,
      "",
      paids,
      pr - paids,
      "",
      "",
      "",
      "",
      ""
    ]);
  
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Тайлан");
  
    XLSX.writeFile(wb, `Тайлан ${formattedDate}.xlsx`);
  };
  


  const exportPdf = () => {
    let list = [];
    let qr = 0;
    let pr = 0;
    let deliverFee = 6000; 
    let paids = 0;
    let items = filterState.checked
      ? filteredData
      : filteredData.filter((f) => selectedOrders.includes(f.order_id));
  
    const usersMap = usersMapRef.current; 
    console.log("header", list);

    items.map((item, i) => {
      let quantity = 0;
      let price = 0;
      let paid =
        item.order_data != undefined
          ? JSON.parse(item.order_data)?.prePayment ?? 0
          : 0;
      paids += paid;
      item.line.map((l) => {
        quantity += l.quantity;
        price += l.amount;
        qr += l.quantity;
        pr += l.amount;
  
        if (item.supplier_id === 14268) {
          price += deliverFee;
          pr += deliverFee;
        }
      });
  
      const salesManName = usersMap[item.sales_man] || item.sales_man;
      const deliverManName = usersMap[item.deliver_man] || item.deliver_man;
  
      list.push([
        i + 1,
        item.order_id,
        "",
        quantity,
        price,
        paid,
        item.tradeshop_name,
        item.phone,
        salesManName,
        deliverManName,
        "",
      ]);
  
      item.line.map((l, index) => {
        list.push([
          index + 1,
          "",
          l.product_name,
          l.quantity,
          l.price,
          l.amount,
          "",
          item.phone,
          "",
          "",
          item.address, // The address line to be styled
          "",
          "",
        ]);
      });
    });
  
    list.push([
      "",
      "",
      "GRAND TOTAL",
      qr,
      "",
      pr,
      paids,
      pr,
      "",
      "",
      "",
      "",
      "",
    ]);
  
    const contentHtml = generateHtmlContent(list);
  
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10); 
  
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
    let html = `
      <style>
        .pdf-content {
          font-family: Arial, sans-serif;
          width: 100%;
          border-collapse: collapse;
        }
  
        .container-p {
          width: 100%;
          padding: 10px;
        }
  
        .header-p, .row {
          display: grid;
          grid-template-columns: 35px 65px 65px 65px 65px 65px 70px 65px 65px 65px 300px;
          background-color: #f2f2f2;
        }
  
        .header-cell, .cell {
          padding: 8px;
          text-align: left;
          height: 50px;
        }

        .header-cell, .cell:last-of-type {
          width:250px
        }
  
        .header-cell {
          background-color: #f8f8f8;
          font-weight: bold;
        }
  
        .row:nth-child(even) {
          background-color: #f9f9f9;
        }
  
        .row:hover {
          background-color: #f1f1f1;
        }
        .hayg {
          width: 300px;
          font-size: 10px;
        }
      </style>
      <div class="pdf-content">
        <div class="container-p">
          <div class="header-p">
            <div class="header-cell">№</div>
            <div class="header-cell">Дугаар</div>
            <div class="header-cell">Барааны нэр</div>
            <div class="header-cell">Тоо ширхэг</div>
            <div class="header-cell">Нэгж үнэ</div>
            <div class="header-cell">Нийт үнэ</div>
            <div class="header-cell">Үйлчилгээний газрын нэр</div>
            <div class="header-cell">Утас</div>
            <div class="header-cell">Хариуцсан ХТ</div>
            <div class="header-cell">Түгээгч</div>
            <div class="header-cell hayg">Дэлгэрэнгүй хаяг</div>
          </div>
          <div class="table-container">
    `;

    for (let row of data) {
      html += '<div class="row">';
      for (let cell of row) {
        html += `<div class="cell">${cell}</div>`;
      }
      html += "</div>";
    }

    html += `
          </div>
        </div>
      </div>
    `;

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
  // Түгээгч
  const updateOrdersDeliver = async (id) => {
    try {
      let status = 500;
      const ordersToUpdate = filterState.checked
        ? filteredData.map((e) => e.order_id)
        : selectedOrders;

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

      if (status === 200) {
        alert("Амжилттай");
        window.location.reload();
      } else {
        alert("Амжилтгүй");
      }
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
      label: "Захиалгын жагсаалт ",
      content: () => (
        <div>
          <List1
            suppliers={true}
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
      content: () => (
        <List2
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
      ),
    },
    { label: "Захиалгын тайлан", content: () => <List3 /> },
  ];
  if (b2b | (props.userData.user_id === 1)) {
    tabs.splice(1, 0, {
      label: "Захиалгын жагсаалт b2b",
      content: () => (
        <div>
          <List4
            suppliers={false}
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
    });
  }

  const openExport = () => {};

  return (
    <div className="Container_order2">
      <div className="sidebarWrapper">
        <DateFilter
          handleFilterChange={handleFilterChange}
          selectedFilter={filterState.selectedDate}
        />
        <Sidebar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          suppliers={suppliers}
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
          if (
            !filterState.checked &&
            filteredData.filter((d) => selectedOrders.includes(d.order_id))
              .length === 0
          ) {
            alert("Та захиалга сонгоогүй байна");
          } else {
            setExportOpen(true);
          }
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
