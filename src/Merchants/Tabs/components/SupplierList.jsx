import React from "react";
import PropTypes from "prop-types";
import css from "./supplierList.module.css";
import deleteIcon from "../../../assets/Delete.svg";

const SupplierList = props => {
	const { data = {}, handleDelete, optionValue } = props; 

	return (
		<div className={css.listContainer}>
			<div className={css.listGeneral}>
				<div className={css.listSingle}>
					<div className={css.listID}>{data.id || 'N/A'}</div> 
					<img src={data.media || ''} alt="logo" />
					<div className={css.listText}>{data.name || 'No Name'}</div> 
				</div>
				<div
					style={optionValue === "all" ? { display: "none" } : { display: "flex" }}
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

SupplierList.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
		media: PropTypes.string,
		name: PropTypes.string
	}),
	handleDelete: PropTypes.func.isRequired,
	optionValue: PropTypes.string.isRequired
};

export default SupplierList;
