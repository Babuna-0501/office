import React, { useEffect, useState } from "react";
import myHeaders from "../components/MyHeader/myHeader";

function Update(props) {
  let [saving, setSaving] = useState(false);
  const [busTypes, setBusTypes] = useState([]);

	console.log("PROPS4321: ", props);
	// console.log(
	// 	"TEST: ",
	// 	Number(
	// 		props?.pageData?.brands?.find(
	// 			e =>
	// 				e?.BrandName?.toLowerCase() ===
	// 				props?.data?.rows[0]?.brand?.toLowerCase()
	// 		)?.BrandID
	// 	)
	// );

	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		let urlNew = `https://api.ebazaar.mn/api/site_data`;
		fetch(urlNew, requestOptions)
			.then(res => res.json())
			.then(res => {
				// console.log("res", res);
				let data = [];
				res.business_types.map(item => {
					data.push(item.business_type_id);
				});
				setBusTypes(data);
			})
			.catch(error => {
				console.log("error", error);
			});
	}, []);
	const save = () => {
		if (!saving) {
			document.getElementById("read").remove();
			setSaving(true);

			props.data.rows.map(product => {
				// console.log("product+++++", product);

				let priceChannel = {};
				let incaseChannel = {};
				let activeChannel = {};
				let priorityChannel = {};

				busTypes.map(item => {
					priceChannel[item] = Number(product.price);
					incaseChannel[item] = Number(product.incase);
					activeChannel[item] = Number(product.active);
					priorityChannel[item] = Number(product.priority);
				});

				let prod = {
					product_id: Number(product.id),
					supplier_id: product.supplier_id,
				};
				if (product.price) {
					prod["locations.62f4aabe45a4e22552a3969f.price.channel"] =
						priceChannel;
				}
				if (product.name) {
					prod["name"] = product.name;
				}
				if (product.barcode) {
					prod["bar_code"] = product.barcode;
				}
				if (product.incase) {
					prod["locations.62f4aabe45a4e22552a3969f.in_case.channel"] =
						incaseChannel;
				}
				if (product.active) {
					prod["locations.62f4aabe45a4e22552a3969f.is_active.channel"] =
						activeChannel;
				}
				if (product.sku) {
					prod["sku"] = product.sku;
				}
				if (product.description) {
					prod["description"] = product.description;
				}
				if (product.priority) {
					prod["locations.62f4aabe45a4e22552a3969f.priority.channel"] =
						priorityChannel;
				}

				if (product.stock) {
					prod["stock"] = Number(product.stock);
				}
				if (product.proper_stock) {
					prod["proper_stock"] = Number(product.proper_stock);
				}
				if (product.city_tax) {
					prod["city_tax"] = product.category === "Алкоголь" ? 1 : 0;
				}
				if (product.alcohol) {
					prod["alcohol"] = product.category === "Алкоголь" ? 1 : 0;
				}
				if (product.safe_stock) {
					prod["safe_stock"] = Number(product.safe_stock);
				}
				if (product.supplier_minimum_order_amount) {
					prod["supplier_minimum_order_amount"] = Number(
						product.supplier_minimum_order_amount
					);
				}
				if (product.minimum_order_quantity) {
					prod["minimum_order_quantity"] = Number(
						product.minimum_order_quantity
					);
				}
				if (product.pick_date) {
					prod["pick_date"] = product.pick_date;
				}
				if (product.brand) {
					prod["brand"] =
						Number(
							props?.pageData?.brands?.find(
								e =>
									e?.BrandName?.toLowerCase() === product?.brand?.toLowerCase()
							)?.BrandID
						) || 0;
				}

				if (product.category) {
					prod["category_id"] =
						Number(
							props?.pageData?.categories?.find(
								e => e?.name?.toLowerCase() === product?.category?.toLowerCase()
							)?.id
						) || 0;
				}
				if (product.slug) {
					prod["slug"] = product.slug;
				}
				if (product.shuurkhaicat) {
					prod["supplierProductGroup"] =
						props?.productGroup?.find(
							e =>
								e?.name?.toLowerCase() === product?.shuurkhaicat?.toLowerCase()
						)?.id || 0;
				}

				let newRaw = {
					...prod,
				};
				newRaw = JSON.stringify(newRaw);
				// console.log(raw);
				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: newRaw,
					redirect: "follow",
				};
				console.log("requestOptions mass update", requestOptions);

				let urlNew = `https://api2.ebazaar.mn/api/product/update1`;

				fetch(urlNew, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log("mass update", result);
					})
					.catch(error => {
						console.log("error", error);
					});
			});
			setTimeout(() => {
				props.setUpdater(false);
			}, 2000);
		}
	};
	let headers = {};
	props.data.rows.map(row => {
		headers["price"] = row.price ? true : false;
		headers["name"] = row.name ? true : false;
		headers["barcode"] = row.barcode ? true : false;
		headers["incase"] = row.incase ? true : false;
		headers["active"] = row.active ? true : false;
		headers["sku"] = row.sku ? true : false;
		headers["description"] = row.description ? true : false;
		headers["priority"] = row.priority === undefined ? false : true;
		headers["stock"] = row.stock ? true : false;
		headers["proper_stock"] = row.proper_stock ? true : false;
		headers["city_tax"] = row.city_tax ? true : false;
		headers["safe_stock"] = row.safe_stock ? true : false;
		headers["supplier_minimum_order_amount"] = row.supplier_minimum_order_amount
			? true
			: false;
		headers["minimum_order_quantity"] = row.minimum_order_quantity
			? true
			: false;
		headers["pick_date"] = row.pick_date ? true : false;
		headers["brand"] = row.brand ? true : false;
		headers["category"] = row.category ? true : false;
		headers["slug"] = row.slug ? true : false;
		headers["shuurkhaicat"] = row.shuurkhaicat ? true : false;
		headers["alcohol"] = row.alcohol ? true : false;

		console.log("priority", row.priority);
	});
	console.log("headers", headers);
	return (
		<div id="formwithtransparentbackground">
			<div id="form" className="import">
				<div className="container">
					<h1>Mass update</h1>
					<div id="rows" style={{ width: "100%" }}>
						<div className="entry header width100">
							<div>ID</div>
							{headers.price ? <div>Үнэ</div> : null}
							{headers.name ? <div>Нэр</div> : null}
							{headers.barcode ? <div>Баркод</div> : null}
							{headers.incase ? <div>Хайрцгаар/авдраар зарах тоо</div> : null}
							{headers.active ? <div>Идэвхитэй эсэх</div> : null}
							{headers.sku ? <div>SKU</div> : null}
							{headers.description ? <div>Тайлбар</div> : null}
							{headers.priority ? <div>Дараалал</div> : null}
							{headers.stock ? <div>Үлдэгдэл</div> : null}
							{headers.proper_stock ? <div>proper_stock</div> : null}
							{headers.city_tax ? <div>city_tax</div> : null}
							{headers.safe_stock ? <div>safe_stock</div> : null}
							{headers.supplier_minimum_order_amount ? (
								<div>supplier_minimum_order_amount</div>
							) : null}
							{headers.minimum_order_quantity ? (
								<div>minimum_order_quantity</div>
							) : null}
							{headers.pick_date ? <div>pick_date</div> : null}
							{headers.brand ? <div>Брэнд</div> : null}
							{headers.category ? <div>Ангилал</div> : null}
							{headers.slug ? <div>Slug</div> : null}
							{headers.shuurkhaicat ? <div>Шуурхай Ангилал</div> : null}
							{headers.alcohol ? <div>Алкоголь</div> : null}
						</div>
						<div
							style={{
								overflow: "scroll",
								height: "90%",
							}}
						>
							{props.data.rows.map((row, index) => {
								return (
									<div className="entry width100" key={index}>
										<div>{row.id}</div>
										{row.price ? <div>{row.price}</div> : null}
										{row.name ? <div>{row.name}</div> : null}
										{row.barcode ? <div>{row.barcode}</div> : null}
										{row.incase ? <div>{row.incase}</div> : null}
										{row.active ? <div>{row.active}</div> : null}
										{row.sku ? <div>{row.sku}</div> : null}
										{row.description ? <div>{row.description}</div> : null}
										{row.priority ? <div>{row.priority}</div> : null}
										{row.stock ? <div>{row.stock}</div> : null}
										{row.proper_stock ? <div>{row.proper_stock}</div> : null}
										{row.city_tax ? <div>{row.city_tax}</div> : null}
										{row.safe_stock ? <div>{row.safe_stock}</div> : null}
										{row.supplier_minimum_order_amount ? (
											<div>{row.supplier_minimum_order_amount}</div>
										) : null}
										{row.minimum_order_quantity ? (
											<div>{row.minimum_order_quantity}</div>
										) : null}
										{row.pick_date ? <div>{row.pick_date}</div> : null}
										{row.brand ? (
											<div
												style={{
													color: props?.pageData?.brands?.find(
														e =>
															e?.BrandName?.toLowerCase() ===
															row?.brand?.toLowerCase()
													)?.BrandID
														? "green"
														: "red",
												}}
											>
												{row.brand}
											</div>
										) : null}
										{row.category ? (
											<div
												style={{
													color: props?.pageData?.categories?.find(
														e =>
															e?.name?.toLowerCase() ===
															row?.category?.toLowerCase()
													)?.id
														? "green"
														: "red",
												}}
											>
												{row.category}
											</div>
										) : null}
										{row.slug ? <div>{row.slug}</div> : null}
										{row.shuurkhaicat ? (
											<div
												style={{
													color: props?.productGroup?.find(
														e =>
															e?.name?.toLowerCase() ===
															row?.shuurkhaicat?.toLowerCase()
													)?.id
														? "green"
														: "red",
												}}
											>
												{row.shuurkhaicat}
											</div>
										) : null}
										{row.alcohol ? <div>{row.alcohol}</div> : null}
									</div>
								);
							})}
						</div>
					</div>
					<div className="container-btn">
						<span className="btn" onClick={() => save()}>
							{saving ? "Түр хүлээнэ үү" : "Хадгалах"}
						</span>
						<span
							className="btn"
							style={{ background: "#ddd" }}
							onClick={() => props.setUpdater(false)}
						>
							Cancel
						</span>
					</div>
				</div>
			</div>
			<div id="transparentbackground"></div>
		</div>
	);
}

export default Update;
