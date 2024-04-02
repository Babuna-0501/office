const ZarlagaBarimtLines = (props) => {
	const warehouses = props.warehouses
	const order = props.order
	let warehouse = null
	warehouses.map(wh => {
		if(wh._id === order.warehouse) {
			warehouse = wh.name
		}
	})
	const lines = []
	let counter = 1
	console.log(JSON.parse(order.order_data))
	order.line.map(line => {
		const foo = line.isBox ? 'хайрцаг ' + line.quantity / line.product_in_case : 'шт'
		const discount = line.base_price !== line.price ? ((line.base_price - line.price) / line.base_price) * 100 + '%' : ''
		lines.push(
			<tr>
				<td style={{width: '5%'}}>{counter++}</td>
				<td style={{width: '24%'}}>{line.product_name}</td>
				<td style={{width: '8%'}}>{line.product_bar_code}</td>
				<td style={{width: '8%'}}>{line.quantity}</td>
				<td style={{width: '8%'}}>{foo}</td>
				<td style={{width: '8%'}}>{line.price}</td>
				<td style={{width: '8%'}}>{line.price}</td>
				<td style={{width: '8%'}}>{discount}</td>
				<td style={{width: '8%'}}>0</td>
				<td style={{width: '8%'}}>{line.price * line.quantity}</td>
			</tr>
		)
	})
	return (
		<div style={{padding: '1rem'}} id="barimt">

			<div style={{display: 'flex'}}>
				<div style={{width: '50%'}}><h1>Зарлагын баримт №{order.order_id} от {order.delivery_date.substr(0, 10)}</h1></div>
				<div style={{width: '50%'}}><h2>{warehouse}</h2></div>
			</div>

			<div style={{display: 'flex'}}>
				<div style={{width: '20%'}}>
					<h3>Байгууллагын нэр: {warehouse.supplierName}</h3>
				</div>
				<div style={{width: '30%'}}>
					<h3></h3>
				</div>
				<div style={{width: '50%'}}>
					<h3>Тел: </h3>
				</div>
			</div>

			<div style={{display: 'flex'}}>
				<div style={{width: '20%'}}>
					<h3>Данс: {warehouse.supplierName}</h3>
				</div>
				<div style={{width: '30%'}}>
					<h3></h3>
				</div>
				<div style={{width: '50%'}}>
					<h3> </h3>
				</div>
			</div>

			<div style={{display: 'flex'}}>
				<div style={{width: '20%'}}>
					<h3>Худалдан авагчийн нэр: </h3>
				</div>
				<div style={{width: '30%'}}>
					<h3>Дэлгүүр: </h3>
				</div>
			</div>
			<table>
				<tr>
					<th style={{width: '5%'}}>№</th>
					<th>Материалын үнэт зүйлийн нэр, зэрэг дугаар</th>
					<th>barocde</th>
					<th>Тоо</th>
					<th>Хэмжих нэгж</th>
					<th>Нэгжийн үнэ</th>
					<th>Үнэ</th>
					<th>% хөнгөлөлт</th>
					<th>Нийт хөнгөлөлт</th>
					<th>Нийт дүн</th>
				</tr>
				{
					lines
				}
				<tr>
					<td colspan="3" style={{textAlign: 'right'}} rowspan="4">
						Дүн:
					</td>
					<td style={{fontWeight: 'bold'}} rowspan="4">123</td>
					<td colspan="3">

					</td>
					<td>
					a
					</td>
					<td>
					b
					</td>
					<td>
					c
					</td>
				</tr>
				<tr>
					<td colspan="3" style={{textAlign: 'right'}}>
					</td>
					<td>
					a
					</td>
					<td>
					b
					</td>
					<td>
					c
					</td>
				</tr>
				<tr>
					<td colspan="3" style={{textAlign: 'right'}}>
						
					</td>
					<td>
					a
					</td>
					<td>
					b
					</td>
					<td>
					c
					</td>
				</tr>
				<tr>
					<td colspan="3" style={{textAlign: 'right'}}>
					
					</td>
					<td>
					a
					</td>
					<td>
					b
					</td>
					<td>
					c
					</td>
				</tr>
			</table>
		</div>
	)
}

export default ZarlagaBarimtLines