import { useState } from "react"

const Total = (props) => {
	//console.log(props)
	let totalSalesAmount = 0
	let salesNumber = 0
	props.data.map(sale => {
		if(sale.type === 2 && sale.documentId === 'Кассын борлуулалт') {
			sale.products.map(product => {
				if(product.sellPrice && product.sellPrice.retail && product.quantity) {
					totalSalesAmount += (Number(product.quantity) * Number(product.sellPrice.retail))
				}
			})
			salesNumber++
		}
	})
	return (
		<div id="total">
			<div className="total_block">
				<h4>Борлуулалтын дүн</h4>
				<h5>{totalSalesAmount.toLocaleString()}₮</h5>
			</div>
			<div className="total_block">
				<h4>Борлуулалтын тоо</h4>
				<h5>{salesNumber}</h5>
			</div>
		</div>
	)
}

export default Total