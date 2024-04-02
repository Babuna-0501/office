import React, { useState, useEffect } from "react";
import css from "./suppliersnew.module.css";

const SuppliersNew = (props) => {
  const [searchValue, setSearchValue] = useState(null);
  const [data, setData] = useState(null);
  const [searchModal, setSearchModal] = useState(false);

  const chooseHandler = (item) => {
    props.setSupplier(item.id);
    props.name(item.name);
    setSearchModal(false);
  };
  useEffect(() => {
    if (searchValue === null) {
      return;
    }
    if (searchValue !== null) {
      setSearchModal(true);
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
      fetch(
        `https://api2.ebazaar.mn/api/backoffice/suppliers?name=${searchValue}`,
        requestOptions
      )
        .then((r) => r.json())
        .then((response) => {
          // console.log("res--------------.", response);
          setData(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [searchValue]);
  return (
    <div className={css.container}>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {searchModal && (
        <div className={css.wrapper}>
          {data?.map((item, index) => {
            return (
              <p onClick={() => chooseHandler(item)} key={index}>
                {item.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SuppliersNew;
