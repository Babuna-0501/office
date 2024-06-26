import React, { useState, useEffect } from "react";
import css from "./warehouse.module.css";
import closeicon from "../assets/close.svg";
import checkedsvg from "../assets/Tick Square on 2.svg";
import uncheckedsvg from "../assets/Tick Square.svg";
import myHeaders from "../components/MyHeader/myHeader";

const Warehouse = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [userData, setUserData] = useState([]);

  const [inventorydata, setInventorydata] = useState([]);

  useEffect(() => {
    const getInventories = async () => {
      try {
        const url = `https://api2.ebazaar.mn/api/warehouse/get/new`;
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const res = await fetch(url, requestOptions);
        const resData = await res.json();

        setInventorydata(resData.data);
      } catch (error) {
        console.log(error);
      }
    };

    getInventories();
  }, []);

  useEffect(() => {
    setData(inventorydata);
    let dd = [];
    inventorydata.map((item) => {
      dd.push(false);
    });

    let data = [];
    if (props.data.inventory) {
      if (props.data.inventory.length > 25) {
        let aa = props.data.inventory.split(",");
        data = aa;
      } else {
        data = props.data.inventory;
      }
    }

    setUserData(data);
  }, [props]);
  const Checkhandler = (item, index) => {
    ////// Checked - busad code

    if (userData.includes(item._id)) {
      let aa = userData.filter((x) => x !== item._id);
      setUserData(aa);
    } else {
      console.log("hi", typeof userData);
      let aa = [];

      if (typeof userData == "string") {
        aa.push(userData);
      } else {
        aa = [...userData];
      }

      console.log("aa", aa);
      setUserData((prev) => [...aa, item._id]);
    }
  };
  const SaveHandler = () => {
    let rawData = JSON.stringify({
      user_id: props.data.user_id,
      inventory: userData ? userData.toString() : null,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: rawData,
    };
    console.log("requestOptions", requestOptions);
    let url = `https://api2.ebazaar.mn/api/backoffice/update_users`;

    fetch(url, requestOptions)
      .then((rs) => rs.json())
      .then((res) => {
        // console.log("res", res);

        if (res.code === 200) {
          let data = props.worksdata;
          data = data.map((item) => {
            if (item.user_id === props.data.user_id) {
              return {
                ...item,
                inventory: userData ? userData.toString() : null,
              };
            }
            return item;
          });
          props.setWorksdata(data);
          props.setAguulahOpen(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {page === 1 && (
          <div className={css.headermain}>
            <div className={css.header}>
              <span>
                Худалдааны төлөөлөгчийн нэрс : {props.data.first_name}
              </span>
              <img
                src={closeicon}
                alt="close icon"
                onClick={() => {
                  props.setAguulahOpen(false);
                }}
              />
            </div>
            <div className={css.body}>
              <div className={css.subheader}>
                <div
                  style={{
                    width: "50px",
                  }}
                >
                  ID
                </div>
                <div
                  style={{
                    width: "150px",
                  }}
                >
                  ХТ нэр
                </div>
              </div>
              <div className={css.subbody}>
                {inventorydata.map((item, index) => {
                  return (
                    <div className={css.subaguulah}>
                      <div
                        style={{
                          width: "50px",
                        }}
                      >
                        <img
                          src={
                            data.includes(item._id) === true
                              ? checkedsvg
                              : uncheckedsvg
                          }
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                          onClick={() => Checkhandler(item, index)}
                        />
                      </div>
                      <div
                        style={{
                          width: "150px",
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {page === 2 && (
          <div className={css.headermain}>
            <div className={css.header}>
              <span>
                Худалдааны төлөөлөгчийн нэрс : {props.data.first_name}
              </span>
              <img
                src={closeicon}
                alt="close icon"
                onClick={() => {
                  props.setAguulahOpen(false);
                }}
              />
            </div>
            <div className={css.body}>
              <div className={css.subheader}>
                <div
                  style={{
                    width: "50px",
                  }}
                >
                  ID
                </div>
                <div
                  style={{
                    width: "150px",
                  }}
                >
                  Агуулахын нэр
                </div>
              </div>
              <div className={css.subbody}>
                {inventorydata &&
                  inventorydata.map((item, index) => {
                    return (
                      <div className={css.subaguulah}>
                        <div
                          style={{
                            width: "50px",
                          }}
                        >
                          <img
                            src={
                              userData.includes(item._id) === true
                                ? checkedsvg
                                : uncheckedsvg
                            }
                            style={{
                              width: "25px",
                              height: "25px",
                            }}
                            onClick={() => Checkhandler(item, index)}
                          />
                        </div>
                        <div
                          style={{
                            width: "150px",
                          }}
                        >
                          {item.name}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        <div className={css.footer}>
          <button
            className={css.cancel}
            onClick={() => {
              props.setAguulahOpen(false);
            }}
          >
            Цуцлах
          </button>
          <button className={css.confirm} onClick={SaveHandler}>
            {" "}
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
