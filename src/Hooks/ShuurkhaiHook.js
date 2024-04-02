import React, { useContext, useState, useEffect } from "react";
import myHeaders from "../components/MyHeader/myHeader";
import { GlobalContext } from "./GlobalContext";

const Ctx = React.createContext();

export const ShuurkhaiHook = props => {
	const { loggedUser } = useContext(GlobalContext);
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [orderId, setOrderId] = useState("");
	const [supplier, setSupplier] = useState("");
	const [filter, setFilter] = useState(false);
	const [productGroup, setProductGroup] = useState();
	const [tabId, setTabId] = useState(1);
	const [vendorIDS, setVendorIDS] = useState();
	const [vendors, setVendors] = useState([]);
	const [PPOrder, setPPOrder] = useState(false);
	const [suppConfig, setSuppConfig] = useState(false);
	const [suppId, setSuppId] = useState();
	const [prodSetting, setProdSetting] = useState(false);
	const [prdctOrder, setPrdctOrder] = useState(false);
	const [change, setChange] = useState(true);

	const [orderSide, setOrderSide] = useState(false);
	const [prdctVendor, setPrdctVendor] = useState();
	const [sidePrdcts, setSidePrdcts] = useState([]);
	const [dataPass, setDataPass] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [minAmount, setMinAmount] = useState(0);
	const [barFill, setBarFill] = useState(0);
	const [suppInfo, setSuppInfo] = useState();
	const [deliveryDate, setDeliveryDate] = useState();
	const [deliveryTime, setDeliveryTime] = useState();
	const [orderComplete, setOrderComplete] = useState(false);

	// console.log("SidePrdcts", sidePrdcts);
	// console.log("DataPass", dataPass);

	const orderSidePrdcts = () => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		const baseURL = `https://api2.ebazaar.mn/api/products/get1`;
		fetch(`${baseURL}?vendor=${prdctVendor}`, requestOptions)
			.then(r => r.json())
			.then(res => {
				// console.log("SIDE PRODUCT", res);
				setSidePrdcts(res.data);
			});
	};

	const orderClose = () => {
		setOrderSide(false);
		setPrdctVendor();
		setSidePrdcts([]);
		setDataPass([]);
		setTotalPrice(0);
		setMinAmount(0);
		setBarFill(0);
		setSuppInfo();
		setDeliveryDate();
		setDeliveryTime();
		setChange(true);
	};

	const fetchProducts = () => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		if (localStorage.getItem("ebazaar_admin_token")) {
			const baseURL = `https://api2.ebazaar.mn/api/products/get1`;
			const queryParams = new URLSearchParams({
				page: orderId !== "" ? 1 : page,
				limit: 100,
				supplier: 13884,
				vendor: supplier,
				id: orderId,
			});

			const url = `${baseURL}?${queryParams}`;

			fetch(
				"https://api2.ebazaar.mn/api/backoffice/newsuppliers?id=13884",
				requestOptions
			)
				.then(r => r.json())
				.then(res => {
					if (res?.ProductGroups) {
						setProductGroup(JSON.parse(res?.ProductGroups));
					}
				});

			if (filter || supplier !== "") {
				fetch(url, requestOptions)
					.then(res => res.json())
					.then(result => {
						// console.log("URL:", url);
						setProducts([]);
						setProducts(result.data);
						// console.log("DATA", result.data);
					})
					.catch(error => console.log("error", error));
			} else {
				fetch(url, requestOptions)
					.then(r => r.json())
					.then(res => {
						setProducts(prevItem => [...prevItem, ...res.data]);
						// console.log("DATA", res.data);
					});
			}
		}
	};

	const fetchSupps = () => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		const baseURL = `https://api2.ebazaar.mn/api/products/get1`;
		fetch(`${baseURL}?supplier=13884`, requestOptions)
			.then(r => r.json())
			.then(res => {
				const vendorIDS = [];
				for (const data of res.data) {
					// console.log("tesla", data.vendor);
					if (data.vendor !== undefined) {
						vendorIDS.push(data.vendor);
					}
				}
				const filteredVendors = [...new Set(vendorIDS)];
				setVendorIDS(filteredVendors.join(","));
			});

		if (vendorIDS !== undefined) {
			fetch(
				`https://api2.ebazaar.mn/api/backoffice/suppliers?id=${vendorIDS}`,
				requestOptions
			)
				.then(r => r.json())
				.then(res => {
					setVendors(res.data);
				})
				.catch(err => console.log("ERROR: ", err));
		}
	};
	useEffect(() => {
		const suppData = vendors.find(item => item.id === prdctVendor);
		setSuppInfo(suppData);
	}, [prdctVendor]);

	useEffect(() => {
		fetchSupps();
		orderSidePrdcts();
	}, [orderSide, prdctVendor]);

	useEffect(() => {
		fetchSupps();
		// console.log("VENDORS", vendors);
	}, [tabId === 2]);

	useEffect(() => {
		// console.log("CHECK");
		fetchProducts();
	}, [page, filter, supplier]);

	return (
		<Ctx.Provider
			value={{
				products,
				setProducts,
				page,
				setPage,
				orderId,
				setOrderId,
				supplier,
				setSupplier,
				filter,
				setFilter,
				tabId,
				setTabId,
				productGroup,
				setProductGroup,
				vendors,
				setVendors,
				PPOrder,
				setPPOrder,
				suppConfig,
				setSuppConfig,
				suppId,
				setSuppId,
				prodSetting,
				setProdSetting,
				orderSide,
				setOrderSide,
				change,
				setChange,
				prdctOrder,
				setPrdctOrder,
				prdctVendor,
				setPrdctVendor,
				sidePrdcts,
				setSidePrdcts,
				dataPass,
				setDataPass,
				totalPrice,
				setTotalPrice,
				minAmount,
				setMinAmount,
				barFill,
				setBarFill,
				suppInfo,
				setSuppInfo,
				deliveryDate,
				setDeliveryDate,
				deliveryTime,
				setDeliveryTime,
				orderClose,
				orderComplete,
				setOrderComplete,
			}}
		>
			{props.children}
		</Ctx.Provider>
	);
};

export default Ctx;