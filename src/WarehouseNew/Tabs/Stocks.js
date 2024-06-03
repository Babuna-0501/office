import { useState, useEffect, useContext } from 'react'
import myHeaders from "../../components/MyHeader/myHeader"
import List from './List'
import Detail from './Detail'
import { ModuleContext } from '../index'
import { WarehouseContext } from '../Warehouse'

const In = (props) => {
	const context = useContext(ModuleContext)
	const warehouseContext = useContext(WarehouseContext)
	console.log(warehouseContext)
	const url = `https://api2.ebazaar.mn/api/warehouse?allProducts=true&ids=${props.wh}`
	const [data, setData] = useState(null)
	const [entry, setEntry] = useState(null)
	useEffect(() => {
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
	}, [])

	return data ? (
		<>
			<List data={warehouseContext.products} setEntry={setEntry} productGroups={context.productGroups} />
			{entry ? <Detail data={entry} setEntry={setEntry} /> : null}
		</>
	) : <div>Түр хүлээнэ үү...</div>
}

export default In