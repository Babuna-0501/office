const WarehouseSelector = (props) => {
    const choose = () => {
        const selectedWarehouse = document.getElementById('salewarehouse')
        if(selectedWarehouse.value === "") {
            selectedWarehouse.style.borderColor = 'red'
        } else {
            props.setWarehouse(selectedWarehouse.value)
        }
    }
	return (
		<>
			<div id="container_warehouseselector">
				<div id="warehouseselector">
					<h1>Агуулах</h1>
					<h2>Борлуулалт хийх агуулахаа сонгоод "Үргэлжлүүлэх" товчыг дарна уу.</h2>
					<select id="salewarehouse">
                        <option value="">-- сонгоно уу --</option>
						{props.warehouses.map(warehouse => {
                            return <option value={warehouse._id} key={Math.random()}>{warehouse.name}</option>
                        })}
					</select>
					<button className="button primary large" style={{width: '100%'}} onClick={choose}>Үргэлжлүүлэх</button>
				</div>
			</div>
			<div id="background_warehouseselector"></div>
		</>
	)
}

export default WarehouseSelector