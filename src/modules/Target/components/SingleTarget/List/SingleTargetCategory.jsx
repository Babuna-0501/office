// CSS
import css from "./singleTargetCategory.module.css";

// Components
import { Button, Input, Modal } from "../../../../../components/common";
import { useState, useEffect } from "react";

import { EditGray, TargetWhite } from "../../../../../assets/icons";
import { CategoryTargetEdit } from "../Edit/CategoryTargetEdit";

export const SingleTargetCategory = (props) => {
  const { initCategories, categoryTarget, loggedUser, setCategoryTargetExist, setTarget } = props;

  const [categories, setCategories] = useState(
    initCategories
      .filter((category) => [...new Set(categoryTarget.map((cat) => cat._id))].includes(category.id))
      .map((category) => {
        const currentCategoryTarget = categoryTarget.find((target) => target._id === category.id);
        return { ...category, target: { ...currentCategoryTarget } };
      })
  );

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSucceeded, setTotalSucceeded] = useState(0);
  const [totalWaiting, setTotalWaiting] = useState(0);

  const [categoryName, setCategoryName] = useState("");

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    let categoryCopy = initCategories
      .filter((category) => [...new Set(categoryTarget.map((cat) => cat._id))].includes(category.id))
      .map((category) => {
        const currentCategoryTarget = categoryTarget.find((target) => target._id === category.id);
        return { ...category, target: { ...currentCategoryTarget } };
      });

    if (categoryName) {
      categoryCopy = categoryCopy.filter((category) => category.name.toLowerCase()[0] === categoryName.toLowerCase()[0] && category.name.toLowerCase().includes(categoryName.toLowerCase()));
    }

    setCategories(categoryCopy);
  }, [initCategories, categoryName, categoryTarget]);

  useEffect(() => {
    let totalAmountCopy = 0;
    let totalSucceededCopy = 0;
    let totalWaitingCopy = 0;

    for (const target of categoryTarget) {
      if (target.target.amount) {
        totalAmountCopy += target.target.amount;
        totalSucceededCopy += target.succeeded.amount;
        totalWaitingCopy += target.waiting.amount;
      }
    }

    setTotalAmount(totalAmountCopy);
    setTotalSucceeded(totalSucceededCopy);
    setTotalWaiting(totalWaitingCopy);
  }, [categoryTarget]);

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Ангилал төлөвлөгөө</h1>

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
          <div className={css.tableHeader} style={{ zIndex: categories.length + 1 }}>
            <div className={css.singleHeaderItem} style={{ width: 140 }}>
              <span className={css.headerText}>Ангилалын нэр</span>
              <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} size="small" placeholder="Хайх" />
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

          {categories.length > 0 && (
            <div className={css.tableContent}>
              {categories.map((category, index) => {
                const currentMethod = category.target.target.amount ? "amount" : "quantity";
                const succeededPercentage = category.target.succeeded[currentMethod] === 0 ? 0 : Math.round((category.target.succeeded[currentMethod] * 100) / category.target.target[currentMethod]);
                const waitingPercentage = category.target.waiting[currentMethod] === 0 ? 0 : Math.round((category.target.waiting[currentMethod] * 100) / category.target.target[currentMethod]);

                return (
                  <div key={`product-target-${index}`} className={css.tableRow} style={{ zIndex: categories.length - index }}>
                    <div className={css.singleTableItem} style={{ width: 140 }}>
                      <span className={css.tableText}>{category.name}</span>
                    </div>

                    <div className={css.singleTableItem} style={{ width: 90 }}>
                      {category.target.target.amount && <span className={css.targetText}>{category.target.target.amount.toLocaleString()}₮</span>}
                    </div>

                    <div className={css.singleTableItem} style={{ width: 90 }}>
                      {category.target.target.quantity && <span className={css.targetText}>{category.target.target.quantity.toLocaleString()}ш</span>}
                    </div>

                    <div className={css.singleTableItem} style={{ width: 115 }}>
                      <div className={css.targetProgress}>
                        <span className={css.progressText}>
                          {category.target.succeeded[currentMethod].toLocaleString()}
                          {currentMethod === "amount" && "₮"}
                          {currentMethod === "quantity" && " ширхэг"}
                        </span>
                        <div className={css.progressBar}>
                          <div className={css.completedProgress} style={{ width: `${succeededPercentage}%` }} />
                          <div className={css.pendingProgress} style={{ left: `${succeededPercentage}%`, width: `${waitingPercentage}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {categories.length === 0 && (
            <div className={css.noProducts}>
              <TargetWhite />
              <span>Илэрц олдсонгүй</span>
            </div>
          )}
        </div>
      </div>

      <Modal show={showEdit} width={631} height={816} closeHandler={() => setShowEdit(false)}>
        <CategoryTargetEdit
          initCategories={initCategories}
          categoryTarget={categoryTarget}
          closeHandler={() => setShowEdit(false)}
          loggedUser={loggedUser}
          setCategoryTargetExist={setCategoryTargetExist}
          setTarget={setTarget}
        />
      </Modal>
    </>
  );
};
