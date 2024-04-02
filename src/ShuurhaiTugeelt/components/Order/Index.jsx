import React, { useContext } from "react";
import css from "./index.module.css";
import Background from "./Background";
import ShuurkhaiHook from "../../../Hooks/ShuurkhaiHook";
import Order from "./Order";
import OrderConfirm from "./OrderConfirm";

const Index = () => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);
	return (
		<Background className={css.wrapper}>
			<div
				className={css.transparentBg}
				onClick={() => {
					shuurkhaiCtx.setOrderSide(false);
					shuurkhaiCtx.orderClose();
				}}
			></div>
			<div className={css.container}>
				{shuurkhaiCtx.change ? <Order /> : <OrderConfirm />}
			</div>
		</Background>
	);
};

export default Index;
