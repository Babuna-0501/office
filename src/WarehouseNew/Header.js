import css from './style.module.css'
import {useState, useContext} from 'react'
import {ModuleContext} from './index'
import WarehouseForm from './WarehouseForm'

const Header = (props) => {
	const context = useContext(ModuleContext)
	const [warehouseCreateForm, setWarehouseCreateForm] = useState(false)
	return (
		<>
			<div id="pageHeaderHead">
	            <span className="headerBlock">
	                <span style={{fontWeight: 'bold', fontSize: '1.25rem', cursor: 'pointer'}} onClick={() => props.setActiveWarehouse(null)}>Агуулах</span>
	                {props.activeWarehouse ? (
	                	<>
	                		<span style={{margin: '0 1rem', fontSize: '2rem', color: '#ddd'}}>&#8250;</span>
	                		<span>{props.activeWarehouse.name}</span>
	                	</>
	                ) : null}
	            </span>
	        </div>
		</>
	)
}

export default Header