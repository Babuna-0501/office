// CSS
import css from "./singleTargetProducts.module.css";

import { EditGray, TargetWhite } from "../../../../../assets/icons";

// Components
import { Button, Dropdown, Input, Modal } from "../../../../../components/common";
import { useState, useEffect } from "react";
import { ProductTargetEdit } from "../Edit/ProductTargetEdit";

export const SingleTargetProducts = (props) => {
  const {
    products: initProducts,
    suppliers,
    target,
    productTarget,
    initCategories,
    initBrands,
    loggedUser,
    setTarget,
    setProductTargetExist,
    setTotalProductTargetExist,
    categoryTargetExist,
    brandTargetExist,
    setProducts: setInitProducts,
  } = props;

  const [products, setProducts] = useState(
    initProducts.map((product) => {
      const currentProductTarget = productTarget?.find((prod) => prod._id === product._id);
      return { ...product, target: { ...currentProductTarget } };
    })
  );

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSucceeded, setTotalSucceeded] = useState(0);
  const [totalWaiting, setTotalWaiting] = useState(0);

  const [productName, setProductName] = useState("");
  const [productSupplier, setProductSupplier] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [productSKU, setProductSKU] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    let productsCopy = initProducts.map((product) => {
      if (productTarget) {
        const currentProductTarget = productTarget.find((prod) => prod._id === product._id);
        return { ...product, target: { ...currentProductTarget } };
      } else return product;
    });

    if (productName) {
      productsCopy = productsCopy.filter((product) => product.name.toLowerCase()[0] === productName.toLowerCase() && product.name.toLowerCase().includes(productName.toLowerCase()));
    }

    if (productSupplier) {
      productsCopy = productsCopy.filter((product) => product.supplier_id === Number(productSupplier));
    }

    if (productBarcode) {
      productsCopy = productsCopy.filter((product) => product.bar_code === productBarcode);
    }

    if (productSKU) {
      productsCopy = productsCopy.filter((product) => product.sku === productSKU);
    }

    if (productPrice) {
      productsCopy = productsCopy.filter((product) => product.singlePrice === Number(productPrice));
    }

    setProducts(productsCopy);
  }, [initProducts, productName, productSupplier, productBarcode, productSKU, productPrice, productTarget]);

  useEffect(() => {
    let totalAmountCopy = 0;
    let totalSucceededCopy = 0;
    let totalWaitingCopy = 0;

    if (target) {
      totalAmountCopy += target.goal;
      totalSucceededCopy += target.succeeded;
      totalWaitingCopy += target.waiting;
    }

    if (productTarget) {
      for (const targetProd of productTarget) {
        if (targetProd.target.amount) {
          totalAmountCopy += targetProd.target.amount;
          totalSucceededCopy += targetProd.succeeded.amount;
          totalWaitingCopy += targetProd.waiting.amount;
        } else if (targetProd.target.quantity) {
          const currentProduct = initProducts.find((prod) => prod._id === targetProd._id);
          totalAmountCopy += currentProduct.singlePrice * targetProd.target.quantity;
          totalSucceededCopy += currentProduct.singlePrice * targetProd.succeeded.quantity;
          totalWaitingCopy += currentProduct.singlePrice * targetProd.waiting.quantity;
        }
      }
    }

    setTotalAmount(totalAmountCopy);
    setTotalSucceeded(totalSucceededCopy);
    setTotalWaiting(totalWaitingCopy);
  }, [target, productTarget, initProducts]);

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Бүтээгдэхүүн төлөвлөгөө</h1>

          <div className={css.amounts}>
            <div className={css.singleAmount}>
              <span className={css.amountTitle}>Нийт дүн:</span>
              <div className={css.singleAmountInfo}>
                <span className={css.amount}>{totalAmount.toLocaleString()}₮</span>
              </div>
            </div>

            <div className={css.singleAmount}>
              <span className={css.amountTitle}>Биелэлт: {totalSucceeded === 0 ? 0 : Math.round((totalSucceeded * 100) / totalAmount)}%</span>
              <div className={css.singleAmountInfo}>
                <div className={`${css.circle} ${css.completed}`} />
                <span className={css.amount}>{totalSucceeded.toLocaleString()}₮</span>
              </div>
            </div>

            <div className={css.singleAmount}>
              <span className={css.amountTitle}>Хүлээгдэж буй: {totalWaiting === 0 ? 0 : Math.round((totalWaiting * 100) / totalAmount)}%</span>
              <div className={css.singleAmountInfo}>
                <div className={`${css.circle} ${css.pending}`} />
                <span className={css.amount}>{totalWaiting.toLocaleString()}₮</span>
              </div>
            </div>

            <Button onClick={() => setShowEdit(true)} variant="secondary" size="medium" icon>
              <EditGray />
              Засварлах
            </Button>
          </div>
        </div>

        <div className={css.table}>
          <div className={css.tableHeader} style={{ zIndex: products.length + 1 }}>
            <div className={css.singleHeaderItem} style={{ width: 55 }}>
              <span className={css.headerText}>Зураг</span>
            </div>

            <div className={css.singleHeaderItem} style={{ width: 140 }}>
              <span className={css.headerText}>Бүтээгдэхүүний нэр</span>
              <Input size="small" placeholder="Хайх" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>

            <div className={css.singleHeaderItem} style={{ width: 140 }}>
              <span className={css.headerText}>Нийлүүлэгч</span>
              <Dropdown value={productSupplier} onChangeHandler={setProductSupplier} datas={suppliers.map((supplier) => ({ value: supplier.id, label: supplier.name }))} />
            </div>

            <div className={css.singleHeaderItem} style={{ width: 105 }}>
              <span className={css.headerText}>Баркод</span>
              <Input value={productBarcode} onChange={(e) => setProductBarcode(e.target.value)} size="small" placeholder="Хайх" />
            </div>

            <div className={css.singleHeaderItem} style={{ width: 80 }}>
              <span className={css.headerText}>SKU</span>
              <Input value={productSKU} onChange={(e) => setProductSKU(e.target.value)} size="small" placeholder="Хайх" />
            </div>

            <div className={css.singleHeaderItem} style={{ width: 80 }}>
              <span className={css.headerText}>Үнэ</span>
              <Input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} size="small" placeholder="Хайх" />
            </div>

            <div className={css.singleHeaderItem} style={{ width: 90 }}>
              <span className={css.headerText}>Үнийн дүн төлөвлөгөө</span>
            </div>

            <div className={css.singleHeaderItem} style={{ width: 90 }}>
              <span className={css.headerText}>Тоо / Ширхэг төлөвлөгөө</span>
            </div>

            <div className={css.singleHeaderItem} style={{ width: 115 }}>
              <span className={css.headerText}>Биелэлт</span>
            </div>
          </div>

          {productTarget && !target && (
            <div className={css.tableContent}>
              {products
                .filter((product) => product.target?.target)
                .map((product, index) => {
                  const currentMethod = product.target?.target?.amount ? "amount" : "quantity";

                  return (
                    <div key={`product-target-${product._id}`} className={css.tableRow} style={{ zIndex: products.length - index }}>
                      <div className={css.singleTableItem} style={{ width: 55 }}>
                        <div className={css.productImage}>
                          <img src={product.image[0]} alt={product.name} />
                        </div>
                      </div>

                      <div className={css.singleTableItem} style={{ width: 140 }}>
                        <span className={css.tableText}>{product.name}</span>
                      </div>

                      <div className={css.singleTableItem} style={{ width: 140 }}>
                        <span className={css.tableText}>{suppliers.find((supplier) => supplier.id === product.supplier_id)?.name}</span>
                      </div>

                      <div className={css.singleTableItem} style={{ width: 105 }}>
                        <span className={css.tableText}>{product.bar_code}</span>
                      </div>

                      <div className={css.singleTableItem} style={{ width: 80 }}>
                        <span className={css.tableText}>{product.sku}</span>
                      </div>

                      <div className={css.singleTableItem} style={{ width: 80 }}>
                        <span className={css.tableText}>{product.singlePrice.toLocaleString()}₮</span>
                      </div>

                      <div className={css.singleTableItem} style={{ width: 90 }}>
                        {product.target?.target?.amount && <span className={css.targetText}>{product.target?.target?.amount.toLocaleString()}₮</span>}
                      </div>

                      <div className={css.singleTableItem} style={{ width: 90 }}>
                        {product.target?.target?.quantity && <span className={css.targetText}>{product.target?.target?.quantity.toLocaleString()}ш</span>}
                      </div>

                      <div className={css.singleTableItem} style={{ width: 115 }}>
                        <div className={css.targetProgress}>
                          <span className={css.progressText}>
                            {product.target?.succeeded?.[currentMethod]}
                            {currentMethod === "amount" && "₮"}
                            {currentMethod === "quantity" && " ширхэг"}
                          </span>
                          <div className={css.progressBar}>
                            <div className={css.completedProgress} style={{ width: `${Math.round((product.target?.succeeded?.[currentMethod] * 100) / product.target?.target?.[currentMethod])}%` }} />
                            <div
                              className={css.pendingProgress}
                              style={{
                                left: `${Math.round((product.target?.succeeded?.[currentMethod] * 100) / product.target?.target?.[currentMethod])}%`,
                                width: `${Math.round((product.target?.waiting?.[currentMethod] * 100) / product.target?.target?.[currentMethod])}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {!productTarget && target && (
            <div className={css.tableContent}>
              {products.map((product, index) => {
                return (
                  <div key={`product-target-${product._id}`} className={css.tableRow} style={{ zIndex: products.length - index }}>
                    <div className={css.singleTableItem} style={{ width: 55 }}>
                      <div className={css.productImage}>
                        <img src={product.image[0]} alt={product.name} />
                      </div>
                    </div>

                    <div className={css.singleTableItem} style={{ width: 140 }}>
                      <span className={css.tableText}>{product.name}</span>
                    </div>

                    <div className={css.singleTableItem} style={{ width: 140 }}>
                      <span className={css.tableText}>{suppliers.find((supplier) => supplier.id === product.supplier_id)?.name}</span>
                    </div>

                    <div className={css.singleTableItem} style={{ width: 105 }}>
                      <span className={css.tableText}>{product.bar_code}</span>
                    </div>

                    <div className={css.singleTableItem} style={{ width: 80 }}>
                      <span className={css.tableText}>{product.sku}</span>
                    </div>

                    <div className={css.singleTableItem} style={{ width: 80 }}>
                      <span className={css.tableText}>{product.singlePrice.toLocaleString()}₮</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {productTarget && !target && products.length === 0 && (
            <div className={css.noProducts}>
              <TargetWhite />
              <span>Илэрц олдсонгүй</span>
            </div>
          )}
        </div>
      </div>

      <Modal width={1048} height={812} closeHandler={() => setShowEdit(false)} show={showEdit}>
        <ProductTargetEdit
          closeHandler={() => setShowEdit(false)}
          loggedUser={loggedUser}
          initCategories={initCategories}
          initBrands={initBrands}
          target={target}
          productTarget={productTarget}
          setTarget={setTarget}
          setProductTargetExist={setProductTargetExist}
          setTotalProductTargetExist={setTotalProductTargetExist}
          categoryTargetExist={categoryTargetExist}
          brandTargetExist={brandTargetExist}
          setInitProducts={setInitProducts}
        />
      </Modal>
    </>
  );
};
