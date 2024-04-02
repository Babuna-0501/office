import css from "./categoryTargetEdit.module.css";

import { Button, Checkbox, Input, LoadingSpinner, SuccessPopup } from "../../../../../components/common";

import { CloseDark, TugrugGray, TugrugGreen, TargetWhite } from "../../../../../assets/icons";

import { useEffect, useState } from "react";
import ErrorPopup from "../../../../../components/common/ErrorPopup";
import myHeaders from "../../../../../components/MyHeader/myHeader";
import UserDataHook from "../../../../../Hooks/userHook";
import { useContext } from "react";

export const CategoryTargetEdit = ({
  initCategories,
  categoryTarget,
  closeHandler,
  loggedUser,
  setTarget,
  setCategoryTargetExist,
}) => {
  const { categories } = useContext(UserDataHook);

  // const [categories, setCategories] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [errorWhileFetching, setErrorWhileFetching] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  const getData = async () => {
    try {
      setLoading(true);

      const url = `https://api2.ebazaar.mn/api/supplier/extra/data?supplierId=${loggedUser.company_id.replaceAll(
        "|",
        ""
      )}`;
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      const categoriesCopy = initCategories
        .filter((cat) => resData.data.categoryIds.includes(cat.id))
        .map((cat) => {
          const target = categoryTarget.find((tar) => tar._id === cat.id);
          if (target) {
            return { ...cat, target: { ...target.target } };
          }
          return cat;
        });

      // setCategories(categoriesCopy);
      setOriginalCategories(categoriesCopy);
      setSelectedCategories(
        categoriesCopy.filter((category) => category.target)
      );
    } catch (error) {
      setErrorWhileFetching(true);
      setErrorMsg("Алдаа гарлаа та дахин оролдоно уу!");
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let categoriesCopy = [...originalCategories];

    if (categoryName) {
      categoriesCopy = categoriesCopy.filter((category) =>
        category.name.toLowerCase().includes(categoryName.toLowerCase())
      );
    }

    // setCategories(categoriesCopy);
  }, [categoryName, originalCategories]);

  const saveHandler = () => {
    try {
      if (
        selectedCategories.filter((curCat) => curCat.target).length !==
          selectedCategories.length &&
        selectedCategories.length !== categories.length
      )
        throw new Error("Сонгосон ангилалд төлөвлөгөө оруулна уу!");

      setLoading(true);

      setTarget((prev) => ({
        ...prev,
        categories:
          selectedCategories.length === 0
            ? []
            : [
                ...prev.categories.map((curTarget) => {
                  if (
                    selectedCategories
                      .map((curCategory) => curCategory.id)
                      .includes(curTarget._id)
                  ) {
                    const current = selectedCategories.find(
                      (curCategory) => curCategory.id === curTarget._id
                    );

                    return { ...curTarget, target: { ...current.target } };
                  }
                  return curTarget;
                }),
                ...selectedCategories
                  .filter(
                    (curCat) =>
                      !prev.categories
                        .map((target) => target._id)
                        .includes(curCat.id)
                  )
                  .map((curCat) => ({
                    _id: curCat.id,
                    target: { ...curCat.target },
                    succeeded: { amount: 0, quantity: 0 },
                    waiting: { amount: 0, quantity: 0 },
                  })),
              ],
      }));

      setSuccessMsg("Ангилал төлөвлөгөө амжилттай шинэчлгэдлээ!");
      setShowSuccessMsg(true);
    } catch (error) {
      setErrorMsg(error.message ?? "Алдаа гарлаа. Та дахин оролдоно уу!");
      setShowErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Ангилал төлөвлөгөө</h1>
          <button onClick={closeHandler} className={css.closeBtn} type="button">
            <CloseDark />
          </button>
        </div>

        <div className={css.content}>
          <div
            className={css.contentHeader}
            style={{ zIndex: categories.length + 1 }}
          >
            <div
              className={css.headerItem}
              style={{
                width: 34,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Checkbox
                checked={
                  selectedCategories
                    .map((cat) => cat.id)
                    .sort()
                    .join(",") ===
                  categories
                    .map((cat) => cat.id)
                    .sort()
                    .join(",")
                }
                onChange={() => {
                  if (
                    selectedCategories
                      .map((cat) => cat.id)
                      .sort()
                      .join(",") ===
                    categories
                      .map((cat) => cat.id)
                      .sort()
                      .join(",")
                  ) {
                    setSelectedCategories([]);
                  } else {
                    setSelectedCategories([...categories]);
                  }
                }}
              />
            </div>

            <div className={css.headerItem} style={{ width: 200 }}>
              <span className={css.headerText}>Ангилал</span>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                size="small"
                placeholder="Хайх"
              />
            </div>

            <div className={css.headerItem} style={{ width: 120 }}>
              <span className={css.headerText}>Үнийн дүн төлөвлөгөө</span>
            </div>

            <div className={css.headerItem} style={{ width: 100 }}>
              {/* <span className={css.headerText}>Тоо / Ширхэг төлөвлөгөө</span> */}
            </div>
          </div>

          {!loading && categories.length > 0 && (
            <div className={css.contentBody}>
              {categories.map((category, index) => {
                return (
                  <SingleCategory
                    key={`category-target-edit-${category.id}`}
                    category={category}
                    zIndex={categories.length - index}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                );
              })}
            </div>
          )}

          {loading && (
            <div className={css.spinner}>
              <LoadingSpinner />
            </div>
          )}

          {!loading && categories.length === 0 && (
            <div className={css.notFound}>
              <TargetWhite />
              <span>Илэрц олдсонгүй</span>
            </div>
          )}
        </div>

        <div className={css.footer}>
          <Button variant="secondary" size="medium">
            Цуцлах
          </Button>
          <Button onClick={saveHandler} size="medium" width={116}>
            Хадгалах
          </Button>
        </div>
      </div>

      <ErrorPopup
        show={showErrorMsg}
        message={errorMsg}
        closeHandler={() => {
          setShowErrorMsg(false);
          setErrorMsg("");
          errorWhileFetching && getData();
        }}
      />

      <SuccessPopup
        show={showSuccessMsg}
        message={successMsg}
        closeHandler={() => {
          setShowSuccessMsg(false);
          setSuccessMsg("");
          if (selectedCategories.length === 0) setCategoryTargetExist(false);
          closeHandler();
        }}
      />
    </>
  );
};

const SingleCategory = ({
  category,
  zIndex,
  selectedCategories,
  setSelectedCategories,
}) => {
  const checked = selectedCategories
    .map((currentCat) => currentCat.id)
    .includes(category.id);

  const [amount, setAmount] = useState(
    category.target && category.target.amount ? category.target.amount : ""
  );
  const [quantity, setQuantity] = useState(
    category.target && category.target.quantity ? category.target.quantity : ""
  );

  useEffect(() => {
    if (checked && category.target) {
      if (category.target.amount) setAmount(category.target.amount);
      if (category.target.quantity) setQuantity(category.target.quantity);
    }

    if (!checked) {
      setAmount("");
      setQuantity("");
    }
  }, [checked, category]);

  const amountChangeHandler = (value) => {
    if (value) {
      setSelectedCategories((prev) =>
        prev.map((curCat) =>
          curCat.id === category.id
            ? { ...curCat, target: { amount: Number(value), quantity: null } }
            : curCat
        )
      );
    } else {
      setSelectedCategories((prev) =>
        prev.map((curCat) => {
          if (curCat.id === category.id) {
            delete curCat.target;
            return curCat;
          }
          return curCat;
        })
      );
    }
  };

  const quantityChangeHandler = (value) => {
    if (value) {
      setSelectedCategories((prev) =>
        prev.map((curCat) =>
          curCat.id === category.id
            ? { ...curCat, target: { amount: null, quantity: Number(value) } }
            : curCat
        )
      );
    } else {
      setSelectedCategories((prev) =>
        prev.map((curCat) => {
          if (curCat.id === category.id) {
            delete curCat.target;
            return curCat;
          }
          return curCat;
        })
      );
    }
  };

  return (
    <div
      className={`${css.contentRow} ${checked && css.checked}`}
      style={{ zIndex }}
    >
      <div
        className={css.contentItem}
        style={{ width: 34, justifyContent: "center" }}
      >
        <Checkbox
          checked={checked}
          onChange={() => {
            if (checked) {
              setSelectedCategories((prev) =>
                prev.filter((cat) => cat.id !== category.id)
              );
              setAmount("");
              setQuantity("");
            } else {
              setSelectedCategories((prev) => [...prev, category]);
            }
          }}
        />
      </div>

      <div className={css.contentItem} style={{ width: 200 }}>
        <span className={css.contentText}>{category.name}</span>
      </div>

      <div className={css.contentItem} style={{ width: 120 }}>
        <Input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            amountChangeHandler(e.target.value);
          }}
          disabled={!checked || quantity}
          size="small"
          placeholder="0"
          icon={amount ? <TugrugGreen /> : <TugrugGray />}
          iconposition="right"
        />
      </div>

      <div className={css.contentItem} style={{ width: 100 }}>
        {/* <Input
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            quantityChangeHandler(e.target.value);
          }}
          disabled={!checked || amount}
          size="small"
          placeholder="0"
        /> */}
      </div>
    </div>
  );
};
