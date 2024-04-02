import React, { useContext } from "react";
import css from "./confirmlist.module.css";
import ShuurkhaiHook from "../../../../Hooks/ShuurkhaiHook";

const ConfirmList = () => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);

	return (
		<div className={css.container}>
			<div className={css.listContainer}>
				{shuurkhaiCtx.dataPass.map((item, idx) => {
					const product = shuurkhaiCtx.sidePrdcts.find(
						data => data._id === Number(item.productId)
					);

					if (product) {
						return (
							<div className={css.list} key={idx}>
								<div className={css.name}>{product.name}</div>
								<div className={css.quantity}>{item.quantity} ш</div>
								<div className={css.price}>
									{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮
								</div>
							</div>
						);
					}

					return (
						<div className={css.list} key={idx}>
							<div className={css.name}>Product Not Found</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ConfirmList;
