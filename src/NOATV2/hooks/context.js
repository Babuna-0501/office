import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const ContextStore = props => {
	const [barimts, setBarimts] = useState([]);
	const [filteredBarimts, setFilteredBarimts] = React.useState([]);
	const [isSideBar, setIsSideBar] = useState(false);
	const [sideBarData, setSideBarData] = useState({});
	const [suppliers, setSuppliers] = useState([]);
	const [searchValues, setSearchValues] = useState({
		niiluulegch: "",
		dugaar: "",
		date: "",
		status: "",
		total: "",
		noat: "",
		nhat: "",
		register: "",
	});
	const [isModal, setIsModal] = useState(false);
	const [newBarimt, setNewBarimt] = useState({});

	var myHeaders = new Headers();
	myHeaders.append(
		"ebazaar_token",
		localStorage.getItem("ebazaar_admin_token")
	);
	myHeaders.append("Content-Type", "application/json");

	const getSuppliers = () => {
		return new Promise((resolve, reject) => {
			fetch(`https://api2.ebazaar.mn/api/ebarimt/suppliers`, {
				method: "POST",
				headers: myHeaders,
				redirect: "follow",
				body: JSON.stringify({
					register: 6388094,
				}),
			})
				.then(response => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Error retrieving suppliers.");
					}
				})
				.then(data => {
					const suppliers = data.suppliers;
					resolve(suppliers);
				})
				.catch(error => {
					console.log("Error:", error);
					reject(error);
				});
		});
	};

	const getBarimts = () => {
		fetch(`https://api2.ebazaar.mn/api/ebarimt/all`, {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: JSON.stringify({
				register: 6388094,
			}),
		})
			.then(r => r.json())
			.then(r => {
				console.log("response noat 2", r);
				getSuppliers()
					.then(suppliers => {
						setSuppliers(suppliers);

						let update = r.data?.reverse().map((itm, index) => {
							let company = "";
							suppliers
								? suppliers.map(supplier =>
										itm.body
											? itm.body.registerNo == supplier.register
												? (company = supplier.name)
												: null
											: itm.register === supplier.register
											? (company = supplier.name)
											: null
								  )
								: console.log(suppliers);
							return {
								...itm,
								idtwo: (index + 1).toString(),
								companyName: company,
							};
						});

						setBarimts(update);
						setFilteredBarimts(update);
					})
					.catch(e => {
						console.log("error", e);
					});
			});
	};

	const allFilter = e => {
		let newArr = barimts.filter(
			el =>
				el.companyName?.startsWith(e.niiluulegch) &&
				el.idtwo?.startsWith(e.dugaar) &&
				el.body?.amount.startsWith(e.total) &&
				(el.barimt.date
					? el.barimt?.date.includes(e.date)
					: el.body.reportMonth.includes(e.date)) &&
				el.register.startsWith(e.register) &&
				el.body?.vat.startsWith(e.noat) &&
				el.body?.cityTax.startsWith(e.nhat)
		);
		setFilteredBarimts(newArr);
		console.log("newwww", newArr);
	};

	useEffect(() => {
		getSuppliers();
		getBarimts();
	}, []);

	return (
		<Ctx.Provider
			value={{
				barimts,
				setBarimts,
				isSideBar,
				setIsSideBar,
				sideBarData,
				setSideBarData,
				newBarimt,
				setNewBarimt,
				searchValues,
				isModal,
				setIsModal,
				setSearchValues,
				suppliers,
				filteredBarimts,
				allFilter,
			}}
		>
			{props.children}
		</Ctx.Provider>
	);
};

export default Ctx;
