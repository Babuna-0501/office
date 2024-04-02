// CSS
import css from "./singleTargetBrand.module.css";

// Components
import { Button, Input, Modal } from "../../../../../components/common";
import { useState, useEffect } from "react";
import { BrandTargetEdit } from "../Edit/BrandTargetEdit";

import { EditGray, TargetWhite } from "../../../../../assets/icons";

export const SingleTargetBrand = (props) => {
  const { initBrands, brandTarget, loggedUser, setTarget, setBrandTargetExist } = props;

  const [showEdit, setShowEdit] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSucceeded, setTotalSucceeded] = useState(0);
  const [totalWaiting, setTotalWaiting] = useState(0);

  const [brands, setBrands] = useState(
    initBrands
      .filter((brand) => brand.SupplierID === loggedUser.company_id.replaceAll("|", "") && [...new Set(brandTarget.map((target) => target._id))].includes(brand.BrandID))
      .map((brand) => {
        const currentBrandTarget = brandTarget.find((target) => target._id === brand.BrandID);
        return { ...brand, target: { ...currentBrandTarget } };
      })
  );

  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    let brandsCopy = initBrands
      .filter((brand) => brand.SupplierID === loggedUser.company_id.replaceAll("|", "") && [...new Set(brandTarget.map((target) => target._id))].includes(brand.BrandID))
      .map((brand) => {
        const currentBrandTarget = brandTarget.find((target) => target._id === brand.BrandID);
        return { ...brand, target: { ...currentBrandTarget } };
      });

    if (brandName) {
      brandsCopy = brandsCopy.filter((brand) => brand.BrandName.toLowerCase()[0] === brandName.toLowerCase()[0] && brand.BrandName.toLowerCase().includes(brandName.toLowerCase()));
    }

    setBrands(brandsCopy);
  }, [initBrands, brandName, brandTarget, loggedUser.company_id]);

  useEffect(() => {
    let totalAmountCopy = 0;
    let totalSuccededCopy = 0;
    let totalWaitingCopy = 0;

    for (const target of brandTarget) {
      if (target.target.amount) {
        totalAmountCopy += target.target.amount;
        totalSuccededCopy += target.succeeded.amount;
        totalWaitingCopy += target.waiting.amount;
      }
    }

    setTotalAmount(totalAmountCopy);
    setTotalSucceeded(totalSuccededCopy);
    setTotalWaiting(totalWaitingCopy);
  }, [brandTarget]);

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Брэнд төлөвлөгөө</h1>

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
          <div className={css.tableHeader} style={{ zIndex: 101 }}>
            <div className={css.singleHeaderItem} style={{ width: 55 }}>
              <span className={css.headerText}>Лого</span>
            </div>

            <div className={css.singleHeaderItem} style={{ width: 140 }}>
              <span className={css.headerText}>Брэнд нэр</span>
              <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} size="small" placeholder="Хайх" />
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

          {brands.length > 0 && (
            <div className={css.tableContent}>
              {brands.map((brand, index) => {
                const currentMethod = brand.target.target.amount ? "amount" : "quantity";

                return (
                  <div key={`product-target-${index}`} className={css.tableRow} style={{ zIndex: brands.length - index }}>
                    <div className={css.singleTableItem} style={{ width: 55 }}>
                      <div className={css.productImage}>
                        <img src={brand.Image} alt={brand.BrandName} />
                      </div>
                    </div>

                    <div className={css.singleTableItem} style={{ width: 140 }}>
                      <span className={css.tableText}>{brand.BrandName}</span>
                    </div>

                    <div className={css.singleTableItem} style={{ width: 90 }}>
                      {brand.target.target.amount && <span className={css.targetText}>{brand.target.target.amount.toLocaleString()}₮</span>}
                    </div>

                    <div className={css.singleTableItem} style={{ width: 90 }}>
                      {brand.target.target.quantity && <span className={css.targetText}>{brand.target.target.quantity.toLocaleString()}ш</span>}
                    </div>

                    <div className={css.singleTableItem} style={{ width: 115 }}>
                      <div className={css.targetProgress}>
                        <span className={css.progressText}>
                          {brand.target.succeeded[currentMethod].toLocaleString()}
                          {currentMethod === "amount" && "₮"}
                          {currentMethod === "quantity" && " ширхэг"}
                        </span>
                        <div className={css.progressBar}>
                          <div className={css.completedProgress} style={{ width: `${Math.round((brand.target.succeeded[currentMethod] * 100) / brand.target.target[currentMethod])}%` }} />
                          <div
                            className={css.pendingProgress}
                            style={{
                              left: `${Math.round((brand.target.succeeded[currentMethod] * 100) / brand.target.target[currentMethod])}%`,
                              width: `${Math.round((brand.target.waiting[currentMethod] * 100) / brand.target.target[currentMethod])}%`,
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

          {brands.length === 0 && (
            <div className={css.noProducts}>
              <TargetWhite />
              <span>Илэрц олдсонгүй</span>
            </div>
          )}
        </div>
      </div>

      <Modal show={showEdit} closeHandler={() => setShowEdit(false)} width={631} height={816}>
        <BrandTargetEdit
          closeHandler={() => setShowEdit(false)}
          initBrands={initBrands}
          brandTarget={brandTarget}
          loggedUser={loggedUser}
          setTarget={setTarget}
          setBrandTargetExist={setBrandTargetExist}
        />
      </Modal>
    </>
  );
};
