import {ModuleContext} from '../../index'
import {useState, useEffect, useContext} from 'react'
import myHeaders from "../../../components/MyHeader/myHeader"
import List from './List'

const Orders = (props) => {
	const context = useContext(ModuleContext)
	const companyId = context.companyId.replace(/\D/g, "")
	const url = `https://api2.ebazaar.mn/api/shipment/get/final?supplierId=${companyId}&type=2&to=${props.wh}&startDate=2023-11-09&endDate=2023-11-27`
	const [data, setData] = useState(null)
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			console.log('---------------------------------Хуудсаар')
			console.log(response)
			setData(response.data)
		})
	}, [])
	return data ? (
		<List data={data} />
	) : <div>Түр хүлээнэ үү...</div>
}

export default Orders