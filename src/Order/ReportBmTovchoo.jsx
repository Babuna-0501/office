import React, { useContext, useState, useEffect } from "react";
import css from "./reportbmtovchoo.module.css";
import ExcelJS from "exceljs";
import OrderReportHook from "../Hooks/OrderReportHook";
import { Button } from "../components/common";
import LoadingSpinner from "../components/Spinner/Spinner";
import myHeaders from "../components/MyHeader/myHeader";

const ReportBmTovchoo = () => {
	const reportCtx = useContext(OrderReportHook);

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const [data, setData] = useState();

	const [reportLoad, setReportLoad] = useState(false);
	const [download, setDownload] = useState(false);

	const getData = () => {
		console.log("Working...");
		if (startDate && endDate) {
			const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};

			const url = "";

			fetch(url, requestOptions)
				.then(r => r.json())
				.then(res => {
					setData(res.data);
					setDownload(true);
				});
		} else {
			alert("Эхлэх болон дуусах огноо оруулна уу.");
		}
	};

	const createExcelTemplate = () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Тайлан");

		worksheet.columns = [
			{
				header: "Д/д",
				key: "number",
			},
			{
				header: "Бараа код",
				key: "prodCode",
			},
			{
				header: "Бараа нэр",
				key: "prodName",
			},
			{
				header: "Нэгж",
				key: "unit",
			},
			{
				header: "Эхний тоо",
				key: "firstNum",
			},
			{
				header: "Эхний өртөг",
				key: "firstCost",
			},
			{
				header: "Орлого тоо",
				key: "revenueNum",
			},
			{
				header: "Орлого өртөг",
				key: "revenueCost",
			},
			{
				header: "Зарагдсан тоо",
				key: "sellNum",
			},
			{
				header: "Зарлага өртөг",
				key: "sellCost",
			},
			{
				header: "Буцаасан тоо",
				key: "returnNum",
			},
			{
				header: "Буцаалтын өртөг",
				key: "returnCost",
			},
			{
				header: "Эцсийн тоо",
				key: "finalNum",
			},
			{
				header: "Эцсийн өртөг",
				key: "finalCost",
			},
		];

		let number = 1;

		for (const item of data) {
			worksheet.addRow({
				number: number,
				prodCode: "",
				prodName: "",
				unit: "",
				firstNum: "",
				firstCost: "",
				revenueNum: "",
				revenueCost: "",
				sellNum: "",
				sellCost: "",
				returnNum: "",
				returnCost: "",
				finalNum: "",
				finalCost: "",
			});
			number++;
		}

		workbook.xlsx.writeBuffer().then(buffer => {
			const blob = new Blob([buffer], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.click();
			window.URL.revokeObjectURL(url);
			reportCtx?.setBmTovchoo(false);
		});
	};

	useEffect(() => {
		if (download) {
			createExcelTemplate();
		}
	}, [download]);

	const renderHTML = (
		<div className={css.container}>
			<div className={css.header}>
				<span>Даяан сарын эцсийн тайлан</span>
				<div
					className={css.closeBtn}
					onClick={() => {
						reportCtx.setBmTovchoo(false);
					}}
				>
					Хаах
				</div>
			</div>
			<div className={css.body}>
				<div className={css.dateSelect}>
					<label>Эхлэх огноо</label>
					<input
						type="date"
						className="dateselect"
						id="date_start"
						onChange={e => {
							setStartDate(e.target.value);
						}}
						value={startDate}
					/>
				</div>
				<div className={css.dateSelect}>
					<label>Дуусах огноо</label>
					<input
						type="date"
						className="dateselect"
						id="end_date"
						onChange={e => {
							setEndDate(e.target.value);
						}}
						value={endDate}
					/>
				</div>
				{!reportLoad && (
					<div className={css.downloadBtn}>
						<Button
							onClick={() => {
								getData();
							}}
							variant="primary"
							size="medium"
						>
							Тайлан татах
						</Button>
					</div>
				)}
				{reportLoad && (
					<div className={css.spinnercontainer}>
						<LoadingSpinner />
					</div>
				)}
			</div>
		</div>
	);
	return (
		<div id="formwithtransparentbackground">
			<div id="form">{renderHTML}</div>
			<div id="transparentbackground"></div>
		</div>
	);
};

export default ReportBmTovchoo;
