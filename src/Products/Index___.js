import React, { useState, useEffect, useContext } from "react";
import Product from "./Product";
import Foo from "./Foo";
import MassImport from "./MassImport";
import readXlsxFile from "read-excel-file";

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo((props) => {
  let [state, setState] = useState({
    supplier: null,
    suppliers: [],
  });
  let sup = 0;
  let [mass, setMass] = useState(false);
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
        setState({ ...state, suppliers: response.data });
      })
      .catch((error) => console.log("error", error));
  }, []);
  let [scrolled, setScrolled] = useState(false);
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState([]);
  const isInViewport = (elem) => {
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
    getProducts(0, sup);
  }, []);
  useEffect(() => {
    document.getElementById("contents").addEventListener("scroll", loadMore);
    return () => {
      document
        .getElementById("contents")
        .removeEventListener("scroll", loadMore);
    };
  }, []);
  let foo = false;
  let bar = 0;
  const loadMore = () => {
    if (isInViewport(document.getElementById("blahblah"))) {
      if (foo === false) {
        foo = true;
        // console.log(state.supplier)
        getProducts(bar, sup);
      }
    }
  };
  const getProducts = (page = bar, supplier = null) => {
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
    // console.log(supplier);
    const url = `https://api2.ebazaar.mn/api/products/get1?page=${
      page + (supplier ? `&supplier=${supplier}` : "")
    }`;
    // console.log(url);
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        setData((data) => data.concat(response.data));
        // console.log(response.data);
        foo = false;
      })
      .catch((error) => console.log("error", error));
    bar = bar + 1;
  };
  const setSup = (supplierId) => {
    // console.log(supplierId);
    sup = supplierId;
    setState({ ...state, supplier: supplierId });
    setData([]);
    getProducts(0, sup);
  };
  let [massImportData, setMassImportData] = useState([]);
  const input = document.getElementById("input")
    ? document.getElementById("input")
    : null;
  if (input) {
    const schema = {
      price: {
        prop: "price",
        type: Number,
      },
      barcode: {
        prop: "barcode",
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
    };
    input.addEventListener("change", () => {
      readXlsxFile(input.files[0], { schema }).then((rows) => {
        setMassImportData(rows);
        // console.log(massImportData);
        //setMass(true)
      });
    });
  }
  const activeSupplier = 10;
  return data && state.suppliers ? (
    <div>
      {mass ? (
        <MassImport data={massImportData} suppliers={state.suppliers} />
      ) : null}
      <div className="displayflex alignitemscenter">
        <h1>Бүтээгдэхүүн</h1>
        <span className="rightaligned">
          <input type="file" id="input" />
        </span>
      </div>
      <table id="orders">
        <thead>
          <tr>
            <th>
              <span className="column-head">ID</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Visibility</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Нийлүүлэгч</span>
              <span className="sf">
                <select onChange={(e) => setSup(e.target.value)}>
                  <option>Бүх нийлүүлэгч</option>
                  {state.suppliers.map((sup, index) => {
                    return (
                      <option value={sup.id} key={index}>
                        {sup.name}
                      </option>
                    );
                  })}
                </select>
              </span>
            </th>
            <th>
              <span className="column-head">IMG</span>
              <span className="sf"></span>
            </th>
            <th className="products">
              <span className="column-head">SKU</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Barcode</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Product name</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Category</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Brand</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th>
              <span className="column-head">Price</span>
              <span className="sf">
                <input type="text" />
                <span></span>
              </span>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => {
            return <Product data={product} key={index} />;
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
