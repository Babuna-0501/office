import React, { useContext, useEffect, useState } from "react";
import ExcelJS from "exceljs";
import css from "./reportDiamond.module.css";
import OrderReportHook from "../Hooks/OrderReportHook";
import SelectCompany from "./Company/SelectCompany";
import Spinner from "../components/Spinner/Spinner";
import myHeaders from "../components/MyHeader/myHeader";
import writeXlsxFile from "write-excel-file";
import { Button } from "../components/common";

const ReportDiamond = props => {
	//   console.log("PROPS: ", props);

	const { userData } = props;
	const orderCtx = useContext(OrderReportHook);
	//   const schema = initialSchema;

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const [data, setData] = useState();
	const [excelData, setExcelData] = useState([]);

	const [reportLoad, setReportLoad] = useState(false);
	const [download, setDownload] = useState(false);

	const getData = () => {
		if (startDate && endDate) {
			const url = `https://api2.ebazaar.mn/api/orders?order_type=1&order_start=${startDate}&order_end=${endDate}&page=all`;

			console.log("delgerengui report url", url);

			fetch(url, {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			})
				.then(r => r.json())
				.then(res => {
					console.log("BIG DATA", res.data);
					setData(res.data);

					for (const data of res.data) {
						for (const product of data.line) {
							console.log("PRODUCTS: ", product);
							const price =
								product.product_type_id === 27171
									? product.base_price
									: product.base_price - product.base_price / 11;

							const amount =
								product.product_type_id === 27171
									? product.amount
									: product.amount - product.amount / 11;

							const discount =
								product.price !== product.price_amount
									? product.price - product.price_amount
									: "";

							const payment = JSON.parse(data.order_data);
							const paymentId = payment.payment.paymentId;

							const guilgeeUtga =
								paymentId === 0
									? "Дансаар"
									: paymentId === 1
									? "Бэлнээр"
									: paymentId === 2
									? "Зээлээр"
									: paymentId === 3
									? "Бэлэн+Данс"
									: paymentId === 4
									? "Бэлэн+Зээлээр"
									: paymentId === 5
									? "Данс+Зээлээр"
									: "";

							console.log("PAY:", payment.payment.paymentId);

							const array = [
								`${data.cart_date.slice(0, 10)}`,
								``, // bairshliin code
								``, // bairshliin ner
								``, // barimtiin dugaar
								``, // hariltsagchiin code
								`${data.business_name}`, //hariltsagchiin ner
								`${guilgeeUtga}`, //guilgeenii utga
								`MNT`, //valyut
								``, //seriesNumber
								`1`, //hansh
								`${product.product_sku}`,
								`${product.product_name}`,
								`${product.product_bar_code}`,
								``, //barcode name
								``, //bank acc
								`${product.quantity}`, //too shirheg
								`${price.toFixed(2)}₮`, //negjiin une
								`${amount.toFixed(2)}₮`, // dun
								`${product.base_price}₮`, //negjin une noattei
								`${product.amount}₮`, // dun noattei
								`${(product.amount / 11).toFixed(2)}₮`, // noat
								`08`, // noat uzuulelt
								``, // nhat
								``, // hongloltiin huvi
								`${price.toFixed(2)}₮`, // hu notgui
								`${product.base_price}₮`, // hu nottei
								`${amount.toFixed(2)}₮`, // hd nottei
								`${product.amount}₮`, // hd notgui
								``, // valyut nu
								``, // valyut dun
							];

							// console.log("DATE: ", data.cart_date);
							setExcelData(prev => [...prev, array]);
							// order123.push(product.order_id);
						}
					}
					setDownload(true);
				});
		} else {
			alert("Эхлэх болон дуусах огноог сонгоно уу!!!");
		}
	};

	// console.log("STATE: ", excelData);

	const createExcelTemplate = async () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Тайлан");

		worksheet.columns = [
			{
				header: "Огноо",
				key: "date",
				width: 20,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Байршлын код",
				key: "locationCode",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Байршлын нэр",
				key: "locationName",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Баримтын дугаар",
				key: "receiptId",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Харилцагчийн код",
				key: "customerId",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Харилцагчийн нэр",
				key: "customerName",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Гүйлгээний утга",
				key: "transDesc",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Валют",
				key: "currency",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Цувралын дугаар",
				key: "seriesNum",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Ханш",
				key: "exchangeRate",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Барааны код",
				key: "productSku",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Барааны нэр",
				key: "productName",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Баар код",
				key: "barCode",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Баар кодын нэр",
				key: "barCodeName",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Данс",
				key: "bankAcc",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Тоо хэмжээ",
				key: "quantity",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Нэгжийн үнэ",
				key: "price",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Дүн",
				key: "priceTotal",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Нэгжийн үнэ НӨТ-тэй",
				key: "priceNoat",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Дүн НӨТ-тэй",
				key: "priceTotalNoat",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "НӨТ",
				key: "noat",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "НӨТ үзүүлэлт",
				key: "noatSpec",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "НХАТ",
				key: "specialPermission",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Хөнглөлтийн хувь",
				key: "discount",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Худалдах үнэ",
				key: "",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "",
				key: "",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Худалдах дүн",
				key: "",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "",
				key: "",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
			{
				header: "Валют",
				key: "",
				width: 15,
				style: {
					font: { name: "Times New Roman", size: 11 },
					alignment: {
						// wrapText: true,
						vertical: "middle",
						horizontal: "center",
					},
				},
			},
		];

		for (let col = 1; col <= 24; col++) {
			worksheet.mergeCells(1, col, 2, col);
		}

		worksheet.mergeCells(1, 25, 1, 26);
		worksheet.mergeCells(1, 27, 1, 28);
		worksheet.mergeCells(1, 29, 1, 30);

		worksheet.getCell("Y2").value = "НӨТ-гүй";
		worksheet.getCell("Z2").value = "НӨТ-тэй";

		worksheet.getCell("AA2").value = "НӨТ-гүй";
		worksheet.getCell("AB2").value = "НӨТ-тэй";

		worksheet.getCell("AC2").value = "Нэгжийн үнэ";
		worksheet.getCell("AD2").value = "Дүн";

		const excelData1 = excelData;

		console.log("EXCEL", excelData1);
		excelData1.forEach((rowData, rowIndex) => {
			worksheet.addRow(rowData);
		});

		const buffer = await workbook.xlsx.writeBuffer();
		const blob = new Blob([buffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "тайлан.xlsx";
		a.click();
		window.URL.revokeObjectURL(url);

		console.log("EXCEL TEMPLATE READY");
	};
	useEffect(() => {
		if (download) {
			createExcelTemplate().catch(error => {
				console.error("Error: ", error);
			});
		}
	}, [download]);

	let renderHTML = (
		<div className={css.container}>
			<div className={css.header}>
				<span>Diamond Тайлан</span>
				<div
					className={css.closeBtn}
					onClick={() => orderCtx.setReportDiamond(false)}
				>
					Хаах
				</div>
			</div>
			<div className={css.body}>
				{/* <SelectCompany setSupSelect={setSuppSelect} /> */}
				<div className={css.dateSelect}>
					<label>Эхлэх огноо</label>
					<input
						type="date"
						className="dateselect"
						id="date_start"
						onChange={e => setStartDate(e.target.value)}
						value={startDate}
					/>
				</div>
				<div className={css.dateSelect}>
					<label>Дуусах огноо</label>
					<input
						type="date"
						className="dateselect"
						id="date_end"
						onChange={e => setEndDate(e.target.value)}
						value={endDate}
					/>
				</div>
				{!reportLoad && (
					<div className={css.downloadBtn}>
						<Button onClick={() => getData()} variant="primary" size="medium">
							Тайлан татах
						</Button>
					</div>
				)}
				{reportLoad && (
					<div className={css.spinnercontainer}>
						<Spinner />
					</div>
				)}
			</div>
			{/* <div
				className={css.footer}
				onClick={() => {
					console.log("first");
				}}
			>
				<div>Save</div>
			</div> */}
		</div>
	);
	return (
		<div id="formwithtransparentbackground">
			<div id="form">{renderHTML}</div>
			<div id="transparentbackground"></div>
		</div>
	);
};

export default ReportDiamond;
