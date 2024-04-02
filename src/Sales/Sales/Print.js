import { useState, useEffect } from "react"
import myHeaders from "../../components/MyHeader/myHeader"
import QRCode from "react-qr-code"

const Print = (props) => {
	console.log(props)
	const [ready, setReady] = useState(false)
	const [qr, setQr] = useState('')
	const [billId, setBillId] = useState('')
	const [taxPayerType, setTaxPayerType] = useState('individual')
	const [businessName, setBusinessName] = useState(null)
	const [businessRegister, setBusinessRegister] = useState(null)
	const printSlippery = () => {
		props.save(taxPayerType, businessRegister)
		var div = document.getElementById('printcontent');
        var win = window.open('', '', 'height=680,width=480')
        win.document.write(div.outerHTML)  
        win.print()
        win.document.close()
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
                "name": String(product.name),
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
		        "billType": taxPayerType === 'business' ? "3" : "",
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
	const currentDate = new Date()
	return ready ? (
		<div className="paymentpage" style={{zIndex: '3000000000'}}>
			<div className="leftblock" style={{background: '#f6f6f6'}}>
				<div style={{position: 'absolute', right: '0', bottom: '0', left: '0', padding: '2rem '}}>
					<div className="margintop1rem">
						<button className="button primary large" style={{width: '100%'}} onClick={() => printSlippery(true)}>Бүртгэх + баримт хэвлэх</button>
					</div>
				</div>
			</div>
			<div className="rightblock" style={{overflow: 'auto', background: 'white', paddingRight: '2rem'}} id="printcontent">
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>{props.taxPayerType === 'business' ? 'Байгуулагын баримт' : 'Иргэнд очих баримт'}</p>
				<div style={{textAlign: 'center'}}><p style={{fontFamily: 'Arial', fontSize: '10px', fontWeight: 'bold', margin: '12px 0'}}>{warehouseName}</p></div>
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>ТТД: 2155214</p>
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>ДДТД: {billId}</p>
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>Огноо: {currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()}</p>
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
						    size={256}
						    style={{ height: "160px", maxWidth: "100%", width: "100%" }}
						    value={qr}
						    viewBox={`0 0 256 256`}
					    />
					</div>
				</div>
			</div>
			<span className="closePage" onClick={() => props.setPrint(false)}>x</span>
		</div>
	) : <div className="paymentpage" style={{zIndex: '3000000000'}}><div className="padding1rem">Түр хүлээнэ үү...</div></div>
}

export default Print