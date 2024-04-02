import Header from './Header'
import {useState, useContext, useEffect} from 'react'
import myHeaders from "../components/MyHeader/myHeader"
import Sales from './Sales/Sales'
import WarehouseSelector from './WarehouseSelector'

const Index = () => {
	const [warehouses, setWarehouses] = useState(null)
	const [warehouse, setWarehouse] = useState({})
	const [warehouseProducts, setWarehouseProducts] = useState([])
	const [supplierUsers, setSupplierUsers] = useState(null)
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		let url = `https://api2.ebazaar.mn/api/warehouse/get/new`;
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			setWarehouses(response.data)
		})
	}, [])
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
	    const url = 'https://api2.ebazaar.mn/api/backoffice/users'
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			setSupplierUsers(response.data)
		})
	}, [])
	const fnSetWarehouse = (warehouseId) => {
		let temp = {
			activeWarehouse: warehouseId,
			foobar: Math.random()
		}
		setWarehouse({...temp})
	}
	const removeDraft = (id) => {
		let drafts = JSON.parse(localStorage.getItem('draftsale'))
		let temp = []
		drafts.map(draft => {
			if(draft._id !== id) {
				temp.push(draft)
			}
		})
		localStorage.setItem('draftsale', JSON.stringify(temp))
		if(document.getElementById(id)) {
			document.getElementById(id).remove()
		}
	}
	return warehouses ? (
		<>
			<Header warehouses={warehouses} setWarehouse={fnSetWarehouse} warehouse={warehouse.activeWarehouse} key={Math.random()} />
			{warehouse.activeWarehouse ? <Sales warehouse={warehouse.activeWarehouse} warehouses={warehouses} key={Math.random()} removeDraft={removeDraft} supplierUsers={supplierUsers} /> : null}
			{warehouses.length > 1 && !warehouse.activeWarehouse ? <WarehouseSelector setWarehouse={fnSetWarehouse} warehouses={warehouses} key={Math.random()} /> : null}
		</>
	) : null
}

export default Index