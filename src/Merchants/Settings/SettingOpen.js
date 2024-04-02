import React, { useState, useEffect } from "react";
import css from "./settingopen.module.css";
import closeicon from "../../assets/close.svg";
import Checkbox from "./Checkbox";
import myHeaders from "../../components/MyHeader/myHeader";
import Supplier from "./Supplier";

const maindata = [
  {
    id: 1,
    name: "Компонент",
  },
  {
    id: 2,
    name: "Нийлүүлэгч",
  },
];

const SettingOpen = (props) => {
  const [data, setData] = useState([
    { name: "Banner", checked: true, key: "Banner" },
    { name: "Supplier List", checked: true, key: "Supplier_List" },
    { name: "Product Categories", checked: true, key: "Product_Categories" },
    { name: "Featured Brands", checked: true, key: "FeaturedBrands" },
    { name: "Product Grid", checked: true, key: "Product_Grid" },
    { name: "Pickpack", checked: true, key: "Pickpack" },
    { name: "ImageList", checked: true, key: "ImageList" },
    { name: "Promo", checked: true, key: "Promo" },
  ]);

  const [switchdata, setSwitchdata] = useState(1);
  const [suppliers, setSuppliers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateCheckStatus = (index) => {
    setData(
      data.map((item, currentIndex) =>
        currentIndex === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://api2.ebazaar.mn/api/backoffice/suppliers`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.code === 200) {
          let aa = res.data.map((item) => {
            return {
              ...item,
              chosed: false,
            };
          });
          setSuppliers(aa);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  const SaveHandler = () => {
    let tradeids = JSON.parse(localStorage.getItem("merchantIDS"));

    if (tradeids.length === 0 || tradeids === null || tradeids === undefined) {
      alert("Та мерчантаа сонгоно уу");
      props.setOpen(false);
      return;
    }

    let supIDS = [];

    let datanew = {};
    data.map((item, i) => {
      datanew[item.key] = item.checked;
    });

    suppliers.map((item) => (item.chosed ? supIDS.push(item.id) : null));
    let headers = myHeaders;
    headers.cors = "no=-cors";

    var requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        merchantsIDS: tradeids,
        body: {
          components: datanew,
          suppliers: supIDS,
        },
      }),
      redirect: "follow",
    };
    console.log("requestOptions", requestOptions);
    fetch(`https://api2.ebazaar.mn/api/tradeshop/update`, requestOptions)
      .then((res) => {
        // console.log("res", res);
        if (res.code === 200) {
          alert("Амжилттай");
          props.setOpen(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setErrorMessage(error.message);
      });
  };
  useEffect(() => {
    if (errorMessage !== null) {
      let timer = setTimeout(() => {
        setErrorMessage(null);
      }, [1000]);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  return (
    <div className={css.container}>
      <div className={css.wrapper1}></div>
      <div className={css.wrapper2}>
        <div>
          <div className={css.header}>
            <span>Мерчантын тохиргоо</span>
            <img
              src={closeicon}
              alt="close button"
              onClick={() => {
                props.setOpen(false);
              }}
            />
          </div>
          {errorMessage !== null && (
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "red",
              }}
            >
              {errorMessage}
            </div>
          )}

          <div className={css.switchcontainer}>
            {maindata.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSwitchdata(item.id);
                  }}
                  style={{
                    borderBottom:
                      switchdata === item.id
                        ? "4px solid #2ab674"
                        : "2px solid #1a1a1a",
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          {switchdata === 1 && (
            <div>
              {data.map((item, index) => (
                <Checkbox
                  key={item.name}
                  isChecked={item.checked}
                  checkHandler={() => updateCheckStatus(index)}
                  label={item.name}
                  index={index}
                />
              ))}
            </div>
          )}
          {switchdata === 2 && (
            <div className={css.supwrapper}>
              {suppliers.length > 0
                ? suppliers.map((item, index) => {
                    return (
                      <Supplier
                        item={item}
                        key={index}
                        setSuppliers={setSuppliers}
                        suppliers={suppliers}
                      />
                    );
                  })
                : null}
            </div>
          )}
        </div>
        <div className={css.btncontainer}>
          <button onClick={SaveHandler}>Хадгалах</button>
        </div>
      </div>
    </div>
  );
};

export default SettingOpen;
