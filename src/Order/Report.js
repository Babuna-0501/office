import React, { useState, useEffect, useContext } from "react";
import CSV from "./CSV";
import writeXlsxFile from "write-excel-file";
import OrderReportHook from "../Hooks/OrderReportHook";
import ProductsReportHook from "../Hooks/ProductsReportHook";
import myHeaders from "../components/MyHeader/myHeader";
import SelectCompany from "./Company/SelectCompany";
import { Modal } from "../Achiltiinzahialga/components/common";
import { Button } from "../Achiltiinzahialga/components/common";
import { Checkbox } from "../components/common";
import OrdersHook from "../Hooks/OrdersHook";
import css from "./report.module.css";
import { originData } from "./Index";
/////// ORDERIIN DELGERENGUI TAILAN

const columnsToKeep = [
  "Order number",
  "Product name",
  "Merchant Sku",
  "Vendor",
  "Register",
  "Qty",
  "Gr",
  "Price",
  "Total",
  "Completed at",
  "When to ship",
  "Branch",
  "Status",
];

// Filter the initial schema to create the new schema

function Report(props) {
  const [initialSchema, setInitialSchema] = useState([
    {
      column: "Order number",
      type: String,
      value: (d) => d.OrderNumber,
    },
    {
      column: "Product name",
      type: String,
      value: (d) => d.ProductName,
    },
    {
      column: "Barcode",
      type: String,
      value: (d) => d.Barcode,
    },
    {
      column: "Merchant Sku",
      type: String,
      value: (d) => d.SKU,
    },
    {
      column: "Brand",
      type: String,
      value: (d) => d.Brand,
    },
    {
      column: "Vendor",
      type: String,
      value: (d) => d.Vendor,
    },
    {
      column: "Register",
      type: String,
      value: (d) => d.Register,
    },
    {
      column: "Qty",
      type: Number,
      value: (d) => d.Qty,
    },
    {
      column: "Gr",
      type: Number,
      value: (d) => d.Qty * 1000,
    },
    {
      column: "Price",
      type: Number,
      value: (d) => d.Price,
    },
    {
      column: "Total",
      type: Number,
      value: (d) => d.Total,
    },
    {
      column: "Taken",
      type: String,
      value: (d) => d.Taken,
    },

    {
      column: "Canceled",
      type: String,
      value: (d) => d.Canceled,
    },
    {
      column: "Returned",
      type: String,
      value: (d) => d.Returned,
    },
    {
      column: "Final total",
      type: Number,
      value: (d) => d.FinalTotal,
    },
    {
      column: "Completed at",
      type: String,
      value: (d) => d.CompletedAt,
    },
    {
      column: "When to ship",
      type: String,
      value: (d) => d.WhenToShip,
    },
    {
      column: "Paid at",
      type: String,
      value: (d) => d.PaidAt,
    },
    {
      column: "Shipped at",
      type: String,
      value: (d) => d.ShippedAt,
    },
    {
      column: "Receiver phone",
      type: String,
      value: (d) => d.ReceiverPhone,
    },
    {
      column: "Receiver info",
      type: String,
      value: (d) => d.ReceiverInfo,
    },
    {
      column: "Receiver name",
      type: String,
      value: (d) => d.ReceiverName,
    },
    {
      column: "Branch",
      type: String,
      value: (d) => d.Branch,
    },
    {
      column: "Business type",
      type: String,
      value: (d) => d.BusinessType,
    },
    {
      column: "State name",
      type: String,
      value: (d) => d.StateName,
    },
    {
      column: "District",
      type: String,
      value: (d) => d.District,
    },
    {
      column: "Quarter",
      type: String,
      value: (d) => d.Quarter,
    },
    {
      column: "Address",
      type: String,
      value: (d) => d.Address,
    },
    {
      column: "Note",
      type: String,
      value: (d) => d.LatestNote,
    },
    {
      column: "Status",
      type: String,
      value: (d) => d.Status,
    },
    {
      column: "Reason",
      type: String,
      value: (d) => d.Reason,
    },
    {
      column: "Main category",
      type: String,
      value: (d) => d.MainCategory,
    },
    {
      column: "Sub-category",
      type: String,
      value: (d) => d.SubCategory,
    },
    {
      column: "Sub-Sub-category",
      type: String,
      value: (d) => d.SubSubCategory,
    },
    {
      column: "Original total",
      type: Number,
      value: (d) => d.OriginalTotal,
    },
    {
      column: "Cancel reason",
      type: String,
      value: (d) => d.CancelReason,
    },
    {
      column: "Төлбөр бэлэн",
      type: Number,
      value: (d) => d.paymentBelen,
    },
    {
      column: "Төлбөр банк",
      type: Number,
      value: (d) => d.paymentBank,
    },
    {
      column: "Төлбөр зээл",
      type: Number,
      value: (d) => d.paymentZeel,
    },
    {
      column: "LendMn",
      type: Number,
      value: (d) => d.paymentLendMn,
    },
    {
      column: "StorePay",
      type: Number,
      value: (d) => d.paymentStorePay,
    },
    {
      column: "Урдчилсан",
      type: Number,
      value: (d) => d.prePayment,
    },
    {
      column: "Түгээгч",
      type: String,
      value: (d) => d.tugeegch,
    },
    {
      column: "Origin",
      type: String,
      value: (d) => d.origin,
    },
    
  ]);

  // const schema =
  //   props.userData.company_id === "|948|" || props.userData.company_id === "|14209|"
  //     ? [
  //         ...initialSchema,
  //         {
  //           column: "Төлбөрийн хэлбэр",
  //           type: String,
  //           value: (d) => d.paymentMethod,
  //         },
  //         { column: "ХТ мэдээлэл", type: String, value: (d) => d.tugeegchName },
  //         {
  //           column: "Хариуцагч",
  //           type: String,
  //           value: (d) => d.hariutsagch,
  //         },
  //       ]
  //     : initialSchema;

  const schema = [
    ...initialSchema,
    {
      column: "Төлбөрийн хэлбэр",
      type: String,
      value: (d) => d.paymentMethod,
    },
    { column: "ХТ мэдээлэл", type: String, value: (d) => d.tugeegchName },
    {
      column: "Хариуцагч",
      type: String,
      value: (d) => d.hariutsagch,
    },
  ];
  
      

  const output = (lines, dates) => {
    writeXlsxFile(lines, {
      schema,
      fileName: `ORDERS_${dates}.xlsx`,
    });
  };
  const orderFilterctx = useContext(OrdersHook);

  const { updateUser, fieldsDataReport, setFieldsDataReport } = orderFilterctx;

  const [isModal, setIsModal] = useState(false);
  let [exporting, setExporting] = useState(false);
  let [data, setData] = useState(true);
  let [preparing, setPreparing] = useState(false);
  let [foo, setFoo] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reasondata, setReasondata] = useState([]);
  const [supSelect, setSupSelect] = useState(null);
  let locations = props.locations;
  let categories = props.categories;
  const orderCTX = useContext(OrderReportHook);
  const sitectx = useContext(ProductsReportHook);

  console.log("props+++++1", props);

  useEffect(() => {
    if (!props.permissionData.order.report) {
      alert("Таньд захиалгын тайлангийн эрх байхгүй байна.");
      orderCTX?.setReport(false);
      return;
    }
  }, [props.permissionData]);

  useEffect(() => {
    fetch(`https://api2.ebazaar.mn/api/order/cancelreason`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((r) => r.json())
      .then((response) => {
        setReasondata(response.data);
      })
      .catch((error) => {
        console.log("aldaa garlaa", error);
      });
  }, []);

  let csv = [
    [
      "Order number",
      "Product name",
      "Barcode",
      "Merchant Sku",
      "Brand",
      "Vendor",
      "Register",
      "Qty",
      "Price",
      "Total",
      "Taken",
      "Canceled",
      "Returned",
      "Final total",
      "Completed at",
      "When to ship",
      "Paid at",
      "Shipped at",
      "Receiver phone",
      "Receiver info",
      "Receiver name",
      "Branch",
      "Business type",
      "State name",
      "District",
      "Quarter",
      "Address",
      "Note",
      "Status",
      "Reason",
      "Main category",
      "Sub-category",
      "Sub-Sub-category",
      "Original total",
      "Cancel reason",
      "XT ID",
      "XT Name",
      "XT Phone",
      "Төлбөр бэлэн",
      "Төлбөр банк",
      "Төлбөр зээл",
      "LendMn",
      "StorePay",
      "Урдчилсан",
      "Түгээгч",
      "Origin",
    ],
  ];
  // if (props.userData.company_id === "|14014|") {
  //   csv[0].push("XT ID", "XT Name", "XT Phone");
  // }
  const statusDataInfo = [
    { id: 1, name: "Хүлээгдэж буй", name_english: "Waiting" },
    { id: 2, name: "Баталгаажсан", name_english: "Confirmed" },
    { id: 3, name: "Хүргэгдсэн", name_english: "Delivered" },
    { id: 4, name: "Төлбөр төлөгдсөн", name_english: "Paid" },
    { id: 5, name: "Цуцлагдсан", name_english: "Cancelled" },
    { id: 6, name: "Засварласан", name_english: "Need review" },
    {
      id: 7,
      name: "Захиалга үүссэн",
      name_english: "Агуулахын захиалга үүссэн",
    },
    {
      id: 8,
      name: "Бэлтгэгдэж байна",
      name_english: "Түгээлтийн бараанууд бэлтгэгдэж байна",
    },
    {
      id: 9,
      name: "Агуулахаас гарсан",
      name_english: "Түгээлт агуулахаас гарсан",
    },
    {
      id: 10,
      name: "Түгээлт хүргэгдсэн",
      name_english: "Захиалгыг хаягийн дагуу хүргэв",
    },
    {
      id: 11,
      name: "Төлбөр төлөгдсөн",
      name_english: "Захиалгын төлбөр төлөгдсөн",
    },
    {
      id: 12,
      name: "Төлбөр хүлээгдэж буй",
      name_english: "Захиалгын төлбөр хүлээгдэж байна",
    },
    {
      id: 13,
      name: "Зээл авсан",
      name_english: "Захиалгын төлбөрийн зээл авсан",
    },
  ];
  let [blah, setBlah] = useState(csv);
  const getCategories = (categoryId) => {
    let cats = {
      main: "",
      sub: "",
      subsub: "",
    };
    categories.map((category) => {
      if (category.id === categoryId) {
        if (category.parent_id === 0) {
          cats["main"] = category["name"];
        } else {
          let parent = category.parent_id;
          categories.map((categoryParent) => {
            if (categoryParent.id === category.parent_id) {
              if (categoryParent.id === 0) {
                cats["main"] = categoryParent["name"];
                cats["sub"] = category["name"];
              } else {
                categories.map((categoryParentParent) => {
                  if (categoryParentParent.id === categoryParent.parent_id) {
                    cats["main"] = categoryParentParent["name"];
                    cats["sub"] = categoryParent["name"];
                    cats["subsub"] = category["name"];
                  }
                });
              }
            }
          });
        }
      }
    });
    return cats;
  };

  // let url = localStorage.getItem("url");

  const exporter = () => {
    let locations = props.locations;

    let url = localStorage.getItem("url");

    if (startDate && endDate) {
      if (props.page.page[0] === "shuurhai") {
        url = `https://api2.ebazaar.mn/api/orders?order_type=1&vendor=20000&delivery_start=${startDate}&delivery_end=${endDate}&page=all`;
      } else {
        url = `https://api2.ebazaar.mn/api/orders?order_type=1&delivery_start=${startDate}&delivery_end=${endDate}&page=all`;
      }
    }

    setExporting(true);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    url = url.split("page=")[0] + "page=all";

    // url = `https://api2.ebazaar.mn/api/orders?delivery_start=2022-04-01&delivery_end=2023-07-05&supplier_id=13884&page=all`;

    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        if (props.userData.company_id === "|14014|") {
          let aaa = [
            {
              column: "XT ID",
              type: String,
              value: (d) => d.xtid,
            },
            {
              column: "XT Name",
              type: String,
              value: (d) => d.xtname,
            },
            {
              column: "XT Phone",
              type: String,
              value: (d) => d.xtphone,
            },
          ];
          aaa.map((item) => {
            schema.push(item);
          });
        }

        let csv = [];

        response.data.map((order) => {
          const orderId = order.order_id;
          let supplierName = order.supplier_name;
          const customerPhone = order.phone;
          const customerAddress = order.address;
          let orderdata = "";

          if (order.order_data && order.order_data.trim() !== "") {
            orderdata = JSON.parse(order.order_data);
          }
          let reasondatainfo = "Тодорхойгүй";
          let buram = [];

          if (props.userData.company_id === "|14014|") {
            props.buramhanajilchid.map((item) => {
              if (item.user_id === Number(order.back_office_user)) {
                buram.push(item);
              }

              console.log("backdsadsdd", order.back_office_user)

              if (order.back_office_user === null) {
                buram.push({
                  created_date: "2019-01-01T00:00:00.000Z",
                  email: "example@example.com",
                  employee_id: "null",
                  first_name: "null",
                  is_active: 1,
                  last_name: "null",
                  leasing: "null",
                  notification: "null",
                  origin: 1,
                  permission: "",
                  phone_number: 99999999,
                  profile_picture: null,
                  role: 1,
                  special_tradeshops: null,
                  supplier_id: "|14014|",
                  target: null,
                  tradeshop: null,
                  updated_by: 351,
                  updated_date: "2000-01-01T01:01:01.000Z",
                  user_id: "0000",
                  zones: null,
                });
              }
            });
          }

          if (props.userData.company_id === "|948|") {
            const userIds = order.back_office_user
              .split(",")
              .map((id) => Number(id))
              .filter((id) => id);

            for (const userId of userIds) {
              props.buramhanajilchid.map((item) => {
                if (item.user_id === Number(userId)) {
                  buram.push(item);
                }
              });
            }
          }

          if (order.order_cancel_reason) {
            let aa = [];
            reasondata.map((item) => {
              if (order.order_cancel_reason === item.ID) {
                aa.push(`${item.name} / ${item.reason}`);
              }
            });
            reasondatainfo = aa;
          }
          let oneSupp = props.suppliers.filter(
            (item) => item.id === order.supplier_id
          );

          console.log("oneSupp", oneSupp);

          const RegisterNumber = oneSupp.map((item) => {
            return item.register;
          });
          console.log("reasondatainfo", reasondatainfo);
          let businessType = order.business_type_id;
          let businessTypeName;
          // console.log("sitectx", sitectx);
          sitectx.sitedata.business_types.map((item) => {
            if (Number(businessType) === Number(item.business_type_id)) {
              businessTypeName = item.business_type_name;
            }
          });
          const createdDate = order.order_date
            ? order.order_date.substr(0, 10) +
              " " +
              order.order_date.substr(11, 8)
            : "";
          const shippingDate = order.delivery_date
            ? order.delivery_date.substr(0, 10)
            : "";
          let orderStatus = order.status;
          let orderStatusName;
          statusDataInfo.map((item) => {
            if (item.id === orderStatus) {
              orderStatusName = item.name;
            }
          });
          let note = "";
          let city = "";
          let khoroo = "";
          let district = "";
          locations.map((location) => {
            if (
              location.location_id == parseInt(order.tradeshop_district, 10)
            ) {
              district = location.location_name;
            }
          });
          locations.map((location) => {
            if (location.location_id == parseInt(order.tradeshop_horoo, 10)) {
              khoroo = location.location_name;
            }
          });
          locations.map((location) => {
            if (location.location_id == parseInt(order.tradeshop_city, 10)) {
              city = location.location_name;
            }
          });
          try {
            note =
              JSON.parse(order.description)?.sort(
                (a, b) => a?.date - b?.date
              )?.[0]?.body || "";
          } catch (e) {}
          let lines = [];
          let rawTotal = 0;
          if (JSON.parse(order.raw_order)) {
            JSON.parse(order.raw_order).map((ro) => {
              rawTotal =
                rawTotal + parseInt(ro.quantity, 10) * parseInt(ro.price, 10) ||
                0;
            });
          }

          if (order.line && order.line.length > 0) {
            order.line
              .filter((e) => {
                if (Number(supSelect) === null) {
                  return e;
                }
                if (Number(supSelect) === 0) {
                  return e;
                }
                if (Number(supSelect) === Number(e.vendor)) {
                  return e;
                }
              })
              .map((line, idx) => {
                let template = {};
                let cat = getCategories(parseInt(line.product_type_id, 10));

                let productName = String(line.product_name.replaceAll(",", ""));
                console.log("supSelect", supSelect);
                if (supSelect == 948) {
                  supplierName = "Нүүдэл Жи ХХК";
                } else if (supSelect == 14033) {
                  supplierName = "Милл хаус ХХК";
                } else {
                  supplierName = supplierName;
                }

                if (props.userData.company_id === "|14014|") {
                  template = {
                    OrderNumber: String(orderId),
                    ProductName: String(productName),
                    Barcode: String(line.product_bar_code),
                    SKU: String(line.product_sku),
                    Brand: "",
                    Vendor: String(supplierName),
                    Register: String(RegisterNumber),
                    Qty: Number(line.quantity),
                    Price: Number(line.price),
                    Total: Number(line.quantity * line.price),
                    Taken: "",
                    Canceled: "",
                    Returned: "",
                    FinalTotal: Number(line.quantity * line.price),
                    CompletedAt: String(createdDate),
                    WhenToShip: String(shippingDate),
                    PaidAt: "",
                    ShippedAt: "",
                    ReceiverPhone: String(customerPhone),
                    ReceiverInfo: String(order.register),
                    ReceiverName: String(
                      order.business_name ? order.business_name : ""
                    ),
                    Branch: String(order?.tradeshop_name),
                    BusinessType: businessTypeName,
                    StateName: String(city),
                    District: String(district),
                    Quarter: String(khoroo),
                    Address: String(order.address),
                    LatestNote: String(note),
                    Status: String(orderStatusName),
                    Reason: "",
                    MainCategory: String(cat["main"]),
                    SubCategory: String(cat["sub"]),
                    SubSubCategory: String(cat["subsub"]),
                    OriginalTotal: Number(rawTotal),
                    CancelReason: String(reasondatainfo),
                    xtid: String(buram[0].user_id),
                    xtname: String(buram[0].first_name),
                    xtphone: String(buram[0].phone_number),
                    paymentBelen: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m1 !== undefined && idx === 0
                        ? orderdata.payment.m1
                        : 0
                    ),
                    paymentBank: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m2 !== undefined && idx === 0
                        ? orderdata.payment.m2
                        : ""
                    ),
                    paymentZeel: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m3 !== undefined && idx === 0
                        ? orderdata.payment.m3
                        : 0
                    ),
                    paymentLendMn: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m7 !== undefined && idx === 0
                        ? orderdata.payment.m7
                        : ""
                    ),
                    paymentStorePay: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m8 !== undefined && idx === 0
                        ? orderdata.payment.m8
                        : ""
                    ),
                    prePayment: Number(
                      orderdata !== "" && idx === 0
                        ? orderdata?.prePayment || ""
                        : ""
                    ),
                    tugeegch: String(
                      orderdata !== "" ? orderdata?.payment?.userName || "" : ""
                    ),
                    origin:
                      originData.find((origin) => origin.id === order.origin)
                        ?.name || "",
                  };
                } else if (props.userData.company_id === "|948|") {
                  const payMeth = [
                    { Id: 0, Name: "Дансаар" },
                    { Id: 1, Name: "Бэлнээр" },
                    { Id: 2, Name: "Зээлээр" },
                    { Id: 3, Name: "Бэлэн+Данс" },
                    { Id: 4, Name: "Бэлэн+Зээл" },
                    { Id: 5, Name: "Данс+Зээл" },
                  ];

                  template = {
                    OrderNumber: String(orderId),
                    ProductName: String(productName),
                    Barcode: String(line.product_bar_code),
                    SKU: String(line.product_sku),
                    Brand: "",
                    Vendor: String(supplierName),
                    Register: String(RegisterNumber),
                    Qty: Number(line.quantity),
                    Price: Number(line.price),
                    Total: Number(line.quantity * line.price),
                    Taken: "",
                    Canceled: "",
                    Returned: "",
                    FinalTotal: Number(line.quantity * line.price),
                    CompletedAt: String(createdDate),
                    WhenToShip: String(shippingDate),
                    PaidAt: "",
                    ShippedAt: "",
                    ReceiverPhone: String(customerPhone),
                    ReceiverInfo: String(order.register),
                    ReceiverName: String(
                      order.business_name ? order.business_name : ""
                    ),
                    Branch: String(order?.tradeshop_name),
                    BusinessType: businessTypeName,
                    StateName: String(city),
                    District: String(district),
                    Quarter: String(khoroo),
                    Address: String(order.address),
                    LatestNote: String(note),
                    Status: String(orderStatusName),
                    Reason: "",
                    MainCategory: String(cat["main"]),
                    SubCategory: String(cat["sub"]),
                    SubSubCategory: String(cat["subsub"]),
                    OriginalTotal: Number(rawTotal),
                    CancelReason: String(reasondatainfo),
                    tugeegchName: String(buram[0].first_name),
                    paymentMethod:
                      orderdata && orderdata["payment"]
                        ? payMeth.find(
                            (el) => el.Id === orderdata["payment"].paymentId
                          ).Name ?? ""
                        : "",
                    paymentBelen: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m1 !== undefined && idx === 0
                        ? orderdata.payment.m1
                        : ""
                    ),
                    paymentBank: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m2 !== undefined && idx === 0
                        ? orderdata.payment.m2
                        : ""
                    ),
                    paymentZeel: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m3 !== undefined && idx === 0
                        ? orderdata.payment.m3
                        : ""
                    ),
                    paymentLendMn: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m7 !== undefined && idx === 0
                        ? orderdata.payment.m7
                        : ""
                    ),
                    paymentStorePay: Number(
                      orderdata === ""
                        ? ""
                        : orderdata.payment?.m8 !== undefined && idx === 0
                        ? orderdata.payment.m8
                        : ""
                    ),
                    prePayment: Number(
                      orderdata !== "" && idx === 0
                        ? orderdata?.prePayment || ""
                        : ""
                    ),
                    tugeegch: String(
                      orderdata !== "" ? orderdata?.payment?.userName || "" : ""
                    ),
                    origin:
                      originData.find((origin) => origin.id === order.origin)
                        ?.name || "",
                  };
                } else {
                  
                  const payMeth = [
                    { Id: 0, Name: "Дансаар" },
                    { Id: 1, Name: "Бэлнээр" },
                    { Id: 2, Name: "Зээлээр" },
                    { Id: 3, Name: "Бэлэн+Данс" },
                    { Id: 4, Name: "Бэлэн+Зээл" },
                    { Id: 5, Name: "Данс+Зээл" },
                  ];

                  template = {
                    OrderNumber: String(orderId),
                    ProductName: String(productName),
                    Barcode: String(line.product_bar_code),
                    SKU: String(line.product_sku),
                    Brand: "",
                    Vendor: String(supplierName),
                    Register: String(RegisterNumber),
                    Qty: Number(line.quantity),
                    Price: Number(line.price),
                    Total: Number(line.quantity * line.price),
                    Taken: "",
                    Canceled: "",
                    Returned: "",
                    FinalTotal: Number(line.quantity * line.price),
                    CompletedAt: String(createdDate),
                    WhenToShip: String(shippingDate),
                    PaidAt: "",
                    ShippedAt: "",
                    ReceiverPhone: String(customerPhone),
                    ReceiverInfo: String(order.register),
                    ReceiverName: String(
                      order.business_name ? order.business_name : ""
                    ),
                    Branch: String(order?.tradeshop_name),
                    BusinessType: businessTypeName,
                    StateName: String(city),
                    District: String(district),
                    Quarter: String(khoroo),
                    Address: String(order.address),
                    LatestNote: String(note),
                    Status: String(orderStatusName),
                    Reason: "",
                    MainCategory: String(cat["main"]),
                    SubCategory: String(cat["sub"]),
                    SubSubCategory: String(cat["subsub"]),
                    OriginalTotal: Number(rawTotal),
                    CancelReason: String(reasondatainfo),
                    paymentBelen: Number(1),
                    paymentBank: Number(1),
                    paymentZeel: Number(1),
                    paymentLendMn: Number(1),
                    paymentStorePay: Number(1),
                    prePayment: Number(1),
                    tugeegch: String(),
                    origin:
                      originData.find((origin) => origin.id === order.origin)
                        ?.name || "",
                    paymentMethod:
                      orderdata && orderdata["payment"]
                        ? payMeth.find(
                            (el) => el.Id === orderdata["payment"].paymentId
                            ).Name ?? ""
                          : "",
                    hariutsagch: String(
                      orderdata !== "" ? orderdata?.payment?.userName || "" : ""
                    ),
                  };
                }

                csv.push(template);
              });
          } else {
            if (JSON.parse(order.raw_order)) {
              console.log(order.raw_order);
              JSON.parse(order.raw_order).map((ro) => {
                //let cat = getCategories(parseInt(ro.product_type_id, 10))
                //let temp = [orderId, ro.ProductID, 'n/a', 'n/a', '', supplierName, ro.Quantity, ro.Price, 'n/a', '', '', '', 'n/a', createdDate, shippingDate, '', '', customerPhone, order.register, (order.business_name ? order.business_name : ''), order.tradeshop_name, 'business type', city, district, khoroo, order.address, note, '', '', cat['main'], cat['sub'], cat['subsub'], rawTotal]
                //csv.push(temp)
                //console.log('366')
              });
            }
          }
        });

        output(csv, startDate + "_" + endDate);
        setStartDate("");
        setEndDate("");
        setExporting(false);
        orderCTX.setOrderReportUrl(false);
      });
  };
  useEffect(() => {
    //getOrders()
  }, []);
  const prepare = () => {
    setPreparing(true);
  };

  useEffect(() => {
    let initialSchemaCopy = [];
    initialSchema.map((initial) => {
      fieldsDataReport.map((fieldsData) => {
        if (
          initial.column.toLowerCase() === fieldsData.fieldName.toLowerCase()
        ) {
          if (fieldsData.show) {
            initialSchemaCopy.push(initial);
          }
        }
      });
    });
    setInitialSchema(initialSchemaCopy);
  }, [fieldsDataReport]);

  let renderHTML =
    foo && data && blah.length > 1 ? (
      <>
        <CSV data={blah} />
      </>
    ) : (
      <>
        <span id="close" onClick={() => orderCTX.setReport(false)}>
          Close
        </span>
        {orderCTX.orderReportUrl ? null : (
          <>
            {props.userData.company_id == "|948|" ? (
              <SelectCompany setSupSelect={setSupSelect} />
            ) : null}

            <div>
              <label style={{ fontSize: "12px", fontWeight: "400" }}>
                Эхлэх огноо
              </label>
              <input
                type="date"
                className="dateselect"
                id="date_start"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "400" }}>
                Дуусах огноо
              </label>
              <input
                type="date"
                className="dateselect"
                id="date_end"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            {isModal && (
              <Modal
                width={500}
                height={600}
                closeHandler={() => setIsModal(!isModal)}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "100%",
                    height: "100%",
                    padding: "20px 30px",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: "700" }}>
                      Field үүд сонгох
                    </h2>
                  </div>
                  <div className={css.content}>
                    {fieldsDataReport.map((field, index) => {
                      return (
                        <div className={css.singleField} key={index}>
                          <Checkbox
                            variant="primary"
                            checked={field.show}
                            onChange={(e) => {
                              setFieldsDataReport((prevFieldsData) => {
                                return prevFieldsData.map((item, idx) =>
                                  idx === index
                                    ? { ...item, show: e.target.checked }
                                    : item
                                );
                              });
                            }}
                          />
                          <label>{field.fieldName}</label>
                        </div>
                      );
                    })}
                  </div>
                  <div className={css.footer}>
                    <div className={css.left}>
                      <Button
                        variant="primary"
                        size="medium"
                        onClick={() => {
                          setIsModal(!isModal);
                          updateUser({ fieldsDataReport: "restart" });
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                    <div className={css.right}>
                      <Button
                        variant="secondary"
                        size="medium"
                        onClick={() => {
                          setIsModal(false);
                        }}
                      >
                        Цуцлах
                      </Button>
                      <Button
                        variant="primary"
                        size="medium"
                        onClick={() => {
                          exporter();
                          setIsModal(false);
                          updateUser({ fieldsDataReport });
                        }}
                      >
                        Татах
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </>
        )}

        <div className="margintop1rem">
          {exporting ? (
            <span>Түр хүлээнэ үү ... </span>
          ) : (
            <span
              className="btn-tech"
              onClick={() => {
                setIsModal(!isModal);
              }}
              style={{ fontSize: "14px", fontWeight: "600" }}
            >
              {orderCTX.orderReportUrl
                ? "Хураангүй тайлан бэлтгэх"
                : "Тайлан бэлтгэх"}
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
