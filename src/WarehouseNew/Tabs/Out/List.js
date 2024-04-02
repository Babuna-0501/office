import Entry from './Entry'

const List = (props) => {
	/*let renderHTML = []
	let foo = {}
	props.data.map((data) => {
		console.log(data)
		const orderId = data.out.orderId
		if(foo[orderId]) {
			if(foo[orderId][data.data.ebProductId]) {
				foo[orderId][data.data.ebProductId]['quantity'] = foo[orderId][data.data.ebProductId]['quantity'] + 1
			} else {
				foo[orderId][data.data.ebProductId] = {}
				foo[orderId][data.data.ebProductId]['quantity'] = 1
				foo[orderId][data.data.ebProductId]['name'] = data.data.productName
				foo[orderId][data.data.ebProductId]['price'] = data.data.price
			}
		} else {
			foo[orderId] = {}
			foo[orderId][data.data.ebProductId] = {}
			foo[orderId][data.data.ebProductId]['quantity'] = 1
			foo[orderId][data.data.ebProductId]['name'] = data.data.productName
			foo[orderId][data.data.ebProductId]['price'] = data.data.price
		}
	})
	console.log(foo)
	//renderHTML.push(<Entry data={data} />)*/
	let renderHTML = []
	props.data.map(data => {
		console.log(data)
		renderHTML.push(<Entry data={data} />)
	})
	return (
		<div>
			<div></div>
			<div>{renderHTML}</div>
		</div>
	)
}

export default List