import css from "./createShipmentModal.module.css";
import closeIcon from "../../../assets/shipment/closeIcon.svg";
import { Button, Checkbox, Dropdown, Input, Modal } from "../common";
import { useEffect, useState } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";
import LoadingSpinner from "../../../components/Spinner/Spinner";
import notFound from "../../../assets/shipment/package.svg";
import arrowRight from "../../../assets/shipment/arrow-right.svg";
import okIcon from "../../../assets/shipment/ok.svg";
import ErrorPopup from "../common/ErrorPopup";

const CreateShipmentModal = (props) => {
  const { inventory, allInventories, closeHandler, userData, users } = props;

  const [selectedInventory, setSelectedInventory] = useState("");
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [productChecks, setProductChecks] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);

  const [submit, setSubmit] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (loading) return;
        setLoading(true);
        const currentInventory = allInventories.find(
          (inv) => inv._id === selectedInventory
        );

        const prodIds = [];

        for (const prod of currentInventory.products) {
          prodIds.push(Object.keys(prod)[0]);
        }

        const url = `https://api2.ebazaar.mn/api/products/get1?ids=[${prodIds.join(
          ","
        )}]`;
        const requestOption = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const res = await fetch(url, requestOption);
        const resData = await res.json();

        const productsCopy = [];

        for (const product of currentInventory.products) {
          const curProduct = resData.data.find(
            (prod) => Number(Object.keys(product)[0]) === prod._id
          );
          if (curProduct) {
            productsCopy.push({
              ...curProduct,
              myStock: product[Object.keys(product)[0]],
            });
          }
        }

        setProductChecks(productsCopy.map(() => false));
        setProducts(productsCopy);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedInventory !== "") {
      getProducts();
    }
  }, [selectedInventory, allInventories]);

  const checkHandler = (index, val) => {
    setProductChecks((prev) =>
      prev.map((value, ind) => (ind === index ? val : value))
    );

    if (val) {
      setCheckedProducts((prev) => [...prev, products[index]]);
    } else {
      setCheckedProducts((prev) =>
        prev.filter((product) => product._id !== products[index]._id)
      );
    }
  };

  const allCheckHandler = () => {
    if (productChecks.filter((val) => val).length === productChecks.length) {
      setProductChecks((prev) => prev.map(() => false));
      setCheckedProducts([]);
    } else {
      setProductChecks((prev) => prev.map(() => true));
      setCheckedProducts([...products]);
    }
  };

  const submitHandler = () => {
    if (submit) return;
    setErrorMsg("");

    if (selectedInventory === "") {
      setErrorMsg("Агуулах сонгоно уу!");
      setShowError(true);
      return;
    }
    if (checkedProducts.length === 0) {
      setErrorMsg("Бараа сонгоно уу!");
      setShowError(true);
      return;
    }

    setSubmit(true);
  };

  return (
    <>
      <div className={css.createShipmentContainer}>
        <div className={css.headerContainer}>
          <span>Ачилтын захиалга үүсгэх</span>
          <button onClick={closeHandler}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className={css.inventorySelectWrapper}>
          <span>Агуулах сонгох: </span>
          <Dropdown
            value={selectedInventory}
            onChangeHandler={setSelectedInventory}
            datas={allInventories
              .filter((inv) => inv._id !== inventory._id && inv.type === 2)
              .map((inv) => ({ label: inv.name, value: inv._id }))}
            name="inventory-create-shipment-selected-inventory"
          />
        </div>

        <div className={css.contentContainer}>
          <div
            className={css.contentHeader}
            style={{ zIndex: products.length + 1 }}
          >
            <div
              className={css.fieldWrapper}
              style={{
                width: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                checked={
                  productChecks.filter((val) => val).length ===
                  productChecks.length
                }
                onChange={allCheckHandler}
              />
            </div>

            <div className={css.fieldWrapper} style={{ width: 70 }}>
              <span className={css.fieldTitle}>Зураг</span>
              <Input type="text" size="small" disabled />
            </div>

            <div className={css.fieldWrapper} style={{ width: 140 }}>
              <span className={css.fieldTitle}>Бүтээгдэхүүний нэр</span>
              <Input type="text" size="small" placeholder="Хайх" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 100 }}>
              <span className={css.fieldTitle}>Брэнд</span>
              <Dropdown name="inventory-create-shipment-brand" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 120 }}>
              <span className={css.fieldTitle}>Баркод</span>
              <Input type="text" placeholder="Хайх" size="small" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 120 }}>
              <span className={css.fieldTitle}>SKU</span>
              <Input type="text" placeholder="Хайх" size="small" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 90 }}>
              <span className={css.fieldTitle}>Үлдэгдэл</span>
              <Dropdown name="inventory-create-shipment-remaining" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 116 }}>
              <span className={css.fieldTitle}>Нэгж үнэ</span>
              <Input type="text" disabled size="small" />
            </div>
          </div>

          {!loading && products.length > 0 && (
            <div className={css.content}>
              {products.map((product, index) => {
                return (
                  <SingleItem
                    key={`inventory-create-shipment-product-${product.product_id}`}
                    product={product}
                    zIndex={products.length - index}
                    checked={productChecks[index]}
                    checkHandler={checkHandler}
                    index={index}
                  />
                );
              })}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className={css.notFoundContainer}>
              <img src={notFound} alt="Not Found" />
              <span>Илэрц олдсонгүй</span>
            </div>
          )}

          {loading && (
            <div className={css.loadingSpinner}>
              <LoadingSpinner />
            </div>
          )}
        </div>

        <div className={css.footerWrapper}>
          <div className={css.buttons}>
            <Button onClick={closeHandler} variant="secondary" size="medium">
              Цуцлах
            </Button>
            <Button onClick={submitHandler} variant="primary" size="medium">
              Үргэлжлүүлэх
            </Button>
          </div>
        </div>
      </div>

      {submit && (
        <Modal width={770} height={770} backdrop="transparent">
          <CountScreen
            inventory={inventory}
            selectedInventory={allInventories.find(
              (inv) => inv._id === selectedInventory
            )}
            products={checkedProducts}
            closeHandler={() => setSubmit(false)}
            userData={userData}
            closeShipment={closeHandler}
            users={users}
          />
        </Modal>
      )}

      {showError && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => setShowError(false)}
        />
      )}
    </>
  );
};

