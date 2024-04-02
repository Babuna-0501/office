import React, { useEffect, useContext, useState } from "react";
import css from "./register.module.css";
import closeIcon from "../../assets/close.svg";
import arrowIcon from "../../assets/Arrow - Left.svg";
import MerchantReportHook from "../../Hooks/MerchantReportHook";
import MerchantRegisterHook from "../../Hooks/MerchantRegisterHook";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";

const Register = ({ data }) => {
  console.log("data", data);

  const [acitve, setActive] = useState(null);
  const [delgerengui, setDelgerengui] = useState(false);

  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    active: "",
    companyType: "",
    companyName: "",
    companyRegisterNo: "",
    businessType: "",
    shopName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    locationCity: "",
    locationDistrict: "",
    locationKhoroo: "",
    address: "",
  });
  const FormTitles = ["ААН-ийн төрөл сонгох", "Үйлчилгээний цэгийн мэдээлэл"];
  const merRegisterctx = useContext(MerchantRegisterHook);

  // useEffect(() => {
  //   setBusType(data.businessType);
  // }, [data]);
  const closeHandler = () => {
    if (delgerengui === false) {
      merRegisterctx.setNewMerchant(false);
    }
    if (delgerengui) {
      setDelgerengui(false);
    }
  };

  const nextHandler = () => {
    setDelgerengui(true);
  };
  const nextTrueHandler = () => {};
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <SignUpInfo
          formData={formData}
          setFormData={setFormData}
          setActive={setActive}
          active={acitve}
        />
      );
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    }
  };

  const merchantSubmitted = () => {
    console.log("formdata", formData);
  };
  // console.log("page", page);

  return (
    <div className={css.container}>
      <div className={css.firstwrapper}></div>
      <div className={css.secondwrapper}>
        <div className={css.wrapper}>
          <div className={css.one}>
            <span
              className={css.arrowcontainer}
              onClick={() => {
                if (page === 0) {
                  return;
                } else {
                  setPage((currPage) => currPage - 1);
                  // console.log("daragdlaa -1");
                }
              }}
            >
              {" "}
              <img src={arrowIcon} alt="arrow button" />
            </span>
            <h4>{FormTitles[page]}</h4>
            <img src={closeIcon} alt="close button" onClick={closeHandler} />
          </div>

          <div className={css.bodyNew}>{PageDisplay()}</div>
        </div>
        <div
          className={`${css.buttonwrapper} ${
            formData.companyType !== "" ? css.active : null
          }`}
        >
          {page === 0 ? (
            <button
              onClick={() => {
                if (
                  formData.companyType.length !== 0 &&
                  formData.companyRegisterNo.length !== 0 &&
                  formData.companyName.length !== 0
                ) {
                  setPage(1);
                } else {
                  alert("Та мэдээлэлээ бөглөнө үү");
                  return;
                }
              }}
            >
              Үргэлжлэх
            </button>
          ) : null}
          {page === 1 ? (
            <button
              onClick={() => {
                if (formData.companyType === "") {
                  alert("Та үйл ажиллагааны төрөлөө сонгоно уу...");
                  return;
                }
                if (formData.companyName.length === 0) {
                  alert("Та үйлчилгээний цэгийн мэдээлэлээ оруулна уу...");
                  return;
                }
                if (formData.companyRegisterNo.length === 0) {
                  alert(
                    "Та үйлчилгээний цэгийн регистрийн дугаар оруулна уу..."
                  );
                  return;
                }
                if (formData.shopName.length === 0) {
                  alert("Та үйлчилгээний цэгийн нэрээ оруулна уу...");
                  return;
                }
                if (formData.phoneNumber1.length !== 8) {
                  alert("Та утасны дугаар 8 оронтой оруулна уу...");
                  return;
                }
                if (
                  formData.phoneNumber2 &&
                  formData.phoneNumber2.length !== 8
                ) {
                  alert("Та утасны дугаар 8 оронтой оруулна уу...");
                  return;
                }

                if (formData.locationCity.length === 0) {
                  alert("Та аймаг хот сонгоно уу...");
                  return;
                }
                if (formData.locationDistrict.length === 0) {
                  alert("Та сум дүүрэг сонгоно уу...");
                  return;
                }
                if (formData.address.length === 0) {
                  alert("Та дэлгэрэнгүй хаягаа оруулна уу...");
                  return;
                }
                console.log("form data", formData);
              }}
            >
              Үргэлжлэх
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Register;
