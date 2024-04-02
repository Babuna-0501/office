import {useState, useContext, useEffect, useRef, useCallback} from 'react'
import myHeaders from "../components/MyHeader/myHeader"
import List from './List'
import Header from './Header'
import Form from './Form'
import AppHook from "../Hooks/AppHook"
import MassChannelPrice from './MassChannelPrice'
import MassImport from './MassImport'

const Index = () => {
	const appContext = useContext(AppHook)
	const [data, setData] = useState([])
	const [customers, setCustomers] = useState(null)
	const [tab, setTab] = useState('products')
	const [product, setProduct] = useState(null)
	const [productGroups, setProductGroups] = useState(null)
	const [attributes, setAttributes] = useState(null)
	const [page, setPage] = useState(1)
	const [loading, setLoading] =  useState(false)
	const [supplierUsers, setSupplierUsers] = useState(null)
	const [massChannelPrice, setMassChannelPrice] = useState(false)
	const [productMassImport, setProductMassImport] = useState(false)
	useEffect(() => {
		fetchSiteData()
		fetchAttributes()
		fetchCustomerData()
	}, [])
	const widths = [50, 100, 300, 50, 200, 200, 200, 200, 200, 200, 200, 200]
	const totalWidth = widths.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
	const fetchCustomerData = () => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		}
		const url = `https://api2.ebazaar.mn/api/merchants?page=all`
		fetch(url, requestOptions)
		.then((r) => r.json())
		.then((response) => {
			setCustomers(response.data)
		})
		.catch((error) => {
			console.log("error", error);
		})
	}
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
	const fetchSiteData = () => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
	    const url = 'https://api2.ebazaar.mn/api/productgroup/get?supplier=' + parseInt(appContext.userData.company_id.match(/(\d+)/)[0])
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			setProductGroups(response)
		})
	}
	const fetchAttributes = () => {
		const url = `https://api2.ebazaar.mn/product/sub_attributes`
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			console.log(response)
			setAttributes(response.data[0])
		})
	}
	return attributes && supplierUsers && customers ? (
		<>
			<Header tab={tab} setTab={setTab} />
			<div className="containerPageButtons">
				<button className="pageButton" onClick={() => setProduct('new')}>+ Шинэ бүтээгдэхүүн</button>
				<button className="pageButton secondary" onClick={() => setProductMassImport(true)}>Бүтээгдэхүүн масс импортлох</button>
				<button className="pageButton secondary">Бүтээгдэхүүний тайлан</button>
				<button className="pageButton secondary" onClick={() => setMassChannelPrice(true)}>Масс сувгийн үнийн тохиргоо</button>
			</div>
			{<List setPage={setPage} data={data} widths={widths} totalWidth={totalWidth} setProduct={setProduct} page={page + 1} attributes={attributes} productGroups={productGroups} supplierUsers={supplierUsers} />}
			{product ? <Form setProduct={setProduct} product={product} supplierId={parseInt(appContext.userData.company_id.match(/(\d+)/)[0])} customers={customers} productGroups={productGroups} attributes={attributes} /> : null}
			{massChannelPrice ? <MassChannelPrice setMassChannelPrice={setMassChannelPrice} /> : null}
			{productMassImport ? <MassImport setProductMassImport={setProductMassImport} /> : null}
		</>
	) : <div>Түр хүлээнэ үү...</div>
}

export default Index