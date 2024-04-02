import {useState, useEffect, useContext} from 'react'
import myHeaders from "../../../components/MyHeader/myHeader"
import {ModuleContext} from '../../index'
import List from './List'
import Form from './Form'

const Zarlaga = (props) => {
	const context = useContext(ModuleContext)
	const companyId = context.companyId.replace(/\D/g, "")
	const url = `https://api2.ebazaar.mn/api/shipment?type=2&from=${props.wh}&products=true&startDate=2024-01-01&endDate=2024-01-30`
	const [data, setData] = useState(null)
	const [form, setForm] = useState(false)
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
			console.log(response)
			setData(response.data)
		})
	}, [])
	return data ? (
		<>
			<List data={data} setForm={setForm} />
			{form ? <Form setForm={setForm} form={form} /> : null}
		</>
	) : <div>Түр хүлээнэ үү...</div>

}

export default Zarlaga