import { useEffect } from "react"

const SearchResult = (props) => {
	console.log(props)
	const functionalKeys = (e) => {
		if(e.code === "Escape") {
			setTimeout(() => {
				document.getElementById('search_sale').value = ''
				document.getElementById('search_sale').focus()
				props.setSearchResult(false)
				props.setShowSearchResult(false)
			}, 100)
		}
	}
	useEffect(() => {
		document.addEventListener('keydown', functionalKeys)
	}, [])
	return props.data && props.data.length > 0 ? (
		<div id="SearchResult" style={{zIndex: '30000000'}}>
			{props.data.map(item => {
				let isProductIsIn = false
				console.log(item)
				props.products.map(product => {
					if(product._id === item._id) {
						isProductIsIn = true
					}
				})
				console.log(isProductIsIn)
				return (
					<div className="resultitem" style={{zIndex: '30000001'}} onClick={() => props.addProduct(item)} key={Math.random()}>
						<span style={{width: '60%', display: 'inline-block'}}>{item.name + ' [' + item.bar_code + ']'}</span>
						<span style={{width: '30%', display: 'inline-block'}}>{parseInt(item.stock).toLocaleString()}ш</span>
						<span style={{width: '10%', display: 'inline-block'}}>₮{item.series? parseInt(item.series[0].sellPrice.retail).toLocaleString() : null}</span>
					</div>
				)
			})}
		</div>
	) : null
}

export default SearchResult