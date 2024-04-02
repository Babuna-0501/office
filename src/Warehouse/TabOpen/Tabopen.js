import React, { useState, useEffect, useContext } from "react";
import css from "./tabopen.module.css";
import OK_icon from "../../assets/OK 2.svg";
import OK_ICON_TWO from "../../assets/Component 92.svg";
import ListProduct from "../ListProduct";
import { styles } from "../style";
import LoadingSpinner from "../../components/Spinner/Spinner";
import Warehouseorlogo from "../Warehouseorlogo/Warehouseorlogo";
import ProductsReportHook from "../../Hooks/ProductsReportHook";

const Tabopen = (props) => {
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(0);
  const [ID, setID] = useState(null);
  const [nameSearch, setNameSearch] = useState(null);
  const [searchproducts, setSearchproducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchsku1, setSearchsku1] = useState(null);
  const [searchbarcode1, setSearchbarcode1] = useState(null);
  const [category, setCategory] = useState([]);
  const [onecategory, setOnecategory] = useState(null);

  const sitedatactx = useContext(ProductsReportHook);

  const data = [
    { id: 1, name: "Stock" },
    { id: 2, name: "Орлого" },
  ];

  useEffect(() => {
    let aa = sitedatactx.sitedata.categories.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setCategory(aa);
  }, []);

  return (
    <div className={css.container}>
      {page === 0 && (
        <div className={css.wrapper}>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className={active === index ? css.stock1 : css.stock}
                onClick={() => {
                  setActive(index);
                }}
              >
                <img src={active === index ? OK_icon : OK_ICON_TWO} />{" "}
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      )}
      {active === 0 && (
        <div style={{ ...styles.allWidthContainer, marginTop: "16px" }}>
          <div className={css.rowheader}>
            <div
              style={{
                ...styles.productwrapper1,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input type="checkbox" style={{ height: "20px" }} />
            </div>
            <div
              style={{
                ...styles.productwrapper2,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>ID</div>
              <div>
                <input
                  type="text"
                  placeholder="Хайх ..."
                  style={{ padding: "8px", fontSize: "12px" }}
                  onChange={(e) => setID(e.target.value)}
                />
              </div>
            </div>
            <div
              style={{
                ...styles.productwrapper3,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>Идэвхи</div>
            </div>
            <div
              style={{
                ...styles.productwrapper4,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>Зураг</div>
            </div>
            <div
              style={{
                ...styles.productwrapper5,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>Бүтээгдэхүүн нэр</div>
              <div>
                <input
                  type="text"
                  placeholder="Хайх ..."
                  style={{ padding: "8px", fontSize: "12px" }}
                  onChange={(c) => {
                    setNameSearch(c.target.value);
                    props.setNameSearch(c.target.value);
                  }}
                />
              </div>
            </div>
            <div
              style={{
                ...styles.productwrapper6,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>Ангилал</div>
              <div className={css.angilal}>
                <select
                  value={onecategory}
                  onChange={(e) => {
                    setOnecategory(e.target.value);
                    props.setSearchcategory(e.target.value);
                  }}
                >
                  <option>--Ангилал--</option>
                  {category &&
                    category.map((item) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                </select>
              </div>
            </div>
            <div
              style={{
                ...styles.productwrapper7,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>Үнэ</div>
            </div>
            <div
              style={{
                ...styles.productwrapper8,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>SKU</div>
              <div>
                {" "}
                <input
                  type="text"
                  placeholder="Хайх ..."
                  value={searchsku1}
                  style={{ padding: "8px", fontSize: "12px" }}
                  onChange={(c) => {
                    props.setSearchsku(c.target.value);
                    setSearchsku1(c.target.value);
                  }}
                />
              </div>
            </div>
            <div
              style={{
                ...styles.productwrapper9,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>Barcode</div>
              <div>
                {" "}
                <input
                  type="text"
                  placeholder="Хайх ..."
                  value={searchbarcode1}
                  style={{ padding: "8px", fontSize: "12px" }}
                  onChange={(c) => {
                    props.setSearchbarcode(c.target.value);
                    setSearchbarcode1(c.target.value);
                  }}
                />
              </div>
            </div>
            <div
              style={{
                ...styles.productwrapper10,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>Үлдэгдэл</div>
            </div>
            <div
              style={{
                ...styles.productwrapper11,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>Бараа татан авах</div>
            </div>
            <div
              style={{
                ...styles.productwrapper12,
                padding: "0px 8px",
                borderRight: "1px solid #CFD8DC",
              }}
            >
              <div className={css.bold}>Хөдөлгөөн</div>
            </div>
          </div>
          {loading ? (
            <div className={css.loading}>
              <LoadingSpinner />
            </div>
          ) : (
            <ListProduct
              categories={props.categories}
              searchproducts={props.searchproducts}
              ID={ID}
              nameSearch={nameSearch}
            />
          )}
        </div>
      )}
      {active === 1 && (
        <div style={{ ...styles.allWidthContainer, marginTop: "16px" }}>
          <Warehouseorlogo />
        </div>
      )}
    </div>
  );
};

export default Tabopen;
