import {useState, useEffect, createContext} from 'react'
import {List} from './List'
import Header from './Header'
import Warehouse from './Warehouse'
import myHeaders from '../components/MyHeader/myHeader'
import InOutForm from './InOutForm'
import WarehouseForm from './WarehouseForm'

const ModuleContext = createContext()

const WarehouseNew = (props) => {
	const [ctx, setCtx] = useState({warehouse: null})
	const [data, setData] = useState(null)
	const [companyId] = useState(props.userData.company_id)
	const [activeWarehouse, setActiveWarehouse] = useState(null)
	const [warehouseList, setWarehouseList] = useState(null)
	const [systemData, setSystemData] = useState(null)
	const [supplierUsers, setSupplierUsers] = useState(null)
	const [productGroups, setProductGroups] = useState(null)
	const [customers, setCustomers] = useState([])
	const [attributes, setAttributes] = useState(null)
	const [warehouseForm, setWarehouseForm] = useState(false)
	let renderHTML = null
	if(activeWarehouse) {
		renderHTML = <Warehouse props={activeWarehouse}/>
	} else {
		renderHTML = <List setWarehouseForm={setWarehouseForm} companyId={companyId} />
	}
	let foo = {ctx, setCtx, setActiveWarehouse, activeWarehouse, companyId, warehouseList, setWarehouseList, systemData, supplierUsers, productGroups, customers, attributes}
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
	    const url = 'https://api2.ebazaar.mn/api/external/data'
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			setSystemData(response.data[0])
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
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
	    const url = 'https://api2.ebazaar.mn/api/productgroup/get?supplier=' + companyId.match(/\d+/)[0]
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			setProductGroups(response)
		})
	}, [])
	useEffect(() => {
		let url = `https://api2.ebazaar.mn/api/merchants`
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		fetch(url, requestOptions)
		.then((r) => r.json())
		.then((response) => {
			setCustomers(response.data)
		})
		.catch((error) => {
			console.log("error", error)
		})
	}, [])
	useEffect(() => {
		const url = `https://api2.ebazaar.mn/product/sub_attributes`
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			setAttributes(response.data[0])
		})
	}, [])
	return (
		<ModuleContext.Provider value={foo}>
			<Header activeWarehouse={activeWarehouse} setActiveWarehouse={setActiveWarehouse} />
			{renderHTML}
			{warehouseForm ? <WarehouseForm setWarehouseForm={setWarehouseForm} companyId={companyId} /> : null}
		</ModuleContext.Provider>
	)
}

export default WarehouseNew

export {ModuleContext}