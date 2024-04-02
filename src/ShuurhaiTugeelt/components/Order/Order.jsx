import React, { useContext, useState, useEffect } from "react";
import css from "./order.module.css";
import closeIcon from "../../../assets/close.svg";
import ShuurkhaiHook from "../../../Hooks/ShuurkhaiHook";
import OrderList from "./Lists/OrderList";
import FooterOne from "./Footers/FooterOne";
import DatePicker from "./DatePicker";

const Order = () => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);

	const handleVendorChange = e => {
		const selectedValue = e.target.value;
		const [vendorId, minOrderAmount] = JSON.parse(selectedValue);

		shuurkhaiCtx.setPrdctVendor(vendorId);
		shuurkhaiCtx.setMinAmount(minOrderAmount);
		console.log(selectedValue);

	};

	useEffect(() => {
		shuurkhaiCtx.setBarFill(
			(shuurkhaiCtx.totalPrice / shuurkhaiCtx.minAmount) * 100
		);
	}, [shuurkhaiCtx.totalPrice, shuurkhaiCtx.minAmount]);

	return (
		<div className={css.container}>
			<div className={css.headerContainer}>
				<span className={css.headerTxt}>Шуурхай түгээлт захиалга </span>
				<div
					className={css.closeBtn}
					onClick={() => shuurkhaiCtx.setOrderSide(false)}
					style={{ cursor: "pointer" }}
				>
					<img src={closeIcon} alt="close" />
				</div>
			</div>
			<div className={css.topContainer}>
				<div className={css.selectContainer}>
					<select onChange={handleVendorChange}>
						<option value={JSON.stringify([1234, 4321])}>
							Нийлүүлэгчийн нэр...
						</option>
						{shuurkhaiCtx.vendors &&
							shuurkhaiCtx.vendors.map((item, idx) => (
								<option
									value={JSON.stringify([item.id, item.minimum_order_amount])}
									key={idx}
								>
									{item.name}
								</option>
							))}
					</select>
				</div>
				<div className={css.filterContainer}>
					<div className={css.filterSearch}>
						<input type="search" placeholder="Хайх..." />
					</div>
					<div className={css.filterCat}>
						<select>
							<option>Ангилал</option>
						</select>
					</div>
					<div className={css.filterFilter}>
						<select>
							<option>Үлдэгдэл</option>
						</select>
					</div>
					<div className={css.filterBox}>
						<input type="text" />
					</div>
				</div>
				<div className={css.datePicker}>
					<DatePicker />
				</div>
				<div className={css.priceContainer}>
					<div className={css.priceText}>
						<span className={css.txtPrice}>
							{shuurkhaiCtx.totalPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							₮
						</span>
						{shuurkhaiCtx.barFill >= 100 ? (
							<span className={css.txtText} style={{ color: "#2AB674" }}>
								Доод дүнг хангасан байна
							</span>
						) : (
							<span className={css.txtText} style={{ color: "red" }}>
								Доод дүнг хангагдаагүй байна
							</span>
						)}
						<span className={css.txtPrice} style={{ color: "#2AB674" }}>
							{shuurkhaiCtx.minAmount
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							₮+
						</span>
					</div>
					<div className={css.barContainer}>
						<div
							className={css.bar}
							style={{
								width: `${shuurkhaiCtx.barFill}%`,
								backgroundColor: `${
									shuurkhaiCtx.barFill >= 100 ? "#2AB674" : "red"
								}`,
							}}
						></div>
					</div>
				</div>
			</div>
			<div className={css.middleContainer}>
				<OrderList />
			</div>
			<div className={css.bottomContainer}>
				<FooterOne />
			</div>
		</div>
	);
};

export default Order;
