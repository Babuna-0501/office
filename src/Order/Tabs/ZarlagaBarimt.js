import html2pdf from "html2pdf.js"
import myHeaders from "../../components/MyHeader/myHeader"
import {useEffect, useState} from 'react'
import ZarlagaBarimtLines from './ZarlagaBarimtLines'

const ZarlagaBarimt = (props) => {
	console.log(props)
	const [warehouses, setWarehouses] = useState(false)
	const handlePrint = () => {
		const rep = document.getElementById("barimt")
		var opt = {
			margin: [5, 5, 5, 5],
			filename: `Зарлагын баримт.pdf`,
			image: { type: "jpeg", quality: 1 },
			html2canvas: {
				dpi: 300,
				scale: 4,
				letterRendering: true,
				useCORS: true,
			},
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
		}
		html2pdf().set(opt).from(rep).save()
	}
	useEffect(() => {
		const getWarehouses = async () => {
			try {
				const warehouse = `https://api2.ebazaar.mn/api/warehouse`;
				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow",
				}
				const [warehouse1, warehouse2] = await Promise.all([
					fetch(warehouse, requestOptions),
					fetch(warehouse, requestOptions),
				])
				const warehouse1data = await warehouse1.json()
				const warehouse2data = await warehouse2.json()
				console.log(warehouse1data.data)
				setWarehouses(warehouse1data)
			} catch (error) {
				console.log(error);
			}
		}
    	getWarehouses()
	}, [])
	return (
		<div id="overlaypage_bg">
			<div id="overlaypage">
				<div className="pageHeader" id="pageHeader">
					<p>Зарлагын баримт хэвлэх</p>
					<span className="pageClose" onClick={() => props.setZarlagaBarimt(false)}><img src="https://admin.ebazaar.mn/images/close.svg" alt="" /></span>
				</div>
				{warehouses ? <ZarlagaBarimtLines key={Math.random()} warehouses={warehouses.data} order={props.order} /> : <p>Түр хүлээнэ үү...</p>}
				<div className="containerButtons"><button className="pageButton" onClick={() => handlePrint()}>Зарлагын баримт хэвлэх</button></div>
			</div>
		</div>
	)
}

export default ZarlagaBarimt