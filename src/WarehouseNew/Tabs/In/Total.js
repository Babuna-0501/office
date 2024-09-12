import { useState } from "react"

const Total = (props) => {
	let totalSalesAmount = 0
	let numberIn = 0
	let numberOut = 0
	let totalCostIn = 0
	let totalCostOut = 0
	let totalIn = 0
	let totalOut = 0
	let totalPendingIn = 0
	let totalPendingOut = 0
	let totalAcceptedIn = 0
	let totalAcceptedOut = 0
	let totalCanceledIn = 0
	let totalCanceledOut = 0
	let totalDelivered = 0
	// Collect sums
	props.data.map(data => {
		let tempTotalCost = 0
		let tempTotal = 0
		try {
			data.products.map(product => {
				tempTotalCost += (product.cost ? product.cost : 0)
				tempTotal += (product.sellPrice && product.sellPrice.retail ? product.sellPrice.retail : 0)
			})
		} catch(e) {
			console.log(e)
		}
		if(data.type === 1) {
			numberIn++;
			totalCostIn = totalCostIn + tempTotalCost;
			if(data.status === 1) {
				totalPendingIn++
			} else if(data.status === 2) {
				totalAcceptedIn++
			} else if(data.status === 3) {
				totalCanceledIn++
			}
		} else {
			numberOut++;
			totalCostOut = totalCostOut + tempTotalCost;
			if(data.status === 1) {
				totalPendingOut++
			} else if(data.status === 2) {
				totalAcceptedOut++
			} else if(data.status === 3) {
				totalCanceledOut++
			}
		}
	})
	return (
		<div id="total">
			<div className="total_block">
				<h4>Нийт хүсэлтийн тоо</h4>
				<h5>{numberIn}ш / {numberOut}ш</h5>
			</div>
			<div className="total_block">
				<h4>Мөнгөн дүн</h4>
				<h5>{totalCostIn}₮ / {totalCostOut}₮</h5>
			</div>
			<div className="total_block">
				<h4>Хүлээгдэж буй</h4>
				<h5>{totalPendingIn} / {totalPendingOut}</h5>
			</div>
			<div className="total_block">
				<h4>Баталсан</h4>
				<h5>{totalAcceptedIn} / {totalAcceptedOut}</h5>
			</div>
			<div className="total_block">
				<h4>Хүргэгдсэн</h4>
				<h5>0 / 0</h5>
			</div>
			<div className="total_block">
				<h4>Цуцлагдсан</h4>
				<h5>{totalCanceledIn} / {totalCanceledOut}</h5>
			</div>
		</div>
	)
}

export default Total