import React, { useContext } from "react";
import css from "./sfafilter.module.css";
import SupplierHook from "../../Hooks/SupplierHook";

const SfaFilter = () => {
	const suppCtx = useContext(SupplierHook);

	return (
		<div className={css.container}>
			<select onChange={e => suppCtx.setSfaFilter(e.target.value)}>
				<option value={"all"} selected>
					Бүх нийлүүлэгч
				</option>
				<option value={"sfaTrue"}>SFA хэргэлдэг</option>
				<option value={"sfaFalse"}>SFA хэргэлдэггүй</option>
			</select>
		</div>
	);
};

export default SfaFilter;
