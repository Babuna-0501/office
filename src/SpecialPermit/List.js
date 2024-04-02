import React, { useState } from "react";
import css from "./list.module.css";
import { Modal, message } from "antd";
import myHeaders from "../components/MyHeader/myHeader";

const List = (props) => {
  const [openAlco, setOpenAlco] = useState(false);
  const [type, setType] = useState();
  const [tradeshopId, setTradeShopId] = useState();
  const [tradeshopName, setTradeShopName] = useState();
  const [updatedData, setUpdatedData] = useState({});
  const [update, setUpdate] = useState(false);

  const save = () => {
    var raw = JSON.stringify({
      status: type,
      tradeshop_id: tradeshopId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    var requestOptionsGet = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://api2.ebazaar.mn/api/alcoholsale/status`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          message.success("Амжилттай илгээлээ");
          fetch(
            `https://api2.ebazaar.mn/api/tradeshop/files?tradeshop=${tradeshopId}`,
            requestOptionsGet
          )
            .then((res) => res.json())
            .then((response) => setUpdatedData(...response));
          setUpdate(true);
        } else {
          message.error("Алдаа гарлаа");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    setOpenAlco(false);
  };

  let content = (
    <div className={css.wrapper}>
      {props?.data?.map((e, i) => (
        <div className={`${css.container}`} key={i}>
          <div
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#37474F",
                width: "20%",
              }}
            >
              {e.file_id}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#37474F",
                width: "50%",
              }}
            >
              {e?.created_date?.slice(0, 10)}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#37474F",
                width: "50%",
              }}
            >
              {e.tradeshop_id}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#37474F",
                width: "100%",
              }}
            >
              {e.tradeshop_name}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#37474F",
                width: "100%",
              }}
            >
              {e.tradeshop_phone}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#37474F",
                width: "50%",
              }}
            >
              {e.tradeshop_register}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#37474F",
                width: "100%",
              }}
            >
              {e.document_description}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#37474F",
                width: "20%",
              }}
            >
              {e.document_status}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#37474F",
                width: "100%",
              }}
            >
              {e.document_image.split(",").map((a, i) => (
                <img
                  src={a.replace("large", "small")}
                  alt=""
                  key={i}
                  height={30}
                  width={40}
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    props.setSelected(a);
                    props.setOpen(true);
                  }}
                />
              ))}
            </span>
            <span>
              <div
                className={css.general}
                // style={{
                //   ...styles.licenceContainer,
                // }}
                onClick={() => {
                  setOpenAlco(true);
                  setTradeShopId(e.tradeshop_id);
                  setTradeShopName(e.tradeshop_name);
                }}
              >
                {(
                  update && updatedData.tradeshop_id === e.tradeshop_id
                    ? updatedData.tradeshop_alcohol === 1
                    : e.tradeshop_alcohol === 1
                ) ? (
                  <div
                    style={{
                      width: "85px",
                      borderRadius: "5px",
                      textAlign: "center",
                      color: "#389e0d",
                      background: "#f6ffed",
                      border: "1px solid #b7eb8f",
                      fontSize: "14px",
                    }}
                  >
                    Зөвшөөрсөн
                  </div>
                ) : (
                    update && updatedData.tradeshop_id === e.tradeshop_id
                      ? updatedData.tradeshop_alcohol === 2
                      : e.tradeshop_alcohol === 2
                  ) ? (
                  <div
                    style={{
                      width: "85px",
                      borderRadius: "5px",
                      textAlign: "center",
                      color: "#0958d9",
                      background: "#e6f4ff",
                      border: "1px solid #91caff",
                      fontSize: "14px",
                    }}
                  >
                    Илгээгээгүй
                  </div>
                ) : (
                    update && updatedData.tradeshop_id === e.tradeshop_id
                      ? updatedData.tradeshop_alcohol === 3
                      : e.tradeshop_alcohol === 3
                  ) ? (
                  <div
                    style={{
                      width: "85px",
                      borderRadius: "5px",
                      textAlign: "center",
                      color: "#d48806",
                      background: " #fffbe6",
                      border: "1px solid #ffe58f",
                      lineHeight: "16px",
                      fontSize: "14px",
                    }}
                  >
                    Хянагдаж байгаа
                  </div>
                ) : (
                  <div
                    style={{
                      width: "85px",
                      borderRadius: "5px",
                      textAlign: "center",
                      color: "#cf1322",
                      background: "#fff1f0",
                      border: "1px solid #ffa39e",
                      fontSize: "14px",
                    }}
                  >
                    Татгалзсан
                  </div>
                )}
              </div>
            </span>
          </div>
        </div>
      ))}
      <Modal
        title={
          <div
            style={{
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            Тусгай зөвшөөрөл - {tradeshopName}
          </div>
        }
        centered
        open={openAlco}
        onOk={() => {
          save();
        }}
        onCancel={() => setOpenAlco(false)}
        width="400px"
        okText={"Хадгалах"}
        cancelText={"Цуцлах"}
        bodyStyle={{ padding: "5px 30px" }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <input
              type="radio"
              name="type"
              // value={type}
              checked={type === 1}
              onChange={() => setType(1)}
              style={{
                marginRight: "5px",
              }}
            />
            Зөвшөөрсөн
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <input
              type="radio"
              name="type"
              // value={type}
              checked={type === 2}
              onChange={() => setType(2)}
              style={{
                marginRight: "5px",
              }}
            />
            Илгээгээгүй
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <input
              type="radio"
              name="type"
              // value={type}
              checked={type === 3}
              onChange={() => setType(3)}
              style={{
                marginRight: "5px",
              }}
            />
            Хянагдаж байгаа
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <input
              type="radio"
              name="type"
              // value={type}
              checked={type === 4}
              onChange={() => setType(4)}
              style={{
                marginRight: "5px",
              }}
            />
            Татгалзсан
          </div>
        </div>
      </Modal>
    </div>
  );
  return <div className={css.listcontainer}>{content}</div>;
};

export default List;
