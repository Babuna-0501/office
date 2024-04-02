import React, { useContext } from "react";
import css from "./footerone.module.css";
import { Button } from "../../../../components/common";
import ShuurkhaiHook from "../../../../Hooks/ShuurkhaiHook";

const FooterOne = () => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);
	return (
		<div className={css.container}>
			<div className={css.infoContainer}>
				<span className={css.sortProduct}>1 төрөл / 1 бүтээгдэхүүн</span>
				<span className={css.price}>
					{shuurkhaiCtx.totalPrice
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
					₮{" "}
				</span>
			</div>
			<div className={css.btnContainer}>
				<Button
					variant="primary"
					width="100%"
					onClick={() =>
						shuurkhaiCtx.totalPrice > shuurkhaiCtx.minAmount &&
						shuurkhaiCtx.deliveryDate !== undefined &&
						shuurkhaiCtx.deliveryTime !== undefined
							? shuurkhaiCtx.setChange(false)
							: console.log("object")
					}
					style={
						shuurkhaiCtx.totalPrice > shuurkhaiCtx.minAmount &&
						shuurkhaiCtx.deliveryDate !== undefined &&
						shuurkhaiCtx.deliveryTime !== undefined
							? ""
							: { opacity: "0.5" }
					}
				>
					Үргэлжлүүлэх
				</Button>
			</div>
		</div>
	);
};

export default FooterOne;
