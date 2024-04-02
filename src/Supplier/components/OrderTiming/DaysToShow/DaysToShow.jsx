import React from "react";
import css from "./daystoshow.module.css";

const DaysToShow = props => {
	const { daysShow, setDaysShow } = props;

	const days = [
		{ value: 1 },
		{ value: 2 },
		{ value: 3 },
		{ value: 4 },
		{ value: 5 },
		{ value: 6 },
		{ value: 7 },
	];

	// console.log("daysToSHow", typeof daysShow, daysShow);
	return (
		<div className={css.container}>
			<label>Days to show</label>
			<select onChange={e => setDaysShow(Number(e.target.value))}>
				{days.map((e, idx) => (
					<option value={e.value} key={idx} selected={daysShow === e.value}>
						{e.value}
					</option>
				))}
			</select>
		</div>
	);
};

export default DaysToShow;
