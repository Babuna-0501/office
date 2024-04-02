import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import myHeaders from "../../../components/MyHeader/myHeader";
import checkboxblack from "../../../assets/check box.svg";
import checkbox from "../../../assets/check box_black.svg";
import close from "../../../assets/close.svg";
import css from "./suppconfig.module.css";

const SupplierConfig = (props) => {
  const { supplierIds, setSupplierIds } = props;
  const [supps, setSupps] = useState([]);
  const [suppName, setSuppName] = useState("");

  const includedConfigID = props.includedConfig;
  const excludedConfigID = props.excludedConfig;

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://api2.ebazaar.mn/api/backoffice/suppliers?name=${suppName}`, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        // console.log("FETCH ALL: ", res.data);
        setSupps(res.data);
      });
  }, [suppName]);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.headerTitle}>Нийлүүлэгчийн тохиргоо</div>
        <div
          onClick={() => {
            props.setModal(false);
          }}
        >
          <img src={close} alt="close" />
        </div>
      </div>
      <div className={css.inputField}>
        <input
          type="search"
          placeholder="Хайх"
          onChange={(e) => {
            if (e.target.value === "") {
              setSuppName("");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSuppName(e.target.value);
            }
          }}
        />
      </div>
      <div className={css.body}>
        <InfiniteScroll
          dataLength={supps.length}
          hasMore={true}
          loader={
            <p style={{ textAlign: "center" }}>
              <b>Уншиж байна...</b>
            </p>
          }
        >
          {supps?.map((e, idx) => (
            <div
              key={idx}
              className={css.listContainer}
              style={
                (includedConfigID.includes(`${e.id}`) && props.optionValue === "included") ||
                (excludedConfigID.includes(`${e.id}`) && props.optionValue === "excluded")
                  ? { backgroundColor: "#88ff006d" }
                  : {}
              }
            >
              <div className={css.listGeneral}>
                <div className={css.listSingle}>
                  <div
                    onClick={() => {
                      if (props.optionValue === "included") {
                        props.setIncludedConfig([...includedConfigID, `${e.id}`]);
                        props.setExcludedConfig([]);
                        props.setExcludedSuppId("");
                        setSupplierIds([...supplierIds, e.id]);
                        console.log("IN");
                      } else if (props.optionValue === "excluded") {
                        props.setExcludedConfig([...excludedConfigID, `${e.id}`]);
                        props.setIncludedConfig([]);
                        props.setIncludedSuppId("");
                        console.log("EX");
                      }
                    }}
                  >
                    {/* || excludedConfigID.includes(${e.id}) */}
                    {(includedConfigID.includes(`${e.id}`) && props.optionValue === "included") ||
                    (excludedConfigID.includes(`${e.id}`) && props.optionValue === "excluded") ? (
                      <img
                        src={checkbox}
                        alt=""
                        className={css.addIcon}
                        onClick={() => console.log("ADD", e.name)}
                      />
                    ) : (
                      <img
                        src={checkboxblack}
                        alt=""
                        className={css.addIcon}
                        onClick={() => console.log("ADD", e.name)}
                      />
                    )}
                  </div>

                  <img src={e.media} alt="logo" />
                  <div className={css.listText}>{e.name}</div>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <div className={css.submit}>
        <div
          className={css.saveBtn}
          onClick={() => {
            props.handleSave();
          }}
        >
          SAVE
        </div>
      </div>
    </div>
  );
};

export default SupplierConfig;
