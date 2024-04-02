import React, { useContext, useState, useEffect } from "react";
import css from "./Zones.module.css";
import { ProductReportHook } from "../../Hooks/ProductsReportHook";
import { styles } from "../style";

const Zones = props => {
	const [data, setData] = useState([]);
	const [selectedZone, setSelectedZone] = useState([]);
	const [namesearch, setNamesearch] = useState("");
	const productctx = useContext(ProductReportHook);
	console.log("zone rpos", props);

	useEffect(() => {
		let controller = new AbortController();
		var myHeaders = new Headers();
		myHeaders.append(
			"ebazaar_token",
			localStorage.getItem("ebazaar_admin_token")
		);
		myHeaders.append("Content-Type", "application/json");
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		let url = `https://api2.ebazaar.mn/api/zones`;
		if (namesearch.length !== 0) {
			url += `?name=${namesearch}`;
		}

		fetch(url, requestOptions)
			.then(r => r.json())
			.then(response => {
				console.log("data buschlel", response.data);
				setData(response.data);
			})
			.catch(error => console.log("error", error));
	}, [namesearch]);
	const selectedZoneIds = selectedZone.map(item => item._id);

	console.log("props.product", props.product);
	console.log("productsIDnuuud", props.selected);
	console.log("data", data);
	console.log("selectedZone", selectedZone);

	const handleSave = () => {
		// Handle the saving logic here with selectedZoneIds
		console.log("Selected Zone IDs:", selectedZoneIds);
		console.log("props.product", props.product);
		let newArrr = props.selected.map(item => {
			return {
				productids: item,
				zoneids: selectedZoneIds,
			};
		});

		console.log("newArrr", newArrr);
	};

	const handleCheckboxChange = (event, item) => {
		const { checked } = event.target;
		setSelectedZone(prevSelected => {
			if (checked) {
				return [...prevSelected, item];
			} else {
				return prevSelected.filter(selectedItem => selectedItem !== item);
			}
		});
	};

	const handleSearchChange = event => {
		const { value } = event.target;
		setNamesearch(value);
		filterData(value);
	};

	const filterData = value => {
		const filtered = data.filter(
			item =>
				item.name.toLowerCase().includes(value.toLowerCase()) ||
				item.name.includes(value)
		);
		setData(filtered);
	};

	return (
		<div className={css.container}>
			<div>
				<div className={css.header}>
					<div style={{ ...styles.SideBarZone }}>
						<div>
							<span className="header">Бүсчлэл сонгох</span>
							<input
								type="text"
								value={namesearch}
								onChange={handleSearchChange}
							/>
						</div>
					</div>
					<div style={{ ...styles.SideBarZone }}>
						<div>
							<span className="header">Created by</span>
						</div>
					</div>
				</div>
				<div className={css.productList}>
					<div className={css.productsHeader}></div>
					<div className={css.products}>
						{data &&
							data.map((item, index) => {
								return (
									<div className={css.sideZoneContainer} key={item._id}>
										<div className={css.sideZoneData}>
											<input
												type="checkbox"
												onChange={event => handleCheckboxChange(event, item)}
												checked={selectedZone.includes(item)}
												style={{ width: 20 }}
											/>
											<span>{item.name}</span>
										</div>
										<div className={css.sideZoneData}>{item.createdBy}</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
			<div className={css.buttonContainer}>
				<div className={css.saveButton}>
					<button onClick={() => handleSave()}>Хадгалах</button>
				</div>
			</div>
		</div>
	);
};

export default Zones;
