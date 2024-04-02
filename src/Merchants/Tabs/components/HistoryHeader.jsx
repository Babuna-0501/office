import React from "react";
import css from "./historyheader.module.css";

const HistoryHeader = () => {
	return (
		<div className={css.mainContainer}>
			<div className={css.headerContainer}>
				<div className={css.idContainer}>
					<div>
						<span className={css.title}>ID</span>
						{/* <input type="text" /> */}
					</div>
				</div>
				<div className={css.suppContainer}>
					<div>
						<span className={css.title}>Нийлүүлэгч</span>
						{/* <input type="text" /> */}
					</div>
				</div>
				<div className={css.orderContainer}>
					<div>
						<span className={css.title}>Захиалга</span>
						{/* <input type="text" /> */}
					</div>
				</div>
				<div className={css.deliveryContainer}>
					<div>
						<span className={css.title}>Хүргүүлэх</span>
						{/* <input type="text" /> */}
					</div>
				</div>
				<div className={css.amountContainer}>
					<div>
						<span className={css.title}>Дүн</span>
						{/* <input type="text" /> */}
					</div>
				</div>
				{/* <div className={css.priceContainer}>
					<div>
						<span className={css.title}>Анхны дүн</span>
						// <input type="text" />
					</div>
				</div> */}
				<div className={css.dateContainer}>
					<div>
						<span className={css.title}>Захиалсан</span>
						{/* <input type="text" /> */}
					</div>
				</div>
				<div className={css.phoneContainer}>
					<div>
						<span className={css.title}>Утас</span>
						{/* <input type="text" /> */}
					</div>
				</div>
				<div className={css.clientContainer}>
					<div>
						<span className={css.title}>Захиалсан</span>
						{/* <input type="text" /> */}
					</div>
				</div>
				{/* <div className={css.channelContainer}>
					<div>
						<span className={css.title}>Суваг</span>
						// <input type="text" />
					</div>
				</div>
				<div className={css.cityContainer}>
					<div>
						<span className={css.title}>Хот/аймаг</span>
						// <input type="text" />
					</div>
				</div>
				<div className={css.districtContainer}>
					<div>
						<span className={css.title}>Дүүрэг/сум</span>
						// <input type="text" />
					</div>
				</div>
				<div className={css.khorooContainer}>
					<div>
						<span className={css.title}>Хороо</span>
						// <input type="text" />
					</div>
				</div>
				<div className={css.addressContainer}>
					<div>
						<span className={css.title}>Хаяг</span>
						// <input type="text" />
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default HistoryHeader;
