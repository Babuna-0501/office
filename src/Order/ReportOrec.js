import React, { useState, useEffect, useContext } from "react";
import CSV from "./CSV";
import writeXlsxFile from "write-excel-file";
import OrderReportHook from "../Hooks/OrderReportHook";

import myHeaders from "../components/MyHeader/myHeader";

/////// ORDERIIN DELGERENGUI TAILAN
const schema = [
	{
		column: "Төслийн код",
		type: String,
		value: d => d.OrderNumber,
	},
	{
		column: "Баркод",
		type: String,
		value: d => d.Barcode,
	},

	{
		column: "Тоо ширхэг",
		type: Number,
		value: d => d.Qty,
	},
];

const output = (lines, dates) => {
	writeXlsxFile(lines, {
		schema,
		fileName: `ORDERS_${dates}.xlsx`,
	});
};

function ReportOrec(props) {
	let [exporting, setExporting] = useState(false);
	let [data, setData] = useState(true);

	let [foo, setFoo] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const orderCTX = useContext(OrderReportHook);

	let csv = [["Order number", "Barcode", "Qty"]];

	let [blah, setBlah] = useState(csv);

	console.log("props");

	const exporter = () => {
		let url = "";

		if (!props.permissionData.order.report) {
			alert("Та захиалгын тайлангын эрх байхгүй байна. Та эрхээ шалгана уу");
			return;
		}

		if (startDate === null) {
			alert("Та эхлэх өдрөө сонгоно уу");
			return;
		}
		if (endDate === null) {
			alert("Та дуусах өдрөө сонгоно уу");
			return;
		}

		if (startDate && endDate) {
			url = `https://api2.ebazaar.mn/api/orders?order_type=1&delivery_start=${startDate}&delivery_end=${endDate}&page=all`;
		}

		setExporting(true);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(url, requestOptions)
			.then(r => r.json())
			.then(response => {
				console.log("response report", response);
				if (response.data.length === 0) {
					alert(
						`Энэ хугацааны интервалд захиалга байхгүй байна. Эхлэх огноо : ${startDate} , Дуусах огноо :${endDate}`
					);
					setStartDate(null);
					setEndDate(null);
					return;
				}
				let csv = [];
				response.data &&
					response.data.map(order => {
						const orderId = order.tradeshop_name;

						if (order.line && order.line.length > 0) {
							order.line.map(line => {
								let template = {};

								template = {
									OrderNumber: String(orderId),

									Barcode: String(line.product_bar_code),

									Qty: Number(line.quantity),
								};

								csv.push(template);
							});
						}
					});
				console.log("csv", csv);
				output(csv, `${startDate}_${endDate}`);
				setStartDate(null);
				setEndDate(null);
				setExporting(false);
				orderCTX.setOrderReportUrl(false);
			});
	};
	useEffect(() => {
		//getOrders()
	}, []);

	let renderHTML =
		foo && data && blah.length > 1 ? (
			<>
				{/* <CSV data={blah} /> */}
				hi
			</>
		) : (
			<>
				<span id="close" onClick={() => orderCTX.setReportThird(false)}>
					Close
				</span>
				{orderCTX.orderReportUrl ? null : (
					<>
						<div>
							<label style={{ fontSize: "12px", fontWeight: "400" }}>
								Эхлэх огноо
							</label>
							<input
								type="date"
								className="dateselect"
								id="date_start"
								value={startDate}
								onChange={e => setStartDate(e.target.value)}
							/>
						</div>
						<div>
							<label style={{ fontSize: "12px", fontWeight: "400" }}>
								Дуусах огноо
							</label>
							<input
								type="date"
								className="dateselect"
								id="date_end"
								value={endDate}
								onChange={e => setEndDate(e.target.value)}
							/>
						</div>
					</>
				)}

				<div className="margintop1rem">
					{exporting ? (
						<span>Түр хүлээнэ үү ... </span>
					) : (
						<span
							className="btn-tech"
							onClick={() => exporter()}
							style={{ fontSize: "14px", fontWeight: "600" }}
						>
							{orderCTX.orderReportUrl
								? "Хураангүй тайлан бэлтгэх"
								: "Тайлан бэлтгэх"}
						</span>
					)}
				</div>
			</>
		);
	return (
		<div id="formwithtransparentbackground">
			<div id="form">{renderHTML}</div>
			<div id="transparentbackground"></div>
		</div>
	);
}

export default ReportOrec;
