import React from "react";
import css from "./supplierList.module.css";
import deleteIcon from "../../../assets/Delete.svg";

const SupplierList = props => {
	const data = props.data;
	const handleDelete = props.handleDelete;
	return (
		<div className={css.listContainer}>
			<div className={css.listGeneral}>
				<div className={css.listSingle}>
					<div className={css.listID}>{data.id}</div>
					<img src={data.media} alt="logo" />
					<div className={css.listText}>{data.name}</div>
				</div>
				<div
					style={
						props.optionValue === "all"
							? { display: "none" }
							: { display: "flex" }
					}
					onClick={() => {
						handleDelete(data.id);
					}}
				>
					<img src={deleteIcon} alt="delete" className={css.deleteIcon} />
				</div>
			</div>
		</div>
	);
};

export default SupplierList;
