import React from "react";
import css from "./returnsidebar.module.css";
import homeShop from "../assets/homeDelguur.svg";
import closeBtn from "../assets/close.svg";
import zoomInIcon from "../assets/zoom in.svg";
import zoomOutIcon from "../assets/zoom out.svg";
import ArrowRight from "../assets/Arrow - Right.svg";
import ArrowLeft from "../assets/Arrow - Left.svg";
import myHeaders from "../components/MyHeader/myHeader";
const ReturnSidebar = (props) => {
  // console.log(props);
  const cancelFunction = () => {
    props.setTailbar(true);
    props.setReturnShow(false);
  };
  const approveFunction = () => {
    var raw = JSON.stringify({
      status_id: 2,
      return_id: props.oneProduct[0].return_id,
      additional_detail: "Амжилттай зөвшөөрөв",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    fetch("https://api2.ebazaar.mn/api/returnproduct/update", requestOptions)
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "Хүсэлт амжилттай үүссэн.") {
          alert("Хүсэлт амжилттай үүссэн.");
          props.setReturnShow(false);
        } else {
          alert("Алдаа гарлаа.");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  let dateReturn =
    props.oneProduct[0].created_date !== null
      ? props.oneProduct[0].created_date.split("T")[0]
      : "";
  return (
    <div className={css.tailbar}>
      <div className={css.modal}>
        <div id="bg">
          <div id="foo">
            <div className={css.containerMain}>
              <h1
                style={{ color: "#37474F", fontSize: "20px", fontWeight: 700 }}
              >
                {props.oneProduct[0].product_name}
              </h1>
              <span className="closebtn">
                <img
                  src={closeBtn}
                  alt="close button"
                  onClick={() => props.setReturnShow(false)}
                />
              </span>
            </div>
            <div className={css.shopDetails}>
              <div className={css.first}>
                <div className={css.firstshopdetails}>
                  <div className={css.homeiconContainer}>
                    <img src={homeShop} alt="home icon" />
                  </div>
                  <div>
                    <p className={css.delguurname}>
                      {props.oneProduct[0].tradeshop_name}
                    </p>
                    <p className={css.hayag}>{props.oneProduct[0].address1}</p>
                  </div>
                </div>
              </div>
              <div className={css.divider}></div>
              <div className={css.deliveryInfo}>
                <div className={css.deliveryInfoContainer}>
                  <div
                    className={css.deliveryInfoSecond}
                    style={{ marginRight: "1rem" }}
                  >
                    <p className={css.deliveryInfoHeader}>Падааны дугаар:</p>
                    <p className={css.deliveryInfo_info}>
                      {props.oneProduct[0].receipt_id}
                    </p>
                  </div>
                  <div className={css.deliveryInfoFirst}>
                    <p className={css.deliveryInfoHeader}>Утас:</p>
                    <p className={css.deliveryInfo_info}>
                      {props.oneProduct[0].phone}
                    </p>
                  </div>
                </div>
                <div className={css.deliveryInfoContainer}>
                  <div className={css.deliveryInfoSecond}>
                    <p className={css.deliveryInfoHeader}>Огноо:</p>
                    <p className={css.deliveryInfoinfoBold}>{dateReturn}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.linesContainer}>
              <div className={css.firstContainer}>
                <div className={css.secondContainer}>
                  <h3 className={css.header}>Шалтгаан</h3>
                  <span className={css.input}>
                    {props.oneProduct[0].cause_name}
                  </span>
                </div>
                <div className={css.thirdContainer}>
                  <h3 className={css.header}>Тоо</h3>
                  <span className={css.input}>
                    {props.oneProduct[0].product_quantity}
                  </span>
                </div>
              </div>
              <div className={css.fourthcontainer}>
                <h3 className={css.header}>Тайлбар</h3>
                <div>
                  <span className={css.input}>
                    {props.oneProduct[0].detail}
                  </span>
                </div>
              </div>

              <div className={css.fifthcontainer}>
                <div className={css.imageContainer}>
                  <img
                    src={
                      props.oneProduct[0].image &&
                      props.oneProduct[0].image !==
                        "https://ebazaar.mn/icon/photo-add.svg"
                        ? props.oneProduct[0].image.replace("large", "product")
                        : props.oneProduct[0].image
                    }
                    alt="product image"
                  />
                </div>
              </div>
              <div style={{ height: "16px" }}></div>
              <div className={css.sixthcontainer}>
                <div className={css.arrrowContainer}>
                  <div>
                    <img src={ArrowLeft} alt="arrow left" />
                  </div>
                  <div>
                    <img src={ArrowRight} alt="arrow right" />
                  </div>
                </div>
                <div className={css.sxContainer}>
                  <img
                    src={
                      props.oneProduct[0].image &&
                      props.oneProduct[0].image !==
                        "https://ebazaar.mn/icon/photo-add.svg"
                        ? props.oneProduct[0].image.replace("large", "product")
                        : props.oneProduct[0].image
                    }
                    alt="product image"
                  />
                </div>
                <div className={css.zoomContainer}>
                  <div className={css.zmContainer}>
                    <span>
                      <img src={zoomInIcon} alt="zoom in icon" />
                    </span>
                    <span>
                      <img src={zoomOutIcon} alt="zoom out icon" />
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ height: "100px" }}></div>
            </div>
            <div id="order-confirm">
              <span className="btn cancel" onClick={cancelFunction}>
                Цуцлах
              </span>
              <span className="btn" onClick={approveFunction}>
                Зөвшөөрөх
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnSidebar;
