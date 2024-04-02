import React, { useEffect, useState, useContext } from "react";
import myHeaders from "../../components/MyHeader/myHeader";
import css from "./productcomponent.module.css";
import { styles } from "./style";
import SMSHook from "../../Hooks/SMSHook";
import Product from "./Product";
import editIcon from "../../assets/Edit_icon.svg";
import Header from "./Header";
import MultiProducts from "./MultiProducts";

const Productcomponent = (props) => {
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [supplier, setSupplier] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [sku, setSku] = useState(null);
  const [productid, setProductid] = useState(null);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState(null);
  const [productsave, setProductsave] = useState(false);
  const [btnmodified, setBtnmodified] = useState(false);

  const [brand, setBrand] = useState(null);

  const [proIDS, setProIDS] = useState([]);

  const [supIDS, setSupIDS] = useState(null);
  const [catIDS, setCatIDS] = useState(null);
  const [brandIDS, setBrandIDS] = useState(null);
  const [supplierData, setSupplierData] = useState([]);
  let smsctx = useContext(SMSHook);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let params = "";
    if (supplier !== null) {
      params += `supplier=${supplier}&`;
    }
    if (search && search.length >= 3) {
      params += `search=${search}&`;
    }
    if (barcode !== null) {
      params += `bar_code=${barcode}&`;
    }
    if (sku !== null) {
      params += `sku=${sku}&`;
    }
    if (productid !== null) {
      params += `id=${productid}&`;
    }
    if (category !== null) {
      params += `category=${category}&`;
    }

    let url = `https://api2.ebazaar.mn/api/products/get1?${params}page=${page}&limit=50`;
    let newUrl = `https://api2.ebazaar.mn/api/products/get1?${params}ids=[${smsctx.chosedProdIDS}]`;
    fetch(newUrl, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        // console.log("res+++++++++", res);
        let supIDS = [];
        let categoryids = [];
        let brandids = [];

        let update = res.data.map((item) => {
          supIDS.push(item.supplier_id);
          categoryids.push(item.category_id);
          brandids.push(item.brand);
          if (smsctx.prodIDS.includes(item._id)) {
            return {
              ...item,
              chosed: true,
              totalMoney: 0,
              totalAmount: 0,
              totalQuantity: 0,
            };
          } else {
            return {
              ...item,
              chosed: false,
              totalMoney: 0,
              totalAmount: 0,
              totalQuantity: 0,
            };
          }
        });
        // setData(update);
        smsctx.setData(update);
        let uniqueSupID = [...new Set(supIDS)];
        setSupIDS(uniqueSupID);
        setCatIDS([...new Set(categoryids)]);
        setBrandIDS([...new Set(brandids)]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [smsctx.chosedProdIDS]);

  const SaveHandler = () => {
    // console.log("darlaa hadgalalaa ", data);
    smsctx.setProductData(smsctx.data);
    setProductsave(true);
  };

  return (
    <div className={css.background}>
      <div
        style={{
          overflowY: "scroll",
          height: "60vh",
        }}
      >
        <div className={css.wrapper}>
          <div>
            <Header title="Дан бүтээгдэхүүний төлөвлөгөө" />
            <div className={css.body}>
              <div className={css.header}>
                <div
                  className={css.idcontainer}
                  style={{
                    ...styles.imageContainer,
                  }}
                >
                  <span>IMG </span>
                  {/* <input /> */}
                </div>
                <div
                  className={css.idcontainer}
                  style={{
                    ...styles.productContainer,
                  }}
                >
                  <span>Бүтээгдэхүүн нэр </span>
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Хайх"
                  />
                </div>
                <div
                  className={css.idcontainer}
                  style={{
                    ...styles.angilalContainer,
                  }}
                >
                  <span>Ангилал </span>
                  {/* <input
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                /> */}
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option>-Бүгд-</option>
                    {smsctx.sitedata.categories &&
                      smsctx.sitedata.categories.map((item, index) => {
                        return (
                          <option
                            value={item.id}
                            key={index}
                            style={{
                              display:
                                catIDS && catIDS.includes(item.id)
                                  ? "block"
                                  : "none",
                            }}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div
                  className={css.idcontainer}
                  style={{
                    ...styles.brandContainer,
                  }}
                >
                  <span>Брэнд</span>

                  <select
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                  >
                    <option>-Бүгд-</option>
                    {smsctx.sitedata &&
                      smsctx.sitedata?.brands.map((x, index) => {
                        return (
                          <option
                            value={x.BrandID}
                            key={index}
                            style={{
                              display:
                                brandIDS && brandIDS.includes(x.BrandID)
                                  ? "block"
                                  : "none",
                            }}
                          >
                            {x.BrandName}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div
                  className={css.idcontainer}
                  style={{
                    ...styles.skuContainer,
                  }}
                >
                  <span>SKU</span>
                  <input
                    value={sku}
                    onChange={(e) => {
                      setSku(e.target.value);
                    }}
                  />
                </div>
                <div
                  className={css.idcontainer}
                  style={{
                    ...styles.barcodeContainer,
                  }}
                >
                  <span>Баркод</span>
                  <input
                    value={barcode}
                    onChange={(e) => {
                      setBarcode(e.target.value);
                    }}
                  />
                </div>
                <div
                  className={css.idcontainer}
                  style={{
                    ...styles.barcodeContainer,
                  }}
                >
                  <span>Үнийн дүн төлөвлөгөө</span>
                </div>
                <div
                  className={css.idcontainer}
                  style={{
                    ...styles.barcodeContainer,
                  }}
                >
                  <span>Тоо ширхэг төлөвлөгөө</span>
                </div>

                <div
                  className={css.idcontainer}
                  style={{
                    ...styles.barcodeContainer,
                    display: smsctx.barOpen ? "block" : "none",
                  }}
                >
                  <span>Биелэлт</span>
                </div>
                {/* {productsave ? (
                  <div
                    className={css.idcontainer}
                    style={{
                      ...styles.barcodeContainer,
                    }}
                  >
                    <span>Биелэлт</span>
                  </div>
                ) : null} */}
              </div>
              <div className={css.product}>
                {!smsctx.collecttrue &&
                  productsave === false &&
                  smsctx.data &&
                  smsctx.data.map((item, index) => {
                    let catname = smsctx.sitedata.categories.filter(
                      (x) => x.id === item.category_id
                    )[0];
                    let brandname = smsctx.sitedata.brands.filter(
                      (x) => x.BrandID === item.brand
                    )[0];

                    return (
                      <Product
                        item={item}
                        catname={catname}
                        brandname={brandname}
                        key={index}
                        setData={smsctx.setData}
                        data={smsctx.data}
                        setProductsave={setProductsave}
                        productsave={productsave}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        {smsctx.collectTitle !== null && (
          <div
            style={{
              width: "1500px",
              border: "1px solid rgba(0, 0, 0, 0.02)",
              overflow: "hidden",
            }}
          >
            <Header title="Багц бүтээгдэхүүний төлөвлөгөө" />

            <MultiProducts
              data={smsctx.multiProducts}
              brand={brand}
              setData={smsctx.setData}
            />
          </div>
        )}
      </div>

      <div
        style={{
          paddingTop: "10px",
        }}
      >
        {btnmodified ? (
          <div className={css.btncontainerTwo}>
            <button
              className={css.editwrapper}
              onClick={(e) => {
                setBtnmodified(false);
              }}
            >
              <img src={editIcon} alt="edit icon" className={css.editbtn} />
              <span> Засварлах</span>
            </button>
          </div>
        ) : (
          <div className={css.btncontainerTwo}>
            <button
              className={css.cancel}
              onClick={() => {
                // props.onClose();
                smsctx.setChosedProdIDS([]);
              }}
            >
              Цуцлах
            </button>
            <button
              className={css.confirm}
              onClick={() => {
                setBtnmodified(true);
                smsctx.setBarOpen(true);
                SaveHandler();
              }}
            >
              Хадгалах
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productcomponent;
