import Entry from './Entry'
import css from '../style.module.css'
import {ModuleContext} from '../index'
import {WarehouseContext} from '../Warehouse'
import {useContext, useState, useEffect} from 'react'
import { jsPDF } from "jspdf"

const List = (props) => {
	const context = useContext(ModuleContext)
	const whcontext = useContext(WarehouseContext)
	let products = props.data
	console.log(props)
	let renderHTML = []
	const [id, setId] = useState(null)
	const [name, setName] = useState(null)
	const [barcode, setBarcode] = useState(null)
	const [category, setCategory] = useState(null)
	let foo = true
	let totalProducts = 0
	let totalQuantity = 0
	let totalBox = 0
	products.map((data) => {
		if(id && id.toString().length > 0) {
			foo = data._id.toString().includes(id)  ? true : false
			if(foo === false) {
				return
			}
		}
		if(name && name.toString().length > 0) {
			foo = data.name.toString().toLowerCase().includes(name.toLowerCase())  ? true : false
			if(foo === false) {
				return
			}
		}
		if(barcode && barcode.toString().length > 0) {
			foo = data.bar_code.toString().includes(barcode)  ? true : false
			if(foo === false) {
				return
			}
		}
		if(category && parseInt(category) > 0) {
			foo = parseInt(data.category_id) === parseInt(category)  ? true : false
			if(foo === false) {
				return
			}
		}
		if(foo) {
			totalProducts++
			totalQuantity += data.stock
			whcontext.allProducts.map(product => {
				if(product._id === data._id) {
					console.log(product.incase)
					if(product.incase) {
						totalBox += (data.stock / product.incase)
					}
				}
			})
			renderHTML.push(<Entry data={data} productGroups={props.productGroups} setEntry={props.setEntry} key={Math.random()} allProducts={whcontext.allProducts} />)
		}
	})
	const selectAll = () => {
		const entries = document.querySelectorAll('entry_id')
		entries.map(entry => {
			console.log(entry)
		})
	}
	const doc = new jsPDF();
	doc.text("<h1>Hello world!</h1>", 10, 10);
	const width = [50, 100, 50, 300, 200, 200, 200, 200, 200]
	// className="box_header" style={{width: width[0]}}
	return (
		<div id="container-list">
			<div className="box_header_container">
				<div className="box_header" style={{width: width[0]}}>
					<input type="checkbox" onClick={() => selectAll()} />
				</div>
				<div className="box_header" style={{width: width[1]}}>
					<span className={css.header_searchlabel}>ID</span>
					<div className={css.header_container_searchinput}>
						<input type="text" placeholder="Бүтээгдэхүүн ID-гаар хайх" className={css.header_searchinput} onKeyUp={(e) => setId(e.target.value)} />
					</div>
				</div>
				<div className="box_header" style={{width: width[2]}}></div>
				<div className="box_header" style={{width: width[3]}}>
					<span>Нэр</span>
					<div className={css.header_container_searchinput}>
						<input type="text" placeholder="Дугаараар хайх" className={css.header_searchinput} onKeyUp={(e) => setName(e.target.value)} />
					</div>
				</div>
				<div className="box_header" style={{width: width[4]}}>
					<span>Баркод</span>
					<div className={css.header_container_searchinput}>
						<input type="text" placeholder="Баркодоор хайр" className={css.header_searchinput} onKeyUp={(e) => setBarcode(e.target.value)} />
					</div>
				</div>
				<div className="box_header" style={{width: width[5]}}>
					<span>Ангилал</span>
					<div className={css.header_container_searchinput}>
						<select onChange={(e) => setCategory(e.target.value)}>
							<option value="">-- ангилал сонгоно уу --</option>
							{
								context.productGroups.map(group => {
									return <option value={group.ID}>{group.Name}</option>
								})
							}
						</select>
					</div>
				</div>
				<div className="box_header" style={{width: width[6]}}>Үлдэгдэл</div>
				<div className="box_header" style={{width: width[7]}}>Үлдэгдэл (хайрцагаар)</div>
			</div>
			<div id={css.list} style={{top: '110px'}}>
				{renderHTML}
			</div>
			<div style={{position: 'fixed', right: '0', left: '72px', bottom: '0px', height: '90px', background: '#eee', padding: '1rem'}}>
				<div style={{height: '58px', padding: '.5rem', border: '1px solid #ddd', width: '200px', background: 'white', margin: '0 1rem 0 0', display: 'inline-block', float: 'left'}}>
					<p style={{margin: '0'}}>Бүтээгдэхүүн:</p>
					<h1 style={{fontWeight: 'bold', fontSize: '1rem'}}>{totalProducts}</h1>
				</div>
				<div style={{height: '58px', padding: '.5rem', border: '1px solid #ddd', width: '200px', background: 'white', margin: '0 1rem 0 0', display: 'inline-block', float: 'left'}}>
					<p style={{margin: '0'}}>Нийт тоо ширхэг:</p>
					<h1 style={{fontWeight: 'bold', fontSize: '1rem'}}>{totalQuantity}</h1>
				</div>
				<div style={{height: '58px', padding: '.5rem', border: '1px solid #ddd', width: '200px', background: 'white', margin: '0 1rem 0 0', display: 'inline-block', float: 'left'}}>
					<p style={{margin: '0'}}>Нийт хайрцаг:</p>
					<h1 style={{fontWeight: 'bold', fontSize: '1rem'}}>{totalBox.toFixed(2)}</h1>
				</div>
			</div>
		</div>
	)
}

export default List