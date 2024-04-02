import React from "react";
import classes from "./style.module.css";
import { useState } from "react";

const InsideModal = () => {
	// const [productname, setProductname] = useState(null);
	const [showInput, setShowInput] = useState("Bhq");

	const handleOptionChange = e => {
		setShowInput(e.target.value === "Bga");
	};

	return (
		<div className={classes.ModalInput}>
            <div className={classes.Company}>
			<div className={classes.inputContainer}>
				<p>Регистэр</p>
				<input type="text" />
			</div>
			<div className={classes.inputContainer}>
				<p>Нийлүүлэгч</p>
				<input type="text" />
			</div>
            </div>

			<div className={classes.AddProduct}>
				<div className={classes.inputContainer}>
					<p>Бүтээгдэхүүний нэр</p>
					<input type="text" />
				</div>
				<div className={classes.inputContainer}>
					<p>Т/Ш</p>
					<input type="text" />
				</div>
				<div className={classes.inputContainer}>
					<p>Үнэ</p>
					<input type="text" />
				</div>
				<div className={classes.inputContainer}>
					<p>Нийт дүн</p>
					<input type="text" />
				</div>
				<div className={classes.inputContainer}>
					<p>НӨАТ</p>
					<input type="text" />
				</div>
				<div className={classes.inputContainer}>
					<p>НХАТ</p>

				<select onChange={handleOptionChange} >
					<option value="Bga">Байгаа</option>
					<option value="bhq">Байхгүй</option>
				</select>
				{showInput && <input type="text" />}
				</div>

			</div>
		</div>
	);
};

export default InsideModal;
