import React, { useState, useEffect } from "react";
import Order from "./Order";
import { CSVLink, CSVDownload } from "react-csv";
import Report from "./Report";
import ReportSecond from "./ReportSecond";

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo((props) => {
  let filters = {
    supplier: null,
    createddate: null,
  };
  useEffect(() => {
    // console.log("foobarblah");
    getOrders(state);
  }, []);
  let filterby = {
    supplier: (supplierId) => {
      // console.log(supplierId);
      filters.supplier = supplierId;
      //setState({...state, supplier: supplierId})
      getOrders(null, null, []);
    },
  };
  let [state, setState] = useState({
    data: [],
    supplier: null,
    createddate: null,
  });
  let activeSupplier = null;
  let filterByShippingDate = null;
  let [suppliers, setSuppliers] = useState(null);
  const setSupplier = (supplierId) => {
    getOrders(null, null, [], supplierId);
  };
  let [orders, setOrders] = useState([]);
  let [filterByCreatedDate, setFilterByCreatedDate] = useState(null);
  let [report, setReport] = useState(false);
  let [reportSecond, setReportSecond] = useState(false);
  let [locations, setLocations] = useState(null);
  let [categories, setCategories] = useState(null);
  let foo = false;
  let bar = 0;
  let [scrolled, setScrolled] = useState(false);
  let [loading, setLoading] = useState(false);
  let [products, setProducts] = useState([]);
  const loadMore = () => {
    if (
      isInViewport(document.getElementById("blahblah")) &&
      filterByCreatedDate === null
    ) {
      if (foo === false && filterByCreatedDate === null) {
        // console.log(filterByCreatedDate);
        foo = true;
        getOrders(null, bar, orders, activeSupplier);
      }
    }
  };
  var isInViewport = (elem) => {
    var bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://api2.ebazaar.mn/api/suppliers/get`, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => console.log("error", error));
    getOrders(null, null, orders, activeSupplier);
  }, []);
  useEffect(() => {
    fetch("https://api.ebazaar.mn/api/site_data")
      .then((r) => r.json())
      .then((response) => {
        setLocations(response.location);
        setCategories(response.categories);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    document.getElementById("contents").addEventListener("scroll", loadMore);
    return () => {
      document
        .getElementById("contents")
        .removeEventListener("scroll", loadMore);
    };
  }, []);
  const getOrders = (
    paramCreatedDate = null,
    paramPage = null,
    paramOrders,
    activeSupplier = null,
    filterShippingDate = null
  ) => {
    // console.log(state);
    let d = [];
    var myHeaders = new Headers();
    myHeaders.append(
      "ebazaar_token",
      localStorage.getItem("ebazaar_admin_token")
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const createdDate = paramCreatedDate ? `&date=${paramCreatedDate}` : "";
    //const parameterSupplier = activeSupplier ? '&supplier_id=' + activeSupplier : ''
    let url = `https://api2.ebazaar.mn/api/orders?order_type=1&order_by=created_desc&page=${
      bar + createdDate
    }`;
    url = state.supplier ? url + "&supplier_id=" + state.supplier : url;
    // console.log(url);
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        let foobar = paramOrders.concat(response.data);
        setOrders(foobar);
        setScrolled(false);
        foo = false;
      })
      .catch((error) => console.log("error", error));
    bar = bar + 1;
  };
  const up = () => {
    const id = randomId();
    document
      .getElementById("root")
      .insertAdjacentHTML(
        "beforeEnd",
        '<form method="post" enctype="multipart/form‐data" id="' +
          id +
          '" name=' +
          id +
          '><input type="file" id="uploader' +
          id +
          '" multiple /></form>'
      );
    document.getElementById("uploader" + id).click();
    document
      .getElementById("uploader" + id)
      .addEventListener("change", () => upload(id), false);
  };
  const randomId = () => {
    return (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
  };
  const upload = (form) => {
    const uploader = document.getElementById("uploader" + form);
    var fileField = document.getElementById("uploader" + form);
    let formData = new FormData();
    for (let i = 0; i < uploader.files.length; i++) {
      // console.log(fileField.files[i]);
      formData.append(i, fileField.files[i]);
    }

    var myHeaders = new Headers();
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      "http://ec2-18-166-193-244.ap-east-1.compute.amazonaws.com/upload/upload.php",
      requestOptions
    )
      .then((r) => r.text())
      .then((response) => {
        console.log("received respones");
        // console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    /*fetch('http://ec2-18-166-193-244.ap-east-1.compute.amazonaws.com/upload/upload.php', {method: 'post', body: formData, mode: 'no-cors'}).
        then(r => r.text()).
        then(response => {
            console.log('received respones')
            console.log(response)
        })
        document.getElementById(form).remove()*/
  };
  const csvData = [];
  const getLocation = (locationId) => {
    locations.map((location) => {
      if (location.location_id === locationId) {
        return location.location_name;
      }
    });
  };
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
  if (orders.length > 0 && locations) {
    orders.map((order) => {
      const orderId = order.order_id;
      const supplierName = order.supplier_name;
      const customerPhone = order.phone;
      const customerAddress = order.address;
      const createdDate = order.order_date
        ? order.order_date.substr(0, 10)
        : "";
      const shippingDate = order.delivery_date
        ? order.delivery_date.substr(0, 10)
        : "";
      let note = "";
      let city = "";
      let khoroo = "";
      let district = "";
      locations.map((location) => {
        if (location.location_id == parseInt(order.tradeshop_district, 10)) {
          district = location.location_name;
        }
      });
      locations.map((location) => {
        if (location.location_id == parseInt(order.tradeshop_khoroo, 10)) {
          khoroo = location.location_name;
        }
      });
      locations.map((location) => {
        if (location.location_id == parseInt(order.tradeshop_city, 10)) {
          city = location.location_name;
        }
      });
      try {
        note = JSON.parse(order.description)[0].body;
      } catch (e) {}
      if (order.line && order.line.length > 0) {
        order.line.map((line) => {
          let cat = getCategories(parseInt(line.product_type_id, 10));
          let temp = [
            orderId,
            line.product_name,
            line.product_bar_code,
            line.product_sku,
            "",
            supplierName,
            line.quantity,
            line.price,
            line.quantity + line.price,
            "",
            "",
            "",
            line.quantity + line.price,
            createdDate,
            shippingDate,
            "",
            "",
            customerPhone,
            order.register,
            order.business_name ? order.business_name : "",
            order.tradeshop_name,
            "business type",
            city,
            district,
            khoroo,
            order.address,
            note,
            "",
            "",
            cat["main"],
            cat["sub"],
            cat["subsub"],
          ];
          csvData.push(temp);
        });
      }
      return order.line ? (
        <Order data={order} key={order.order_id} getOrders={getOrders} />
      ) : null;
    });
  }
  const filter = (d) => {
    // console.log(d);
    bar = 0;
    setFilterByCreatedDate(d);
    setTimeout(() => {
      getOrders(d, null, []);
    }, 2000);
  };
  const blahblah = (d) => {
    filterByShippingDate = d;
    getOrders(null, null, [], null, d);
  };
  return orders && locations && suppliers && categories ? (
    <div>
      <div className="displayflex alignitemscenter">
        <h1>Захиалга</h1>
        <span className="rightaligned">
          <span className="btn" onClick={() => setReportSecond(true)}>
            Altansuvd & Nomin
          </span>
          <span className="btn" onClick={() => setReport(true)}>
            Тайлан татах
          </span>
        </span>
      </div>
      {report ? (
        <Report
          close={setReport}
          locations={locations}
          categories={categories}
        />
      ) : null}
      {reportSecond ? (
        <ReportSecond
          close={setReportSecond}
          locations={locations}
          categories={categories}
        />
      ) : null}
      <button onClick={() => up()} style={{ display: "none" }}>
        Import
      </button>
      <div style={{ display: "none" }}></div>
      <table id="orders" key={Math.random()}>
        <thead>
          <tr>
            <th>
              <span className="column-head">Захиалгын дугаар</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Нийлүүлэгч</span>
              <span className="sf">
                <select onChange={(e) => filterby.supplier(e.target.value)}>
                  <option>Бүх нийлүүлэгч</option>
                  {suppliers.map((sup) => {
                    return <option value={sup.id}>{sup.name}</option>;
                  })}
                </select>
              </span>
            </th>
            <th className="products">
              <span className="column-head">Бараанууд</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Төлөв</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Үнийн дүн</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Тэмдэглэл</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Утас</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Үйлчилгээний цэг</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Хаяг</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Үүссэн огноо</span>
              <span className="sf">
                <input type="date" onChange={(e) => filter((e) => e)} />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Хүргүүлэх огноо</span>
              <span className="sf">
                <input type="date" onChange={(e) => blahblah(e.target.value)} />
                <span></span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return order.line ? (
              <Order data={order} key={Math.random()} getOrders={getOrders} />
            ) : null;
          })}
          <tr id="blahblah"></tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div>Түр хүлээнэ үү ...</div>
  );
}, areEqual);

export default Index;
