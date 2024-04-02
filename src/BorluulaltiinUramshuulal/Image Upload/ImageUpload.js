import React, { useState, useEffect, useContext } from "react";
import css from "./imageupload.module.css";
import closeicon from "../../assets/close.svg";
import SMSHook from "../../Hooks/SMSHook";

const ImageUpload = (props) => {
  const [images, setImages] = useState([]);

  const smsctx = useContext(SMSHook);

  console.log("setUpdateID", smsctx.updateID);
  const CloseHandler = () => {
    props.setImageOpen(false);
  };

  useEffect(() => {
    // if (props.imageUrl.length !== 0) {
    //   setImages(props.imageUrl);
    // }

    let imageUrls = [];

    if (
      smsctx.updateID &&
      smsctx.updateID.prizes &&
      smsctx.updateID.prizes.length !== 0
    ) {
      smsctx.updateID.prizes.map((x) => {
        if (x.imageUrl && x.imageUrl.length !== 0) {
          x.imageUrl.map((y) => {
            imageUrls.push(y);
          });
        }
      });
    }
    setImages(imageUrls);

    console.log("smsctx.prizeImage", smsctx.prizeImage);
    // if (smsctx.prizeImage) {
    //   setImages(smsctx.prizeImage);
    // }
  }, [props]);

  const SaveHandler = () => {
    props.setImageUrl(images);
    props.setImageOpen(false);
  };
  const up = () => {
    const id = (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
    document
      .getElementById("root")
      .insertAdjacentHTML(
        "beforeEnd",
        '<form method="post" enctype="multipart/form‐data" id="' +
          id +
          '" name=' +
          id +
          '><input type="file" id="uploader' +
          id +
          '" multiple /></form>'
      );
    document.getElementById("uploader" + id).click();
    document
      .getElementById("uploader" + id)
      .addEventListener("change", () => upload(id), false);
  };
  const upload = (form) => {
    const uploader = document.getElementById("uploader" + form);
    var fileField = document.getElementById("uploader" + form);
    let formData = new FormData();
    for (let i = 0; i < uploader.files.length; i++) {
      formData.append(i, fileField.files[i]);
    }
    fetch(
      "https://ebazaar.mn/media/ehlo.php?preset=product&ebazaar_admin_token=" +
        localStorage.getItem("ebazaar_admin_token"),
      { method: "post", body: formData }
    )
      .then((r) => r.json())
      .then((response) => {
        let temp = [];
        if (response.status === 200) {
          response.data.map((img) => {
            temp.push("https://ebazaar.mn/media/original/" + img.image);
          });
        }
        setImages((prev) => [...prev, ...temp]);
      });
  };
  let renderHTML =
    images &&
    images?.map((i, index) => {
      return (
        <div key={index}>
          <img
            src={i.replace("original", "product")}
            alt="present image"
            style={{ height: "168px", width: "168px" }}
            className={css.prodImage}
          />
        </div>
      );
    });
  return (
    <div className={css.container}>
      <div className={css.wrapperOne}></div>
      <div className={css.wrapper}>
        <div>
          <div className={css.header}>
            <span>Шагналын зураг</span>
            <img src={closeicon} alt="close icon" onClick={CloseHandler} />
          </div>
          <div
            style={{
              width: "100%",
              flexWrap: "wrap",
              display: "flex",
            }}
          >
            {renderHTML}
            <img
              src="https://ebazaar.mn/icon/photo-add.svg"
              onClick={() => up()}
              alt=""
              style={{ height: "168px", width: "168px" }}
            />
          </div>
        </div>
        <div className={css.btnwrapper}>
          <button onClick={SaveHandler}>Хадгалах</button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
