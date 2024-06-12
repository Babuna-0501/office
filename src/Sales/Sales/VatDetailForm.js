import {useState} from "react"
import myHeaders from "../../components/MyHeader/myHeader"

const VatDetailForm = (props) => {
	console.log(props)
	const data = props.props.entryData.config.sale.vat
	const [returning, setReturning] = useState(false)
	let buttonHTML = returning ? <p>Түр хүлээнэ үү...</p> : <>
		<button className="button large secondary" style={{marginRight: '1rem'}} onClick={() => props.setVatDetail(false)}>Хаах</button>
		<button className="button primary large" onClick={() => returnReceipt()}>Баримт буцаах</button>
	</>
	const returnReceipt = () => {
		setReturning(true)
		let requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			redirect: "follow",
			body: JSON.stringify({
    			"receiptId": data.billId
			})
	    }
		let url = `https://api2.ebazaar.mn/pos-api/receipt/return`;
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			if(response.message ===  201 && response.data === 'SUCCESS') {
				// НӨАТ баримтын буцаалтыг хөдөлгөөн дээр хадгалах
					let configData = props.props.entryData.config
					configData['sale']['vat']['returned'] = true
					console.log(configData)
					console.log(props.props.entryData.__id)
					url = 'https://api2.ebazaar.mn/api/shipment/config'
					requestOptions = {
						method: "PATCH",
						headers: myHeaders,
						redirect: "follow",
						body: JSON.stringify({
						    "shipmentId": props.props.entryData._id,
						    "config": configData
						})
				    }
				    console.log(requestOptions)
					fetch(url, requestOptions).
					then(r => r.json()).
					then(response => {
						alert('Амжилттай буцаалаа.')
						props.setVatDetail(false)
						document.getElementById('billId' + data.billId).style.color = 'red'
					})
			} else {
				alert('Алдаа гарлаа.')
				props.setVatDetail(false)
			}
		})
	}
	const registerInfo = (data.taxPayerType !== 'individual') ? <>
		<div>
			<span className="width300px inlineblock marginbottom1rem" style={{display: 'inline-block'}}>Байгууллагын регистер:</span>
			<span>{data.businessRegister}</span>
		</div>
	</> : null
	return (
		<div className="paymentpage_bg">
			<div className="paymentpage">
				<div style={{padding: '1.5rem'}}>
					<div className="marginbottom1rem">
						<h1>НӨАТ-ын баримтын мэдээлэл</h1>
					</div>
					<div>
						<span className="width300px inlineblock marginbottom1rem" style={{display: 'inline-block'}}>ДДТД:</span>
						<span>{data.billId}</span>
					</div>
					<div>
						<span className="width300px inlineblock marginbottom1rem" style={{display: 'inline-block'}}>Татвар төлөгчийн төрөл:</span>
						<span>{data.taxPayerType === 'individual' ? 'Иргэн' : 'ААН'}</span>
					</div>
					{registerInfo}
					<div>
						<span className="width300px inlineblock marginbottom1rem" style={{display: 'inline-block'}}>Нийт дүн:</span>
						<span>{data.totalAmount.toLocaleString()}₮</span>
					</div>
					<div>
						<span className="width300px inlineblock marginbottom1rem" style={{display: 'inline-block'}}>НӨАТ:</span>
						<span>{parseFloat(data.totalVat).toLocaleString()}₮</span>
					</div>
					<div>
						<span className="width300px inlineblock marginbottom1rem" style={{display: 'inline-block'}}>НХАТ:</span>
						<span>{data.totalCityTax ?? null}</span>
					</div>
				</div>
				<div style={{position: 'absolute', right: '0', bottom: '0', left: '0', padding: '1.5rem', textAlign: 'right'}}>
					{buttonHTML}
				</div>
			</div>
		</div>
	)
}

export default VatDetailForm