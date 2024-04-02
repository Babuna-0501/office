import Entry from './Entry'

const List = (props) => {
	console.log(props)
	//console.log(props.data[0].products)
	let renderHTML = []
	props.data.map((data) => {
		renderHTML.push(<Entry data={data} setForm={props.setForm} />)
	})
	const width = [50, 100, 200, 100, 140, 300]
	return (
		<div style={{padding: '0 1.5rem'}}>
			<div>
				<input type="date" value={props.startDate} className="formInput marginleft1rem" onChange={(e) => props.setStartDate(e.target.value)} />
				<input type="date" value={props.endDate} className="formInput marginleft1rem" onChange={(e) => props.setEndDate(e.target.value)} />
				<button className="pageButton marginleft1rem" onClick={() => props.setForm(['new', 'warehouse', 'Агуулах руу зарлагадах'])}>Агуулах руу зарлагадах</button>
				<button className="pageButton marginleft1rem" onClick={() => props.setForm(['new', 'customer', 'Харилцагч руу зарлагадах'])}>Харилцагч руу зарлагадах</button>
				<button className="pageButton marginleft1rem" onClick={() => props.setForm(['new', 'other', 'Бусад зарлага'])}>Бусад зарлага</button>
			</div>
			<div className="box_header_container">
				<div className="box_header" style={{width: width[0] + 'px'}}></div>
				<div className="box_header" style={{width: width[1] + 'px'}}>ID</div>
				<div className="box_header" style={{width: width[2] + 'px'}}>Огноо</div>
				<div className="box_header" style={{width: width[3] + 'px'}}>Үүсгэсэн</div>
				<div className="box_header" style={{width: width[4] + 'px'}}>Статус</div>
				<div className="box_header" style={{width: width[5] + 'px'}}>Тэмдэглэл</div>
				<div className="box_header" style={{width: width[5] + 'px'}}>Зарлагадаж байгаа агуулах</div>
				<div className="box_header" style={{width: width[5] + 'px'}}>Баталсан огноо</div>
				<div className="box_header" style={{width: width[5] + 'px'}}>Баталсан хэрэглэгч</div>
				<div className="box_header" style={{width: width[5] + 'px'}}>Үнийн дүн</div>
			</div>
			<div>{renderHTML}</div>
		</div>
	)
}

export default List