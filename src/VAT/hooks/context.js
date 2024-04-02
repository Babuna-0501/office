import React, { useState, useEffect } from "react";
import { ZonesHook } from "../../Hooks/ZonesHook";
import { useContext } from "react";

const Ctx = React.createContext();

export const ContextStore = props => {
	const [page, setPage] = useState(1);
	const [products, setProducts] = useState([]);
	const [isSideBar, setIsSideBar] = useState(false);
	const [sideBarData, setSideBarData] = useState({});
	const [isModal, setIsModal] = useState(false);
	const [namesearch, setNamesearch] = useState("");
	const [priority, setPriority] = useState("");
	const [startdate, setStartdate] = useState("");
	const [enddate, setEnddate] = useState("");
	const [data, setData] = useState([]);
	const [merchantsinfo, setMerchantsinfo] = useState([]);
	const zonesctx = useContext(ZonesHook);
	const [searchValues, setSearchValues] = useState({
		BuschlelSongoh: "",
		Created: "",
	});
	const [searchTerm,setSearchTerm] = useState("");

	useEffect(() => {
		var myHeaders = new Headers();
		myHeaders.append(
			"ebazaar_token",
			localStorage.getItem("ebazaar_admin_token")
		);
		myHeaders.append("Content-Type", "application/json");
		fetch(`https://api2.ebazaar.mn/api/products/get1?page=1&limit=50`, {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		})
			.then(res => res.json())
			.then(res => {
				console.log("res--111", res);
				setProducts(res.data);
			})
			.catch(error => {
				console.log("Error", error);
			});
	}, []);
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
	return (
		<Ctx.Provider
			value={{
				page,
				setPage,
				products,
				setProducts,
				isSideBar,
				setIsSideBar,
				sideBarData,
				setSideBarData,
				isModal,
				setIsModal,
				namesearch,
				setNamesearch,
				priority,
				setPriority,
				startdate,
				setStartdate,
				enddate,
				setEnddate,
				data,
				setData,
				merchantsinfo,
				setMerchantsinfo,
				searchValues,
				setSearchValues,
			}}
		>
			{props.children}
		</Ctx.Provider>
	);
};

export default Ctx;
