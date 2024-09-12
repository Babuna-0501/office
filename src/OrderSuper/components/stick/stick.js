import React, { useState, useEffect } from "react";
import myHeaders from "../MyHeader/myHeader";
import "./stick.css";

const Stick = (props) => {

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button
        onClick={togglePopup}
        style={{
          height: "35px",
          fontSize: "14px",
          padding: "5px",
          border: "none",
          background: "rgb(118, 204, 51)",
          color: "#fff",
          borderRadius: "5px",
          marginTop: "3px",
        }}
      >
       Захиалгын багана
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="stick-wrapper">
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
               Багана сонгох
              </h2>
              <div className="stick_wrapper">
                <div><input type="checkbox"/>Дугаар</div>
                <div><input type="checkbox"/>Статус</div>
                <div><input type="checkbox"/>Захиалга</div>
                <div><input type="checkbox"/>Захиалсан өдөр</div>
                <div><input type="checkbox"/>Хүргүүлэх өдөр</div>
                <div><input type="checkbox"/>Төлбөр</div>
                <div><input type="checkbox"/>Тэмдэглэл</div>
                <div><input type="checkbox"/>Утас</div>
                <div><input type="checkbox"/>Захиалсан</div>
                <div><input type="checkbox"/>Суваг</div>
                <div><input type="checkbox"/>Хот/аймаг</div>
                <div><input type="checkbox"/>Дүүрэг/сум</div>
                <div><input type="checkbox"/>Хороо</div>
                <div><input type="checkbox"/>Дэлгэрэнгүй хаяг</div>
                <div><input type="checkbox"/>Төлбөрийн хэлбэр</div>
                <div><input type="checkbox"/>Pick Pack</div>
                <div><input type="checkbox"/>Origin</div>
                <div><input type="checkbox"/>VAT</div>
                <div><input type="checkbox"/>ХТ код/нэр</div>
                <div><input type="checkbox"/>Түгээгч код/нэр</div>
                <div><input type="checkbox"/>Менежер</div>
                <div><input type="checkbox"/>Буцаалт</div>
              </div>
            </div>
            <div className="footer" style={{ display: "flex", gap: "30px" }}>
              <button
                style={{
                  background: "#2ab674",
                }}
              >
                Хадгалах
              </button>
              <button onClick={togglePopup}>Хаах</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stick;
