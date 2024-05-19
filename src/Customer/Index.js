import {useState, useContext, useEffect, useRef, useCallback} from 'react'
import myHeaders from "../components/MyHeader/myHeader"
import List from './List'
import Header from './Header'
import Form from './Form'
import { read, utils, writeFileXLSX } from 'xlsx'
import AppHook from "../Hooks/AppHook"
import writeXlsxFile from "write-excel-file"

const Index = () => {
	const appContext = useContext(AppHook)
	const [data, setData] = useState(null)
	const [tab, setTab] = useState('customer')
	const [customer, setCustomer] = useState(null)
	useEffect(() => {
		fetchData()
	}, [])
	const widths = [50, 80, 120, 200, 140]
	const widthsSum = widths.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
	const fetchData = () => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		}
		const url = `https://api2.ebazaar.mn/api/merchants?page=1`
		fetch(url, requestOptions)
		.then((r) => r.json())
		.then((response) => {
			setData(response.data)
		})
		.catch((error) => {
			console.log("error", error);
		})
	}
	let foo = []
	foo.push({
		number: 1,
		name: "Name",
		sku: "SKU",
		barcode: "Barcode",
		price: 1000,
		quantity: 100,
		totalPrice: 100000,
	})
	return (
		<>
			<Header tab={tab} setTab={setTab} />
			<div className="containerPageButtons">
				<button className="pageButton" onClick={() => setCustomer('new')}>+ Шинэ харилцагч</button>
				<button className="pageButton">Харилцагч масс импортлох</button>
				<button className="pageButton" onClick={() => downloadReport(foo)}>Харилцагчийн тайлан</button>
			</div>
			{data ? <List data={data} widths={widths} widthsSum={widthsSum} setCustomer={setCustomer} /> : null}
			{customer ? <Form setCustomer={setCustomer} customer={customer} supplierId={parseInt(appContext.userData.company_id.match(/(\d+)/)[0])} fetchData={fetchData} /> : null}
		</>
	)
}

const initSchema = [
  {
    column: "№",
    type: Number,
    value: (p) => p.number,
    width: 10,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Бүтээгдэхүүн",
    type: String,
    value: (p) => p.name,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "SKU",
    type: String,
    value: (p) => p.sku,
    width: 10,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Barcode",
    type: String,
    value: (p) => p.barcode,
    width: 20,
    align: "center",
    alignVertical: "center",
  },
  {
    column: "Нэгж үнэ",
    type: Number,
    value: (p) => p.price,
    width: 10,
    align: "right",
    alignVertical: "center",
  },
  {
    column: "Тоо ширхэг",
    type: Number,
    value: (p) => p.quantity,
    width: 10,
    align: "right",
    alignVertical: "center",
  },
  {
    column: "Нийт үнэ",
    type: Number,
    value: (p) => p.totalPrice,
    width: 10,
    align: "right",
    alignVertical: "center",
  },
]

const downloadReport = (sheetData) => {
	writeXlsxFile(sheetData, {
		initSchema,
		sheet: `Захиалгын нэгтгэл`,
		fileName: `Захиалгын-нэгтгэл.xlsx`,
		headerStyle: {
			backgroundColor: "#d3d3d3",
			align: "center",
			alignVertical: "center",
			borderColor: "#000000",
		},
		fontFamily: "Calibri",
		fontSize: 11,
		alignVertical: "center",
		align: "center",
		dateFormat: "mm/dd/yyyy",
		stickyRowsCount: 1,
	})
}

export default Index

/*
	<div ref={tbl} dangerouslySetInnerHTML={{ __html }} style={{display: 'none'}}/>
	const [__html, setHtml] = useState("");
	the ref is used in export
	const tbl = useRef(null);
	useEffect(() => { (async() => {
		const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
		const wb = read(f); // parse the array buffer
		const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
		const data = utils.sheet_to_html(ws); // generate HTML
		setHtml(data); // update state
	})(); }, []);

	const exportFile = useCallback(() => {
		const elt = tbl.current.getElementsByTagName("TABLE")[0];
		const wb = utils.table_to_book(elt);
		writeFileXLSX(wb, "SheetJSReactHTML.xlsx");
	}, [tbl]);
*/