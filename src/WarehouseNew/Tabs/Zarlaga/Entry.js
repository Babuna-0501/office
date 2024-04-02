import css from '../../style.module.css'
import {ModuleContext} from '../../index'
import {useContext} from 'react'
import Receipt from './Receipt'
import {useState} from 'react'

const Entry = (props) => {
	const data = props.data
	const context = useContext(ModuleContext)
	let requestedBy = ''
	let requestingWarehouse = null
	let confirmedBy = ''
	let to = ''
	let total = 0
	const [printReceipt, setPrintReceipt] = useState(false)
	data.products.map(product => {
		if(product.sellPrice && (product.sellPrice.retail || product.sellPrice.wholesale)) {
			total += product.quantity * (product.sellPrice.retail ? product.sellPrice.retail : product.sellPrice.wholesale)
		}
	})
	if(data.confirmedBy) {
		context.supplierUsers.map(user => {
			if(user.user_id === data.requestedBy) {
				confirmedBy = user.first_name + ' ' + user.last_name
			}
		})
	}
	if(data.to) {
		context.warehouseList.map(warehouse => {
			if(warehouse._id === data.to) {
				to = warehouse.name
			} 
		})
	}
	context.warehouseList.map(warehouse => {
		if(warehouse._id === data.from) {
			requestingWarehouse = warehouse.name
		} 
	})
	context.supplierUsers.map(user => {
		if(user.user_id === data.requestedBy) {
			requestedBy = user.first_name + ' ' + user.last_name
		}
	})
	let status = null
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
	const width = [50, 100, 200, 100, 140, 300]
	const id = props.companyId === 14005 ? data.createdDate.slice(0, 10) : (data.generateId ? data.generateId.slice(-7) : null)
	return (
		<div className={css.entry}>
			<div className={css.entry_id} style={{width: width[0] + 'px'}}><input type="checkbox" /></div>
			<div className={css.entry_images} style={{width: width[1] + 'px'}} onClick={() => props.setForm(data)}>{id}</div>
			<div className={css.entry_date} style={{width: width[2] + 'px'}}>{data.createdDate}</div>
			<div className={css.entry_userid} style={{width: width[3] + 'px'}}>{requestedBy}</div>
			<div className={css.entry_userid} style={{width: width[4] + 'px'}}>{status}</div>
			<div className={css.entry_userid} style={{width: width[5] + 'px'}}>{data.note}</div>
			<div className={css.entry_userid} style={{width: width[5] + 'px'}}>{to}</div>
			<div className={css.entry_userid} style={{width: width[5] + 'px'}}>{data.confirmedDate ? data.confirmedDate : null}</div>
			<div className={css.entry_userid} style={{width: width[5] + 'px'}}>{confirmedBy}</div>
			<div className={css.entry_userid} style={{width: width[5] + 'px'}}>{total}</div>
			{data.status === 2 ? <div><button onClick={() => setPrintReceipt(true)}>Баримт хэвлэх</button></div> : null}
			{printReceipt ? <Receipt data={data} setPrintReceipt={setPrintReceipt} /> : null}
		</div>
	)
}

export default Entry