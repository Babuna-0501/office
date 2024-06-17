import {useState, useContext, useEffect} from 'react'
import myHeaders from '../components/MyHeader/myHeader';

const FormInputs = (props) => {
	const [prodSuppliers, setProdSuppliers] = useState([]);
	const product = props.product
	const [productGroup, setProductGroup] = useState(null)


	const getProdSuppliers = async () => {
		try {
		  const url2 = `https://api2.ebazaar.mn/api/backoffice/suppliers`;
		  const requestOptions2 = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		  };
		  const res = await fetch(url2, requestOptions2);
		  const resJson = await res.json();
	
		  const suppliersList = resJson.data.map((item) => ({
			value: item.id,
			label: item.name,
			media: item.media,
		  }));
	
		  setProdSuppliers(suppliersList);
		} catch (err) {
		  console.log("Error fetching suppliers:", err);
		}
	};

	useEffect(() => {
		getProdSuppliers();
	}, []);

	useEffect(() => {
		document.getElementById('pageBody').style.top = document.getElementById('pageHeader').offsetHeight + 'px'
	}, [])
	const save = () => {
		const name = document.getElementById('name')
		if(name.value !== '') {
			const barcode = document.getElementById('barcode').value
			const country = document.getElementById('country').value
			const manufacturer = document.getElementById('manufacturer').value
			const vendor = document.getElementById('vendor').value
			const supplier = document.getElementById('supplier').value
			let category = ''
			if(document.getElementById('category').value !== '') {
				console.log('1')
				category = document.getElementById('category').value
			} else if(document.getElementById('category').value === '' && document.getElementById('parentcategory').value !== '') {
				console.log('2')
				category = document.getElementById('parentcategory').value
			}
			console.log(category)
			const condition = document.getElementById('condition').value
			const storage = document.getElementById('storage').value
			const form = document.getElementById('form').value
			const sku = document.getElementById('sku').value
			const boditsavlalt = document.getElementById('boditsavlalt').value
			const zardagsavlalt = document.getElementById('zardagsavlalt').value
			props.save(name.value, barcode, country, manufacturer, supplier,  vendor, category, condition, storage, form, sku, boditsavlalt, zardagsavlalt)
		} else {
			const borderColor = name.style.borderColor
			name.style.borderColor = 'red'
			name.focus()
			setTimeout(() => {
				name.style.borderColor = borderColor
			}, 3000)
		}
	}
	const update = () => {

	}
	const countriesHTML = []
	for (const [key, value] of Object.entries(props.attributes.country)) {
		countriesHTML.push(<option value={key}>{value}</option>)
	}
	const manufacturerHTML = []
	for (const [key, value] of Object.entries(props.attributes.manufacturer)) {
		manufacturerHTML.push(<option value={key}>{value}</option>)
	}
	const storageHTML = []
	for (const [key, value] of Object.entries(props.attributes.storageConditions)) {
		storageHTML.push(<option value={key}>{value}</option>)
	}
	const conditionsHTML = []
	for (const [key, value] of Object.entries(props.attributes.conditions)) {
		conditionsHTML.push(<option value={key}>{value}</option>)
	}
	const formsHTML = []
	for (const [key, value] of Object.entries(props.attributes.form)) {
		formsHTML.push(<option value={key}>{value}</option>)
	}
	const customers = props.customers ? props.customers : []
	const [images, setImages] = useState([])
	const up = () => {
		const id = (
			Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
			).toUpperCase();
		document
		.getElementById("root")
		.insertAdjacentHTML(
			"beforeEnd",
			'<form method="post" enctype="multipart/form‐data" id="' +
			id +
			'" name=' +
			id +
			'><input type="file" id="uploader' +
			id +
			'" multiple /></form>'
			);
		document.getElementById("uploader" + id).click();
		document
		.getElementById("uploader" + id)
		.addEventListener("change", () => upload(id), false);
	}
	const upload = (form) => {
		const uploader = document.getElementById("uploader" + form);
		var fileField = document.getElementById("uploader" + form);
		let formData = new FormData();
		for (let i = 0; i < uploader.files.length; i++) {
			formData.append(i, fileField.files[i]);
		}
		fetch(
			"https://ebazaar.mn/media/ehlo.php?preset=product&ebazaar_admin_token=" +
			localStorage.getItem("ebazaar_admin_token"),
			{ method: "POST", body: formData }
			)
		.then((r) => r.json())
		.then((response) => {
			console.log(response)
			let temp = [];
			if (response.status === 200) {
				response.data.map((img) => {
					temp.push("https://ebazaar.mn/media/original/" + img.image);
				});
			}
			setImages((prev) => [...temp]);
		});
	}
	console.log(props.product)
	return (
		<div id="overlaypage_bg">
			<div id="overlaypage">
				<div className="pageHeader" id="pageHeader">
					<p>{props.product === 'new' ? 'Шинэ бүтээгдэхүүн' : 'Бүтээгдэхүүний мэдээлэл'}</p>
					<span className="pageClose" onClick={() => props.setProduct(null)}><img src="https://admin.ebazaar.mn/images/close.svg" alt="" /></span>
				</div>
				<div id="pageBody">
					<div className="left">
						<div className="inputContainer">
							<label>Бүтээгдэхүүний нэр:</label>
							<input type="text" id="name" value={props.product === 'new' ? null : product.name} />
						</div>
						<div className="inputContainer">
							<label>Баркод:</label>
							<input type="text" id="barcode" value={props.product === 'new' ? null : product.bar_code} />
						</div>
						<div className="inputContainer">
							<label>Үйлдвэрлэгч улс</label>
							<select id="country">
								<option value="0">--сонгоно уу--</option>
								{countriesHTML}
							</select>
						</div>
						<div className="inputContainer">
							<label>Үйлдвэрлэгч</label>
							<select id="manufacturer">
								<option value="0">--сонгоно уу--</option>
								{manufacturerHTML}
							</select>
						</div>
						<div className="inputContainer">
                            <label>Нийлүүлэгч</label>
                            <select id="supplier">
                                <option value="0">--сонгоно уу--</option>
                                {prodSuppliers.map(supplier => (
                                    <option key={supplier.value} value={supplier.value}>{supplier.label}</option>
                                ))}
                            </select>
                        </div>
						<div className="inputContainer">
							<label>Ангилал:</label>
							<select id="parentcategory" onChange={(e) => setProductGroup(e.target.value)}>
								<option value="">--сонгоно уу--</option>
								{
									props.productGroups.map(group => {
										return group.ParentID === 0 ? <option value={group.ID}>{group.Name}</option> : null
									})
								}
							</select>
						</div>
						<div className="inputContainer">
							<label>Дэд ангилал:</label>
							<select id="category" disabled={parseInt(productGroup) > 0 ? false: true}>
								<option value="">--сонгоно уу--</option>
								{
									props.productGroups.map(group => {
										return parseInt(group.ParentID) === parseInt(productGroup) ? <option value={group.ID}>{group.Name}</option> : null
									})
								}
							</select>
						</div>
						<div className="inputContainer">
							<label>Олгох нөхцөл:</label>
							<select id="condition">
								<option value="0">--сонгоно уу--</option>
								{conditionsHTML}
							</select>
						</div>
						<div className="inputContainer">
							<label>Хадгалах хэм:</label>
							<select id="storage">
								<option value="0">--сонгоно уу--</option>
								{storageHTML}
							</select>
						</div>
						<div className="inputContainer">
							<label>Хадгалах байршил:</label>
							<select id="storage">
								<option value="0">--сонгоно уу--</option>
								{storageHTML}
							</select>
						</div>
						<div className="inputContainer">
							<label>Хэлбэр:</label>
							<select id="form">
								<option value="0">--сонгоно уу--</option>
								{formsHTML}
							</select>
						</div>
						<div className="inputContainer">
							<label>SKU:</label>
							<input type="text" id="sku" value={props.product === 'new' ? null : product.user_phone_number} />
						</div>
						<div className="inputContainer">
							<label>Бодит савлалт:</label>
							<input type="text" id="boditsavlalt" value={props.product === 'new' ? null : props.product.name} />
						</div>
						<div className="inputContainer">
							<label>Зардаг савлалт:</label>
							<input type="text" id="zardagsavlalt" value={props.product === 'new' ? null : props.product.name} />
						</div>
						<div style={{display:"flex", gap:"37px", width:"529px"}}>
							<div>
								<h4>Алкохолны төрөл эсэх</h4>
								<div className="toggle-wrapper" style={{display: 'flex',  flexDirection:"column-reverse"}}><input type="checkbox" className="toggle-input"  style={{width: '20px', height: '20px'}} id="alochol" /><label for="alochol" style={{cursor: 'pointer'}} className="toggle-label"></label></div>
							</div>
							<div>
								<h4>Хотын татвар төлөх эсэх</h4>
								<div className="toggle-wrapper" style={{display: 'flex',  flexDirection:"column-reverse"}}><input type="checkbox" className="toggle-input"  style={{width: '20px', height: '20px'}} id="cityTax" /><label for="cityTax" style={{cursor: 'pointer'}} className="toggle-label"></label></div>
							</div>
							<div>
								<h4>Бутархайгаар сагслах боломжтой эсэх</h4>
								<div className="toggle-wrapper" style={{display: 'flex',  flexDirection:"column-reverse"}}><input type="checkbox" className="toggle-input"  style={{width: '20px', height: '20px'}} id="fraction" /><label for="fraction" style={{cursor: 'pointer'}} className="toggle-label"></label></div>
							</div>
						</div>
						<div style={{marginTop:"25px"}}>
							<h2 style={{fontSize:"16px", fontWeight:600, color:"#1A1A1A"}}>Бүтээгдэхүүний үнэ</h2>
							<h4>Ялгаатай үнийн тохиргоо байгаа эсэх</h4>
							<div className="toggle-wrapper" style={{display: 'flex',  flexDirection:"column-reverse"}}><input type="checkbox" className="toggle-input"  style={{width: '20px', height: '20px'}} id="toggle" /><label for="toggle" style={{cursor: 'pointer'}} className="toggle-label"></label></div>
						</div>
						<div className="inputContainer" style={{marginTop:"25px"}}>
							<label>Бүтээгдэхүүний үнэ:</label>
							<input placeholder='Бүтээгдэхүүний үнэ' type="text" id="price" value={props.product === 'new' ? null : product.price} />
						</div>
						<div style={{width:"212px"}}>
							<h2 style={{fontSize:"16px", fontWeight:600, color:"#1A1A1A"}}>Захиалга хийх харилцагчид</h2>
							<h4>Ялгаатай харилцагчдын тохиргоо байгаа эсэх</h4>
							<div className="toggle-wrapper" style={{display: 'flex',  flexDirection:"column-reverse"}}><input type="checkbox" className="toggle-input"  style={{width: '20px', height: '20px'}} id="orderCustomer" /><label for="orderCustomer" style={{cursor: 'pointer'}} className="toggle-label"></label></div>
						</div>
						<div className="inputContainer">
							<label>Бүтээгдэхүүний зураг:</label>
							<div>
								<img
									style={{ cursor: "pointer", height: '80px', width: '80px' }}
									src="https://ebazaar.mn/icon/photo-add.svg"
									onClick={() => up()}
									alt="https://ebazaar.mn/icon/photo-add.svg"
								/>
							</div>
							<div>

							</div>
						</div>
						<div className="containerButtons">
							<button className='button secondary large'>Цуцлах</button>
							<button className="button primary large" onClick={() => props.product === 'new' ? save() : update()}>{props.product === 'new' ? 'Бүтээгдэхүүнийг бүртгэх' : 'Өөрчлөлтийг хадгалах'}</button>
						</div>
					</div>
					{/* <div className="right" style={{left: '400px'}}>
						<span className="tab active">Дэлгэрэнгүй мэдээлэл</span>
						<span className="tab">Нэмэлт мэдээлэл</span>
						<textarea className="text margintop1rem"></textarea>
						<div className="containerButtons">
							<button onClick={() => console.log('yeah')}>Print product group</button>
							<button className="button primary large" onClick={() => props.product === 'new' ? save() : update()}>{props.product === 'new' ? 'Бүтээгдэхүүнийг бүртгэх' : 'Өөрчлөлтийг хадгалах'}</button>
						</div>
					</div> */}
				</div>
			</div>
		
		</div>
	)
}

export default FormInputs