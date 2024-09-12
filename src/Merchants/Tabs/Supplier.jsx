import React from "react";
import css from "./supplier.module.css";
import { useEffect } from "react";
import { useState } from "react";
import myHeaders from "../../components/MyHeader/myHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import SupplierConfig from "./components/SupplierConfig";
import { Modal } from "../../components/common/Modal";
import SupplierList from "./components/SupplierList";

const Supplier = (props) => {
  const { orderEditPermission, userId, getNewData, includeSupplierList } =
    props;

  const [allSuppliers, setAllSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [modal, setModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [save, setSave] = useState(false);

  const [supplierIds, setSupplierIds] = useState([]);
  const [newRaw, setNewRaw] = useState();

  useEffect(() => {
    let permissionSup = [];
    supplierIds.map((sup) => {
      permissionSup.push({ [sup]: true });
    });

    const newRaw = permissionSup?.reduce((accumulator, currentValue) => {
      return { ...accumulator, ...currentValue };
    }, {});
    setNewRaw(newRaw);
  }, [supplierIds]);

  const handleSave = () => {
    let accepted = acceptedSuppliers.map((s) => s.id).join(",");
    let included =
      acceptedSuppliers.length > 0
        ? `${accepted},${props.includedConfig}`
        : `${props.includedConfig}`;
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        tradeshop: {
          TradeshopID: props.result.t_id,
          IncludeSupplierList: included,
          ExcludeSupplierList: props.excludedConfig.toString(),
        },
        business: {
          CustomerID: props.result.c_id,
          RegisterNo: props.result.c_register,
        },
      }),
      redirect: "follow",
    };
    console.log(included);

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/merchant/update`,
      requestOptions
    )
      .then((res) => {
        if (res.status === 200) {
          alert("Success");
          setSave(!save);
          setModal(false);
          const url = `${process.env.REACT_APP_API_URL2}/user`;
          const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({
              userId: userId,
              editPermission: Object.assign(
                {},
                newRaw,
                JSON.parse(orderEditPermission)
              ),
            }),
          };

          fetch(url, requestOptions)
            .then((res) => res.json())
            .then((response) => {
              if (response.message === "success") {
                alert(response.message, "permission");
                getNewData();
              } else {
                alert("error", response.message);
              }
            });
        } else {
          alert("Алдаа гарлаа");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleDelete = (id) => {
    let deleteIncluded = props.includedConfig.filter(
      (item) => item !== String(id)
    );
    let deleteExcluded = props.excludedConfig.filter(
      (item) => item !== String(id)
    );

    if (props.optionValue === "included") {
      props.setIncludedConfig(deleteIncluded);
      setIsDelete(!isDelete);
    } else if (props.optionValue === "excluded") {
      props.setExcludedConfig(deleteExcluded);
      setIsDelete(!isDelete);
    }

    if (isDelete) {
      if (props.optionValue === "included") {
        if (window.confirm("Устгахдаа итгэлтэй байна уу?")) {
          handleSave();
          props.setIncludedSuppId(deleteIncluded.toString());
        }
      } else if (props.optionValue === "excluded") {
        if (window.confirm("Устгахдаа итгэлтэй байна уу?")) {
          handleSave();
          props.setExcludedSuppId(deleteExcluded.toString());
        }
      }
    }
  };

  const handleOption = (e) => {
    props.setOptionValue(e.target.value);
    console.log(e.target.value);
    console.log(allSuppliers);
  };

  useEffect(() => {
    props.getSupplier();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`,
      requestOptions
    )
      .then((r) => r.json())
      .then((res) => {
        console.log("FETCH ALL: ", res.data);
        setAllSuppliers(res.data);
      });
  }, [props?.result?.t_id, save]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let fetchUrl = "";
    if (props.optionValue === "included" && props.includedSuppId.length > 0) {
      fetchUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${props.includedSuppId}`;
    } else if (props.optionValue === "excluded") {
      fetchUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers?id=${props.excludedSuppId}`;
    } else if (
      (props.includedSuppId === "" || props.includedSuppId === null) &&
      (props.excludedSuppId === "" || props.excludedSuppId === null) &&
      props.optionValue === "all"
    ) {
      fetchUrl = `${process.env.REACT_APP_API_URL2}/api/backoffice/suppliers`;
    }

    if (fetchUrl !== "") {
      fetch(fetchUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (props.optionValue === "excluded") {
            const filteredSuppliers = data.data.filter(
              (supplier) => !props.excludedSuppId.includes(supplier.id)
            );
            setSuppliers(filteredSuppliers);
          } else if (
            props.optionValue === "all" ||
            props.optionValue === "included"
          ) {
            setSuppliers(data.data);
          }
        })
        .catch((error) => console.error("ERROR: ", error));
    }
  }, [
    props.optionValue,
    props.includedSuppId,
    props.excludedSuppId,
    props.includedConfig,
    props.excludedConfig,
  ]);

  const acceptedSuppliers = props.includeSupplierList
    .split(",")
    .map((config) => suppliers.find((supp) => supp.id.toString() === config));

  return (
    <div className={css.container}>
      <div className={css.optionContainer}>
        <select value={props.optionValue} onChange={handleOption}>
          <option value="all">Бүх нийлүүлэгч</option>
          <option value="included">Зөвшөөрөгдсөн нийлүүлэгчид</option>
          <option value="excluded">Зөвшөөрөгдөөгүй нийлүүлэгчид</option>
        </select>
      </div>
      {props.optionValue !== "all" ? (
        <button
          className={css.addBtn}
          onClick={() => {
            setModal(true);
            console.log("BUTTON");
          }}
        >
          Нэмэх +
        </button>
      ) : null}

      <div className={css.suppsContainer}>
        {props.optionValue === "all" ? (
          <InfiniteScroll
            dataLength={suppliers.length}
            hasMore={true}
            loader={
              <p style={{ textAlign: "center" }}>
                <b>Уншиж байна...</b>
              </p>
            }
          >
            {allSuppliers?.map((e, idx) => (
              <SupplierList
                data={e}
                index={idx}
                key={idx}
                handleDelete={handleDelete}
                optionValue={props.optionValue}
              />
            ))}
          </InfiniteScroll>
        ) : acceptedSuppliers &&
          acceptedSuppliers.length > 0 &&
          props.optionValue === "included" ? (
          <InfiniteScroll dataLength={acceptedSuppliers.length} hasMore={true}>
            {acceptedSuppliers?.map((e, idx) => (
              <SupplierList
                data={e}
                index={idx}
                key={idx}
                handleDelete={handleDelete}
                optionValue={props.optionValue}
              />
            ))}
          </InfiniteScroll>
        ) : props.excludedSuppId !== "" &&
          suppliers.length > 0 &&
          props.optionValue === "excluded" ? (
          <InfiniteScroll
            dataLength={suppliers.length}
            hasMore={true}
            loader={
              <p style={{ textAlign: "center" }}>
                <b>Уншиж байна...</b>
              </p>
            }
          >
            {props.excludedSuppId !== "" &&
              suppliers?.map((e, idx) => (
                <SupplierList
                  data={e}
                  index={idx}
                  key={idx}
                  handleDelete={handleDelete}
                  optionValue={props.optionValue}
                />
              ))}
          </InfiniteScroll>
        ) : (
          <div>Хоосон байна</div>
        )}
      </div>
      {modal && (
        <Modal className={css.modalContainer} width={1400} height={800}>
          <SupplierConfig
            modal={modal}
            setModal={setModal}
            includedConfig={props.includedConfig}
            setIncludedConfig={props.setIncludedConfig}
            setIncludedSuppId={props.setIncludedSuppId}
            setExcludedSuppId={props.setExcludedSuppId}
            excludedConfig={props.excludedConfig}
            setExcludedConfig={props.setExcludedConfig}
            handleSave={handleSave}
            optionValue={props.optionValue}
            supplierIds={supplierIds}
            setSupplierIds={setSupplierIds}
          />
        </Modal>
      )}
    </div>
  );
};

export default Supplier;
