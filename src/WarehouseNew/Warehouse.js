import {useState, useEffect, useContext, createContext} from 'react'
import myHeaders from "../components/MyHeader/myHeader"
import Stocks from './Tabs/Stocks'
import Orlogo from './Tabs/In/Orlogo'
import Zarlaga from './Tabs/Zarlaga/Zarlaga'
import Settings from './Tabs/Settings'
import Out from './Tabs/Out/Out'
import css from './style.module.css'
import {ModuleContext} from './index'

const WarehouseContext = createContext()

const Warehouse = (wh) => {
	const [activeTab, setActiveTab] = useState('in')
	const context = useContext(ModuleContext)
	const [products, setProducts] = useState(null)
	const [allProducts, setAllProducts] = useState(null)
	const tabs = {
		'stocks': <Stocks wh={wh.props._id} />,
		'in': <Orlogo wh={wh.props._id} />,
		'settings': <Settings />,
		'out': <Zarlaga wh={wh.props._id} />
	}
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
	    const url = `https://api2.ebazaar.mn/api/warehouse?id=${context.activeWarehouse._id}&allProducts=true`
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			setProducts(response.data[0].products)
		})
	}, [])
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
	    }
	    const url = `https://api2.ebazaar.mn/api/nugan/products?supplierId=${wh.props.supplierId}`
		fetch(url, requestOptions).
		then(r => r.json()).
		then(response => {
			setAllProducts(response.products)
		})
	}, [])
	let foo = {products, allProducts}
	return products && allProducts ? (
		<WarehouseContext.Provider value={foo}>
			<div>
				<div id={css.tabs}>
					<span onClick={() => setActiveTab('in')} className={css.tab} style={{borderBottom: activeTab === 'in' ? '3px solid #2AB674' : '', cursor: 'pointer'}}>Орлого</span>
					<span onClick={() => setActiveTab('out')} className={css.tab} style={{borderBottom: activeTab === 'out' ? '3px solid #2AB674' : '', cursor: 'pointer'}}>Зарлага</span>
					<span onClick={() => setActiveTab('stocks')} className={css.tab} style={{borderBottom: activeTab === 'stocks' ? '3px solid #2AB674' : '', cursor: 'pointer'}}>Үлдэгдэл</span>
					<span style={{display: 'none'}} onClick={() => setActiveTab('settings')} className={css.tab} style={{borderBottom: activeTab === 'settings' ? '3px solid #2AB674' : '', display: 'none'}}>Тохиргоо</span>
				</div>
				<div>{tabs[activeTab]}</div>
			</div>
		</WarehouseContext.Provider>
	) : null
}

export default Warehouse

export {WarehouseContext}