import React, { useEffect, useState, useContext } from "react";

import css from "./list.module.css";
import settingIcon from "../assets/Setting.svg";
import deleteIcon from "../assets/delete_red_small.svg";
import { Popconfirm, Switch } from "antd";
import myHeaders from "../components/MyHeader/myHeader";
import { styles } from "./style";

const text = "Та устгахдаа итгэлтэй байна уу?";

const List = (props) => {
  const [data, setData] = useState([]);
  const [chechedValue, setCheckedValue] = useState(false);

  // console.log("props tdays search", props.suppliers);

  useEffect(() => {
    let controller = new AbortController();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      signal: controller.signal,
    };

    let url = `https://api2.ebazaar.mn/api/calendar/get`;
    url = props.searchDate ? url + `?name=${props.searchDate}` : url;
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        console.log("response++++++++++++------------", response);
        setData(response.result);
        controller = null;
      })
      .catch((error) => console.log("error", error));
    return () => controller?.abort();
  }, [props]);

  const checkedHandler = (e) => {
    setCheckedValue(e.target.checked);
  };
  const updateHandler = (item, index) => {
    // console.log("updatehandler", item);
    if (item.is_active === 0) {
      alert("Та идэвхтэй болгож байж засварлах хэрэгтэй.");
      return;
    }

    props.tdaysctx.setUpdateProduct(item);
    props.setUpdateModal(true);
  };
  const confirm = (id, supId) => {
    // console.log("id", id);
    let rawData = JSON.stringify({ supplier: supId, calendarId: id });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: rawData,
    };
    console.log("calendar delete requestoptions", requestOptions);
    let url = `https://api2.ebazaar.mn/api/calendar/delete`;
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        console.log("response calendar delete", response);
        if (response.code === 200) {
          let aa = data;
          let bb = aa.filter((item) => item.id === id);
          bb[0].supplier = 13873;
          setData([...aa, ...bb]);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const showHandler = (item) => {
    // console.log("item", item);
    let rawData;
    if (item.is_active === 1) {
      rawData = JSON.stringify({
        id: item.id,
        is_active: "0",
      });
    } else {
      rawData = JSON.stringify({
        id: item.id,
        is_active: 1,
      });
    }
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: rawData,
    };

    let url = `https://api2.ebazaar.mn/api/calendar/update`;
    fetch(url, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        // console.log("response", response);
        if (response.code === 200) {
          let oldData = data;

          oldData = oldData.filter((x) => {
            if (x.id === item.id) {
              let a = x.is_active === 0 ? 1 : 0;
              // console.log("a", a);
              x.is_active = a;
              // console.log("x-----", x);
              // aaa.push(x);
              return {
                ...x,
              };
            }
          });
          // console.log("olddata", oldData);
          setData([...data]);
        }
      })
      .catch((error) => console.log("error", error));
  };

  let content =
    data &&
    data?.map((tx, index) => {
      // console.log("text", tx);
      let zonenames = [];
      let aa;
      aa = tx.createdDate ? tx.createdDate.split("T")[0] : null;
      // console.log("props.zonectx", props.zonectx);
      let bb;
      props.suppliers.map((item) => {
        if (item.id === tx.supplier) {
          bb = item.name;
          // console.log("item.name", item.name);
        }
      });
      // console.log("bb", bb);
      props.zonectx.zonedata?.map((item) => {
        if (tx.zone) {
          // console.log("tx.zone", tx.zone);

          tx.zone.map((x) => {
            if (x === item._id) {
              zonenames.push(item.name);
            }
          });
        }
      });
      // console.log("tx", tx);

      return (
        <div className={css.container} key={index}>
          <div className={css.inputContainer} style={styles.checkboxcontainer}>
            <input
              type="checkbox"
              onChange={checkedHandler}
              value={chechedValue}
            />{" "}
          </div>
          <div
            style={styles.zonescontainer}
            // onClick={() => updateHandler(tx.id, index)}
          >
            <span className={css.spantext}>
              {zonenames ? zonenames.join(", ") : ""}
            </span>
          </div>
          <div
            style={{
              ...styles.showcontainer,
              display: "flex",
              marginRight: "10px",
            }}
          >
            <span onClick={() => showHandler(tx)}>
              {Number(tx.is_active) === 0 ? (
                <img src="https://admin.ebazaar.mn/media/off.svg" alt="zurag" />
              ) : (
                <img src="https://admin.ebazaar.mn/media/on.svg" alt="zurag" />
              )}
            </span>
          </div>
          <div style={{ ...styles.tugeeltiinContainer }}>
            <span className={css.spantext}>{tx.name ? tx.name : null}</span>
          </div>
          <div style={styles.supplierContainer}>
            <span className={css.spantext}>{bb}</span>
          </div>
          <div style={styles.createdcontainer}>
            <span className={css.spantext}>{aa}</span>
          </div>
          <div style={styles.createdUser}>
            <span className={css.spantext} title={tx.created_by}>
              {tx.created_by}
            </span>
          </div>
          <div style={styles.updatedUser}>
            <span className={css.spantext} title={tx.updated_by}>
              {tx.updated_by}
            </span>
          </div>
          <div style={styles.fixContainer}>
            <div className={css.iconContainer}>
              <img src={settingIcon} onClick={() => updateHandler(tx, index)} />
              <Popconfirm
                placement="right"
                title={text}
                onConfirm={() => confirm(tx.id, tx.supplier)}
                okText="Тийм"
                cancelText="Үгүй"
              >
                <img src={deleteIcon} />
              </Popconfirm>
            </div>
          </div>
        </div>
      );
    });
  // console.log("content", content);
  return <div className={css.wrapper}>{content}</div>;
};

export default List;
