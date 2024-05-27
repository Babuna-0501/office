import { useState, useEffect } from "react"
import myHeaders from "../../components/MyHeader/myHeader"
import QRCode from "react-qr-code"

const Print = (props) => {
	console.log(props)
	/*
		props.businessName
		props.taxPayerType
		props.businessRegister
	*/
	const [ready, setReady] = useState(false)
	const [saved, setSaved] = useState(false)
	const [qr, setQr] = useState('')
	const [lotteryNumber, setLotteryNumber] = useState(null)
	const [lotteryAmount, setLotteryAmount] = useState(null)
	const [billId, setBillId] = useState('')
	const [taxPayerType, setTaxPayerType] = useState(props.taxPayerType)
	const [businessName, setBusinessName] = useState(null)
	const [businessRegister, setBusinessRegister] = useState(null)
	const printSlippery = () => {
		var div = document.getElementById('printcontent');
        var win = window.open('', '', 'height=680,width=480')
        win.document.write(div.outerHTML)
        win.document.write('<script>window.addEventListener("afterprint", (event) => {window.close();})</script>')
        win.print()
        win.document.close()
        if(!saved) {
        	props.save(props.taxPayerType, props.businessRegister, {cash: 1, card: 2, wire: 3})
        	setSaved(true)
        } else {
        	console.log('already saved')
        }
        
        win.close()
	}
	const searchBusinessInfo = (reg) => {
		if(reg.length >= 7) {
			var requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
		    }
			let url = `https://api2.ebazaar.mn/pos-api/vatpayer?regNo=${reg}`;
			fetch(url, requestOptions).
			then(r => r.json()).
			then(response => {
				if(response.message === 201) {
					console.log('business found')
					setBusinessName(response.data.name)
					setBusinessRegister(reg)
					document.getElementById('businessorganizationname').value = response.data.name
				}
			})
		}
	}
	let warehouseName = ''
	props.warehouses.map(warehouse => {
		if(warehouse._id === props.warehouse) {
			warehouseName = warehouse.name
			return
		}
	})
	let restructuredProducts = {}
	props.products.map(prod => {
		restructuredProducts[prod._id] = prod
	})
	let total = 0
	props.data.map(product => {
		total += product.quantity * product.sellPrice.retail
	})
	useEffect(() => {
		foobar()
	}, [])
	async function getCustomerTin() {
		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow"
		}
		const url = "https://api2.ebazaar.mn/pos-api/tin?regNo=" + props.businessRegister
		console.log(url)
		const tin = await fetch(url, requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.error(error))
		return tin.data
	}
	async function foobar() {
		let vatStocks = []
		let totalVat = 0
		let totalAmount = 0
		let taxBillId = 0
		props.data.map(product => {
			const vatAmount = (parseInt(product.sellPrice.retail) * parseInt(product.quantity)/11).toFixed(2)
			const lineTotalAmount = product.sellPrice.retail * product.quantity
			vatStocks.push({
				"name": product.name,
				"barCode": product.bar_code,
				"barCodeType": "UNDEFINED",
				"classificationCode": "0001001",
				"taxProducCode": "",
				"measureUnit": "ш",
				"qty": product.quantity,
				"unitPrice": product.sellPrice.retail,
				"totalBonus": 0,
				"totalVAT": vatAmount,
				"totalCityTax": 0,
				"totalAmount": lineTotalAmount,
				"data": {}
			})
			totalVat += parseFloat(vatAmount)
			totalAmount += parseFloat(parseInt(product.quantity) * parseInt(product.sellPrice.retail))
		})
		totalVat = totalAmount/11
		totalVat = totalVat.toFixed(2)
		const raw = {
			"supplierId": props.supplierId,
			"totalAmount": totalAmount,
			"totalVAT": totalVat,
			"totalCityTax": 0,
			"branchNo": "1",
			"districtCode": "0001",
			"merchantTin": "37900846788",
			"posNo": "10002623",
			"consumerNo": "",
			"type": taxPayerType === "business" ? "B2B_RECEIPT" : "B2C_RECEIPT",
			"inactiveId": "",
			"receipts": [
			{
				"totalAmount": totalAmount,
				"totalVAT": totalVat,
				"totalCityTax": 0,
				"taxType": "VAT_ABLE",
				"merchantTin": "37900846788",
				"type": taxPayerType === "business" ? "B2B_RECEIPT" : "B2C_RECEIPT",
				"data": {},
				"items": vatStocks
			}
			],
			"payments": [
				{
					"code": "CASH",
					"status": "PAID",
					"paidAmount": totalAmount,
					"data": {}
				}
			]
		}
		if(taxPayerType === "business") {
			raw['customerTin'] = await getCustomerTin()
		}
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(raw)
	    }
		fetch("https://api2.ebazaar.mn/pos-api/receipt/create", requestOptions)
		.then((response) => response.json())
		.then((result) => {
			if(result.message === 201) {
				console.log(result)
				setQr(result.data.qrData)
				setBillId(result.data.id)
				setLotteryNumber(result.data.lottery)
				setReady(true)
				setLotteryAmount(totalAmount)
			} else {
				alert('Алдаа гарлаа.')
			}
		})
		.catch((error) => console.error(error))
	}
	/*useEffect(() => {
		console.log('vatttttttttttttting')
		console.log(taxPayerType + ' and ' + businessRegister)
		//noatAmountOrig += (x.price.toFixed(2) * x.quantity.toFixed(2)) / 11.2;
		let vatStocks = []
		let totalVat = 0
		let totalAmount = 0
		let taxBillId
		props.data.map(product => {
			const vatAmount = (parseInt(product.sellPrice.retail) * parseInt(product.quantity)/11).toFixed(2)
			vatStocks.push({
				"code": String(product._id),
                "name": "foobar",
                "measureUnit": "ш",
                "qty": String(product.quantity.toFixed(2)),
                "unitPrice": String(parseInt(product.sellPrice.retail).toFixed(2)),
                "totalAmount": String((parseInt(product.sellPrice.retail) * parseInt(product.quantity)).toFixed(2)),
                "cityTax": "0.00",
                "vat": String(parseFloat(vatAmount).toFixed(2)),
                "barCode": String(product.bar_code)
			})
			totalVat += parseFloat(vatAmount)
			totalAmount += parseFloat(parseInt(product.quantity) * parseInt(product.sellPrice.retail))
		})
		console.log(totalVat.toFixed(2))
		console.log(totalAmount)
		let vatData = {
			"register": 2155214,
		    "bankTransactions": null,
		    "orderId": Math.floor(Math.random() * 100 * Math.random() *100 * Math.random() * 100 * 100),
		    "body": {
		        "amount": String(totalAmount.toFixed(2)),
		        "vat": String(parseFloat(totalVat).toFixed(2)),
		        "cashAmount": String(totalAmount.toFixed(2)),
		        "nonCashAmount": "0.00",
		        "cityTax": "0.00",
		        "districtCode": "35",
		        "posNo": "1000",
		        "customerNo": taxPayerType === "business" ? String(businessRegister) : "",
		        "billType": taxPayerType === 'business' ? "3" : "1",
		        "billIdSuffix": "",
		        "taxType": "1",
		        "registerNo": "2155214",
		        "stocks": vatStocks,
		        "bankTransactions": null
		    }
		}
		console.log(vatData)
		const url = `https://api2.ebazaar.mn/api/ebarimt/barimt`
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: JSON.stringify(vatData)
	    }
	    fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			console.log(response.code)
			if(response.code === 200 && response.data) {
				console.log(response)
				console.log(response.data.qrData)
				setQr(response.data.qrData)
				setBillId(response.data.billId)
				setReady(true)
			} else {
				alert('Алдаа гарлаа.')
			}
		})
	}, [])
	*/
	const currentDate = new Date()
	const newSale = () => {
		props.newSale()
	}
	return ready ? (
		<div className="paymentpage" style={{zIndex: '3000000000'}}>
			<div className="leftblock" style={{background: '#f6f6f6'}}>
				<div style={{position: 'absolute', right: '0', bottom: '0', left: '0', padding: '2rem '}}>
					<div className="margintop1rem">
						<button className="button primary large" style={{width: '100%'}} onClick={() => newSale()}>Шинэ борлуулалт</button>
						<div style={{height: '2rem'}}></div>
						<button className="button primary large" style={{width: '100%', background: '#b2b1b0'}} onClick={() => printSlippery(true)}>Баримт хэвлэх</button>
					</div>
				</div>
			</div>
			<div className="rightblock" style={{overflow: 'auto', background: 'white', paddingRight: '2rem'}} id="printcontent">

				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>{props.taxPayerType === 'business' ? 'Байгуулагын баримт' : 'Иргэнд очих баримт'}</p>
				<div style={{textAlign: 'center'}}><p style={{fontFamily: 'Arial', fontSize: '10px', fontWeight: 'bold', margin: '12px 0'}}>{warehouseName}</p></div>
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>ТТД: 2155214</p>
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>ДДТД: {billId}</p>
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>Огноо: {currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()}</p>
				{props.taxPayerType === 'business' ? <p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>ААН нэр: {props.businessName}</p> : null}
				{props.taxPayerType === 'business' ? <p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>ААН РД: {props.businessRegister}</p> : null}
				<div>
					<div style={{width: '40%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', fontWeight: 'bold', color: 'black'}}>Бараа</p></div>
					<div style={{width: '15%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', fontWeight: 'bold', color: 'black'}}>Тоо</p></div>
					<div style={{width: '15%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', fontWeight: 'bold', color: 'black'}}>Үнэ</p></div>
					<div style={{width: '15%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', fontWeight: 'bold', color: 'black'}}>Хөнг</p></div>
					<div style={{width: '15%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', fontWeight: 'bold', color: 'black', textAlign: 'right'}}>Дүн</p></div>
				</div>
				{
					props.data.map(product => {
						let temp = restructuredProducts[product._id]
						console.log(product)
						return (
							<div style={{borderTop: '1px dotted gray'}}>
								<div style={{width: '40%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0'}}>{temp.name}}</p></div>
								<div style={{width: '15%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0'}}>{product.quantity}</p></div>
								<div style={{width: '15%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0'}}>{product.sellPrice.retail}</p></div>
								<div style={{width: '15%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0'}}>0</p></div>
								<div style={{width: '15%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0', textAlign: 'right'}}>{Number(product.sellPrice.retail) * product.quantity}</p></div>
							</div>
						)
					})
				}
				<div style={{margin: '1rem 0 0 0'}}>
					<div style={{width: '50%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0'}}>Нийт дүн:</p></div>
					<div style={{width: '50%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0', textAlign: 'right'}}>{total.toLocaleString()}</p></div>
				</div>
				<div>
					<div style={{width: '50%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0'}}>ЭМД хөнгөлөлт</p></div>
					<div style={{width: '50%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0', textAlign: 'right'}}>0</p></div>
				</div>
				<div>
					<div style={{width: '50%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0'}}>Төлөх дүн</p></div>
					<div style={{width: '50%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0', textAlign: 'right'}}>{total.toLocaleString()}</p></div>
				</div>
				<div>
					<div style={{width: '50%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0'}}>НӨАТ</p></div>
					<div style={{width: '50%', display: 'inline-block'}}><p style={{fontFamily: 'Arial', fontSize: '10px', color: 'black', margin: '0', textAlign: 'right'}}>{(total / 11).toFixed(2)}</p></div>
				</div>

				<div style={{textAlign: 'center'}}>
					<p style={{margin: '1rem 0', fontSize: '16px', fontWeight: 'bold'}}></p>
					<div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
						<QRCode
						    size={128}
						    style={{ height: "160px", maxWidth: "100%", width: "100%" }}
						    value={qr}
						    viewBox={`0 0 256 256`}
					    />
					    {lotteryNumber ? <div style={{textAlign: 'center', fontSize: '10px'}}><div style={{fontSize: '10px'}}>Сугалааны дугаар: {lotteryNumber ?? lotteryNumber.split(" ").join("")}</div><div style={{fontSize: '10px'}}>Ибаримтын дүн: {lotteryAmount}</div></div> : null}
					</div>
				</div>
			</div>
		</div>
	) : <div className="paymentpage" style={{zIndex: '3000000000'}}><div className="padding1rem">Түр хүлээнэ үү...</div></div>
}

export default Print