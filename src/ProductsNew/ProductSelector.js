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

/*
{
    "_id": 591640,
    "alcohol": 0,
    "attributes": [],
    "bar_code": "123456789 nugan",
    "brand": 0,
    "category_id": 0,
    "city_tax": "0",
    "country": "1",
    "description": "description",
    "exclude": [],
    "image": [
        "https://ebazaar.mn/media/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg"
    ],
    "include": [],
    "manufacturer": "3",
    "name": "123456789 nugan",
    "noat": false,
    "pickpack": 0,
    "product_measure": false,
    "product_weight": 1000,
    "sector_id": null,
    "sku": "123456789 nugan",
    "slug": "product",
    "stock": 100000000000000,
    "supplier_id": 14010,
    "supplier_productgroup_id": "31615",
    "thirdparty_data": {
        "pickpack": {
            "sku": "",
            "sync": false
        }
    },
    "options": {
        "foo": "bar"
    },
    "weight": null,
    "created_date": "2024-02-26T02:29:15.896Z",
    "created_by": 677
}
*/