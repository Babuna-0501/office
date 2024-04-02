import Total from './Total'
import Head from './Head'
import myHeaders from "../../components/MyHeader/myHeader"
import {useState, createContext, useEffect} from 'react'
import List from './List'

const Payable = () => {
	const [data, setData] = useState(null)
	let renderHTML = []
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
	    let url = `https://api2.ebazaar.mn/api/backoffice/invoice-payment/list`;
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			console.log(response)
			setData(response)
		})
	}, [])
	return data ? (
		<>
			<Head />
			<List data={data} />
			<Total />
		</>
	) : <div>Түр хүлээнэ үү...</div>
}

export default Payable