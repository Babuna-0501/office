import List from './List'
import { useEffect, useState } from "react"
import myHeaders from "../../components/MyHeader/myHeader"
import Sale from './Sale'
import Total from './Total'
//import WarehouseSelector from './WarehouseSelector'

const Sales = (props) => {
	const [warehouses, setWarehouses] = useState(null)
	const [warehouse, setWarehouse] = useState(null)
	const [products, setProducts] = useState(null)
	const [data, setData] = useState(null)
	const [sale, setSale] = useState(false)
	const [openingSaleData, setOpeningSaleData] = useState(null)
	const functionalKeys = (e) => {
		if(e.code === "F8") {
			setSale(sale === false ? 1 : false)
		}
	}
	useEffect(() => document.addEventListener('keydown', functionalKeys, true), [])
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		let url = `https://api2.ebazaar.mn/api/warehouse?allProducts=true&id=${props.warehouse}&series=true`;
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			console.log(response)
			setProducts(response.data[0].products)
		})
	}, [])
	// Previous sales block
	const [sales, setSales]  = useState([])
	const [datas, setDatas] = useState(false)
	const fetchData = () => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		let url = `https://api2.ebazaar.mn/api/shipment?type=2&from=${props.warehouse}&startDate=2024-01-01&endDate=2024-02-30&products=true`;
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			let temp = localStorage.getItem('draftsale') ? JSON.parse(localStorage.getItem('draftsale')): []
			response.data.map(sale => {
				temp.push(sale)
			})
			setSales(temp)
			setDatas(true)
		})
	}
	useEffect(() => {
		fetchData()
	}, [])
	// Previous sales block
	const saveDraft = (draft) => {
		let temp = sales
		temp.unshift(draft)
		setSales(temp)
		setSale(false)
	}
	const openSale = (data) => {
		setOpeningSaleData(data)
		setSale('open')
	}
	const openDraft = (data) => {
		setOpeningSaleData(data)
		setSale('draft')
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
			fetchData()
		}
	}
	const handleSave = () => {
		setSale(false)
		fetchData()
	}
	const cancel = () => {
		setSale(false)
		console.log('canceling')
		setOpeningSaleData(null)
	}
	return products ? (
		<>
			<div id="context">
				<button className="button primary medium" onClick={() => setSale('new')}>Борлуулалт (F8)</button>
			</div>
			{sale ? <Sale handleSave={handleSave} cancel={cancel} setSale={setSale} sale={sale} products={products} saveDraft={saveDraft} openingSaleData={openingSaleData} warehouses={props.warehouses} warehouse={props.warehouse} removeDraft={removeDraft} /> : null}
			{datas ? <List setSale={setSale} warehouse={props.warehouse} data={sales} key={Math.random()} openSale={openSale} openDraft={openDraft} supplierUsers={props.supplierUsers} /> : null}
			{datas ? <Total data={sales} key={Math.random()} /> : null}
		</>
	) : null
}

export default Sales