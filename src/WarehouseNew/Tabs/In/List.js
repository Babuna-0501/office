import Entry from './Entry'
import {useContext} from 'react'
import {ModuleContext} from '../../index'

const List = (props) => {
	const context = useContext(ModuleContext)
	const widths = [52, 100, 120, 360, 120, 120, 300]
	let renderHTML = []
	props.data.map((data) => {
		renderHTML.push(<Entry data={data} supplierUsers={context.supplierUsers} setForm={props.setForm} key={Math.random()} widths={widths} />)
	})
	const changeInterval = (newInterval) => {
		props.setOgnoo(newInterval)
		props.foobar(newInterval)
	}
	return (
		<div style={{padding: '0 1.5rem'}}>
			<div>
				<input type="date" value={props.startDate} className="formInput" onChange={(e) => props.setStartDate(e.target.value)} />
				<input type="date" value={props.endDate} className="formInput" className="marginleft1rem" onChange={(e) => props.setEndDate(e.target.value)} />
				<button className="pageButton marginleft1rem" onClick={() => props.setForm(['new', 'warehouse', 'Агуулахаас орлого'])}>+ Агуулахаас орлого</button>
				<button className="pageButton marginleft1rem" onClick={() => props.setForm(['new', 'customer', 'Харилцагчаас орлого'])}>+ Харилцагчаас орлого</button>
				<button className="pageButton marginleft1rem" onClick={() => props.setForm(['new', 'import', 'Импортын орлого'])}>+ Импортын орлого</button>
			</div>
			<div className="box_header_container">
				<div className="box_header" style={{width: widths[0]}}></div>
				<div className="box_header" style={{width: widths[1]}}>ID</div>
				<div className="box_header" style={{width: widths[2]}}>Огноо</div>
				<div className="box_header" style={{width: widths[3]}}>Хүсэлт гаргасан агуулах</div>
				<div className="box_header" style={{width: widths[4]}}>Статус</div>
				<div className="box_header" style={{width: widths[5]}}>Үүсгэсэн</div>
				<div className="box_header" style={{width: widths[6]}}>Тэмдэглэл</div>
			</div>
			<div>{renderHTML}</div>
		</div>
	)
}

export default List