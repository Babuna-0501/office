import css from "./tugeegchAssign.module.css";
import closeIcon from "../../assets/shipment/closeIcon.svg";
import searchIcon from "../../assets/shipment/searchIcon.svg";
import defaultProfile from "../../assets/shipment/defaultprofile.jpg";
import okIcon from "../../assets/shipment/ok.svg";
import {
  Button,
  Checkbox,
  Modal,
} from "../../Achiltiinzahialga/components/common";
import { useEffect, useState } from "react";
import myHeaders from "../../components/MyHeader/myHeader";
import LoadingSpinner from "../../components/Spinner/Spinner";
import ErrorPopup from "../../Achiltiinzahialga/components/common/ErrorPopup";

const TugeegchAssign = (props) => {
  const { orders, users, closeHandler, setChangedTugeegch } = props;

  const [tugeegchs] = useState(users.filter((user) => user.role === 2));
  const [checkedTugeegch, setCheckedTugeegch] = useState("");

  const [submitDone, setSubmitDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
    for (const order of orders) {
      const backUsers = order.back_office_user
        ? order.back_office_user.split(",")
        : [];

      for (const userId of backUsers) {
        const user = users.find((usr) => usr.user_id === Number(userId));
        if (user && user.role && user.role === 4) {
          setErrorMsg(
            "Шууд борлуулагчийн захиалгад түгээгч хувиарлах боломжгүй!"
          );
          setShowAlert(true);
          return;
        }
      }
    }
  }, [orders, users]);

  const submitHandler = async () => {
    try {
      if (submitting) return;

      if (checkedTugeegch === "") return alert("Түгээгч сонгоогүй байна");

      setErrorMsg("");
      setSuccessMsg("");

      setSubmitting(true);
      let successCount = 0;

      await Promise.all(
        orders.map(async (order) => {
          const submitUserIds = [checkedTugeegch];
          const backUsers = order.back_office_user
            ? order.back_office_user.split(",")
            : [];

          for (const user of backUsers) {
            /*if (
              [1, 4].includes(
                users.find((usr) => usr.user_id === Number(user)).role
              )
            ) {*/
              submitUserIds.push(user);
              break;
            //}
          }

          const url = `https://api2.ebazaar.mn/api/order/update/`;
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
              order_id: order.order_id,
              backOfficeUser: submitUserIds.join(","),
            }),
            redirect: "follow",
          };

          const res = await fetch(url, requestOptions);
          const resData = await res.json();

          if (resData.code === 200) {
            successCount++;
          } else {
            alert(resData.message);
          }
        })
      );

      if (successCount === orders.length) {
        setSuccessMsg("Түгээгч амжилттай хувиарлагдлаа");
        setSubmitDone(true);
      } else {
        setSuccessMsg(`${successCount} захиалгад түгээгч хувиарлагдлаа`);
        setSubmitDone(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Алдаа гарсан тул дахин оролдоно уу!");
      setShowError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.wrapper}>
          <div className={css.headerContainer}>
            <div className={css.titleWrapper}>
              <span className={css.title}>Түгээгч сонгох</span>
              <button onClick={closeHandler} className={css.closeBtn}>
                <img src={closeIcon} alt="Close" />
              </button>
            </div>

            <div className={css.searchWrapper}>
              <img src={searchIcon} alt="Search" />
              <input type="text" placeholder="Хайх..." />
            </div>
          </div>

          {!submitting && tugeegchs.length > 0 && (
            <div className={css.contentContainer}>
              <div className={css.tugeegchWrapper}>
                {tugeegchs.map((user, index) => {
                  return (
                    <TugeegchCard
                      user={user}
                      index={index}
                      checkedTugeegch={checkedTugeegch}
                      setCheckedTugeegch={setCheckedTugeegch}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {!submitting && tugeegchs.length === 0 && (
            <div className={css.notFoundText}>
              <span>Түгээгч байхгүй байна</span>
            </div>
          )}

          {submitting && (
            <div className={css.loadingWrapper}>
              <LoadingSpinner />
            </div>
          )}

          <div className={css.buttonContainer}>
            <Button
              onClick={closeHandler}
              variant="secondary"
              size="large"
              width={105}
              disabled={submitting}
            >
              Цуцлах
            </Button>

            <Button
              onClick={submitHandler}
              variant="primary"
              size="large"
              width={200}
              disabled={submitting}
            >
              Хадгалах
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
              {successMsg}
            </span>
            <Button
              onClick={() => {
                setSubmitDone(false);
                closeHandler();
                setChangedTugeegch(true);
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

      {showAlert && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => {
            setShowAlert(false);
            closeHandler();
          }}
        />
      )}

      {showError && (
        <ErrorPopup
          message={errorMsg}
          closeHandler={() => {
            setShowError(false);
          }}
        />
      )}
    </>
  );
};

export default TugeegchAssign;

const TugeegchCard = ({ user, index, checkedTugeegch, setCheckedTugeegch }) => {
  return (
    <div
      className={`${css.tugeegchCard} ${
        checkedTugeegch === user.user_id && css.checked
      }`}
    >
      <Checkbox
        checked={checkedTugeegch === user.user_id}
        variant="primary"
        id={`tugeegch-${index}`}
        onChange={(e) =>
          setCheckedTugeegch(e.target.checked ? user.user_id : "")
        }
      />

      <label htmlFor={`tugeegch-${index}`} className={css.tugeegchDetails}>
        <div className={css.tugeegchAvatar}>
          <img
            src={user.profile_picture ? user.profile_picture : defaultProfile}
            alt={user.first_name}
          />
        </div>

        <div className={css.tugeegchInfo}>
          <h1>
            {user.last_name.toUpperCase()[0]}.{user.first_name}
          </h1>
          <p>Түгээгч</p>
        </div>
      </label>
    </div>
  );
};