export default CreateShipmentModal;

const SingleItem = (props) => {
  const { product, zIndex, checked, checkHandler, index } = props;

  return (
    <div
      className={`${css.singleItemWrapper} ${checked ? css.checked : ""}`}
      style={{ zIndex }}
    >
      <div
        className={css.singleFieldWrapper}
        style={{
          width: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Checkbox
          checked={checked}
          onChange={(e) => checkHandler(index, e.target.checked)}
        />
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 70 }}>
        <img
          src={product.image?.[0]}
          alt={product.name}
          className={css.productImage}
        />
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 140 }}>
        <span className={css.contentText}>{product.name}</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 100 }}>
        <span className={css.contentText}>Брэнд</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 120 }}>
        <span className={css.contentText}>{product.bar_code}</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 120 }}>
        <span className={css.contentText}>{product.sku}</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 90 }}>
        <span className={css.contentText}>{product.myStock}ш</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 116 }}>
        <span className={css.contentText}>
          {product.locations?.[
            "62f4aabe45a4e22552a3969f"
          ]?.price?.channel?.[1].toLocaleString()}
          ₮
        </span>
      </div>
    </div>
  );
};

const CountScreen = (props) => {
  const {
    inventory,
    selectedInventory,
    products: initProducts,
    closeHandler,
    userData,
    closeShipment,
    users,
  } = props;

  const [products, setProducts] = useState([]);
  const [submit, setSubmit] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setProducts(initProducts.map((prod) => ({ ...prod, myCount: 0 })));
  }, [initProducts]);

  const submitHandler = () => {
    setErrorMsg("");

    for (const product of products) {
      if (product.myCount < 0) {
        setErrorMsg(`${product.name} барааны тоо ширхэг 0-ээс бага байна!`);
        setShowError(true);
        return;
      }

      if (product.myCount > product.myStock) {
        setErrorMsg(`${product.name} барааны үлдэгдэл хүрэлцэхгүй байна!`);
        setShowError(true);
        return;
      }
    }

    setSubmit(true);
  };

  return (
    <>
      <div className={css.createShipmentContainer}>
        <div className={css.headerContainer}>
          <span>Ачилтын захиалга үүсгэх /Тоо ширхэг/</span>
          <button onClick={closeHandler}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className={css.inventoryNamesContainer}>
          <Input
            type="text"
            value={selectedInventory?.name}
            size="medium"
            disabled
          />
          <div className={css.arrowWrapper}>
            <img src={arrowRight} alt="Arrow Right" />
          </div>
          <Input type="text" value={inventory?.name} size="medium" disabled />
        </div>

        <div className={css.contentContainer}>
          <div
            className={css.contentHeader}
            style={{ zIndex: products.length + 1 }}
          >
            <div className={css.fieldWrapper} style={{ width: 70 }}>
              <span className={css.fieldTitle}>Зураг</span>
              <Input type="text" size="small" disabled />
            </div>

            <div className={css.fieldWrapper} style={{ width: 140 }}>
              <span className={css.fieldTitle}>Бүтээгдэхүүний нэр</span>
              <Input type="text" size="small" placeholder="Хайх" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 100 }}>
              <span className={css.fieldTitle}>Брэнд</span>
              <Dropdown name="inventory-shipment-create-count-brand" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 120 }}>
              <span className={css.fieldTitle}>Баркод</span>
              <Input type="text" placeholder="Хайх" size="small" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 120 }}>
              <span className={css.fieldTitle}>SKU</span>
              <Input type="text" placeholder="Хайх" size="small" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 90 }}>
              <span className={css.fieldTitle}>Тоо ширхэг</span>
              <Input type="text" disabled size="small" />
            </div>

            <div className={css.fieldWrapper} style={{ width: 116 }}>
              <span className={css.fieldTitle}>Нийт үнэ</span>
              <Input type="text" disabled size="small" />
            </div>
          </div>

          <div className={css.content}>
            {products.map((product, index) => {
              return (
                <CountSingleItem
                  key={`inventory-create-shipment-count-product-${product.product_id}`}
                  product={product}
                  zIndex={products.length - index}
                  index={index}
                  setProducts={setProducts}
                />
              );
            })}
          </div>
        </div>

        <div className={css.footerWrapper}>
          <div className={css.buttons}>
            <Button onClick={closeHandler} variant="secondary" size="medium">
              Буцах
            </Button>
            <Button onClick={submitHandler} variant="primary" size="medium">
              Илгээх
            </Button>
          </div>
        </div>
      </div>

      {submit && (
        <Modal width={770} height={770} backdrop="transparent">
          <SubmitScreen
            inventory={inventory}
            selectedInventory={selectedInventory}
            products={products.filter((product) => product.myCount > 0)}
            closeHandler={() => setSubmit(false)}
            userData={userData}
            closeShipment={closeShipment}
            closeCount={closeHandler}
            users={users}
          />
        </Modal>
      )}

      {showError && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => setShowError(false)}
        />
      )}
    </>
  );
};

