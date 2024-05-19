const User = (props) => {
	let courier = props.courier
	const data = props.userData
	const check = courier === data.user_id ? <img src="https://admin.ebazaar.mn/images/check1.svg" style={{height: '30px'}} /> : <img src="https://admin.ebazaar.mn/images/check2.svg" style={{height: '30px', margin: '.25rem 0 0 0'}} />
	const setCourier = (userId) => {
		console.log(userId)
		props.setCourier(userId)
	}
	return data.role === 2 ? (
		<div style={{width: '50%', float: 'left'}}>
			<div style={{padding: '0 0 0 2rem'}} onClick={() => setCourier(data.user_id)}>
				<div style={{background: courier === data.user_id ? '#F4FAED' : 'white', padding: '1rem', borderRadius: '.25rem', cursor: 'pointer', display: 'flex'}}>
					<div style={{padding: '.5rem .5rem 0 0'}}>
						{check}
					</div>
					<div>
						{data.first_name  + ' ' + data.last_name}
						<p style={{fontSize: '11px'}}>Түгээгч</p>
					</div>
				</div>
			</div>
		</div>
	) : null
}

export default User