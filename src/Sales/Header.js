import { useState } from "react"
import css from './style.module.css'
import DateSelector from './DateSelector'

const Header = (props) => {
	const [dateSelector, setDateSelector] = useState(false)
	const [dateInterval, setDateInterval] = useState('today')
	return (
		<>
			<div className={css.header} id="module_header">
				<div id="module_header_left">
					<div>
						<h1>Борлуулалт</h1>
					</div>
					<div>
						<div id="interval" onClick={() => setDateSelector(true)}>
							<img src="/static/media/Calendar.9f8ea6c5681d1601719d2a6b48aed426.svg" alt="" />
							<span>Өнөөдөр</span>
						</div>
						<div>
							<select onChange={(e) => props.setWarehouse(e.target.value)} className="foobarblah">
								{
									props.warehouses.map(warehouse => {
										return <option value={warehouse._id} selected={props.warehouse === warehouse._id  ? true : false} key={Math.random()}>{warehouse.name}</option>
									})
								}
							</select>
						</div>
					</div>
				</div>
			</div>
			{dateSelector ? <DateSelector setDateSelector={setDateSelector} /> : null}
		</>
	)
}

export default Header