import css from './style.module.css'

const Order = (props) => {
	const data = props.data
	//console.log(data)
	return (
		<div className={css.order}>
			<div className={css.order_index}>
				<div>
					<input type="checkbox" />
				</div>
			</div>
			<div className={css.order_id}>
				<div className={css.fullcontainer}>
					<span>{data.order_id}</span>
				</div>
			</div>
			<div className={css.order_supplier}>
				<div className={css.fullcontainer}>
					<span>{data.supplier_name}</span>
				</div>
			</div>
		</div>
	)
}

export default Order