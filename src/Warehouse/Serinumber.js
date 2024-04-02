import React, { useState, useEffect, useContext } from "react";
import AppHook from "../Hooks/AppHook";
import css from "./serinumber.module.css";
import closeIcon from "../assets/close.svg";
import myHeaders from "../components/MyHeader/myHeader";
import Products from "./Products/Products";
import BaraaTatah from "./SeriNumber/BaraaTatah";

const pageData = [
  { id: 1, name: "Бүтээгдэхүүн сонгох" },
  { id: 2, name: "Бүтээгдэхүүн татах" },
];

const Serinumber = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [rawdata, setRawdata] = useState([]);
  const [page, setPage] = useState(1);
  const appctx = useContext(AppHook);

  const CloseHandler = () => {
    // console.log("psetrops", props);

    if (page === 2) {
      setPage(1);
      appctx.setNote("");
      appctx.setPadaanNote("");
    }
    if (page === 1) {
      props.setShowOpen(false);
      appctx.setNote("");
      appctx.setPadaanNote("");
    }
  };

  useEffect(() => {
    if (page === 2) {
      let aa = products.filter((x) => x.chosed);
      setFilteredProducts(aa);
    }
  }, [page]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://api2.ebazaar.mn/api/products/get1?supplier=${props.data.supplier_id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let products = res.data.map((item) => {
          return {
            ...item,
            chosed: false,
            requestedQuantity: "",
            seriesNumber: "",
            manufacturedDate: "",
            expireDate: "",
            willExpire: true,
            randID: Math.random(),
          };
        });
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);
  const ContinueHandler = () => {
    if (page === 1) {
      let selectedProducts = products.filter((x) => x.chosed);
      if (selectedProducts.length === 0) {
        alert("Та бүтээгдэхүүнээ сонгоно уу");
      } else {
        setPage(2);
      }
    }
  };
  const SaveHandler = () => {
    let products = [];
    let rawObj = {};
    let expire = false;
    if (rawdata.length === 0) {
      alert("Татан авах бараа байхгүй байна");
      return;
    }
    rawdata.map((item) => {
      expire = false;
      if (item.requestedQuantity === "") {
        alert("Та татан авах тоогоо оруулна уу");
        expire = true;
        return;
      }
      if (item.seriesNumber === "") {
        alert("Та сери дугаар оруулна уу");
        expire = true;
        return;
      }
      if (item.manufacturedDate === "") {
        alert("Та үйлдвэрлэсэн огноо оруулна уу");
        expire = true;
        return;
      }
      products.push({
        productId: item._id,
        quantity: item.requestedQuantity,
        requestedQuantity: item.requestedQuantity,
        seriesNumber: item.seriesNumber,
        manufacturedDate: item.manufacturedDate,
        willExpire: item.willExpire,
      });
    });
    if (expire) {
      return;
    }
    rawObj["documentId"] = appctx.padaanNote ? appctx.padaanNote : "";
    rawObj["note"] = appctx.note ? appctx.note : "Агуулахын орлогдолт";
    rawObj["supplierId"] = props.data.supplier_id;
    rawObj["type"] = props.data.origin ? props.data.origin : 1;
    rawObj["to"] = props.data._id;
    rawObj["products"] = products;
    // console.log("Rawdata", rawdata);
    // console.log("props.data", props);
    // console.log("rawobject", rawObj);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(rawObj),
      redirect: "follow",
    };
    console.log("requestOptions", requestOptions);
    fetch(`https://api2.ebazaar.mn/api/shipment/create`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log("req", res);
        if (res.code === 200) {
          setProducts([]);
          setFilteredProducts([]);
          appctx.setNote("");
          appctx.setPadaanNote("");
          props.setShowOpen(false);
          alert(res.message);
        }
      })
      .catch((error) => {
        alert(`Алдаа гарлаа. ${error.message}`);
      });
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div>
          <div className={css.header}>
            <span></span>
            <img src={closeIcon} onClick={CloseHandler} alt="close icon" />
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {pageData.map((item) => {
              return (
                <div
                  onClick={() => {
                    // setPage(item.id);
                  }}
                  style={{
                    borderBottom:
                      page === item.id
                        ? "3px solid #2AB674"
                        : "1px solid #F2F2F2",
                    display: page !== item.id ? "none" : "flex",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#1A1A1A",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {page === 1 && products ? (
          <Products
            products={products}
            data={props.data}
            setProducts={setProducts}
          />
        ) : null}
        {page === 2 && (
          <BaraaTatah products={filteredProducts} setRawdata={setRawdata} />
        )}

        <div className={css.btncontainer}>
          <button className={css.cancel} onClick={CloseHandler}>
            Цуцлах
          </button>
          <button
            className={css.confirm}
            onClick={page === 1 ? ContinueHandler : SaveHandler}
          >
            {page === 1 ? "Үргэлжлүүлэх" : "Хадгалах"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Serinumber;
