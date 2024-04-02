import {useState, useContext, useEffect} from 'react'

const FormInputs = (props) => {
	const customer = props.customer
	console.log(customer)
	useEffect(() => {
		document.getElementById('pageBody').style.top = document.getElementById('pageHeader').offsetHeight + 'px'
	}, [])
	const save = () => {
		if(validate(['customerType', 'name', 'register', 'businessType', 'phoneNumber', 'city', 'district', 'khoroo', 'address'])) {
			const customerType = document.getElementById('customerType').value
			const name = document.getElementById('name').value
			const register = document.getElementById('register').value
			const businessType = document.getElementById('businessType').value
			const phoneNumber = document.getElementById('phoneNumber').value
			const city = document.getElementById('city').value
			const district = document.getElementById('district').value
			const khoroo = document.getElementById('khoroo').value
			const address = document.getElementById('address').value
			props.save(customerType, name, register, businessType, phoneNumber, city, district, khoroo, address)
		}
	}
	const validate = (inputs) => {
		let valid = true
		inputs.map(input => {
			let temp = document.getElementById(input)
			if(temp.value === '') {
				let color = temp.style.borderColor
				temp.style.borderColor = 'red'
				valid = false
				setTimeout(() => temp.style.borderColor = color, 3000)
			}
		})
		return valid
	} 
	const update = () => {
		if(validate(['customerType', 'name', 'register', 'businessType', 'phoneNumber', 'city', 'district', 'khoroo', 'address'])) {
			const customerType = document.getElementById('customerType').value
			const name = document.getElementById('name').value
			const register = document.getElementById('register').value
			const businessType = document.getElementById('businessType').value
			const phoneNumber = document.getElementById('phoneNumber').value
			const city = document.getElementById('city').value
			const district = document.getElementById('district').value
			const khoroo = document.getElementById('khoroo').value
			const address = document.getElementById('address').value
			props.update(customerType, name, register, businessType, phoneNumber, city, district, khoroo, address, customer)
		}
	}
	return (
		<div id="overlaypage_bg">
			<div id="overlaypage">
				<div className="pageHeader" id="pageHeader">
					<p>{props.customer === 'new' ? 'Шинэ харилцагч' : 'Харилцагчийн мэдээлэл'}</p>
					<span className="pageClose" onClick={() => props.setCustomer(null)}><img src="https://admin.ebazaar.mn/images/close.svg" alt="" /></span>
				</div>
				<div id="pageBody">
					<div className="left" style={{width: '400px'}}>
						<div className="inputContainer">
							<label>Аж ахуйн нэгжийн төрөл:</label>
							<select id="customerType">
								<option value="1">Байгууллага</option>
								<option value="2">Хувь хүн</option>
							</select>
						</div>
						<div className="inputContainer">
							<label>Байгууллагын нэр:</label>
							<input type="text" id="name" defaultValue={props.customer === 'new' ? null : props.customer.customer_name} />
						</div>
						<div className="inputContainer">
							<label>Регистрийн дугаар:</label>
							<input type="text" id="register" defaultValue={props.customer === 'new' ? null : props.customer.business_register} />
						</div>
						<div className="inputContainer" style={{display: 'none'}}>
							<label>Үйл ажиллагааны төрөл:</label>
							<select id="__businessType">
								<option value="1">Импортлогч</option>
							</select>
						</div>
						<div className="inputContainer">
							<label>Суваг:</label>
							<select id="businessType" defaultValue={props.customer.business_type_id}>
								<option value="">---сонгоно уу---</option>
								{props.businessTypes.map(type => {
									return <option value={type.business_type_id}>{type.business_type_name}</option>
								})}
							</select>
						</div>
						<div className="inputContainer">
							<label>Утасны дугаар:</label>
							<input type="text" id="phoneNumber" defaultValue={props.customer === 'new' ? null : props.customer.user_phone_number} />
						</div>
						<div className="inputContainer">
							<label>Хот/Аймаг:</label>
							<select id="city" value={props.customer === 'new' ? null : props.customer.city}>
								<option value="1">Улаанбаатар</option>
							</select>
						</div>
						<div className="inputContainer">
							<label>Дүүрэг/Сум:</label>
							<input type="text" id="district" defaultValue={props.customer === 'new' ? null : props.customer.district} />
						</div>
						<div className="inputContainer">
							<label>Хороо:</label>
							<input type="text" id="khoroo" defaultValue={props.customer === 'new' ? null : props.customer.horoo} />
						</div>
						<div className="inputContainer">
							<label>Дэлгэрэнгүй хаяг:</label>
							<textarea id="address" defaultValue={props.customer === 'new' ? null : props.customer.address}>
							</textarea>
						</div>
					</div>
					<div className="right" style={{left: '400px'}}>
						<span className="tab active">Нэмэлт мэдээлэл</span>
						<div className="containerButtons"><button className="button primary large" onClick={() => props.customer === 'new' ? save() : update()}>{props.customer === 'new' ? 'Бүртгэх' : 'Өөрчлөлтийг хадгалах'}</button></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FormInputs