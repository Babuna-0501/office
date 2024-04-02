import React, { useContext } from "react";
import css from "./datepicker.module.css";
import ShuurkhaiHook from "../../../Hooks/ShuurkhaiHook";

const time = [
	{ value: "00:00" },
	{ value: "01:00" },
	{ value: "02:00" },
	{ value: "03:00" },
	{ value: "04:00" },
	{ value: "05:00" },
	{ value: "06:00" },
	{ value: "07:00" },
	{ value: "08:00" },
	{ value: "09:00" },
	{ value: "10:00" },
	{ value: "11:00" },
	{ value: "12:00" },
	{ value: "13:00" },
	{ value: "14:00" },
	{ value: "15:00" },
	{ value: "16:00" },
	{ value: "17:00" },
	{ value: "18:00" },
	{ value: "19:00" },
	{ value: "20:00" },
	{ value: "21:00" },
	{ value: "22:00" },
	{ value: "23:00" },
];

const DatePicker = () => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);
	return (
		<div className={css.container}>
			<div className={css.dateContainer}>
				<input
					type="date"
					placeholder="Хүлээн авах өдөр сонгох"
					onChange={e => {
						shuurkhaiCtx.setDeliveryDate(e.target.value);
					}}
				/>
			</div>
			<div className={css.timeContainer}>
				<select
					onChange={e => {
						shuurkhaiCtx.setDeliveryTime(e.target.value);
					}}
				>
					<option>Хүлээн авах цаг сонгох</option>
					{time.map((item, idx) => {
						return (
							<option value={item.value} key={idx}>
								{item.value}
							</option>
						);
					})}
				</select>
				{/* <input
					type="time"
					min="10:00"
					max="18:00"
					step="3600"
					timeFormat="24"
					required
					pattern="[0-9]{2}:[0-9]{2}"
					onChange={e => {
						shuurkhaiCtx.setDeliveryTime(e.target.value);
					}}
				/> */}
			</div>
		</div>
	);
};

export default DatePicker;
