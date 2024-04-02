import css from "./brandTargetEdit.module.css";

import { CloseDark, TugrugGray, TugrugGreen, TargetWhite } from "../../../../../assets/icons";
import { Button, Checkbox, Input, SuccessPopup } from "../../../../../components/common";
import { useState, useEffect } from "react";
import ErrorPopup from "../../../../../components/common/ErrorPopup";

export const BrandTargetEdit = ({
  closeHandler,
  initBrands,
  brandTarget,
  loggedUser,
  setTarget,
  setBrandTargetExist,
}) => {
  const [brands, setBrands] = useState(
    initBrands
      .filter(
        (brand) =>
          brand.SupplierID === loggedUser.company_id.replaceAll("|", "")
      )
      .map((brand) => {
        const curTarget = brandTarget.find(
          (curBrand) => curBrand._id === brand.BrandID
        );
        if (curTarget) return { ...brand, target: { ...curTarget.target } };
        return brand;
      })
      .sort((a, b) =>
        a.hasOwnProperty("target") ? -1 : b.hasOwnProperty("target") ? 1 : 0
      )
  );
  const [selectedBrands, setSelectedBrands] = useState(
    brands.filter((brand) => brand.target)
  );

  const [brandName, setBrandName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErroMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {
    return () => {
      setBrands([]);
      setSelectedBrands([]);
    };
  }, []);

  useEffect(() => {
    let brandsCopy = initBrands
      .filter(
        (brand) =>
          brand.SupplierID === loggedUser.company_id.replaceAll("|", "")
      )
      .map((brand) => {
        const curTarget = brandTarget.find(
          (curBrand) => curBrand._id === brand.BrandID
        );
        if (curTarget) return { ...brand, target: { ...curTarget.target } };
        return brand;
      })
      .sort((a, b) =>
        a.hasOwnProperty("target") ? -1 : b.hasOwnProperty("target") ? 1 : 0
      );

    if (brandName) {
      brandsCopy = brandsCopy.filter((brand) =>
        brand.BrandName.toLowerCase().includes(brandName.toLowerCase())
      );
    }

    setBrands(brandsCopy);
  }, [brandName, brandTarget, initBrands, loggedUser.company_id]);

  const saveHandler = () => {
    try {
      if (
        selectedBrands.filter((brand) => brand.target).length !==
          selectedBrands.length &&
        selectedBrands.length !== brands.length
      )
        throw new Error("Сонгосон брэндэд төлөвлөгөө оруулна уу!");

      setTarget((prev) => ({
        ...prev,
        brands:
          selectedBrands.length === 0
            ? []
            : [
                ...prev.brands.map((curTarget) => {
                  if (
                    selectedBrands
                      .map((curBrand) => curBrand.BrandID)
                      .includes(curTarget._id)
                  ) {
                    const current = selectedBrands.find(
                      (brand) => brand.BrandID === curTarget._id
                    );

                    return { ...curTarget, target: { ...current.target } };
                  }
                  return curTarget;
                }),
                ...selectedBrands
                  .filter(
                    (brand) =>
                      !prev.brands
                        .map((target) => target._id)
                        .includes(brand.BrandID)
                  )
                  .map((brand) => ({
                    _id: brand.BrandID,
                    target: { ...brand.target },
                    succeeded: { amount: 0, quantity: 0 },
                    waiting: { amount: 0, quantity: 0 },
                  })),
              ],
      }));

      setSuccessMsg("Брэнд төлөвлөгөө амжилттай шинэчлгэдлээ.");
      setShowSuccessMsg(true);
    } catch (error) {
      setErrorMsg(error.message ?? "Алдаа гарлаа. Та дахин оролдоно уу!");
      setShowErroMsg(true);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Брэнд төлөвлөгөө</h1>

          <button type="button" onClick={closeHandler} className={css.closeBtn}>
            <CloseDark />
          </button>
        </div>

        <div className={css.content}>
          <div
            className={css.contentHeader}
            style={{ zIndex: brands.length + 1 }}
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
                  selectedBrands
                    .map((brand) => brand.BrandID)
                    .sort()
                    .join(",") ===
                  brands
                    .map((brand) => brand.BrandID)
                    .sort()
                    .join(",")
                }
                onChange={() => {
                  if (
                    selectedBrands
                      .map((brand) => brand.BrandID)
                      .sort()
                      .join(",") ===
                    brands
                      .map((brand) => brand.BrandID)
                      .sort()
                      .join(",")
                  ) {
                    setSelectedBrands([]);
                  } else {
                    setSelectedBrands([...brands]);
                  }
                }}
              />
            </div>

            <div className={css.headerItem} style={{ width: 55 }}>
              <span className={css.headerText}>Лого</span>
            </div>

            <div className={css.headerItem} style={{ width: 200 }}>
              <span className={css.headerText}>Брэнд</span>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
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

          {brands.length > 0 && (
            <div className={css.contentBody}>
              {brands.map((brand, index) => {
                return (
                  <SingleTarget
                    key={`target-brand-edit-${brand.BrandID}`}
                    brand={brand}
                    zIndex={brands.length - index}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                  />
                );
              })}
            </div>
          )}

          {brands.length === 0 && (
            <div className={css.notFound}>
              <TargetWhite />
              <span>Илэрц олдсонгүй</span>
            </div>
          )}
        </div>

        <div className={css.footer}>
          <Button onClick={closeHandler} variant="secondary" size="medium">
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
          setShowErroMsg(false);
          setErrorMsg("");
        }}
      />

      <SuccessPopup
        show={showSuccessMsg}
        message={successMsg}
        closeHandler={() => {
          setShowSuccessMsg(false);
          setSuccessMsg("");
          if (selectedBrands.length === 0) setBrandTargetExist(false);
          closeHandler();
        }}
      />
    </>
  );
};

