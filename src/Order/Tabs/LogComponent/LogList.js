import React, { useEffect } from "react";
import css from "./loglist.module.css";
import { useState } from "react";
import myHeaders from "../../../components/MyHeader/myHeader";
const LogList = props => {
	console.log("LOG PROPS", props);

	const [status, setStatus] = useState("");

	useEffect(() => {
		if (props.item.action.includes(`"order_status":1`)) {
			setStatus("Хүлээгдэж буй");
		} else if (props.item.action.includes(`"order_status":2`)) {
			setStatus("Баталгаажсан");
		} else if (props.item.action.includes(`"order_status":3`)) {
			setStatus("Хүргэгдсэн");
		} else if (props.item.action.includes(`"order_status":5`)) {
			setStatus("Цуцлагдсан");
		}

		// var requestOptions = {
		// 	method: "GET",
		// 	headers: myHeaders,
		// 	redirect: "follow",
		// };

		// let url = "https://api2.ebazaar.mn/api/order/status/list";

		// fetch(url, requestOptions)
		// 	.then(r => r.json())
		// 	.then(res => {
		// 		console.log(res.data);
		// 		setStatus(res.data);
		// 	})
		// 	.catch(err => console.log("ERROR: ", err));
	}, [status]);
	return (
		<>
			{!props.item ? (
				<div>Уншиж байна...</div>
			) : (
				<li className={css.container}>
					<div className={css.left}>
						<span className={css.name}>{props.item.section_name}</span>
						<span className={css.status}>{status}</span>
					</div>
					<div className={css.right}>
						<span className={css.date}>
							{props.item.date_time.split("T")[0]}{" "}
							{props.item.date_time.split("T")[1].substr(0, 8)}
						</span>
						<span>{props.item.user_name}</span>
					</div>
				</li>
			)}
		</>
	);
};

export default LogList;
