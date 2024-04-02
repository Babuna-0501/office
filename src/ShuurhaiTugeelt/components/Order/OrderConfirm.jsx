import React, { useContext, useEffect, useState } from "react";
import css from "./orderconfirm.module.css";
import ShuurkhaiHook from "../../../Hooks/ShuurkhaiHook";
import closeIcon from "../../../assets/close.svg";
import { ArrowRight } from "../../../assets/icons";
import FooterConfirm from "./Footers/FooterConfirm";
import ConfirmList from "./Lists/ConfirmList";

const OrderConfirm = () => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);

	return (
		<div className={css.container}>
			<div className={css.headerContainer}>
				<span className={css.headerTxt}>Шуурхай түгээлт захиалга</span>
				<div
					className={css.closeBtn}
					onClick={() => {
						shuurkhaiCtx.setOrderSide(false);
						shuurkhaiCtx.orderClose();
					}}
					style={{ cursor: "pointer" }}
				>
					<img src={closeIcon} alt="" />
				</div>
			</div>
			<div className={css.topContainer}>
				<div className={css.infoContainer}>
					<div className={css.infoSupp}>
						<div className={css.suppImg}>
							<img
								src={shuurkhaiCtx.suppInfo.media}
								alt="logo"
								style={{ objectFit: "contain" }}
							/>
						</div>
						<div className={css.suppTxts}>
							<span className={css.suppHeader}>Нийлүүлэгч</span>
							<span className={css.suppName}>{shuurkhaiCtx.suppInfo.name}</span>
						</div>
					</div>
					<div className={css.infoArrow}>
						<ArrowRight width={"35px"} height={"25px"} />
					</div>
					<div className={css.infoSupp}>
						<div className={css.suppImg}>
							<img
								src="https://ebazaar.mn/media/product/6451839791366876118714579441202301180039211652005125652064228302797616.jpg"
								alt="logo"
							/>
						</div>
						<div className={css.suppTxts}>
							<span className={css.suppHeader}>Агуулах</span>
							<span className={css.suppName}>Шуурхай түгээлт</span>
						</div>
					</div>
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
				<ConfirmList />
			</div>
			<div className={css.bottomContainer}>
				<FooterConfirm />
			</div>
		</div>
	);
};

export default OrderConfirm;
