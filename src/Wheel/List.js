import React from "react";
import css from "./list.module.css";

const List = props => {
	let content = (
		<div className={css.wrapper}>
			{props?.data?.map((e, i) => (
				<div className={`${css.container}`} key={i}>
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
						}}
					>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "25%",
							}}
						>
							{e.ID}
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "50%",
							}}
						>
							{e?.CreatedDate?.slice(0, 10)}
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "55%",
							}}
						>
							{e.UserID}
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "50%",
							}}
						>
							{e.TradeshopID}
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "100%",
							}}
						>
							{e.TradeshopName}
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "55%",
							}}
						>
							{e.PhoneNumber}
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "50%",
							}}
						>
							{e.TotalAmount.toLocaleString()}₮
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "50%",
							}}
						>
							{e.OrderID}
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "150%",
								height: "37px",
								lineHeight: "14px",
								display: "flex",
								alignItems: "center",
							}}
						>
							{e.Address1}
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "50%",
							}}
						>
							{e.Status === 1 ? (
								<div
									style={{
										width: "100%",
										borderRadius: "5px",
										textAlign: "center",
										color: "#0958d9",
										background: "#e6f4ff",
										border: "1px solid #91caff",
										fontSize: "12px",
									}}
								>
									Ашиглаагүй
								</div>
							) : (
								<div
									style={{
										width: "100%",
										borderRadius: "5px",
										textAlign: "center",
										color: "#389e0d",
										background: "#f6ffed",
										border: "1px solid #b7eb8f",
										fontSize: "12px",
									}}
								>
									Ашигласан
								</div>
							)}
						</span>
						<span
							style={{
								fontSize: "12px",
								fontWeight: "400",
								color: "#37474F",
								width: "90%",
								display: "flex",
								justifyContent: "center",
							}}
						>
							{/* {e.Prize === "1"
								? "Тэмдэглэлийн дэвтэр"
								: e.Prize === "3"
								? "Малгай"
								: e.Prize === "5"
								? "Поло"
								: e.Prize === "6"
								? "Хөзөр"
								: e.Prize === "8"
								? "Sengur Үүргэвч"
								: e.Prize === "10"
								? "Tiger Үүргэвч"
								: e.Prize === "2" ||
								  e.Prize === "4" ||
								  e.Prize === "7" ||
								  e.Prize === "9"
								? "Хоосон"
								: null} */}
							{e.PrizeTitle}
						</span>
					</div>
				</div>
			))}
		</div>
	);
	return <div className={css.listcontainer}>{content}</div>;
};

export default List;
