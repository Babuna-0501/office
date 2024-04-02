import React, { useState } from "react";
import css from "./listcomponents.module.css";

const Listcomponents = (props) => {
  let total = props.data.price.toFixed(2) * props.data.quantity;
  let image = props.data.product_image
    ? props.data.product_image.split(",")[0].replace("original", "small")
    : null;

  return (
		<div className={css.container}>
			<div className={css.infowrapper} onClick={() => props.setActive(null)}>
				<div className={css.imagecontainer}>
					<img src={image} />
				</div>
				<div
					style={{
						paddingTop: "5px",
					}}
				>
					<p
						style={{
							fontSize: "14px",

							color: "#37474F",
							fontWeight: "300",
							marginBottom: "-5px",
							marginTop: "12px",
						}}
					>
						{props.data.product_name}
					</p>
					<p
						style={{
							display: "flex",
							alignItems: "center",

							marginTop: "-10x",
							marginBottom: "-7px",
						}}
					>
						<span
							style={{
								fontSize: "14px",

								color: "#90A4AE",
								fontWeight: "700",
								marginRight: "13px",
								marginRight: "10px",
							}}
						>
							{props.data.price.toLocaleString()}₮
						</span>
						<span
							style={{
								fontSize: "12px",

								color: "#FFA400",
								fontWeight: "700",
								marginRight: "4px",
								marginBottom: "2px",
							}}
						>
							x
						</span>
						<span
							style={{
								fontSize: "12px",

								color: "#FFA400",
								fontWeight: "700",
								marginRight: "10px",
							}}
						>
							{props.data.quantity}
						</span>
						<span
							style={{
								fontSize: "14px",
								color: "#263238",
								fontWeight: "700",
							}}
						>
							{total.toLocaleString()}₮
						</span>
					</p>
					<p>
						<span
							style={{
								marginRight: "10px",
							}}
						>
							{" "}
							<span
								style={{
									fontSize: "14px",

									color: "#37474F",
									fontWeight: "300",
									marginRight: "5px",
								}}
							>
								Бүтээгдэхүүн sku :
							</span>
							<span
								style={{
									fontSize: "14px",

									color: "#37474F",
									fontWeight: "300",
								}}
							>
								{props.data.product_sku}
							</span>
						</span>
						<span>
							{" "}
							<span
								style={{
									fontSize: "14px",

									color: "#37474F",
									fontWeight: "300",
									marginRight: "5px",
								}}
							>
								Barcode :
							</span>
							<span
								style={{
									fontSize: "14px",

									color: "#37474F",
									fontWeight: "300",
								}}
							>
								{props.data.product_barcode}
							</span>
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Listcomponents;
