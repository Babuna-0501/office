import React, { useContext, useEffect, useState } from "react";
import Ctx from "../../hooks/context";
import classes from "./style.module.css";

const Table = () => {
	const {
		searchValues,
		setSearchValues,
		setIsSideBar,
		setSideBarData,
		filteredBarimts,
		allFilter,
		setIsModal,
	} = useContext(Ctx);
	console.log(filteredBarimts)
	const handleSearch = e => {
		const { name, value } = e.target;

		setSearchValues(prevSearchValues => ({
			...prevSearchValues,
			[name]: value,
		}));

		allFilter({ ...searchValues, [name]: value });
		console.log(searchValues);
	};

	const headerFilterData = [
		{ id: 1, name: "Дугаар", sname: "dugaar" },
		{ id: 2, name: "Нийлүүлэгч", sname: "niiluulegch" },
		{ id: 3, name: "Огноо", sname: "date" },
		{ id: 3, name: "Статус", sname: "status" },
		{ id: 4, name: "Нийт дүн", sname: "total" },
		{ id: 5, name: "НӨАТ", sname: "noat" },
		{ id: 6, name: "НХАТ", sname: "nhat" },
		{ id: 7, name: "Регистэр", sname: "register" },
	];

	const buttons = [
		<button className={`${classes.trueButton} ${classes.statusButton}`}>
			butsaalt done
		</button>,
		<button className={`${classes.falseButton} ${classes.statusButton}`}>
			butsaalt fail
		</button>,
		<button className={`${classes.testButton} ${classes.statusButton}`}>
			Done
		</button>,
		<button className={`${classes.uussenButton} ${classes.statusButton}`}>
			Barimt uussen
		</button>,
		<button className={`${classes.uuseeguiButton} ${classes.statusButton}`}>
			Barimt uuseegui
		</button>,
	];

	// infinity scroll start
	// const [displayedItems, setDisplayedItems] = useState(30);
	// const loadMoreItems = 30;
	// const currentData = filteredBarimts?.slice();

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const { scrollTop, clientHeight, scrollHeight } =
	// 			document.documentElement;
	// 		console.log("scrollTop111111111111111111111", scrollTop);
	// 		console.log("clientHeight222222222222222222", clientHeight);
	// 		console.log("scrollHeight333333333333333333", scrollHeight);
	// 		if (scrollTop + clientHeight >= scrollHeight) {
	// 			// User has scrolled to the bottom
	// 			setDisplayedItems(
	// 				prevDisplayedItems => prevDisplayedItems + loadMoreItems
	// 			);
	// 		}
	// 	};

	// 	window.addEventListener("scroll", handleScroll);

	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// }, [displayedItems]);
	// // infinity scroll end

	return (
		<div className={classes.container}>
			<button onClick={() => setIsModal(true)} className={classes.Addbutton}>
				Баримт нэмэх
			</button>
			<table>
				<thead>
					<tr>
						{headerFilterData?.map((item, index) => (
							<th className={classes.tableHead} key={index}>
								<div
									style={{
										width: item.name === "Дугаар" ? "50px" : "fitContent",
										display: "flex",
										flexDirection: "column",
										gap: "10px",
									}}
								>
									<span>{item.name}</span>
									<input
										name={item.sname}
										onChange={handleSearch}
										style={{
											padding: "6px 10px",
											borderRadius: "5px",
											border: "1px solid #cfd8dc",
											maxWidth: "100%",
										}}
										type={item.name === "Огноо" ? "date" : "text"}
										placeholder="хайх"
									/>
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredBarimts?.map((data, index) => (
						<tr key={index}>
							<td>{data.idtwo}</td>
							<td>{data.companyName}</td>
							<td>
								{data?.barimt?.date
									? data?.barimt?.date
									: data?.body.reportMonth}
							</td>
							<td
								onClick={() => {
									console.log("1 barimt data", data);
									setIsSideBar(true);
									setSideBarData(data);
								}}
							>
								{data?.return?.success.toString()
									? data?.return?.success
										? buttons[0]
										: buttons[1]
									: data.barimt?.success
									? buttons[3]
									: buttons[4]}
							</td>
							<td>{data?.body?.amount}</td>
							<td>{data?.body?.vat}</td>
							<td>{data?.body?.cityTax}</td>
							<td>{data.register}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
