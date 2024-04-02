import React, { useContext, useState, useEffect } from "react";
import css from "./passwordchange.module.css";
import UserDataHook from "../../Hooks/userHook";
const PasswordChange = () => {
  const userCtx = useContext(UserDataHook);
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [errorOne, setErrorOne] = useState("");
  const [errorTwo, setErrorTwo] = useState("");
  const [error, setError] = useState("");

  const passwordChangeHandler = () => {
    userCtx.setPasswordChangeShow(false);
    setErrorOne("");
    setError("");
    setErrorTwo("");
    setPasswordOne("");
    setPasswordTwo("");
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorOne("");
      setError("");
      setErrorTwo("");
      setPasswordOne("");
      setPasswordTwo("");
    }, 1500);
  }, [errorOne]);
  useEffect(() => {
    setTimeout(() => {
      setErrorTwo("");
      setErrorOne("");
      setError("");
      setPasswordOne("");
      setPasswordTwo("");
    }, 1500);
  }, [errorTwo]);
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setErrorTwo("");
      setErrorOne("");
      setPasswordOne("");
      setPasswordTwo("");
    }, 2000);
  }, [error]);
  const passwordChangeHandlerFetch = () => {
    if (passwordOne.length <= 3) {
      setErrorOne("Таны нууц үг богино байна!.");
      return;
    } else if (passwordTwo.length <= 3) {
      setErrorTwo("Таны нууц үг богино байна!.");
      return;
    } else if (passwordOne === passwordTwo) {
      setError("Таны шинэ нууц үг ижил байна!.");
      return;
    } else {
      var myHeaders = new Headers();
      myHeaders.append(
        "ebazaar_token",
        localStorage.getItem("ebazaar_admin_token")
      );
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        oldpassword: passwordOne,
        newpassword: passwordTwo,
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`https://api2.ebazaar.mn/api/user/change_password`, requestOptions)
        .then((r) => r.json())
        .then((response) => {
          // console.log("response", response);
          if (response.code === 200) {
            alert("Нууц үг амжилттай солигдлоо.......");
            setPasswordOne(null);
            setPasswordTwo(null);
            userCtx.setPasswordChangeShow(false);
            window.location.href("/");
          } else if (response.code !== 200) {
            setError(response.message);
            setPasswordOne("");
            setPasswordTwo("");
            alert(`Таны нууц үг солиход алдаа гарлаа!. ${response.message}`);
            // userCtx.setPasswordChangeShow(false);
            // window.location.href("/");
          }
        })
        .catch((error) => {
          console.log("password change error ", error);
          // setError(error.message);
        });
    }
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div>
          <span className={css.spanName}>Та өөрийн нууц үгээ оруулна уу </span>
          <div className={css.inputContainer}>
            <input
              minLength={4}
              placeholder="Та хуучин нууц үгээ оруулна уу"
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              type="password"
            />
          </div>
          {errorOne && <div className={css.errorSUB}>{errorOne}</div>}
        </div>

        <div>
          <span className={css.spanName}>Та шинэ нууц үгээ оруулна уу </span>{" "}
          <div className={css.inputContainer}>
            <input
              minLength={4}
              placeholder="Та шинэ нууц үгээ оруулна уу"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              type="password"
            />
          </div>
          {errorTwo && <div className={css.errorSUB}>{errorTwo}</div>}
        </div>
        {error && <div className={css.error}>{error}</div>}
        <div className={css.buttonsContainer}>
          <div>
            <button onClick={passwordChangeHandlerFetch} className={css.btn}>
              Нууц үг солих
            </button>
          </div>
          <div>
            <button onClick={passwordChangeHandler} className={css.btnCancel}>
              Цуцлах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
