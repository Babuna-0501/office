import { useState } from "react"
import myHeaders from "../../components/MyHeader/myHeader"
import QRCode from "react-qr-code"

const Print = (props) => {
	console.log(props)
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
	return (
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
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>ТТД: 123456789</p>
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>ДДТД: 123456789123456789</p>
				<p style={{fontFamily: 'Arial', fontSize: '10px', margin: '0'}}>Огноо: 2024-01-11</p>
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
					<p style={{margin: '1rem 0', fontSize: '16px', fontWeight: 'bold'}}>AB12345678</p>
					<div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
						<QRCode
						    size={256}
						    style={{ height: "160px", maxWidth: "100%", width: "100%" }}
						    value={Math.random() + Math.random() + 'lorem ipsum foo bar blah blah'}
						    viewBox={`0 0 256 256`}
					    />
					</div>
				</div>
			</div>
			<span className="closePage" onClick={() => props.setPrint(false)}>x</span>
		</div>
	)
}

export default Print