import React, { useState } from "react";
import closeIcon from "../assets/close.svg";
import css from "./product.module.css";
import myHeaders from "../components/MyHeader/myHeader";

function Price(props) {
  const [images, setImages] = useState(props.product.image);
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
  let renderHTML = images.map((i, index) => {
    return (
      <div className={css.relativeContainer} key={index}>
        <img
          src={i.replace("original", "original")}
          alt=""
          style={{ height: "168px", width: "168px" }}
          className={css.prodImage}
        />
        <img
          src={closeIcon}
          alt=""
          className={css.close}
          onClick={() => {
            setImages((prev) => prev.filter((_, x) => x !== index));
          }}
        />
      </div>
    );
  });

  const save = () => {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        product_id: props.product._id,
        supplier_id: props.product.supplier_id,
        image: images,
      }),
      redirect: "follow",
    };
    let urlNew = `https://api2.ebazaar.mn/api/product/update1`;
    fetch(urlNew, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 200) {
          alert("Амжилттай хадгаллаа!");
          props.setProduct({
            ...props.product,
            image: images,
          });
        } else {
          alert("Алдаа гарлаа!");
        }
      })
      .catch((error) => {
        console.log("error image update", error);
      });
  };
  return (
		<div id="bg">
			<div id="foo" className={css.container}>
				<span className="close" onClick={() => props.setMedia(false)}>
					Close
				</span>
				<h1>Бүтээгдэхүүний зураг</h1>
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
				<div className={css.bottom}>
					<div
						className="btn"
						onClick={() => {
							save();
						}}
					>
						Хадгалах
					</div>
				</div>
			</div>
		</div>
	);
}

export default Price;
