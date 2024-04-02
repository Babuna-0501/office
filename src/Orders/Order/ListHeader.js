import css from './style.module.css'

const ListHeader = (props) => {
	const sequence = props.sequence
	const sequenceSizes = props.sequenceSizes
	let width = 0
	for(const size in sequenceSizes) {
		width += sequenceSizes[size]
	}
	console.log(width)
	const index = (
		<div className={css.order_index} style={{width: sequenceSizes['index'] + 'px'}}>
			<div>
				<input type="checkbox" />
			</div>
		</div>
	)
	const id = (
		<div className={css.order_id} style={{width: sequenceSizes['id'] + 'px'}}>
			<h5>Дугаар</h5>
			<input type="text" placeholder="Хайх" /> 
		</div>
	)
	const supplier = (
		<div className={css.order_vendor} style={{width: sequenceSizes['supplier'] + 'px'}}>
			<h5>Нийлүүлэгч</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const orderdate = (
		<div className={css.order_date} style={{width: sequenceSizes['orderdate'] + 'px'}}>
			<h5>Захиалсан</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const deliverydate = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['deliverydate'] + 'px'}}>
			<h5>Хүргүүлэх</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const totalamount = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['totalamount'] + 'px'}}>
			<h5>Дүн</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const paymenttype = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['paymenttype'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const paidamount = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['paidamount'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const note = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['note'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const customerchannel = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['customerchannel'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const customerphone = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['customerphone'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const city = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['city'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const district = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['district'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const khoroo = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['khoroo'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const address = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['address'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const srcode = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['srcode'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const couriercode = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['couriercode'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	const customerregion = (
		<div className={css.order_commonfield} style={{width: sequenceSizes['customerregion'] + 'px'}}>
			<h5>Төлбөрийн хэлбэр</h5>
			<input type="text" placeholder="Хайх" />
		</div>
	)
	let renderHTML = []
	const list = {index, id, supplier, orderdate, deliverydate, totalamount, paymenttype, paidamount, note, customerchannel, customerphone, customerchannel, city, district, khoroo, address, srcode, couriercode, customerregion}
	props.sequence.map(sequence => {
		renderHTML.push(list[sequence])
	})
	return (
		<div className={css.list_header + ' ' + css.order} style={{minWidth: width + 'px'}}>
			{renderHTML}
		</div>
	)
}

export default ListHeader