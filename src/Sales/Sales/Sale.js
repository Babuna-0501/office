import { useEffect, useState } from "react"
import myHeaders from "../../components/MyHeader/myHeader"
import Payment from './Payment'
import Receipt from './Receipt'
import SearchResult from './SearchResult'

const Sale = (props) => {
	console.log(props)
	let temp = []
	if(props.openingSaleData) {
		props.openingSaleData.products.map(product => {
			temp.push(product)
		})
	}
	/*if(props.sale !== true && props.sale !== 1) {
		let drafts = JSON.parse(localStorage.getItem('draftsale'))
		drafts.map(draft => {
			if(draft.id === props.sale) {
				draft.lines.map(entry => {
					temp.push(entry)
				})
				return
			}
		})
	}*/
	let order = []
	const [scanning, setScanning] = useState(false)
	const [data, setData] = useState(temp)
	const [series, setSeries] = useState({})
	const [payment, setPayment] = useState(false)
	const [receiptData, setReceiptData] = useState(false)
	const [searchResult, setSearchResult] = useState(false)
	const [showSearchResult, setShowSearchResult] = useState(false)
	let foo = false
	const search = (e) => {
		if(foo === false) {
			foo = true
			setTimeout(() => {
				fetchProduct(document.getElementById('search_sale').value)
			}, 300)
		}
	}
	const fetchProduct = (query) => {
		if(document.getElementById('search_sale').value !== '') {
			foo = false
			let foobar = []
			props.products.map(prod => {
				if(prod.bar_code.toLowerCase().includes(query.toLowerCase()) || prod.name.toLowerCase().includes(query.toLowerCase())) {
					foobar.push(prod)
				}
			})
			setSearchResult(foobar)
			setShowSearchResult(true)
		}
	}
	const functionalKeys = (e) => {
		if(e.code === "F9") {
			document.getElementById('search_sale').focus()
		}
	}
	useEffect(() => {
		document.addEventListener('keydown', functionalKeys, true)
	}, [])
	const checkReceipt = () => {
		const receiptNumber = document.getElementById('receiptNumber')
		const customerregistrationid = document.getElementById('customerregistrationid')
		const inputBorderColor = customerregistrationid.style.borderColor
		if(receiptNumber.value === '') {
			receiptNumber.style.borderColor = 'red'
			receiptNumber.focus()
			setTimeout(() => { receiptNumber.style.borderColor = inputBorderColor }, 2000)
			return
		}
		if(customerregistrationid.value === '') {
			customerregistrationid.style.borderColor = 'red'
			customerregistrationid.focus()
			setTimeout(() => { customerregistrationid.style.borderColor = inputBorderColor }, 2000)
			return
		}
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		let url = `https://api2.ebazaar.mn/emd/receipt?receiptNumber=${receiptNumber.value}&regNo=${customerregistrationid.value}`;
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			if(response.data === "") {
				alert('Цахим жорын мэдээлэл олдсонгүй. Оруулсан мэдээллээ шалгана уу.')
				receiptNumber.focus()
			} else {
				setReceiptData(response.data)
				receiptNumber.value = ''
				customerregistrationid.value = ''
			}
		})
	}
	const randomPrice = Math.round(Math.random() * 10000)
	const addProduct = (addedProduct) => {
		console.log(addedProduct.emdData)
		let tempProductData = {}
		let existingId = null
		data.map((prod, index) => {
			if(prod._id === addedProduct._id) {
				existingId = index
			}
		})
		if(existingId || existingId === 0) {
			tempProductData = data
			tempProductData[existingId].quantity = Number(tempProductData[existingId].quantity) + 1
			setData([...tempProductData])
		} else {
			tempProductData = {
				image: addedProduct.image,
				name: addedProduct.name,
				bar_code: addedProduct.bar_code,
				sku: addedProduct.sku,
				sellPrice: addedProduct.series[0].sellPrice,
				quantity: 1,
				category: addedProduct.category,
				_id: addedProduct._id,
				emd: addedProduct.emdData ? addedProduct.emdData : null
			}
			setData([...data, tempProductData])
		}
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		let url = `https://api2.ebazaar.mn/api/warehouse_series/get?productId=${addedProduct._id}&warehouseId=${props.warehouse}`;
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			if(response.success === true) {
				let temp = JSON.parse(JSON.stringify(series))
				temp[addedProduct._id] = response.data
				setSeries({...temp})
			}
		})
	}
	const updateQuantity = (prod, newQuantity) => {
		let temp = data
		temp.map((product,index) => {
			if(product._id === prod._id) {
				temp[index].quantity = Number(newQuantity)
			}
		})
		setData([...temp])
	}
	let greatGrandTotal = 0
	data.map(product => {
		greatGrandTotal += Number(product.sellPrice.retail) * Number(product.quantity)
	})
	const saveAsDraft = () => {
		if(!localStorage.getItem('draftsale')) {
			localStorage.setItem('draftsale', '[]')
		}
		let drafts = JSON.parse(localStorage.getItem('draftsale'))
		const newDraftSale = {
			type: 0,
			documentId: 'Кассын борлуулалт',
			date: '2024-01-01',
			products: data,
			_id: Math.round(Math.random() * 100) * Math.round(Math.random() * 100) * Math.round(Math.random() * 100) * Math.round(Math.random() * 100) * Math.round(Math.random() * 100) * Math.round(Math.random() * 100)
		}
		drafts.push(newDraftSale)
		localStorage.setItem('draftsale', JSON.stringify(drafts))
		props.saveDraft(newDraftSale)
	}
	const remove = (id) => {
		data.map((product, index) => {
			if(id === product._id) {
				let temp = data
				temp.splice(index, 1)
				setData([...temp])
			}
		})
	}
	const selectSeries = (productId, seriesNumber) => {
		console.log(productId  + ' and ' + seriesNumber)
	}
	const save = (taxPayerType, businessRegister) => {
		console.log(taxPayerType + ' and ' + businessRegister)
		//noatAmountOrig += (x.price.toFixed(2) * x.quantity.toFixed(2)) / 11.2;
		let vatStocks = []
		let totalVat = 0
		let totalAmount = 0
		let taxBillId
		data.map(product => {
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
		/*const url = `https://api2.ebazaar.mn/api/ebarimt/barimt`
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: JSON.stringify(vatData)
	    }
	    fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			sendEMD(response.data.billId, data, receiptData)
		})*/
		/*
		{
		    "orderId": 35098,
		    "register": 2699222,
		    "body": {
		        "amount": "67500.00",
		        "vat": "3409.09",
		        "cashAmount": "67500.00",
		        "nonCashAmount": "0.00",
		        "cityTax": "0.00",
		        "districtCode": "24",
		        "posNo": "1000",
		        "customerNo": "1234561",
		        "billType": "3",
		        "billIdSuffix": "",
		        "taxType": "1",
		        "registerNo": "5946093",
		        "stocks": [
		            {
		                "code": "564868",
		                "name": "Борцтой-300гр 50 ш",
		                "measureUnit": "ш",
		                "qty": "25.00",
		                "unitPrice": "1500.00",
		                "totalAmount": "37500.00",
		                "cityTax": "0.00",
		                "vat": "3409.09",
		                "barCode": "8656021217051"
		            },
		            {
		                "code": "564871",
		                "name": "Ясны шөлтэй-300гр 50 ш",
		                "measureUnit": "ш",
		                "qty": "25.00",
		                "unitPrice": "1200.00",
		                "totalAmount": "30000.00",
		                "cityTax": "0.00",
		                "vat": "0.00",
		                "barCode": "8656021217112"
		            }
		        ],
		        "bankTransactions": null
		    }
		}
		*/
		/*let foo = []
		data.map(product => {
			foo.push({
				productId: product._id,
				quantity: product.quantity,
				cost: product.cost,
				sellPrice: {
					retail: product.sellPrice.retail
				}
			})
		})
		let activeWarehouseID = null
		props.warehouses.map(warehouse => {
			if(warehouse._id === props.warehouse) {
				activeWarehouseID =  warehouse.supplierId
				return
			}
		})
		let sendData = {
			"supplierId": activeWarehouseID,
		    "documentId": "Кассын борлуулалт",
		    "type": 2,
		    "variety": 1,
		    "note": "Кассын борлуулалт",
		    "from": props.warehouse,
		    "products": foo
		}
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: JSON.stringify(sendData)
	    }
	    const url = 'https://api2.ebazaar.mn/api/shipment'
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			if(response.message === 'success') {
				const shipmentId = response.data.shipmentId
				// Борлуулалтын батлагдсан зарлага болгох
				let sendData = {
					"_id": shipmentId,
				    "status": 2
				}
				var requestOptions = {
					method: "PATCH",
					headers: myHeaders,
					redirect: "follow",
					body: JSON.stringify(sendData)
			    }
			    const url = 'https://api2.ebazaar.mn/api/shipment'
				fetch(url, requestOptions).
				then(r => r.json()).
				then(response => {
					if(response.message === 'success') {
						alert('Амжилттай бүртгэлээ.')
					}
				})
				// Борлуулалтын батлагдсан зарлага болгох
				if(props.sale === 'draft') {
					props.removeDraft(props.openingSaleData._id)
				}
				props.handleSave()
			} else {
				alert('Алдаа гарлаа. F5 дарж дахин ачааллана уу!')
			}
		})*/
	}
	const emd = () => {
		console.log(data)
		data.map(entry => {
			console.log(entry)
		})
	}
	return (
		<div id="overlaypage_bg">
			<div id="overlaypage" className={props.sale === 'open' ? 'disabled' : null}>
				<div id="layout_left">
					<h1>Борлуулалт</h1>
					<div style={{position: 'relative', display: props.sale === 'open' ? 'none' : null}}>
						<input disabled={setScanning ? false : true} id="search_sale" onInput={e => fetchProduct(e.target.value)} type="text" placeholder="Бүтээгдэхүүн хайх (F9)" style={{width: '100%', height: '40px', lineHeight: '40px', borderTop: 'none', borderRight: 'none', borderLeft: 'none', margin: '1rem 0'}} />
						{showSearchResult ? <SearchResult setShowSearchResult={setShowSearchResult} setSearchResult={setSearchResult} data={searchResult} addProduct={addProduct} products={props.products} /> : null}
					</div>
					<div className="box_header_container" style={{borderRadius: '3px', overflow: 'hidden'}}>
						<div className="box_header" style={{width: '52px', justifyContent: 'center'}}><input type="checkbox" /></div>
						<div className="box_header" style={{width: '52px'}}><h4>Зураг</h4></div>
						<div className="box_header" style={{width: '300px'}}><h4>Нэр</h4></div>
						<div className="box_header" style={{width: '120px'}}><h4>Хэлбэр</h4></div>
						<div className="box_header" style={{width: '120px'}}><h4>Баркод</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>Ангилал</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>Сери</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>Тоо, ширхэг</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>Үнэ</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>ЭМД хөнгөлөлт</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>Хямдрал</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>Нийт</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>НӨАТ</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>Төлөх дүн</h4></div>
						<div className="box_header" style={{width: '100px'}}><h4>Remove</h4></div>
					</div>
					{
						data.length > 0 ? data.map(entry => {
							console.log(entry)
							let productData = null
							props.products.map(productInfo => {
								if(productInfo._id === (props.sale === 'open' ? entry.productId : entry._id)) {
									console.log('found')
									productData = productInfo
								}
							})
							console.log(productData)
							const price = Number(entry.sellPrice['retail'])
							const total = price * Number(entry.quantity)
							return productData ? (
								<div className="box_container" key={Math.random()} id={'product_' + entry._id}>
									<div className="box" style={{width: '52px', justifyContent: 'center'}}><input type="checkbox" /></div>
									<div className="box" style={{width: '52px'}}><img src={productData && productData.image[0] ? productData.image[0] : null} alt={entry.image} style={{width: '44px'}} /></div>
									<div className="box" style={{width: '300px'}}><span>{productData.name}</span></div>
									<div className="box" style={{width: '120px'}}><span>{productData.type ? productData.type : null}</span></div>
									<div className="box" style={{width: '120px'}}><span>{productData.bar_code}</span></div>
									<div className="box" style={{width: '100px'}}><span>{productData.category}</span></div>
									<div className="box" style={{width: '100px'}}>
										<select id={'series_' + entry._id} style={{width: '100px'}} onChange={(e) => selectSeries(entry._id, e.target.value)}>
											<option value="">-- сонгох --</option>
											{
												series[entry._id] ? series[entry._id].map(seriesNumber => {
													return <option value={seriesNumber.seriesNumber}>{' (' + seriesNumber.quantity + 'ш) --- ' + seriesNumber.seriesNumber}</option>
												}) : null
											}
										</select>
									</div>
									<div className="box" style={{width: '100px'}}>{props.openingSaleData ? <span>{entry.quantity}</span> : <input type="number" defaultValue={entry.quantity} onChange={(e) => updateQuantity(entry, e.target.value)} />}</div>
									<div className="box" style={{width: '100px'}}><span>₮{price.toLocaleString()}</span></div>
									<div className="box" style={{width: '100px'}}><span>{entry.healthInsuranceAmount}</span></div>
									<div className="box" style={{width: '100px'}}><span>{entry.discount}</span></div>
									<div className="box" style={{width: '100px'}}><span>{entry.vatAmount}</span></div>
									<div className="box" style={{width: '100px'}}><span>{entry.vatAmount}</span></div>
									<div className="box" style={{width: '100px'}}><span>₮{total.toLocaleString()}</span></div>
									<div className="box" style={{width: '100px'}}><span onClick={() => remove(entry._id)}>Remove</span></div>
								</div>
							) : null
						}) : null
					}
					<div id="bottomsection">
						<div className="blocks">
							<div className="block">
								<h1>Нийт</h1>
								<h2>{greatGrandTotal.toLocaleString()}₮</h2>
							</div>
							<div className="block">
								<h1>Хөнгөлөлт</h1>
								<h2></h2>
							</div>
							<div className="block">
								<h1>НӨАТ</h1>
								<h2></h2>
							</div>
							<div className="block">
								<h1>Төлөх</h1>
								<h2>{greatGrandTotal.toLocaleString()}₮</h2>
							</div>
						</div>
						<div className="container-button" style={{display: props.sale === 'open' ? 'none' : null}}>
							<button className="button secondary large" onClick={() => sendEMD('123456', data, receiptData)}>EMD</button>
							<button className="button secondary large" onClick={() => props.cancel(false)}>Цуцлах</button>
							<button className="button secondary large" onClick={() => saveAsDraft()} disabled={data.length > 0 ? false: true}>Хадгалах (F10)</button>
							<button className="button secondary large" onClick={() => setPayment(true)} disabled={data.length > 0 ? false: true}>Төлбөр бүртгэх</button>
						</div>
					</div>
				</div>
				<div id="layout_right">
					<div style={{display: props.sale === 'open' ? 'none' : null}}>
						<h1>Цахим жор</h1>
						<div className="columns">
							<div className="column2">
								<h3>Дугаар:</h3>
								<input type="text" placeholder="Жорын дугаар" id="receiptNumber" />
							</div>
							<div className="column2">
								<h3>Регистр:</h3>
								<input type="text" placeholder="Харилцагчын регистр" id="customerregistrationid" />
							</div>
						</div>
						<div className="columns margintop1rem">
							<div className="column1">
								<button className="button primary medium" onClick={() => checkReceipt()} style={{width: '100%'}}>Хайх</button>
							</div>
						</div>
						{receiptData ? <Receipt data={receiptData} products={props.products} addProduct={addProduct} /> : null}
					</div>
				</div>
			</div>
			{payment ? <Payment setPayment={setPayment} data={data} warehouses={props.warehouses} warehouse={props.warehouse} products={props.products} save={save} /> : null}
			<div id="overlaypage_close" onClick={() => props.setSale(false)}>x</div>
		</div>
	)
}

const sendEMD = (taxBillId, data, receiptData) => {
	console.log(taxBillId)
	console.log(data)
	console.log(receiptData)
	// 
	let emd = false
	let detCnt = 0
	let ebarimtDetails = []
	const timestamp = new Date().getTime();
	data.map(prod => {
		if(prod.emd) {
			emd = true
			detCnt++
			console.log(prod.emd)
			ebarimtDetails.push(
				{
		            "barCode": "7612797504192", // Эмийн зураасан код
		            "productName": "эксфорж(10мг + 160мг)", // Эмийн нэршил латин тун
		            "quantity": prod.quantity.toFixed(1), // Эмийн борлуулсан ширхгийн тоо хэмжээ
		            "insAmt": prod.emdData.tbltUnitDisAmt, // Тухайн эмийг хөнгөлсөн дүн
		            "totalAmt": ((parseInt(prod.sellPrice.retail) - parseInt(prod.emdData.tbltUnitDisAmt)) * parseInt(prod.quantity)).toFixed(1), // Нийт дүн
		            "price": ((parseInt(prod.sellPrice.retail) - parseInt(prod.emdData.tbltUnitDisAmt)) * parseInt(prod.quantity)).toFixed(1), // Иргэний төлөх дүн
		            "detailId": 1459031806, // Лавлагаа хийсэн цахим жорын хөнгөлөлттэй эмээс ямар баримтын дугаартай эмийг борлуулсан тухайн эмийн баримт тодорхойлох дугаарыг илгээнэ
		            "tbltId": 3960, // Хөнгөлөлтэй эмийн жагсаалт дээрх эмийн ID дугаар
		            "packGroup": 110
		        }
			)
		}
	})
	// ЭМД руу илгээх
	if(emd) {
		console.log('preparing to send emd')
		const url = `https://api2.ebazaar.mn/emd/order/send`
		let emdBody = {
		    "receiptId": receiptData.id, // Жор тодорхойлох дугаар Лавлагаа хийсэн цахим жорын баримт тодорхойлох дугаарыг илгээнэ.
		    "posRno": taxBillId, // Ebarimt –н ДДТД
		    "salesDate": String(timestamp), // Борлуулалт хийсэн огноо
		    "totalAmt": 48000.0, // Нийт дүн 
		    "status": 1, // Төлөв
		    "insAmt": 24000.0, // Хөнгөлсөн нийт дүн
		    "vatAmt": 2400.0, // Нийт НӨАТ ногдох дүн 
		    "netAmt": 21600.0, // Цэвэр дүн
		    "receiptNumber": 111111, // Хяналтын дугаар
		    "detCnt": parseInt(detCnt), // Боруулалсан эмийн нэр төрлийн тоо
		    "ebarimtDetails": ebarimtDetails
		}
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: JSON.stringify(emdBody)
	    }
	    console.log(emdBody)
	    console.log(JSON.stringify(emdBody))
	    /*fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			sendEMD(response.data.billId, data, receiptData)
		})*/
	}
}

export default Sale