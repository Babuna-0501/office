// CSS
import css from "./brandTargetAdd.module.css";

// Images
import { CloseDark, TugrugGray, TugrugGreen, TargetWhite } from "../../../../../assets/icons";

// Components
import { Button, Checkbox, Input, SuccessPopup } from "../../../../../components/common";
import { useState, useEffect } from "react";
import ErrorPopup from "../../../../../components/common/ErrorPopup";

export const BrandTargetAdd = (props) => {
  const {
    closeHandler,
    brands: initBrands,
    loggedUser,
    setTarget,
    setTargetExist,
    setBrandTargetExist,
  } = props;

  const [brands, setBrands] = useState(
    initBrands.filter(
      (brand) => brand.SupplierID === loggedUser.company_id.replaceAll("|", "")
    )
  );
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [brandName, setBrandName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {
    let brandsCopy = initBrands.filter(
      (brand) => brand.SupplierID === loggedUser.company_id.replaceAll("|", "")
    );

    if (brandName) {
      brandsCopy = brandsCopy.filter((brand) =>
        brand.BrandName.toLowerCase().includes(brandName.toLowerCase())
      );
    }

    setBrands(brandsCopy);
  }, [brandName, initBrands, loggedUser.company_id]);

  const saveHandler = () => {
    try {
      if (selectedBrands.length === 0) throw new Error("Брэнд сонгоно уу!");
      if (
        selectedBrands.filter((brand) => brand.target).length !==
          selectedBrands.length &&
        selectedBrands.length !== brands.length
      )
        throw new Error("Сонгосон брэндэд төлөвлөгөө оруулна уу!");

      setTarget((prev) => ({
        ...prev,
        brands: selectedBrands.map((brand) => ({
          _id: brand.BrandID,
          target: { ...brand.target },
          succeeded: { amount: 0, quantity: 0 },
          waiting: { amount: 0, quantity: 0 },
        })),
        type: 1,
      }));

      setSuccessMsg("Брэнд төлөвлөгөө амжилттай үүслээ.");
      setTargetExist(true);
      setBrandTargetExist(true);
      setShowSuccessMsg(true);
    } catch (error) {
      setErrorMsg(error.message);
      setShowErrorMsg(true);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Брэнд төлөвлөгөө</h1>

          <button className={css.closeBtn} type="button" onClick={closeHandler}>
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
                    setSelectedBrands(brands);
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
                  <SingleBrand
                    key={`target-brand-${brand.BrandID}`}
                    zIndex={brands.length - index}
                    brand={brand}
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
          <Button
            onClick={saveHandler}
            variant="primary"
            size="medium"
            width={116}
          >
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
        }}
      />

      <SuccessPopup
        show={showSuccessMsg}
        message={successMsg}
        closeHandler={() => {
          setShowSuccessMsg(false);
          setSuccessMsg("");
          closeHandler();
        }}
      />
    </>
  );
};

const SingleBrand = ({ brand, zIndex, selectedBrands, setSelectedBrands }) => {
  const checked = selectedBrands
    .map((curBrand) => curBrand.BrandID)
    .includes(brand.BrandID);

  const [amount, setAmount] = useState(brand.target ? brand.target.amount : "");
  const [quantity, setQuantity] = useState(
    brand.target ? brand.target.quantity : ""
  );

  useEffect(() => {
    if (amount) {
      setSelectedBrands((prev) =>
        prev.map((curBrand) =>
          curBrand.BrandID === brand.BrandID
            ? {
                ...curBrand,
                target: { amount: Number(amount), quantity: null },
              }
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
  }, [amount, brand, setSelectedBrands]);

  useEffect(() => {
    if (quantity) {
      setSelectedBrands((prev) =>
        prev.map((curBrand) =>
          curBrand.BrandID === brand.BrandID
            ? {
                ...curBrand,
                target: { amount: null, quantity: Number(quantity) },
              }
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
  }, [quantity, brand, setSelectedBrands]);

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
          onChange={(e) => setAmount(e.target.value)}
          disabled={!checked || quantity}
          size="small"
          placeholder="0"
          icon={amount ? <TugrugGreen /> : <TugrugGray />}
          iconposition="right"
        />
      </div>

      <div className={css.contentItem} style={{ width: 100 }}>
        {/* <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled={!checked || amount} size="small" placeholder="0" /> */}
      </div>
    </div>
  );
};
