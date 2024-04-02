import React, { useState, useEffect, useContext } from "react";
import Month from "./Month";
import css from "./newcalendar.module.css";
import arrowDown from "../../../assets/Arrow - Down.svg";
import ProductReportHook from "../../../Hooks/ProductsReportHook";
import Select from "../SelectOption/Select";

import ZonesHook from "../../../Hooks/ZonesHook";
import CheckboxComponent from "../Checked/CheckboxComponent";
import SelectSupplier from "../SelectSupplier/SelectSupplier";
import SelectZones from "../SelectZones/SelectZones";
import TdaysHook from "../../../Hooks/TdaysHook";
import NewSuppler from "../SelectSupplier/NewSupplier";
import dataTime from "../../calendarTime.json";
import checkedsvg from "../../../assets/Tick Square on 2.svg";
import uncheckedsvg from "../../../assets/Tick Square.svg";

function App(props) {
	const [data, setData] = useState({});
	const [channel, setChannel] = useState([]);

	const [channelShow, setChannelShow] = useState(false);
	const [zonesShow, setZonesShow] = useState(false);
	const [nameValue, setNameValue] = useState(null);
	const [checkedValue, setCheckedValue] = useState(false);
	const [value, setValue] = useState("3 өдөр");

	// console.log("supplierID", supplierID);
	const [checked, setChecked] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);

	const ctxProduct = useContext(ProductReportHook);

	const tdayctx = useContext(TdaysHook);

	// const foobar = {
	//   "2022-10-12": true,
	//   "2022-10-13": true,
	// };
	// useEffect(() => {
	//   setData(foobar);
	// }, []);

	const data2023 = [
		["1 сар", 36, 6, 0, 2023],
		["2 сар", 29, 2, 1, 2023],
		["3 сар", 32, 2, 2, 2023],
		["4 сар", 34, 5, 3, 2023],
		["5 сар", 30, 0, 4, 2023],
		["6 сар", 32, 3, 5, 2023],
		["7 сар", 35, 5, 6, 2023],
		["8 сар", 31, 1, 7, 2023],
		["9 сар", 33, 4, 8, 2023],
		["10 сар", 36, 6, 9, 2023],
		["11 сар", 31, 2, 10, 2023],
		["12 сар", 34, 4, 11, 2023],
	];
	// const [index, setIndex] = useState(null);

	let days = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

	const ChoseDays = b => {
		checked[b] = !checked[b];
		// checked[b] = true;
		// setChecked(!checked[b]);

		let stateCopy = data;
		// setActive(b);

		data2023.map(m => {
			for (let i = 1; i <= m[1]; i++) {
				let temp = new Date(`${m[4]}-${m[3] + 1}-${i}`);
				// console.log("temp", temp);
				// console.log("B", b);
				if (temp.getDay() === b) {
					if (
						stateCopy[
							`${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
						]
					) {
						stateCopy[
							`${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
						] = false;
					} else {
						stateCopy[
							`${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()}`
						] = true;
					}
				}
			}
		});

		setData({
			// ...data,
			...stateCopy,
		});
	};
	console.log("props.zonedata 9999", props.zonedata);

	useEffect(() => {
		let uuu = {};
		// Object.keys(data).forEach((item) => {
		//   console.log("item");
		//   data[item] = true;
		// });
		let bbb = Object.keys(data);
		let correctDays = [];

		bbb.map(item => {
			if (data[`${item}`] === true) {
				correctDays.push(item);
			}
		});
		console.log("bbb=====----11111", correctDays);
		correctDays.map(item => {
			// console.log("item", item);
			if (item === "bbb") {
				console.log("item bbb");
			} else if (item === "NaN-NaN-NaN") {
				console.log("NaN-NaN-NaN");
			} else {
				let data = new Date(item);
				// console.log("data", data);
				let yearaaa = data.getFullYear();
				let monthaaa = data.getMonth() + 1;
				let daysaaa = data.getDate();

				if (monthaaa < 10) {
					monthaaa = `0${monthaaa}`;
				} else {
					monthaaa = `${monthaaa}`;
				}
				if (daysaaa < 10) {
					daysaaa = `0${daysaaa}`;
				} else {
					daysaaa = `${daysaaa}`;
				}
				uuu[`${yearaaa}-${monthaaa}-${daysaaa}`] = true;
			}
		});

		// console.log("data-uuuuu", uuu);
		tdayctx.setDays(uuu);
	}, [data]);

	useEffect(() => {
		let arr = [];

		ctxProduct.sitedata?.business_types.map(it => {
			arr.push(it);
		});
		setChannel(arr);
	}, []);

	const channelShowHandler = () => {
		// setChannelShow((channelShow) => !channelShow);
		setChannelShow(true);
	};
	const zonesShowHandler = () => {
		// setZonesShow((zonesShow) => !zonesShow);
		setZonesShow(true);
	};

	const handleOnChange = e => {
		setNameValue(e.target.value);
	};
	const handleChangeTime = e => {
		// console.log("handleChangeTime", e.target.value);
		tdayctx.setDeliveryTime(e.target.value);
		setValue(e.target.value);
	};

	return (
		<div style={{ width: "100%", background: "#FBFBFC" }} key={Math.random()}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					position: "sticky",
					top: "0px",
					background: "#FBFBFC",
					paddingBottom: "5px",
				}}
			>
				<div
					style={{
						maxWidth: "350px",
						width: "100%",
						display: "flex",
						flexWrap: "wrap",
						gap: "8px",
					}}
				>
					{days.map((b, i) => {
						return (
							<div
								style={{
									width: "76px",
									display: "flex",
									alignItems: "center",
									flexDirection: "row",
									justifyContent: "flex-start",
									borderRadius: "5px",
									border: checked[i]
										? "1px solid #ffa400"
										: "1px solid #CFD8DC",
									padding: "5px",
									background: checked[i] ? "#FFEDCC" : "#fff",
								}}
								onClick={() => ChoseDays(i)}
								key={Math.random()}
							>
								{/* <input
                  type="checkbox"
                  checked={checked[i]}
                  value={checkedValue}
                  onChange={(e) => setCheckedValue(e.target.checked)}
                  // onChange={(e) => setChecked(e.target.checked)}
                  className={css.inputchecked}
                /> */}
								<img
									src={checked[i] === true ? checkedsvg : uncheckedsvg}
									alt="checked svg"
									style={{
										width: "15px",
										height: "15px",
										marginRight: "10px",
									}}
								/>
								<span
									style={{
										color: checked[i] ? "#37474" : " #90A4AE",
										fontSize: "12px",
										fontWeight: checked[i] ? "700" : "400",
									}}
								>
									{b}
								</span>
							</div>
						);
					})}
				</div>

				<div className={css.selectContainer}>
					<div className={css.SOcontainer}>
						<div className={css.selectoptioncontainer}>
							<select
								value={value}
								onChange={handleChangeTime}
								className={css.selectOption}
							>
								{dataTime.map((item, index) => {
									return (
										<option value={item.value} key={index}>
											{item.value}
										</option>
									);
								})}
							</select>
						</div>

						<div style={{ position: "relative", width: "200px" }}>
							{/* <SelectOption placeOne="Бүх суваг" channel={channel} /> */}
							<div
								className={css.channelChoseContainer}
								onClick={channelShowHandler}
							>
								<span>Бүх суваг</span>
								<img
									src={arrowDown}
									style={{
										width: "24px",
										height: "24px",
										objectFit: "cover",
									}}
								/>
							</div>
							{channelShow && (
								<Select channel={channel} setChannelShow={setChannelShow} />
							)}
						</div>
						<div style={{ position: "relative", width: "200px !important" }}>
							{/* <SelectOption placeOne="Бүх суваг" channel={channel} /> */}
							<div
								className={css.channelChoseContainer}
								onClick={zonesShowHandler}
							>
								<span>Бүх бүсчлэл</span>
								<img
									src={arrowDown}
									style={{
										width: "24px",
										height: "24px",
										objectFit: "cover",
									}}
								/>
							</div>
							{zonesShow && (
								<SelectZones
									setZonesShow={setZonesShow}
									zonedata={props.zonedata}
								/>
							)}
						</div>
					</div>
					<div className={css.selections}>
					</div>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					gap: "10px",
					margin: "10px 0px",
					width: "100%",
					flexDirection: "column",
					overflowX: "auto",
				}}
			>
				<div
					style={{
						color: "#37474F",
						fontSize: "25px",
						fontWeight: "700",
					}}
				>
					2023
				</div>
				<div
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "10px",
					}}
				>
					{data2023.map(item => {
						// console.log("item", item);
						return (
							<Month
								item={item}
								data={data2023}
								foobar={data}
								// index={index}
								key={Math.random()}
								days={days}
								setData={setData}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
