import css from "./addInventory.module.css";
import LoadingSpinner from "../../components/Spinner/Spinner";

import closeIcon from "../../assets/shipment/closeIcon.svg";
import { Button, Dropdown, Input, Modal } from "./common";
import { useState } from "react";
import myHeaders from "../../components/MyHeader/myHeader";
import okIcon from "../../assets/shipment/ok.svg";

const AddInventory = (props) => {
  const { inventoriesLoading, closeHandler, userData, setInventories } = props;

  const [invenName, setInvenName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);

  const submitHandler = async () => {
    try {
      if (submitting) return;

      if (invenName === "") {
        alert("Агуулхын нэрээ оруулна уу!");
        return;
      }

      if (locationName === "") {
        alert("Байршлын нэрээ оруулна уу!");
        return;
      }

      if (selectedType === "") {
        alert("Агуулхын төрлөө сонгоно уу!");
        return;
      }

      setSubmitting(true);

      const url = `https://api2.ebazaar.mn/api/warehouse/create`;
      const body = {
        supplier:
          Number(userData.company_id.replaceAll("|", "")) === 1
            ? 13884
            : Number(userData.company_id.replaceAll("|", "")),
        name: invenName,
        location: locationName,
        type: Number(selectedType),
        origin: 2,
        manager: userData.first_name ?? userData.email,
      };
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (resData.code === 200) {
        setInventories((prev) => [...prev, { ...body, products: [] }]);
        setSubmitDone(true);
      }
    } catch (error) {
      console.log(error);
      alert("Агуулга нэмэхэд алдаа гарлаа");
    } finally {
      setSubmitting(false);
      closeHandler();
    }
  };

  return (
    <>
      {!inventoriesLoading && !submitting && (
        <div className={css.container}>
          <div className={css.headerWrapper}>
            <span className={css.title}>Агуулах нэмэх</span>

            <button onClick={closeHandler} className={css.closeBtn}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>

          <div className={css.formWrapper}>
            <div className={css.singleInput}>
              <span>Агуулахын нэр</span>
              <Input
                value={invenName}
                onChange={(e) => setInvenName(e.target.value)}
                type="text"
                size="small"
                placeholder="Агуулхын нэр"
              />
            </div>

            <div className={css.singleInput}>
              <span>Байршлын нэр</span>
              <Input
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                type="text"
                size="small"
                placeholder="Байршлын нэр"
              />
            </div>

            <div className={css.singleInput} style={{ gap: 85 }}>
              <span>Агуулахын төрөл</span>
              <Dropdown
                value={selectedType}
                onChangeHandler={setSelectedType}
                datas={[
                  { label: "Үндсэн агуулах", value: 2 },
                  { label: "Машин агуулах", value: 3 },
                ]}
              />
            </div>
          </div>

          <div className={css.btnWrapper}>
            <Button
              onClick={closeHandler}
              variant="secondary"
              size="medium"
              width={80}
            >
              Цуцлах
            </Button>
            <Button
              onClick={submitHandler}
              variant="primary"
              size="medium"
              width={116}
            >
              Нэмэх
            </Button>
          </div>
        </div>
      )}

      {(inventoriesLoading || submitting) && (
        <div className={css.loadingWrapper}>
          <LoadingSpinner />
        </div>
      )}

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
              Агуулах амжилттай нэмэгдлээ
            </span>
            <Button
              onClick={() => {
                setSubmitDone(false);
                closeHandler();
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
    </>
  );
};

export default AddInventory;
