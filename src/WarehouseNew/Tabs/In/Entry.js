import css from '../../style.module.css'
import {ModuleContext} from '../../index'
import {useContext, useState} from 'react'

const Entry = (props) => {
	const context = useContext(ModuleContext)
	//console.log(props.data.from)
	const data = props.data
	let requestedBy = ''
	let requestingWarehouse = null
	let confirmedBy = ''
	context.warehouseList.map(warehouse => {
		if(warehouse._id === data.from) {
			requestingWarehouse = warehouse.name
		} 
	})
	props.supplierUsers.map(user => {
		if(user.user_id === data.requestedBy) {
			requestedBy = user.first_name + ' ' + user.last_name
		}
	})
	let status = null
	let total = 0
	const [printReceipt, setPrintReceipt] = useState(false)
	data.products.map(product => {
		if(product.sellPrice && (product.sellPrice.retail || product.sellPrice.wholesale)) {
			total += product.quantity * (product.sellPrice.retail ? product.sellPrice.retail : product.sellPrice.wholesale)
		}
	})
	switch(data.status) {
		case 1:
			status = <span className="statusn pending">Хүлээгдэж буй</span>
			break
		case 2:
			status = <span className="statusn confirmed">Баталгаажуулсан</span>
			break
		case 3:
			status = <span className="statusn cancelled">Цуцалсан</span>
			break
	}
	let requestedTo = requestingWarehouse
	//if(data.thirdParty === true) {
	console.log(data.from)
		context.customers.map(customer => {
			if(parseInt(customer.tradeshop_id) === parseInt(data.from)) {
				requestedTo = customer.customer_name
			}
			return
		})
	//}
	if(data.confirmedBy) {
		context.supplierUsers.map(user => {
			if(user.user_id === data.requestedBy) {
				confirmedBy = user.first_name + ' ' + user.last_name
			}
		})
	}
	const widths = props.widths
	return (
		<div className={css.entry}>
			<div className={css.entry_id} style={{width: widths[0]}}><input type="checkbox" /></div>
			<div className={css.entry_images} style={{width: widths[1]}} onClick={() => props.setForm(data)}>{data.generateId ? data.generateId.slice(-7) : null}</div>
			<div className={css.entry_date} style={{width: widths[2]}}>{data.createdDate.slice(0, 10)}</div>
			<div className={css.entry_date} style={{width: widths[3]}}>{requestedTo}</div>
			<div className={css.entry_date} style={{width: widths[4]}}>{status}</div>
			<div className={css.entry_userid} style={{width: widths[5]}}>{requestedBy}</div>
			<div className={css.entry_userid} style={{width: widths[6]}}>{data.note}</div>
			<div className={css.entry_userid} style={{width: widths[6]}}>{data.confirmedDate ? data.confirmedDate.slice(0, 10) : null}</div>
			<div className={css.entry_userid} style={{width: widths[6]}}>{confirmedBy}</div>
			<div className={css.entry_userid} style={{width: widths[6]}}>{total}</div>
		</div>
	)
}

export default Entry

//{tradeshop_id: 77116, customer_id: 555000219, customer_name: 'Ази фарма ХХК', tradeshop_name: 'Ази Фарма ХХК', address: 'Хаяг', …}