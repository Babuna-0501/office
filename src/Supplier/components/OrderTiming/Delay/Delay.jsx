import React from "react";
import css from "./delay.module.css";

const Delay = props => {
	const { delay, setDelay } = props;

	// console.log("DELAY", typeof delay, delay);

	const delayData = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }];
	return (
		<div className={css.container}>
			<label>Delay</label>
			<select onChange={e => setDelay(Number(e.target.value))}>
				{delayData?.map((e, idx) => (
					<option value={e.value} key={idx} selected={delay === e.value}>
						{e.value}
					</option>
				))}
			</select>
		</div>
	);
};

export default Delay;
