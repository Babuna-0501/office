import React, { useEffect, useState } from "react";
import css from "./productList.module.css";
import myHeaders from "../../components/MyHeader/myHeader";
import { GlobalContext } from "../../Hooks/GlobalContext";
import { useContext } from "react";

const ProductList = ({
  coSupplier,
  coMerchant,
  merListId,
  supplierId,
  merchantId,
  setMerchantId,
  changedProducts,
  setChangedProducts,
}) => {
  const [merchants, setMerchants] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [searchSupplier, setSearchSupplier] = useState("");

  const { getSafeDecent } = useContext(GlobalContext);

  const handleInput = ({ event, bar_code, _id, supplierId }) => {
    // Check if the product with the given bar_code is already in changedProducts
    const productIndex = changedProducts.findIndex(
      (product) => product.bar_code === bar_code
    );
    const updatedChangedProducts = [...changedProducts];

    const updatedStockInput = {
      _id,
      bar_code,
      supplierId,
      stock: updatedChangedProducts[productIndex]?.stock
        ? updatedChangedProducts[productIndex]?.stock
        : 0,
      safe: updatedChangedProducts[productIndex]?.safe
        ? updatedChangedProducts[productIndex].safe
        : "",
      decent: updatedChangedProducts[productIndex]?.decent
        ? updatedChangedProducts[productIndex].decent
        : "",
      [event.target.name]: event.target.value,
    };

    if (productIndex !== -1) {
      // If the product is already in changedProducts, update it
      updatedChangedProducts[productIndex] = updatedStockInput;
      setChangedProducts(updatedChangedProducts);
    } else {
      // If the product is not in changedProducts, add it
      setChangedProducts([...changedProducts, updatedStockInput]);
    }
  };

  const decentValue = ({ _id }) => {
    const product = changedProducts.find((product) => product._id === _id);
    return product ? product.decent : "";
  };
  const safeValue = ({ _id }) => {
    const product = changedProducts.find((product) => product._id === _id);
    return product ? product.safe : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSafeDecent({ supplierId, merchantId });

        if (res.value[0]?.products.length > 0) {
          setChangedProducts(res.value[0].products);
        } else {
          setChangedProducts([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [merchantId]);

  useEffect(() => {
    const fetchData = async () => {
      const supplierIds = coSupplier.join(",");
      let url = `https://api2.ebazaar.mn/api/products/get1?search=${search}&suppliers=${supplierIds}`;
      if (searchSupplier === "All" || searchSupplier === "") {
        url = `https://api2.ebazaar.mn/api/products/get1?search=${search}&suppliers=${supplierIds}`;
      } else {
        url = `https://api2.ebazaar.mn/api/products/get1?search=${search}&suppliers=${searchSupplier}`;
      }

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const res = await fetch(url, requestOptions);
        const resData = await res.json();
        setProducts(resData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [coSupplier, search, searchSupplier]);

  useEffect(() => {
    const a = [];
    coMerchant.map((e) => {
      merListId.map((el) => {
        if (e === el.value) {
          a.push(el);
        }
      });
    });
    setMerchants(a);
  }, [coMerchant]);

  return (
    <div style={{ marginTop: "10px" }}>
      <p className={css.bold}>ProductList</p>
      <div className={css.container}>
        <div className={css.left}>
          <div className={css.header}>
            <h4 className={css.headerFont}>Merchants</h4>
          </div>
          <div className={css.merchantList} style={{ overflow: "scroll" }}>
            {merchants.map((merchant, index) => (
              <div
                key={index}
                className={css.merchant}
                style={{
                  backgroundColor:
                    merchantId == merchant.value ? "#cfd8dc" : "",
                }}
                onClick={() => {
                  setMerchantId(merchant.value);
                  let includes = false;
                  data.map((e) => {
                    if (e.merchantId && e.merchantId == merchant.value) {
                      includes = true;
                    } else {
                      includes = false;
                    }
                  });
                  if (!includes) {
                    setData([
                      ...data,
                      {
                        merchantId: merchant.value,
                        products: [],
                      },
                    ]);
                  }
                }}
              >
                <p
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {merchant.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={css.right}>
          <div className={css.header}>
            <div style={{ display: "flex", gap: "20px" }}>
              <input
                className={css.input}
                style={{ width: "100px" }}
                placeholder="Нэрээр хайх..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <select
                className={css.input}
                style={{ width: "120px" }}
                name="suppliers"
                id="suppliers"
                onChange={(e) => {
                  setSearchSupplier(e.target.value);
                }}
              >
                <option value="All">All</option>
                <option value="10">Анунгоо</option>
                <option value="934">Жэм Интернэшнл</option>
                <option value="1109">Хүнс Экспрэсс</option>
                <option value="6181">Наран фүүдс</option>
                <option value="13867">Найсбэйкери</option>
                <option value="13904">Окинск</option>
              </select>
            </div>
            <div className={css.headerRight}>
              <p className={css.bold}>Аюулгүй нөөц</p>
              <p className={css.bold}>Зохистой хэмжээ</p>
            </div>
          </div>
          <div className={css.ProductList}>
            {products.map((product, idx) =>
              merchantId ? (
                <div key={idx} className={css.product}>
                  <div className={css.productLeft}>{product.name}</div>
                  <div className={css.productRight}>
                    <input
                      className={css.input}
                      type="number"
                      name="safe"
                      min="0"
                      placeholder="ш"
                      value={safeValue({ _id: product._id })}
                      onChange={(event) => {
                        handleInput({
                          _id: product._id,
                          bar_code: product.bar_code,
                          supplierId: product.supplier_id,
                          event: event,
                        });
                      }}
                    />
                    <input
                      className={css.input}
                      type="number"
                      name="decent"
                      min="0"
                      placeholder="ш"
                      value={decentValue({ _id: product._id })}
                      onChange={(event) => {
                        handleInput({
                          _id: product._id,
                          bar_code: product.bar_code,
                          supplierId: product.supplier_id,
                          event: event,
                        });
                      }}
                    />
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
