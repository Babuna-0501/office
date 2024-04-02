import React, { useState, useEffect } from "react";
import css from "./signupinfo.module.css";

import checkedIcon from "../../assets/check box_checked.svg";
import checkboxIcon from "../../assets/check box.svg";

function SignUpInfo({ formData, setFormData }) {
  const [active, setActive] = useState(null);
  const data = [
    { id: 1, name: "Аж ахуйн нэгж" },
    { id: 2, name: "Татвар төлөгч иргэн" },
  ];
  const activeHandler = (a, b) => {
    // console.log(" seleected aaa", a);
    console.log(" seleected index b", b);

    setActive(b);
    setFormData({
      ...formData,
      companyType: a.id,
      active: b,
    });
  };
  console.log("active", active);
  return (
    <div className={css.container}>
      {data.map((item, i) => {
        return (
          <div
            className={`${css.thiree} ${
              formData.active === i ? css.backgroundColor : null
            }`}
            onClick={() => activeHandler(item, i)}
            key={i}
          >
            <span>{item.name}</span>
            <img
              src={formData.active === i ? checkedIcon : checkboxIcon}
              alt="check box"
            />
          </div>
        );
      })}

      {formData.active !== "" && (
        <div>
          <div className={css.garchig}>
            {active === 0 ? "Байгууллагын мэдээлэл" : "Хэрэглэгчийн мэдээлэл"}
          </div>
          <div className={css.inputwrapper}>
            <input
              value={formData.companyName}
              onChange={(event) =>
                setFormData({ ...formData, companyName: event.target.value })
              }
              placeholder={
                active === 0 ? "Байгуулагийн нэр" : "Хэрэглэгчийн нэр"
              }
            />
          </div>
          <div className={css.inputwrapper}>
            <input
              onChange={(event) =>
                setFormData({
                  ...formData,
                  companyRegisterNo: event.target.value,
                })
              }
              value={formData.companyRegisterNo}
              placeholder={
                active === 0 ? "ААН-ийн регистрийн дугаар" : "Регистрийн дугаар"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpInfo;