const CountSingleItem = (props) => {
  const { product, zIndex, setProducts } = props;

  const [count, setCount] = useState(product.myCount);

  const minusHandler = () => {
    if (count - 1 < 0) {
      alert("Барааны тоо 0-ээс бага байж болохгүй!");
      return;
    }

    setCount((prev) => prev - 1);
  };

  const addHandler = () => {
    if (count + 1 > product.myStock) {
      alert("Барааны үлдэгдэл хүрэлцэхгүй байна");
      return;
    }

    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    const myProd = { ...product, myCount: count };
    setProducts((prev) =>
      prev.map((prod) => (prod._id === product._id ? myProd : prod))
    );
  }, [count]);

  return (
    <div className={`${css.singleItemWrapper}`} style={{ zIndex }}>
      <div className={css.singleFieldWrapper} style={{ width: 70 }}>
        <img
          src={product.image?.[0]}
          alt={product.name}
          className={css.productImage}
        />
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 140 }}>
        <span className={css.contentText}>{product.name}</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 100 }}>
        <span className={css.contentText}>Брэнд</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 120 }}>
        <span className={css.contentText}>{product.bar_code}</span>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 120 }}>
        <span className={css.contentText}>{product.sku}</span>
      </div>

      <div
        className={css.singleFieldWrapper}
        style={{
          width: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={css.productCountBtn}>
          <button onClick={minusHandler}>-</button>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <button onClick={addHandler}>+</button>
        </div>
      </div>

      <div className={css.singleFieldWrapper} style={{ width: 116 }}>
        <span className={css.contentText}>
          {product.locations?.[
            "62f4aabe45a4e22552a3969f"
          ]?.price?.channel?.[1].toLocaleString()}
          ₮
        </span>
      </div>
    </div>
  );
};

