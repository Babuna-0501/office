import css from "./singleMovementDetail.module.css";
import closeIcon from "../../../assets/shipment/closeIcon.svg";
import arrowRight from "../../../assets/shipment/arrow-right.svg";
import { Button, Input, Modal } from "../common";
import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";
import okIcon from "../../../assets/shipment/ok.svg";
import LoadingSpinner from "../../../components/Spinner/Spinner";
import * as htmlToImage from "html-to-image";
import { useCallback } from "react";
import ErrorPopup from "../common/ErrorPopup"

const SingleMovementDetail = (props) => {
  const {
    closeHandler,
    outgoingInventory,
    incomingInventory,
    movement,
    products,
    setMovements,
    setShowDetails,
    allInventories,
    getShipments,
  } = props;

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [isMillHouse, setIsMillHouse] = useState(false);
  const [isNuudel, setIsNuudel] = useState(false);

  const [date] = useState(movement.createDate.split("T")[0]);
  const [time] = useState(movement.createDate.split("T")[1]);

  const [print, setPrint] = useState(false);

  const [isFromOrder] = useState(
    movement.myOrigin === 1 && movement.orders && movement.shipmentNewType === 1
  );

  const [selectedOutInventory, setSelectedOutInventory] = useState(movement.from);
  const [selectedInInventory, setSelectedInInventory] = useState(movement.to);

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const [receivedNumbers, setReceivedNumbers] = useState([]);

  useEffect(() => {
    products.map((p, i) => {
      receivedNumbers.push({ index: i, receivedNumber: 0 });
    });
  }, []);

  let inProducts = [];
  const [inData, setInData] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  useEffect(() => {
    fetch(
      `https://api2.ebazaar.mn/api/shipment?createDate=${movement.createDate.substring(0, 10)}&to=${
        movement.from
      }&from=${movement.to}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((response) => setInData(response.data));
  }, []);

  inData?.map((data) => {
    if (data.status === 2) {
      inProducts.push(...data.products);
    }
  });

  const tatalt = inProducts.filter((product) =>
    movement.products.map((pro) => pro.productId === product.productId)
  );

  const separateProd = useMemo(() => {
    const result = {
      millhouse: {
        products: [],
        total: 0,
        title: "Милл Хаус ХХК",
      },
      ng: {
        products: [],
        total: 0,
        title: "Нүүдэл Жи ХХК",
      },
    };

    for (const product of props.products) {
      if (product.vendor && product.vendor === 14033 && product.count > 0) {
        result.ng.products.push(product);
        result.ng.total += product.price * product.count;
        setIsNuudel(true);
      }

      if (product.vendor && product.vendor === 948 && product.count > 0) {
        result.millhouse.products.push(product);
        result.millhouse.total += product.price * product.count;
        setIsMillHouse(true);
      }

      if (product.count > 0) {
        result.millhouse.products.push(product);
        result.millhouse.total += product.price * product.count;
        setIsMillHouse(true);
      }
    }
    return result;
  }, [products]);

  useEffect(() => {
    let totalPriceCopy = 0;
    let totalCountCopy = 0;
    let categoryCountCopy = 0;

    for (const product of products) {
      totalPriceCopy +=
        product.locations?.[`62f4aabe45a4e22552a3969f`]?.price?.channel?.[1] * product.count;

      totalCountCopy += product.count;
      categoryCountCopy++;
    }

    setCategoryCount(categoryCountCopy);
    setTotalCount(totalCountCopy);
    setTotalPrice(totalPriceCopy);
  }, [products]);

  const submitHandler = async () => {
    try {
      if (submitting) return;
      setErrorMsg("");

      if (isFromOrder) {
        if (selectedOutInventory === "") {
          setErrorMsg("Гарах агуулах сонгоогүй байна!");
          setShowError(true);
          return;
        }

        if (selectedInInventory === "") {
          setErrorMsg("Авах агуулах сонгоогүй байна!");
          setShowError(true);
          return;
        }
      } else {
        if (!outgoingInventory._id) {
          setErrorMsg("Гарах агуулах сонгоогүй байна!");
          setShowError(true);
          return;
        }

        if (!incomingInventory._id) {
          setErrorMsg("Авах агуулах сонгоогүй байна!");
          setShowError(true);
          return;
        }
      }

      setSubmitting(true);

      const url = `https://api2.ebazaar.mn/api/shipment?id=${movement._id}`;
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          status: 2,
          from: isFromOrder ? selectedOutInventory : outgoingInventory._id,
          to: isFromOrder ? selectedInInventory : incomingInventory._id,
          shipmentType: movement.shipmentNewType,
          products: products.map((product, index) => ({
            productId: product.productId,
            count:
              movement.shipmentNewType === 3
                ? receivedNumbers[index].receivedNumber
                : product.count,
          })),
        }),
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.code === 200) {
        setShowPopup(true);
        if (isFromOrder) {
          setMovements((prev) =>
            prev.map((curMovement) =>
              curMovement._id === movement._id
                ? {
                    ...curMovement,
                    status: 2,
                    from: selectedOutInventory,
                    to: selectedInInventory,
                  }
                : curMovement
            )
          );
        } else {
          setMovements((prev) =>
            prev.map((curMovement) =>
              curMovement._id === movement._id ? { ...curMovement, status: 2 } : curMovement
            )
          );
        }
        getShipments();
      } else {
        setErrorMsg(resData.message);
        setShowError(true);
      }
    } catch (error) {
      console.log("error while submiting", error);
      setErrorMsg("Алдаа гарсан тул та дахин оролдоно уу!");
      setShowError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const cancelHandler = async () => {
    try {
      if (submitting) return;

      setSubmitting(true);

      const url = `https://api2.ebazaar.mn/api/shipment?id=${movement._id}&status=3`;
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.code === 200) {
        setShowCancelPopup(true);
        setMovements((prev) =>
          prev.map((curMovement) =>
            curMovement._id === movement._id ? { ...curMovement, status: 3 } : curMovement
          )
        );
      } else {
        alert(resData.message);
      }
    } catch (error) {
      console.log("error while cancelling", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleZZZ = (e, idx) => {
    setReceivedNumbers((prevState) => {
      const updatedReceivedNumbers = [...prevState];
      updatedReceivedNumbers[idx].receivedNumber = Number(e.target.value);
      return updatedReceivedNumbers;
    });
  };

  return (
    <div>
      <div className={css.detailsContainer}>
        <div className={css.headerWrapper}>
          <h1 className={css.title}>
            {movement.shipmentNewType === 1 && "Ачилт"}
            {movement.shipmentNewType === 2 && "Хөдөлгөөн"}
            {movement.shipmentNewType === 3 && "Буцаалт"}
          </h1>
          <button disabled={submitting} onClick={closeHandler} className={css.closeBtn}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className={css.infoWrapper}>
          <span className={css.shipmentDate}>
            <span>Үүссэн огноо:</span> {date.split("-")[0]}.{date.split("-")[1]}.
            {date.split("-")[2]}/ {time.split(":")[0]}:{time.split(":")[1]}
          </span>

          {movement.status === 2 && <button onClick={() => setPrint(true)}>Баримт хэвлэх</button>}
        </div>

        {!isFromOrder && (
          <div className={css.inventoryWrapper}>
            <Input type="text" value={outgoingInventory?.name} size="medium" disabled />
            <div className={css.arrowWrapper}>
              <img src={arrowRight} alt="Arrow Right" />
            </div>
            <Input type="text" value={incomingInventory?.name} size="medium" disabled />
          </div>
        )}

        {isFromOrder && (
          <div className={css.inventoryWrapper}>
            <select
              value={selectedOutInventory}
              onChange={(e) => setSelectedOutInventory(e.target.value)}
              disabled={movement.status !== 1}
            >
              <option value={""}>Гарах агуулах</option>
              {allInventories
                .filter((inven) => inven._id !== selectedInInventory)
                .map((inventory, idx) => {
                  return (
                    <option key={`shipment-details-out-inven-${idx}`} value={inventory._id}>
                      {inventory.name}
                    </option>
                  );
                })}
            </select>
            <div className={css.arrowWrapper}>
              <img src={arrowRight} alt="Arrow Right" />
            </div>
            <select
              value={selectedInInventory}
              onChange={(e) => setSelectedInInventory(e.target.value)}
              disabled={movement.status !== 1}
            >
              <option value={""}>Авах агуулах</option>
              {allInventories
                .filter((inven) => inven._id !== selectedOutInventory)
                .map((inventory) => {
                  return (
                    <option
                      key={`shipment-details-in-inven-${inventory._id}`}
                      value={inventory._id}
                    >
                      {inventory.name}
                    </option>
                  );
                })}
            </select>
          </div>
        )}

        {!submitting && (
          <div className={css.productsWrapper}>
            {Object.keys(separateProd).map((key, index) => {
              return (
                <>
                  {separateProd[key].products.length > 0 ? (
                    <div style={{ marginBottom: index === 0 ? 30 : 0 }} key={index}>
                      <h2 className={css.productTitle}>{separateProd[key].title}</h2>
                      {separateProd[key].products.map((product, idx) => {
                        let mustNumber2 = 0;
                        tatalt.map((t) => {
                          if (t.productId === product._id) {
                            mustNumber2 = mustNumber2 + t.count;
                          }
                        });
                        return (
                          <div
                            product={`${movement._id}-product-card-${product.product_id}-${index}`}
                            className={css.productCardContainer}
                          >
                            <div
                              className={css.productCard}
                              style={{
                                backgroundColor:
                                  movement.status === 2 &&
                                  product.oldCount !== product.count &&
                                  movement.shipmentNewType === 3
                                    ? "#f69697"
                                    : "fff",
                              }}
                            >
                              <div className={css.productImageWrapper}>
                                <img src={product.image[0]} alt={product.name} />
                              </div>

                              <div>
                                <span className={css.productName}>{product.name}</span>
                                <span className={css.productInfo}>
                                  SKU: {product.sku} / Barcode: {product.bar_code}
                                </span>
                                <span className={css.productPrice}>
                                  <span>
                                    {product.locations?.[
                                      `62f4aabe45a4e22552a3969f`
                                    ]?.price?.channel?.[1].toLocaleString()}
                                    ₮
                                  </span>{" "}
                                  x {product.count} ={" "}
                                  <span>
                                    {(
                                      product.locations?.[`62f4aabe45a4e22552a3969f`]?.price
                                        ?.channel?.[1] * product.count
                                    ).toLocaleString()}
                                    ₮
                                  </span>
                                </span>
                                {movement.status === 1 && movement.shipmentNewType === 3 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "5px",
                                      marginLeft: "60px",
                                    }}
                                  >
                                    {/* <div className={css.inputContainer}>
                                      <span className={css.inputSpan}>Нийт ачсан</span>
                                      <input
                                        className={css.quantityInput}
                                        disabled
                                        value={mustNumber2}
                                      />
                                    </div> */}

                                    <div className={css.inputContainer}>
                                      <span className={css.inputSpan}>Буцаах</span>
                                      <input
                                        className={css.quantityInput}
                                        disabled
                                        value={product.count}
                                      />
                                    </div>
                                    <div className={css.inputContainer}>
                                      <span className={css.inputSpan}>Хүлээж авсан</span>
                                      <input
                                        className={css.quantityInput}
                                        value={receivedNumbers[idx]?.receivedNumber}
                                        onChange={(e) => handleZZZ(e, idx)}
                                      />
                                    </div>
                                  </div>
                                )}

                                {movement.status === 2 && movement.shipmentNewType === 3 && (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "5px",
                                    }}
                                  >
                                    {/* <div className={css.inputContainer}>
                                      <span className={css.inputSpan}>Нийт ачсан</span>
                                      <input
                                        className={css.quantityInput}
                                        disabled
                                        value={mustNumber2}
                                      />
                                    </div> */}

                                    <div className={css.inputContainer}>
                                      <span
                                        className={css.inputSpan}
                                        style={{
                                          textAlign: "end",
                                          marginRight: "3px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Буцаасан
                                      </span>
                                      <input
                                        className={css.quantityInput}
                                        disabled
                                        value={product.oldCount}
                                      />
                                    </div>
                                    <div className={css.inputContainer}>
                                      <span
                                        className={css.inputSpan}
                                        style={{
                                          textAlign: "end",
                                          marginRight: "3px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Хүлээж авсан
                                      </span>
                                      <input
                                        className={css.quantityInput}
                                        value={product.count}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </>
              );
            })}
            {/* {products.map((product, index) => {
							return (
								<div
									key={`${movement._id}-product-card-${product.product_id}-${index}`}
									className={css.productCardContainer}
								>
									<div className={css.productCard}>
										<div className={css.productImageWrapper}>
											<img src={product.image[0]} alt={product.name} />
										</div>

										<div>
											<span className={css.productName}>{product.name}</span>
											<span className={css.productInfo}>
												SKU: {product.sku} / Barcode: {product.bar_code}
											</span>
											<span className={css.productPrice}>
												<span>
													{product.locations?.[
														`62f4aabe45a4e22552a3969f`
													]?.price?.channel?.[1].toLocaleString()}
													₮
												</span>{" "}
												x {product.count} ={" "}
												<span>
													{(
														product.locations?.[`62f4aabe45a4e22552a3969f`]
															?.price?.channel?.[1] * product.count
													).toLocaleString()}
													₮
												</span>
											</span>
										</div>
									</div>
								</div>
							);
						})} */}
          </div>
        )}

        {submitting && (
          <div className={css.loadingSpinner}>
            <LoadingSpinner />
          </div>
        )}
      </div>

      <div
        className={css.footerWrapper}
        style={{
          height:
            (movement.myOrigin === 2 && movement.status === 1) ||
            (movement.myOrigin === 1 && movement.shipmentNewType === 2 && movement.status === 1) ||
            (movement.myOrigin === 1 &&
              movement.shipmentNewType === 1 &&
              movement.status === 1 &&
              (!movement.tugeegchID || movement.orders))
              ? 108
              : 40,
        }}
      >
        <div className={css.footerInfo}>
          <span className={css.shipmentDetail}>
            {isFromOrder && `${movement.orders.split(",").length} захиалга /`} {categoryCount} төрөл
            / {totalCount} бүтээгдэхүүн
          </span>
          <span className={css.shipmentAmount}>{totalPrice.toLocaleString()}₮</span>
        </div>
        {((movement.myOrigin === 2 && movement.status === 1) ||
          (movement.myOrigin === 1 && movement.shipmentNewType === 2 && movement.status === 1) ||
          (movement.myOrigin === 1 &&
            movement.shipmentNewType === 1 &&
            movement.status === 1 &&
            (!movement.tugeegchID || movement.orders))) && (
          <div className={css.footerBtns}>
            <Button onClick={cancelHandler} size="large" variant="secondary" disabled={submitting}>
              Цуцлах
            </Button>
            <Button onClick={submitHandler} size="large" variant="primary" disabled={submitting}>
              Баталгаажуулах
            </Button>
          </div>
        )}
      </div>

      {showPopup && (
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
                setShowPopup(false);
                setShowDetails(false);
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

      {showCancelPopup && (
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
              Ачилтын захиалга цуцлагдлаа
            </span>
            <Button
              onClick={() => {
                setShowPopup(false);
                setShowDetails(false);
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

      {showError && <ErrorPopup message={errorMsg} closeHandler={() => setShowError(false)} />}

      {print && (
        <PrintReciept
          movement={movement}
          products={products}
          outgoingInventory={outgoingInventory}
          incomingInventory={incomingInventory}
          setPrint={setPrint}
          print={print}
          isFromOrder={isFromOrder}
          isMillHouse={isMillHouse}
          isNuudel={isNuudel}
        />
      )}
    </div>
  );
};

export default SingleMovementDetail;

const PrintReciept = (props) => {
  const {
    movement,
    products,
    outgoingInventory,
    incomingInventory,
    setPrint,
    isFromOrder,
    isMillHouse,
    isNuudel,
  } = props;

  const [date] = movement.createDate.split("T");

  const receiptRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [tabValue, setTabValue] = useState("");
  const [tabProducts, setTabProducts] = useState(products);

  useEffect(() => {
    setWidth(receiptRef.current.clientWidth);
    setHeight(receiptRef.current.clientHeight);
    // const checkInclude = products?.include(item => item.vendor === 948);
    // console.log("CHECK", checkInclude);
    // products.include(item => item.vendor === 948)
  }, []);

  const tabHandler = (value) => {
    const separateProds = [];
    for (const product of products) {
      if (product.vendor && product.vendor === 14033 && product.count > 0 && value === "nuudel") {
        separateProds.push();
        separateProds.push(product);
        setTabProducts(separateProds);
        // console.log("VENDOR:", product);
      }

      if (product.vendor && product.vendor === 948 && product.count > 0 && value === "mill") {
        separateProds.push(product);
        setTabProducts(separateProds);
        // console.log("VENDOR:", product);
      }
    }
  };

  const downloadHandler = useCallback(() => {
    if (receiptRef.current === null) return;

    htmlToImage
      .toPng(receiptRef.current, {
        cacheBust: true,
        canvasWidth: width * 3,
        canvasHeight: height * 3,
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `shipment-${movement._id}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.log(err));
  }, [receiptRef, movement._id, height, width]);

  return (
    <div className={css.printRecieptContainer}>
      {isMillHouse && isNuudel ? (
        <div className={css.tabContainer}>
          <Button
            variant="primary"
            size="medium"
            onClick={(e) => {
              console.log(e.target.value);
              // setTabValue(e.target.value);
              tabHandler(e.target.value);
            }}
            value="mill"
          >
            Милл Хаус ХХК
          </Button>
          <Button
            variant="primary"
            size="medium"
            value="nuudel"
            onClick={(e) => {
              console.log(e.target.value);
              // setTabValue(e.target.value);
              tabHandler(e.target.value);
            }}
          >
            Нүүдэл Жи ХХК
          </Button>
        </div>
      ) : null}

      <div ref={receiptRef} className={css.receiptContainer}>
        <div className={css.receiptWrapper}>
          <span className={css.title}>Ачилтын хуудсын нэгтгэл</span>

          <div className={css.shipmentDetails}>
            <span>Ачилтын дугаар: {movement.id}</span>
            <span>
              Ачилт үүссэн огноо: {date.split("-")[0]}/{date.split("-")[1]}/{date.split("-")[2]}
            </span>
          </div>

          <div className={css.inventoryDetails}>
            <h3>Ачилт: </h3>
            <div className={css.invenNames}>
              <span>Ачилт өгөх: {outgoingInventory.name}</span>
              <span>Ачилт хүлээж авах: {incomingInventory.name}</span>
            </div>
          </div>

          <table className={css.productTables}>
            <thead>
              <tr>
                <th style={{ width: "1%" }}>№</th>
                <th>Бүтээгдэхүүн</th>
                <th>SKU</th>
                <th>Barcode</th>
                <th>Нэгж үнэ</th>
                <th>Тоо ширхэг</th>
                <th>Нийт үнэ</th>
              </tr>
            </thead>
            <tbody>
              {tabProducts?.map((product, index) => {
                return (
                  <tr key={`receipt-${product._id}`}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.bar_code}</td>
                    <td>
                      {product.locations?.[
                        `62f4aabe45a4e22552a3969f`
                      ]?.price?.channel?.[1].toLocaleString()}
                      ₮
                    </td>
                    <td>{product.count}</td>
                    <td>
                      {(
                        product.locations?.[`62f4aabe45a4e22552a3969f`]?.price?.channel?.[1] *
                        product.count
                      ).toLocaleString()}
                      ₮
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={css.productFooterWrapper}>
            <div className={css.productsDetail}>
              {isFromOrder && <span>Нийт захиалгын тоо: {movement.orders.split(",").length}</span>}
              <span>Нийт барааны төрөл: {tabProducts.length}</span>
              <span>
                Нийт бүтээгдэхүүн: {tabProducts.reduce((acc, prod) => acc + prod.count, 0)}ш
              </span>
              <div>
                Нийт үнийн дүн:{" "}
                {tabProducts
                  .reduce(
                    (acc, prod) =>
                      acc +
                      (prod.locations?.[`62f4aabe45a4e22552a3969f`]?.price?.channel?.[1] ?? 0) *
                        prod.count,
                    0
                  )
                  .toLocaleString()}
                ₮
              </div>
            </div>

            <div className={css.infoFooter}>
              <div className={css.rightSide}>
                <span>Ачилтын нэгтгэл үүсгэсэн:&nbsp; ________________________</span>
                <span>
                  Ачилтын хүлээн авсан: &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; ________________________
                </span>
                <span>
                  Ачилтыг хянасан: &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp; &nbsp;&nbsp; ________________________
                </span>
              </div>

              <div className={css.leftSide}>Тэмдэг</div>
            </div>
          </div>
        </div>
      </div>

      <div className={css.printBtn} style={{ width: width }}>
        <Button onClick={() => setPrint(false)} variant="secondary" size="medium">
          Болих
        </Button>
        <Button onClick={downloadHandler} variant="primary" size="medium">
          Татах
        </Button>
      </div>
    </div>
  );
};
