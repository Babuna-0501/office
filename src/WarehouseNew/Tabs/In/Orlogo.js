import { useState, useEffect, useContext } from 'react'
import myHeaders from "../../../components/MyHeader/myHeader"
import { ModuleContext } from '../../index'
import List from './List'
import Form from './Form'
import ZarlagaForm from '../Zarlaga/Form'

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
	let foo = FormattedDate()
	const [startDate, setStartDate] = useState(foo['year'] + '-' + foo['month'] + '-' + '01')
	const [endDate, setEndDate] = useState(foo['currentDate'])
	const context = useContext(ModuleContext)
	const companyId = context.companyId.replace(/\D/g, "")
	const [form, setForm] = useState(false)
	const [formZarlaga, setFormZarlaga] = useState(false)
	const [data, setData] = useState(null)
	const [ognoo, setOgnoo] = useState(null)
	useEffect(() => {
		fetchData()
	}, [startDate, endDate])
	const sentRequest = () => {
		fetchData()
	}
	const fetchData = () => {
		const url = `https://api2.ebazaar.mn/api/shipment?owner=${props.wh}&startDate=${startDate}&endDate=${endDate}&products=true&createdDate=true&pageAll=true`
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

	const clickDownload = (ids) => {
		if (ids.length == 0) return
		console.log(ids);
	}

	const foobar = (blahblah) => {
		//if(blahblah === 'today' || blahblah === 'thismonth' || blahblah === 'thisweek') {
		//fetchData()
		//}
	}
	return data ? (
		<>
			<List data={data} setForm={setForm} setFormZarlaga={setFormZarlaga} foobar={foobar} setDownload={clickDownload} setOgnoo={setOgnoo} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />
			{form ? <Form setForm={setForm} form={form} foobar={foobar} sentRequest={sentRequest} ognoo={ognoo} warehouseId={props.wh} /> : null}
			{formZarlaga ? <ZarlagaForm setFormZarlaga={setFormZarlaga} form={formZarlaga} foobar={foobar} sentRequest={sentRequest} ognoo={ognoo} warehouseId={props.wh} /> : null}
		</>
	) : <div>Түр хүлээнэ үү...</div>

}

export default Orlogo