const SubmitScreen = (props) => {
  const {
    inventory,
    selectedInventory,
    products,
    closeHandler,
    userData,
    closeShipment,
    closeCount,
    users,
  } = props;

  const [loading, setLoading] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);

  const [selectedUser, setSelectedUser] = useState("");

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitHandler = async () => {
    try {
      if (loading) return;

      setErrorMsg("");

      if (selectedUser === "") {
        setErrorMsg("Түгээгч сонгоно уу!");
        setShowError(true);
        return;
      }

      setLoading(true);

      const url = `https://api2.ebazaar.mn/api/shipment`;
      const body = JSON.stringify({
        supplierId: Number(userData.company_id.replaceAll("|", "")),
        from: selectedInventory._id,
        to: inventory._id,
        status: 1,
        tugeegchID: Number(selectedUser),
        products: products.map((prod) => ({
          productId: prod._id,
          count: prod.myCount,
        })),
      });
      const requestOptions = {
        method: "POST",
        body,
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.acknowledged) {
        setSubmitDone(true);
      } else {
        throw Error();
      }
    } catch (error) {
      setErrorMsg("Ачилтын захиалга үүсгэхэд алдаа гарлаа!");
      setShowError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={css.createShipmentContainer}>
        <div className={css.headerContainer}>
          <span>Ачилтын захиалга үүсгэх /Баталгаажуулах/</span>
          <button disabled={loading} onClick={closeHandler}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className={css.userSelectWrapper}>
          <span>Түгээгч сонгох: </span>
          <Dropdown
            value={selectedUser}
            onChangeHandler={setSelectedUser}
            datas={users
              .filter((user) => user.role === 2 || user.role === 4)
              .map((user) => ({ label: user.first_name, value: user.user_id }))}
            name="inventory-create-shipment-submit-tugeegch"
          />
        </div>

        <div className={css.inventoryNamesContainer}>
          <Input
            type="text"
            value={selectedInventory?.name}
            size="medium"
            disabled
          />
          <div className={css.arrowWrapper}>
            <img src={arrowRight} alt="Arrow Right" />
          </div>
          <Input type="text" value={inventory?.name} size="medium" disabled />
        </div>

        {!loading && (
          <div className={css.productsWrapper}>
            {products.map((prod, index) => {
              const totalPrice =
                prod.locations?.[`62f4aabe45a4e22552a3969f`]?.price
                  ?.channel?.[1] * prod.myCount;

              return (
                <div
                  key={`inventory-shipment-create-product-detail-${index}`}
                  style={{
                    padding: "10px 16px",
                    boxShadow: "0px 0.800000011920929px 0px 0px #0000001A",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <span
                      style={{
                        flex: 1,
                        color: "#1A1A1A",
                        fontSize: 12,
                        lineHeight: "15px",
                      }}
                    >
                      {prod.name}
                    </span>

                    <span
                      style={{
                        color: "#1A1A1A",
                        fontSize: 12,
                        lineHeight: "15px",
                        textAlign: "center",
                      }}
                    >
                      {prod.myCount.toLocaleString()}ш
                    </span>

                    <span
                      style={{
                        color: "#1A1A1A",
                        fontSize: 12,
                        lineHeight: "15px",
                      }}
                    >
                      {totalPrice.toLocaleString()}₮
                    </span>
                  </div>
                </div>
              );
            })}
            <div
              style={{
                padding: "10px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    flex: 1,
                    color: "#1A1A1A",
                    fontSize: 15,
                    lineHeight: "18px",
                    fontWeight: 600,
                  }}
                >
                  {products.length.toLocaleString()} төрөл /{" "}
                  {products
                    .reduce((acc, cur) => acc + cur.myCount, 0)
                    .toLocaleString()}{" "}
                  бүтээгдэхүүн
                </span>

                <span
                  style={{
                    color: "#1A1A1A",
                    fontSize: 15,
                    lineHeight: "18px",
                    fontWeight: 600,
                  }}
                >
                  {products
                    .reduce(
                      (acc, cur) =>
                        acc +
                        cur.myCount *
                          cur.locations?.[`62f4aabe45a4e22552a3969f`]?.price
                            ?.channel?.[1],
                      0
                    )
                    .toLocaleString()}
                  ₮
                </span>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className={css.loadingSpinner}>
            <LoadingSpinner />
          </div>
        )}

        <div className={css.footerWrapper}>
          <div className={css.buttons}>
            <Button
              disabled={loading}
              onClick={closeHandler}
              variant="secondary"
              size="medium"
            >
              Буцах
            </Button>
            <Button
              disabled={loading}
              onClick={submitHandler}
              variant="primary"
              size="medium"
            >
              Баталгаажуулах
            </Button>
          </div>
        </div>
      </div>

      {submitDone && (
        <Modal width={300} height={300}>
          <div
            style={{
              width: "100%",
              height: "100%",
              padding: "39px 26px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 78, height: 78, marginBottom: 12 }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  aspectRatio: "1/1",
                }}
                src={okIcon}
                alt="Ok"
              />
            </div>
            <span
              style={{
                color: "#1A1A1A",
                fontSize: 22,
                lineHeight: "26px",
                fontWeight: 700,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              Ачилтын захиалга илгээгдлээ
            </span>
            <Button
              onClick={() => {
                setSubmitDone(false);
                closeHandler();
                closeCount();
                closeShipment();
              }}
              size="medium"
              variant="primary"
              width="100%"
            >
              OK
            </Button>
          </div>
        </Modal>
      )}

      {showError && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => setShowError(false)}
        />
      )}
    </>
  );
};
