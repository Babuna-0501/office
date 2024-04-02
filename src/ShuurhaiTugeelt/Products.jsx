import React, { useState } from "react";
import css from "./products.module.css";
import ProductList from "./components/ProductList/ProductList";
import SuppFilter from "./components/SuppFilter";
import { useContext } from "react";
import ShuurkhaiHook from "../Hooks/ShuurkhaiHook";
import Setting from "../Products/Setting/Setting";

const Products = props => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);
	const [isCheck, setIsCheck] = useState(false);

	const options = [];
	let defaultValueLabel = null;
	if (shuurkhaiCtx?.productGroup) {
		shuurkhaiCtx?.productGroup?.map(group => {
			options.push({ value: group.id, label: group.name });
			for (const data of shuurkhaiCtx.products) {
				if (group.id === data.supplierProductGroup) {
					defaultValueLabel = group.name;
				}
			}
		});
	}
	// console.log("first", options);

	return (
		<>
			{shuurkhaiCtx.prodSetting === false ? (
				<div className={css.mainContainer}>
					<div className={css.headerContainer}>
						<div className={css.idContainer}>
							<div>
								<span className={css.title}>ID</span>
								<input
									type="text"
									onChange={e => {
										if (e.target.value === "") {
											shuurkhaiCtx.setOrderId("");
											shuurkhaiCtx.setFilter(false);
											shuurkhaiCtx.setProducts([]);
										}
									}}
									onKeyDown={
										("enter",
										e => {
											if (e.key === "Enter") {
												shuurkhaiCtx.setOrderId(e.target.value);
												shuurkhaiCtx.setFilter(true);
												shuurkhaiCtx.setPage(1);
											}
										})
									}
								/>
							</div>
						</div>
						<div className={css.showContainer}>
							<div>
								<span className={css.title}>Show</span>
								<input type="text" onChange={() => console.log("Show")} />
							</div>
						</div>
						<div className={css.suppContainer}>
							<div>
								<span className={css.title}>Нийлүүлэгч</span>
								<SuppFilter />
								{/* <input type="text" onClick={() => console.log("first")} /> */}
							</div>
						</div>
						<div className={css.imgContainer}>
							<div>
								<span className={css.title}>Зураг</span>
								<input type="text" onClick={() => console.log("first")} />
							</div>
						</div>
						<div className={css.nameContainer}>
							<div>
								<span className={css.title}>Нэр</span>
								<input
									type="text"
									onChange={e => {
										if (e.target.value === "") {
											shuurkhaiCtx.setProductName("");
										}
									}}
									onKeyDown={e => {
										if (e.key === "Enter") {
											shuurkhaiCtx.setProductName(e.target.value);
										}
									}}
								/>
							</div>
						</div>
						<div className={css.catContainer}>
							<div>
								<span className={css.title}>Ангилал</span>
								<select>
									<option>Бүгд</option>
									{options.map((item, idx) => {
										return <option key={idx}>{item.label}</option>;
									})}
								</select>
							</div>
						</div>
						<div className={css.descContainer}>
							<div>
								<span className={css.title}>Дэлгэрэнгүй</span>
								<input type="text" />
							</div>
						</div>
						<div className={css.stockContainer}>
							<div>
								<span className={css.title}>Үлдэгдэл</span>
								<input type="text" />
							</div>
						</div>
						<div className={css.dateContainer}>
							<div>
								<span className={css.title}>Үүссэн огноо</span>
								<input type="date" />
							</div>
						</div>
						<div className={css.barcodeContainer}>
							<div>
								<span className={css.title}>Баркод</span>
								<input type="text" />
							</div>
						</div>
						<div className={css.skuContainer}>
							<div>
								<span className={css.title}>SKU</span>
								<input type="text" />
							</div>
						</div>
						<div className={css.priceContainer}>
							<div>
								<span className={css.title}>Үнэ</span>
								<input type="text" />
							</div>
						</div>
						<div className={css.properContainer}>
							<div>
								<span className={css.title}>Зохистой хэмжээ</span>
							</div>
						</div>
						<div className={css.safeContainer}>
							<div>
								<span className={css.title}>Аюулгүйн нөөц</span>
							</div>
						</div>
						<div className={css.minOrderContainer}>
							<div>
								<span className={css.title}>Min_order qty</span>
							</div>
						</div>
						<div className={css.suppMinContainer}>
							<div>
								<span className={css.title}>Sup_min order</span>
							</div>
						</div>
						<div className={css.pickpackContainer}>
							<div>
								<span className={css.title}>PickPack</span>
							</div>
						</div>
						<div className={css.pickpackContainer}>
							<div>
								<span className={css.title}>Захиалга</span>
							</div>
						</div>
					</div>
					<div className={css.productContainer}>
						<ProductList />
					</div>
					<div className={css.footerContainer}></div>
				</div>
			) : (
				<div>
					<button>Close</button>
					<Setting />
				</div>
			)}
		</>
	);
};

export default Products;
