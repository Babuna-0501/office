import css from '../../style.module.css'
import { ModuleContext } from '../../index'
import { useContext, useState } from 'react'

const Entry = (props) => {
	const context = useContext(ModuleContext)
	//console.log(props.data.from)
	const data = props.data
	let requestedBy = ''
	let requestingWarehouse = null
	let confirmedBy = ''
	context.warehouseList.map(warehouse => {
		if (warehouse._id === data.from) {
			requestingWarehouse = warehouse.name
		}
	})
	if (props.supplierUsers) {
		props.supplierUsers.map(user => {
			if (user.user_id === data.requestedBy) {
				requestedBy = user.first_name + ' ' + user.last_name
			}
		})
	}
	let status = null
	let total = 0
	const [printReceipt, setPrintReceipt] = useState(false)
	data.products.map(product => {
		if (product.sellPrice && (product.sellPrice.retail || product.sellPrice.wholesale)) {
			total += product.quantity * (product.sellPrice.retail ? product.sellPrice.retail : product.sellPrice.wholesale)
		}
	})
	switch (data.status) {
		case 1:
			status = <span className="statusn pending margintop8px">Хүлээгдэж буй</span>
			break
		case 2:
			status = <span className="statusn confirmed margintop8px">Баталсан</span>
			break
		case 3:
			status = <span className="statusn cancelled margintop8px">Цуцалсан</span>
			break
	}
	let requestedTo = requestingWarehouse
	//if(data.thirdParty === true) {
	context.customers.map(customer => {
		if (parseInt(customer.tradeshop_id) === parseInt(data.from)) {
			requestedTo = customer.customer_name
		}
		return
	})
	//}
	if (data.confirmedBy) {
		context.supplierUsers.map(user => {
			if (user.user_id === data.requestedBy) {
				confirmedBy = user.first_name + ' ' + user.last_name
			}
		})
	}
	const widths = props.widths
	let distribution = <button className="blahblahtext">Түгээлт тохируулах</button>
	if (data.externalData && data.externalData.distributionSettings) {
		let courierName = ''
		props.supplierUsers.map(user => {
			if (user.user_id === data.externalData.distributionSettings.courier) {
				courierName = user.first_name + ' ' + user.last_name
			}
		})
		distribution = <span className="blahblahtext">{courierName}</span>
	}
	return (
		<div className="blah" style={{ background: data.type === 1 ? 'rgb(1 255 32 / 14%)' : 'white' }}>
			<div className="blahblah">
				<div className="width40px">
					<input type="checkbox" onChange={(e) => props.onRowSelect(data._id)} />
				</div>
			</div>
			<div className="blahblah" onClick={() => data.type === 1 ? props.setForm(data) : props.setFormZarlaga(data)}>
				<div className="width100px">
					<p className="blahblahtext fontweightbold">{data.generateId ? data.generateId.slice(-7) : null}</p>
				</div>
			</div>
			<div className="blahblah">
				<div className="width100px">
					<p className="blahblahtext">{data.type === 1 ? 'Орлого' : 'Зарлага'}</p>
				</div>
			</div>
			<div className="blahblah">
				<div className="width100px">
					<p className="blahblahtext">{data.createdDate.slice(0, 10)}</p>
				</div>
			</div>
			<div className="blahblah">
				<div className="width200px">
					<p className="blahblahtext">{requestedTo}</p>
				</div>
			</div>
			<div className="blahblah">
				<div className="width100px">
					{status}
				</div>
			</div>
			<div className="blahblah">
				<div className="width200px">
					<p className="blahblahtext">{requestedBy}</p>
				</div>
			</div>
			<div className="blahblah">
				<div className="width200px">
					<p className="blahblahtext">{data.note}</p>
				</div>
			</div>
			<div className="blahblah">
				<div className="width100px">
					<p className="blahblahtext">{data.confirmedDate ? data.confirmedDate.slice(0, 10) : null}</p>
				</div>
			</div>
			<div className="blahblah">
				<div className="width200px">
					<p className="blahblahtext">{confirmedBy}</p>
				</div>
			</div>
			<div className="blahblah">
				<div className="width200px">
					<p className="blahblahtext">{total}</p>
				</div>
			</div>
			<div className="blahblah">
				<div className="width200px" onClick={() => props.setDistributionSettings(data)} id={'courier' + data._id}>
					{distribution}
				</div>
			</div>
		</div>
	)
}

export default Entry