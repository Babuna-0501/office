import React from "react";
import classes from "./style.module.css";
import style from "../../../style";
const Product = ({ product }) => {
	console.log(product)
	return (
		<div className={classes.productContainer}>
			<div className={classes.product}>
				<p style={{ ...style.buteegdehuuniiNer }}>{product.name}</p>
				<p style={{ ...style.tooShirheg }}>{product.qty}</p>
				<p style={{ ...style.unitPrice }}>{product.unitPrice}</p>
				<p style={{ ...style.totalAmount }}>{product.totalAmount}</p>
				<p style={{ ...style.Noat }}>{product.vat}</p>
				<p style={{ ...style.Nhat }}>{product.cityTax}</p>
			</div>
		</div>
	);
};

export default Product;
