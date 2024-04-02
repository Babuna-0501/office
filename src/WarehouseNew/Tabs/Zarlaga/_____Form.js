import {useState, useContext, useEffect} from 'react'
import {ModuleContext} from '../../index'
import myHeaders from "../../../components/MyHeader/myHeader"
import ProductSelector from '../../ProductSelector'
import {WarehouseContext} from '../../Warehouse'

const Form = (props) => {
	console.log(props.form)
	const context = useContext(ModuleContext)
	const whcontext = useContext(WarehouseContext)
	console.log(whcontext)
	const [products, setProducts] = useState([])
	useEffect(() => {
		if(props.form[0] !== 'new') {
			let foo = {}
			whcontext.allProducts.map(product => {
				foo[product._id] = product
			})
			console.log(foo)
			let bar = props.form.products
			console.log(props.form)
			bar.map((product, index) => {
				console.log(bar[index])
				bar[index]['_id'] = bar[index]['productId']
				bar[index]['name'] = foo[bar[index]['productId']]['name']
				bar[index]['image'] = []
				bar[index]['image'][0] = foo[bar[index]['productId']]['image'][0]
				bar[index]['bar_code'] = foo[bar[index]['productId']]['bar_code']
				bar[index]['incase'] = foo[bar[index]['productId']]['incase']
			})
			setProducts(JSON.parse(JSON.stringify(bar)))
			//console.log(bar)
			/*let temp = []
			props.form.products.map(product => {
				console.log(product)
				whcontext.products.map(prod => {
					if(product._id === prod._id) {
						console.log('found')
					}
				})
			})*/
			//temp.map(product => {
				//tempconsole.log(product)
			//})
		}
	}, [])
	const title = 'Зарлагын хүсэлт'
	const [type, setType] = useState('warehouse')
	const [sender, setSender] = useState(null)
	const [productSelector, setProductSelector] = useState(false)
	const [sendingWarehouse, setSendingWarehouse] = useState(null)
	const [outboundType, setOutboundType] = useState(null)
	const sequenceSizes = {
		index: 80,
		id: 120,
		image: 120,
		name: 300,
		category: 120,
		barcode: 120,
		sku: 120,
		stock: 120,
		cost: 120,
		totalcost: 120,
		saleprice: 120,
		quantity: 120,
		series: 120,
		expire: 120,
		series: 180
	}
	const widths = [60, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120]
	let width = 0
	for(const size in sequenceSizes) {
		width += sequenceSizes[size]
	}
	const calculateTotalCost = (e, id) => {

		/*const quantity = document.getElementById('quantity' + id).value
		const cost = document.getElementById('cost' + id).value
		if(Number(quantity) !== 0 && Number(cost) !== 0) {
			document.getElementById('totalcost' + id).innerText = (Number(quantity) * Number(cost)).toLocaleString()
		}*/
	}
	const updateQuantity = (prod, newQuantity) => {
		console.log(products)
		let temp = products
		temp.map((product,index) => {
			if(product._id === prod._id) {
				temp[index].quantity = Number(newQuantity)
			}
		})
		setProducts([...temp])
	}
	const updateCost = (prod, newCost) => {
		console.log(products)
		let temp = products
		temp.map((product,index) => {
			if(product._id === prod._id) {
				temp[index].cost = Number(newCost)
			}
		})
		setProducts([...temp])
	}
	const returnHTML = []
	let counter = 0
	const series = (e, uid) => {
		let temp = products
		temp.map((product, index) => {
			if(product.uid === uid) {
				temp[index].seriesNumber = e.target.value
			}
		})
	}
	const quantity = (e, uid) => {
		let temp = products
		temp.map((product, index) => {
			if(product.uid === uid) {
				temp[index].quantity = e.target.value
				document.getElementById('cost' + uid).innerText = Number(e.target.value) * Number(temp[index].cost)
			}
		})
	}
	const cost = (e, uid) => {
		let temp = products
		temp.map((product, index) => {
			if(product.uid === uid) {
				temp[index].cost = e.target.value
				document.getElementById('cost' + uid).innerText = Number(e.target.value) * Number(temp[index].quantity)
			}
		})
	}
	const wholesale = (e, uid) => {
		let temp = products
		temp.map((product, index) => {
			if(product.uid === uid) {
				temp[index].sellPrice.wholesale = e.target.value
			}
		})
	}
	const retail = (e, uid) => {
		let temp = products
		temp.map((product, index) => {
			if(product.uid === uid) {
				temp[index].sellPrice.retail = e.target.value
			}
		})
	}
	const removeProduct = (id) => {
		let temp = JSON.parse(JSON.stringify(products))
		temp.splice(id, 1)
		setProducts(temp)
	}
	if(products.length > 0) {
		products.map((temp, index) => {
			const product = temp
			const availableSeries = []
			if(product.series) {
				console.log(product.series)
				product.series.map(serial => {
					availableSeries.push(<option value={serial._id}>{serial.seriesNumber}</option>)
				})
			}
			returnHTML.push(
				<div className="box_container" key={Math.random()}>
					<div className="box_header justify_content_center" style={{width: widths[0]}}><input type="checkbox" /></div>
					<div className="box_header" style={{width: widths[1]}}><p>{product._id}</p></div>
					<div className="box_header" style={{width: widths[2]}}>{product.image && product.image[0] ? <img src={product.image[0]} style={{height: '40px', width: '40px'}} /> : null}</div>
					<div className="box_header" style={{width: widths[3]}}><p className="product_name">{product.name}</p></div>
					<div className="box_header" style={{width: widths[4]}}><p>{product.category}Category</p></div>
					<div className="box_header" style={{width: widths[5]}}><p>{product.bar_code}Barcode</p></div>
					<div className="box_header" style={{width: widths[6]}}><p>{product.sku}SKU</p></div>
					<div className="box_header" style={{width: widths[7]}}>
						<input type="text" style={{height: '30px'}} defaultValue={product.sellPrice && product.sellPrice.wholesale ? product.sellPrice.wholesale : null} onKeyUp={(e) => wholesale(e, product.uid)} />
					</div>
					<div className="box_header" style={{width: widths[8]}}>
						<input type="text" style={{height: '30px'}} id={'quantity' + product._id} onKeyUp={(e) => quantity(e, product.uid)} defaultValue={product.quantity} />
					</div>
					<div className="box_header" style={{width: widths[9]}}><p id={'cost' + product.uid}></p></div>
					<div className="box_header" style={{width: widths[10]}}>
						<select>
							<option value="">--сери сонгоно уу --</option>
							{availableSeries}
						</select>
					</div>
					<div className="box_header" style={{width: widths[11]}}>
						<input type="date" style={{height: '30px'}} />
					</div>
					<div className="box_header" style={{width: widths[12]}}>
						<span onClick={() => removeProduct(index)}><img src="https://admin.ebazaar.mn/images/remove.svg" alt="" style={{width: '26px'}} />
					</span>
					</div>
				</div>
			)
			counter++
		})
	}
	const addProducts = (selectedProducts) => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		let foobar = products
		selectedProducts.map(selectedProduct => {
			console.log(selectedProduct)
			let url = `https://api2.ebazaar.mn/api/warehouse_series/get?productId=${selectedProduct._id}&warehouseId=${context.activeWarehouse._id}`;
			fetch(url, requestOptions).
			then(r => r.json()).
			then(response => {
				if(response.success === true) {
					selectedProduct.series = response.data
				}
			})
			foobar.push(selectedProduct)
		})
		setProducts(foobar)
		setProductSelector(false)

		/*console.log(selectedProducts)
		setProducts([...products, selectedProducts])
		setTimeout(() => {
			console.log(products)
		}, 2000)
		setProductSelector(false)*/
	}
	const renderHTMLWarehouses = context.warehouseList.map((warehouse) => {
		return context.activeWarehouse._id !== warehouse._id ? <option key={Math.random()} value={warehouse._id}>{warehouse.name}</option> : null
	})
	const renderHTMLPartners = (
		<>
			<option value="1">Харилцагч</option>
		</>
	)
	const renderHTMLOutboundTypes = []
	const outboundTypes = context.systemData.shipment.variety.outbound
	for (const outboundType in outboundTypes) {
		renderHTMLOutboundTypes.push(<option key={Math.random()} value={outboundType}>{outboundTypes[outboundType]}</option>)
	}
	const send = () => {
		if(document.getElementById('sendingWarehouse').value === '') {
			document.getElementById('sendingWarehouse').style.borderColor = 'red'
			return
		} else if(document.getElementById('requestNote').value === '') {
			document.getElementById('requestNote').style.borderColor = 'red'
			return
		} else if(products.length === 0) {
			alert('Бүтээгдэхүүн сонгоно уу!')
		}
		let foo = []
		products.map(product => {
			foo.push({
				productId: product._id,
				quantity: product.quantity,
				cost: product.cost,
				seriesNumber: product.seriesNumber,
				sellPrice: product.sellPrice
			})
		})
		let sendData = {
			"supplierId": context.activeWarehouse.supplierId,
		    "documentId": "none",
		    "type": 2,
		    "variety": 1,
		    "note": document.getElementById('requestNote').value,
		    "to": document.getElementById('sendingWarehouse').value,
		    "products": foo,
		    "from": context.activeWarehouse._id,
		    "thirdParty": false
		}
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: JSON.stringify(sendData)
	    }
	    console.log(sendData)
	    const url = 'https://api2.ebazaar.mn/api/shipment'
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			if(response.message === 'success') {
				alert('Амжилттай илгээлээ!')
				props.sentRequest()
				props.foobar(props.ognoo)
				props.setForm(false)
			}
		})
	}
	const duplicate = (duplicatingProduct) => {
		let temp = []
		let insertedDuplicateEntry = false
		products.map((product, index) => {
			temp.push(product)
			if(duplicatingProduct._id === product._id && insertedDuplicateEntry === false) {
				console.log(duplicatingProduct)
				let foo = JSON.parse(JSON.stringify(duplicatingProduct))
				const uid = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
				console.log('bfoere' + foo.uid)
				foo.uid = uid
				console.log('after'+ foo.uid)
				temp.push(foo)
				insertedDuplicateEntry = true
			}
		})
		setProducts(temp)
	}
	const confirmRequest = () => {
		let sendData = {
			"_id": props.form._id,
		    "status": 2
		}
		var requestOptions = {
			method: "PATCH",
			headers: myHeaders,
			redirect: "follow",
			body: JSON.stringify(sendData)
	    }
	    console.log(sendData)
	    const url = 'https://api2.ebazaar.mn/api/shipment'
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			console.log(response)
			if(response.message === 'success') {
				alert('Хүсэлтийг баталлаа!')
				props.sentRequest()
				props.foobar(props.ognoo)
				props.setForm(false)
			}
		})
	}
	let renderButtons = null
	if(props.form[0] === 'new') {
		renderButtons = (
			<>
				<button onClick={() => props.setForm(false)} className="button secondary large" style={{margin: '0 1rem 0 0!important'}}>Хаах</button>
				<button onClick={() => send()} className="button primary large">Илгээх</button>
			</>
		)
	} else {
		if(props.form.status === 2) {
			renderButtons = (
				<>
					<button onClick={() => props.setForm(false)} className="button secondary large" style={{margin: '0 1rem 0 0!important'}}>Хаах</button>
				</>
			)
		} else {
			renderButtons = (
				<>
					<button onClick={() => props.setForm(false)} className="button secondary large" style={{margin: '0 1rem 0 0!important'}}>Хаах</button>
					<button onClick={() => confirmRequest()} className="button primary large">Зарлагын хүсэлтийг батлах</button>
				</>
			)
		}
	}
	return (
		<>
			<div id="overlaypage_bg">
				<div id="overlaypage">
					<div className="left">

							<h1>{title}</h1>
							<div>
								<div style={{width: '320px'}}>
									<div>
										<h2>Зарлагын хүсэлт илгээх төрөл:</h2>
									</div>
									<div>
										<select className="custom-select" style={{width: '300px', margin: '0 1rem 0 0'}} onChange={(e) => setType(e.target.value)}>
											<option value="warehouse">Агуулах хооронд</option>
											<option value="partners">Харилцагч</option>
										</select>
									</div>
								</div>
								<div style={{width: '320px'}}>
									<div>
										<h2>Зарлагадах агуулах</h2>
									</div>
									<div>
										<select id="sendingWarehouse" className="custom-select" style={{width: '300px', margin: '0 1rem 0 0'}} value={props.form.from ? props.form.from : sendingWarehouse} onChange={(e) => setSendingWarehouse(e.target.value)}>
											<option value="">--сонгоно уу--</option>
											{
												type === 'warehouse' ? renderHTMLWarehouses : renderHTMLPartners
											}
										</select>
									</div>
								</div>
								<div style={{width: '320px'}}>
									<div>
										<h2>Зарлагын төрөл:</h2>
									</div>
									<div>
										<select className="custom-select" value={outboundType} style={{width: '300px', margin: '0 1rem 0 0'}} value={props.form.type ? props.form.type : null} onChange={(e) => setOutboundType(e.target.value)}>
											<option value="">--сонгоно уу--</option>
											{
												renderHTMLOutboundTypes
											}
										</select>
									</div>
								</div>
								<div style={{width: '320px'}}>
									<div>
										<h2>Борлуулах үнийн төрөл:</h2>
									</div>
									<div>
										<select className="custom-select" value={outboundType} style={{width: '300px', margin: '0 1rem 0 0'}} value={props.form.type ? props.form.type : null} onChange={(e) => setOutboundType(e.target.value)}>
											<option value="">--сонгоно уу--</option>
											<option value="wholesale">Бөөний үнэ</option>
											<option value="retail">Жижиглэн үнэ</option>
										</select>
									</div>
								</div>
								<div style={{width: '320px'}}>
									<textarea placeholder="Тэмдэглэл" id="requestNote">{props.form.note ? props.form.note : ''}</textarea>
								</div>
							</div>
							<div>
								<div style={{width: '320px'}}>
									<button style={{margin: '0 0 0 1rem !important'}} className="pageButton" onClick={() => setProductSelector(true)}>Бүтээгдэхүүн нэмэх</button>
								</div>
							</div>

					</div>
					<div className="right">rioght</div>
					
					<div id="overlaypage_body" style={{minWidth: width}}>
						<div className="box_header_container">
							<div className="box_header justify_content_center" style={{width: widths[0]}}><input type="checkbox" /></div>
							<div className="box_header" style={{width: widths[1]}}>Дугаар</div>
							<div className="box_header" style={{width: widths[2]}}>IMG</div>
							<div className="box_header" style={{width: widths[3]}}>Нэр</div>
							<div className="box_header" style={{width: widths[4]}}>Ангилал</div>
							<div className="box_header" style={{width: widths[5]}}>Баркод</div>
							<div className="box_header" style={{width: widths[6]}}>SKU</div>
							<div className="box_header" style={{width: widths[7]}}>Борлуулах үнэ</div>
							<div className="box_header" style={{width: widths[8]}}>Тоо ширхэг</div>
							<div className="box_header" style={{width: widths[9]}}>Дүн</div>
							<div className="box_header" style={{width: widths[10]}}>Сери</div>
							<div className="box_header" style={{width: widths[11]}}>Дуусах</div>
							<div className="box_header" style={{width: widths[12]}}></div>
						</div>
						{
							products.length > 0 ? returnHTML : <div style={{padding: '2rem'}}>Бүтээгдэхүүн сонгоогүй байна.</div>
						}
					</div>
					<div id="overlaypage_footer">
						<div className="total">
							<div className="left">
								<h1>Нийт үнийн дүн:</h1>
								<h2></h2>
							</div>
							<div className="right">
							{
								renderButtons
							}
							</div>
						</div>
					</div>
					<span id="overlaypage_close" onClick={() => props.in ? props.setInForm(false) : props.setForm(false)}>x</span>
				</div>
			</div>
			{productSelector ? <ProductSelector setProductSelector={setProductSelector} addProducts={addProducts} products={products} /> : null}
		</>
	)
}

export default Form