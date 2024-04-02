import React, { useContext } from "react";
import css from "./index.module.css";
import Background from "../Order/Background";
import ShuurkhaiHook from "../../../Hooks/ShuurkhaiHook";
import ProductOrder from "./ProductOrder";

const Index = () => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);

	return (
		<Background className={css.wrapper}>
			<div
				className={css.transparentBg}
				onClick={() => shuurkhaiCtx.setPrdctOrder(false)}
			></div>
			<div className={css.container}>
				<ProductOrder />
			</div>
		</Background>
	);
};

export default Index;
