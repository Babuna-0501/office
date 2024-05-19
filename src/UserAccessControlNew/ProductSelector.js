import {useState} from 'react'
import { createRoot } from 'react-dom/client'

const ProductSelector = (props) => {
	const [products, setProducts] = useState(props.products)
	let renderHTML = []
	const add = (id) => {
		let temp = products
		temp[id].selected = true
		setProducts(() => temp)
		let root = createRoot(document.getElementById('btn_' + id))
		root.render(btnRemove(id))
	}
	const remove = (id) => {
		let temp = products
		temp[id].selected = false
		setProducts(temp)
		let root = createRoot(document.getElementById('btn_' + id))
		root.render(btnAdd(id))
	}
	const btnRemove = (id) => {
		return <button key={Math.random()} className="pageButton small secondary" onClick={() => remove(id)}>Хасах</button>
	}
	const btnAdd = (id) => {
		return <button className="pageButton small" key={Math.random()} onClick={() => add(id)}>Нэмэх</button>
	}
	for(const id in products) {
		const product = products[id]
		renderHTML.push(
			<div className="" key={Math.random()}>
				<span id={'btn_' + product.id}>
					{product.selected ? btnRemove(product.id) : btnAdd(product.id)}
				</span>
				{product.name}
			</div>
		)
	}
	return products ? (
		<div id="overlaypage" style={{zIndex: '100000000'}}>
            <div className="pageHeader" id="pageHeader">
                <p>Бүтээгдэхүүн сонгох</p>
                <span className="pageClose" onClick={() => props.setProductSelector(false)}>
                	<img src="https://admin.ebazaar.mn/images/close.svg" alt="" />
                </span>
            </div>
            <div id="pageBody" style={{top: '60px', right: '0', bottom: '52px', left: '0'}}>
                <div className="left" style={{width: '50%', padding: '0'}}>
                	{
                		renderHTML
                	}
                </div>
                <div className="right" style={{width: '50%', padding: '0'}}>
                	right
                </div>
            </div>
            <div id="overlaypage_footer">
            	<p onClick={() => console.log(products)}>Print</p>
                <button className="pageButton" onClick={() => props.updateProducts(products)}>Сонгосон бүтээгдэхүүнийг нэмэх</button>
            </div>
        </div>
	) : <div id="overlaypage" style={{zIndex: '100000000'}}>Түр хүлээнэ үү...</div>
}

export default ProductSelector