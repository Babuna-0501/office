const Uniques = (props) => {
	let renderHTML = []
	const top = (parseInt(document.getElementById('pageHead').offsetHeight) + parseInt(document.getElementById('pageHeader').offsetHeight)) + 50 + 'px'
	//(parseInt(document.getElementById('pageHead').offsetHeight) + parseInt(document.getElementById('pageHeader').offsetHeight)) + 50 + 'px'
	let orlogo = 0
	let zarlaga = 0

	try {
		renderHTML = props.data.movement.map(entry => {
			if(entry.type === 1) {
				orlogo += parseFloat(entry.quantity)
			} else {
				zarlaga += parseFloat(entry.quantity)
			}
			console.log(entry)
			return (
				<div className="box_container" key={Math.random()}>
					<div className="box" style={{width: '52px'}}>
						<input type="checkbox" />
					</div>
					<div className="box" style={{width: '120px'}}><span>{entry._id}</span></div>
					<div className="box" style={{width: '120px'}}><span>{entry.date.substr(0, 10)}</span></div>
					<div className="box" style={{width: '120px'}}><span>{entry.cost ? entry.cost : null}</span></div>
					<div className="box" style={{width: '120px'}}><span>{entry.sellPrice ? entry.sellPrice.wholesale : null}</span></div>
					<div className="box" style={{width: '120px'}}><span>{entry.sellPrice ? entry.sellPrice.retail : null}</span></div>
					<div className="box" style={{width: '80px'}}><span style={{color: entry.type === 2 ? '#FF0000' : '#2AB674'}}>{entry.quantity}</span></div>
					<div className="box" style={{width: '120px', fontSize:"10px"}}>{entry.note}</div>
					{/* <div className="box" style={{width: '120px'}}><span>{entry.type === 1 ? (parseFloat(entry.stock) - parseFloat(entry.quantity)) : (parseFloat(entry.stock) + parseFloat(entry.quantity))}</span></div> */}
					<div className="box" style={{width: '120px'}}><span>{entry.stock}</span></div>
				</div>
			)     
		})
	} catch(e) {
		console.log(e)
	}
	return (
		<>
			<div className='product_list' id="List" style={{top: top, bottom: '50px', overflow: 'auto'}}>
				<div>
					{renderHTML}
				</div>
			</div>
			<div id="sum">
				<span className="orlogo">Нийт орлого: {orlogo}</span>
				<span className="zarlaga">Нийт зарлага: {zarlaga > 0 ? zarlaga : 0}</span>
			</div>
		</>
	)
}

export default Uniques