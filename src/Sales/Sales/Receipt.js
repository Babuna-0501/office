import ReceiptProductSelector from './ReceiptProductSelector'
import { useEffect, useState } from "react"

const Receipt = (props) => {
	console.log(props)
	const data = props.data
	const receiptDetails = data.receiptDetails
	const [chosenProduct, setChosenProduct] = useState(null)
	const chooseProduct = (productData) => {
		setChosenProduct(productData)
		setReceiptProductSelector(true)
	}
	let renderHTML = []
	const expireDate = new Date(data.receiptExpireDate)
	const [receiptProductSelector, setReceiptProductSelector] = useState(false)
	receiptDetails.map(product => {
		renderHTML.push(<div onClick={() => chooseProduct(product)} style={{border: '1px solid #eee', background: 'white', padding: '.5rem', cursor: 'pointer'}}>{product.tbltName} <strong>Өдөрт:</strong> {product.dailyTimes}, <strong>Тоо ширхэг:</strong> {product.tbltSize}</div>)
	})
	return (
		<div style={{margin: '1rem 0 0 0'}}>
			<h1>{data.patientFirstName + ' ' + data.patientLastName}</h1>
			<h1>{data.patientRegNo}</h1>
			<h3><strong>Онош:</strong> {data.receiptDiag}</h3>
			<h3><strong>Дуусах:</strong> {expireDate.toISOString().substr(0, 10) + ' ' + expireDate.toISOString().substr(11, 5) }</h3>
			<h3>Аймаг/хот: {data.hosOfficeName}</h3>
			<h3>Сум/дүүрэг: {data.hosSubOffName}</h3>
			<h3>Эмнэлэг: {data.hosName}</h3>
			<h3>Эмчийн код: {data.cipherCode}</h3>
			{renderHTML}
			{receiptDetails.length === 0 ? <span style={{background: 'red', color: 'white'}}>Жорыг ашигласан</span> : null}
			{receiptProductSelector ? <ReceiptProductSelector addProduct={props.addProduct} data={chosenProduct} products={props.products} setReceiptProductSelector={setReceiptProductSelector} /> : null}
		</div>
	)
}

export default Receipt
/*
        "hosOfficeName": "СҮХБААТАР",
        "hosName": "Асгат сумын эрүүл мэндийн төв / Сүхбаатар /",
        "hosSubOffName": "АСГАТ СУМ",
        "cipherCode": "ЛА99030912",
*/