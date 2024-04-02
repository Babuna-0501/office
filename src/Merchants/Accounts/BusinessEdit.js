import { useState } from "react";
import css from "./businessedit.module.css";
import myHeaders from "../../components/MyHeader/myHeader";

const BusinessEdit = (props) => {
  let item = props.data;
  const [register, setRegister] = useState(item.register);
  const [businessName, setBusinessName] = useState(item.businessName);
  const [companyName, setCompanyName] = useState(item.companyName);
  const [createdDate, setCreatedDate] = useState(item.createdDate);
  const url = `https://api2.ebazaar.mn/businesses?customerId=${item.customerId}`;

  const handleSave = () => {
    fetch(url, {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({
        register: register === item.register ? "" : register,
        businessName: businessName === item.businessName ? "" : businessName,
        companyName: companyName === item.companyName ? "" : companyName,
        createdDate: createdDate === item.createdDate ? "" : createdDate,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "success") {
          alert("put success");
          props.getRequest();
          props.setToggleEdit(!props.toggleEdit);
        } else if (response.data) {
          alert(response.message);
        } else {
          alert("error");
        }
      });
  };

  return (
    <>
      <div className={css.card}>
        <label className={css.label}>ID</label>
        <input className={css.information} type="number" value={item.customerId} disabled />
      </div>

      <div className={css.card}>
        <label className={css.label}>Регистр </label>
        <input
          className={css.information}
          type="text"
          value={register}
          onChange={(e) => {
            setRegister(e.target.value);
          }}
          disabled
        />
      </div>

      <div className={css.card}>
        <label className={css.label}>Бизнес нэр </label>
        <input
          className={css.information}
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      <div className={css.card}>
        <label className={css.label}>Компани нэр</label>
        <input
          className={css.information}
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className={css.card}>
        <label className={css.label}>Үүссэн өдөр</label>
        <input
          className={css.information}
          type="text"
          value={createdDate?.substring(0, 10)}
          onChange={(e) => setCreatedDate(e.target.value)}
          disabled
        />
      </div>

      <button className={css.saveBtn} onClick={handleSave}>
        Хадгалах
      </button>
    </>
  );
};
export default BusinessEdit;
