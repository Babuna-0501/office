import React from "react";
import css from "./headercontent.module.css";
import { useContext } from "react";
import ShuurkhaiHook from "../Hooks/ShuurkhaiHook";
import ProductReportBtn from "./components/ProductReportBtn";
import PickPackOrder from "./components/PickPackOrder";
import WarehouseIndex from "../components/Warehouse/WarehouseIndex";

const HeaderContent = ({ userData }) => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);
	return (
		<div className={css.container}>
			<div className={css.leftSide}>
				<h1 className={css.title}>Шуурхай түгээлт</h1>
			</div>
			<div className={css.rightSide}>
				{shuurkhaiCtx.tabId === 1 ? (
					<ProductReportBtn />
				) : shuurkhaiCtx.tabId === 3 ? (
					<PickPackOrder />
				) : shuurkhaiCtx.tabId === 4 ? (
					<WarehouseIndex userData={userData} />
				) : null}
			</div>
		</div>
	);
};

export default HeaderContent;
