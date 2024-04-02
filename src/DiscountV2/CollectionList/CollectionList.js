import React, { useEffect, useState, useContext } from "react";
import PromoHook from "../../Hooks/PromoHook";
import css from "./collectionlist.module.css";
import myHeaders from "../HeaderContent/HeaderContent";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState([]);
  const promoctx = useContext(PromoHook);

  const FetchCollection = () => {
    let url = `https://api2.ebazaar.mn/api/collection/get`;
    fetch(url, {
      method: "GET",
      headers: myHeaders,
    })
      .then((r) => r.json())
      .then((res) => {
        // console.log("res collection list", res.data);
        setCollections(res.data);
      })
      .catch((error) => {
        console.log("Collection list error", error);
      });
  };
  useEffect(() => {
    FetchCollection();
  }, []);
  // console.log("promoctx collection list", promoctx);
  const handleSubmit = (e) => {};
  const handleOnchange = (e) => {
    // console.log("e.target.value collectuion++++++++--------", e.target.value);
    setSelectedCollection(e.target.value);
    promoctx.setSelectedCollection(e.target.value);
  };
  //   console.log("selectedCollection", selectedCollection);
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h3>Коллекцийн төрөл сонголт</h3>
      </div>

      <div className={css.optioncontainer}>
        <form onSubmit={handleSubmit}>
          <select
            selectedCollection={selectedCollection}
            onChange={handleOnchange}
          >
            {collections.map((item, index) => {
              return (
                <option value={item._id} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </form>
      </div>
    </div>
  );
};

export default CollectionList;
