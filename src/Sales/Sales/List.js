import { useEffect, useState, useRef } from "react"
import myHeaders from "../../components/MyHeader/myHeader"
import Entry from './Entry'

const List = (props) => {
	//console.log(props)
	const sales = props.data
	/*const [sales, setSales] = useState(localStorage.getItem('draftsale') ? JSON.parse(localStorage.getItem('draftsale')): [])
	const [data, setData] = useState(false)
	const fetchData = () => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		let url = `https://api2.ebazaar.mn/api/shipment?type=2&from=${props.warehouse}&startDate=2023-11-20&endDate=2024-12-30&products=true`;
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			let temp = sales
			response.data.map(sale => {
				temp.push(sale)
			})
			//console.log(temp)
			setSales(temp)
			setData(true)
		})
	}
	useEffect(() => {
		fetchData()
	}, [])*/
	/*props.supplierUsers.map(user => {
		if(user.user_id === data.requestedBy) {
			requestedBy = user.first_name + ' ' + user.last_name
		}
	})*/
	return (
		<>
			<div className="box_header_container" style={{borderRadius: '3px', overflow: 'hidden'}}>
				<div className="box_header" style={{width: '52px', justifyContent: 'center'}}><input type="checkbox" /></div>
				<div className="box_header" style={{width: '180px'}}>
					<h4>Дугаар</h4>
					<input type="text" />
				</div>
				<div className="box_header" style={{width: '180px'}}><h4>Огноо</h4></div>
				<div className="box_header" style={{width: '180px'}}><h4>Нийт дүн</h4></div>
				<div className="box_header" style={{width: '180px'}}><h4>Хөнгөлөлт</h4></div>
				<div className="box_header" style={{width: '180px'}}><h4>ЭМД хөнгөлөлт</h4></div>
				<div className="box_header" style={{width: '180px'}}><h4>НӨАТ</h4></div>
				<div className="box_header" style={{width: '180px'}}><h4>Бэлнээр</h4></div>
				<div className="box_header" style={{width: '180px'}}><h4>Данс</h4></div>
				<div className="box_header" style={{width: '180px'}}><h4>Карт/Бэлэн бус</h4></div>
				<div className="box_header" style={{width: '180px'}}><h4>Харилцагч</h4></div>
				<div className="box_header" style={{width: '180px'}}><h4>Борлуулсан</h4></div>
				<div className="box" style={{width: '52px'}}><span></span></div>
			</div>
			{sales.map(sale => {
				console.log(sale)
				return sale.documentId === 'Кассын борлуулалт' || sale.type === 0 ? <Entry entryData={sale} setSale={props.setSale} openSale={props.openSale} openDraft={props.openDraft} supplierUsers={props.supplierUsers} key={Math.random()}/> : null
			})}
		</>
	)
}

export default List