import {useState, useEffect, useContext} from 'react'
import myHeaders from "../../../components/MyHeader/myHeader"
import {ModuleContext} from '../../index'
import List from './List'
import Form from './Form'

const FormattedDate = () => {
	let currentDate = new Date()
	const year = currentDate.getFullYear()
	const month = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)
	const day = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
	return {
		currentDate: (year + '-' + month + '-' + day),
		year: year,
		month: month,
		day: day
	}
}

const Orlogo = (props) => {
	let foo =  FormattedDate()
	const [startDate, setStartDate] = useState(foo['year'] + '-' + foo['month'] + '-' + '01')
	const [endDate, setEndDate] = useState(foo['currentDate'])
	const context = useContext(ModuleContext)
	const companyId = context.companyId.replace(/\D/g, "")
	const [form, setForm] = useState(false)
	const [data, setData] = useState(null)
	const [ognoo, setOgnoo] = useState(null)
	useEffect(() => {
		fetchData()
	}, [startDate, endDate])
	const sentRequest = () => {
		fetchData()
		console.log('sent request successfully')
	}
	const fetchData = () => {
		const url = `https://api2.ebazaar.mn/api/shipment?type=1&to=${props.wh}&startDate=${startDate}&endDate=${endDate}&products=true&createdDate=true`
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			setData(response.data)
		})
	}
	const foobar = (blahblah) => {
		//if(blahblah === 'today' || blahblah === 'thismonth' || blahblah === 'thisweek') {
			//fetchData()
		//}
	}
	return data ? (
		<>
			<List data={data} setForm={setForm} foobar={foobar} setOgnoo={setOgnoo} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />
			{form ? <Form setForm={setForm} form={form} foobar={foobar} sentRequest={sentRequest} ognoo={ognoo} /> : null}
		</>
	) : <div>Түр хүлээнэ үү...</div>

}

export default Orlogo