const SingleTarget = ({ brand, zIndex, selectedBrands, setSelectedBrands }) => {
  const checked = selectedBrands
    .map((curBrand) => curBrand.BrandID)
    .includes(brand.BrandID);

  const [amount, setAmount] = useState(
    brand.target && brand.target.amount ? brand.target.amount : ""
  );
  const [quantity, setQuantity] = useState(
    brand.target && brand.target.quantity ? brand.target.quantity : ""
  );

  useEffect(() => {
    if (checked && brand.target) {
      if (brand.target.amount) setAmount(brand.target.amount);
      if (brand.target.quantity) setQuantity(brand.target.quantity);
    }

    if (!checked) {
      setAmount("");
      setQuantity("");
    }
  }, [brand, checked]);

  const amountChangeHandler = (value) => {
    if (value) {
      setSelectedBrands((prev) =>
        prev.map((curBrand) =>
          curBrand.BrandID === brand.BrandID
            ? { ...curBrand, target: { amount: Number(value), quantity: null } }
            : curBrand
        )
      );
    } else {
      setSelectedBrands((prev) =>
        prev.map((curBrand) => {
          if (curBrand.BrandID === brand.BrandID) {
            delete curBrand.target;
            return curBrand;
          }
          return curBrand;
        })
      );
    }
  };

  const quantityChangeHandler = (value) => {
    if (value) {
      setSelectedBrands((prev) =>
        prev.map((curBrand) =>
          curBrand.BrandID === brand.BrandID
            ? { ...curBrand, target: { amount: null, quantity: Number(value) } }
            : curBrand
        )
      );
    } else {
      setSelectedBrands((prev) =>
        prev.map((curBrand) => {
          if (curBrand.BrandID === brand.BrandID) {
            delete curBrand.target;
            return curBrand;
          }
          return curBrand;
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
              setSelectedBrands((prev) =>
                prev.filter((curBrand) => curBrand.BrandID !== brand.BrandID)
              );
              setAmount("");
              setQuantity("");
            } else {
              setSelectedBrands((prev) => [...prev, brand]);
            }
          }}
        />
      </div>

      <div className={css.contentItem} style={{ width: 55 }}>
        <div className={css.brandLogo}>
          <img src={brand.Image} alt={brand.BrandName} />
        </div>
      </div>

      <div className={css.contentItem} style={{ width: 200 }}>
        <span className={css.contentText}>{brand.BrandName}</span>
      </div>

      <div className={css.contentItem} style={{ width: 120 }}>
        <Input
          type="number"
          value={amount}
          disabled={quantity || !checked}
          onChange={(e) => {
            setAmount(e.target.value);
            amountChangeHandler(e.target.value);
          }}
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
          disabled={amount || !checked}
          onChange={(e) => {
            setQuantity(e.target.value);
            quantityChangeHandler(e.target.value);
          }}
          size="small"
          placeholder="0"
        /> */}
      </div>
    </div>
  );
};
