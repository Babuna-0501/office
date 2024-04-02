import React, { useContext, useState, useEffect } from "react";
import css from "./orderlist.module.css";
import { Plus, MinusGray } from "../../../../assets/icons/index";
import DeleteIcon from "../../../../assets/delete_red_small.svg";
import ShuurkhaiHook from "../../../../Hooks/ShuurkhaiHook";

const OrderList = () => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);

	const [productQuantities, setProductQuantities] = useState([]);

	const productDataArray = Object.entries(productQuantities)
		.map(([productId, quantity]) => {
			const item = shuurkhaiCtx.sidePrdcts.find(
				product => product._id === Number(productId)
			);

			if (item && quantity > 0) {
				const price =
					item.locations["62f4aabe45a4e22552a3969f"].price.channel[1];
				const totalPricePerItem = price * quantity;
				return {
					productId: Number(productId),
					quantity: quantity,
					price: totalPricePerItem,
				};
			}
			return null;
		})
		.filter(Boolean);

		const sortedProducts = shuurkhaiCtx.sidePrdcts.sort(
			(a, b) => a.stock - b.stock
		);

		useEffect(() => {
			shuurkhaiCtx.setDataPass(productDataArray);
		}, [productQuantities]);

		useEffect(() => {
			const initialQuantities = {};
			for (const item of shuurkhaiCtx.sidePrdcts) {
				if (item._id) {
					initialQuantities[item._id] = 0;
				}
			}
			setProductQuantities(initialQuantities);
		}, [shuurkhaiCtx.sidePrdcts]);

		useEffect(() => {
			let totalPrice = 0;
			for (const item of shuurkhaiCtx.sidePrdcts) {
				const productId = item._id;
				const quantity = productQuantities[productId] || 0;
				const price =
					item.locations["62f4aabe45a4e22552a3969f"].price.channel[1];
				totalPrice += price * quantity;
			}
			shuurkhaiCtx.setTotalPrice(totalPrice);
		}, [productQuantities, shuurkhaiCtx.sidePrdcts]);

		const handleIncrement = productId => {
			setProductQuantities(prevQuantities => ({
				...prevQuantities,
				[productId]: prevQuantities[productId] + 1,
			}));
		};

		const handleDecrement = productId => {
			if (productQuantities[productId] > 0) {
				setProductQuantities(prevQuantities => ({
					...prevQuantities,
					[productId]: prevQuantities[productId] - 1,
				}));
			}
		};

		return (
			<div className={css.container}>
				{shuurkhaiCtx.prdctVendor !== "" &&
					sortedProducts.map((item, idx) => {
						const productId = item._id;
						const quantity = productQuantities[productId];
						const price =
							item.locations["62f4aabe45a4e22552a3969f"].price.channel[1];
						const totalPricePerItem = price * quantity;

						return (
							<div
								className={css.listContainer}
								key={idx}
								style={
									item.stock === 0
										? { backgroundColor: "#ffa39e" }
										: item.stock < item.proper_stock
										? { backgroundColor: "#ffe58f" }
										: { backgroundColor: "#fff" }
								}
							>
								<div className={css.left}>
									<div className={css.imgContainer}>
										<img src={item.image} alt="prdct_img" />
									</div>
									<div className={css.textContainer}>
										<span className={css.prdctName}>{item.name}</span>
										<span className={css.prdctSKU}>
											SKU: {item.sku} / Barcode: {item.bar_code}
										</span>
										<div className={css.prdctPrice}>
											<span>
												{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
												₮
											</span>{" "}
											x <span>{quantity}</span> ={" "}
											<span>
												{totalPricePerItem
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
												₮
											</span>
										</div>
									</div>
								</div>
								<div className={css.right}>
									<div className={css.btnContainer}>
										<button
											className={css.countBtn}
											onClick={() => handleDecrement(productId)}
										>
											<MinusGray width={"18px"} height={"18px"} />
										</button>
										<span className={css.countTxt}>{quantity}</span>
										<button
											className={css.countBtn}
											onClick={() => {
												handleIncrement(productId);
											}}
										>
											<Plus width={"18px"} height={"18px"} />
										</button>
									</div>
									<div
										onClick={() => {
											setProductQuantities(prevQuantities => ({
												...prevQuantities,
												[productId]: 0,
											}));
										}}
									>
										<img src={DeleteIcon} alt="" />
									</div>
								</div>
							</div>
						);
					})}
			</div>
		);
};

export default OrderList;
