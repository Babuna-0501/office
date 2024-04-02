import React, { useState, useEffect, useContext } from "react";

import { CSVLink } from "react-csv";
import List from "./List";
import Create from "./Create";
import SMSHook from "../Hooks/SMSHook";
import css from "./index.module.css";
import { HeaderContext } from "../Hooks/HeaderHook";
import { HeaderContent } from "./HeaderContent";
import Notification from "./NotifList";

const areEqual = (prevProps, nextProps) => true;

const Index = React.memo(props => {
	const [smsData, setSmsData] = useState([]);
	const [download, setDownload] = useState(false);

	const [dateStart, setDateStart] = useState("");
	const [dateEnd, setDateEnd] = useState("");
	const [open, setOpen] = useState(false);

	console.log("START AND END DATE:  ", dateStart, " ||| ", dateEnd);
	console.log(smsData.length);
	console.log("SMSDATA:  ", smsData);

	const smsctx = useContext(SMSHook);

	const tabs = [
		{
			id: 1,
			header: "SMS",
			content: (
				<List
					key={Math.random()}
					locations={props.locations}
					businessType={props.businessType}
					userData={props.userData}
				/>
			),
		},
		{ id: 2, header: "Notification", content: <Notification /> },
	];

	const { setHeaderContent } = useContext(HeaderContext);

	const [activeTab, setActiveTab] = useState(tabs[0].id);
	// console.log("ACTIVE TAB: ", activeTab);

	useEffect(() => {
		setHeaderContent(<HeaderContent open={open} setOpen={setOpen} />);

		return () => {
			setHeaderContent(<></>);
		};
	}, []);
	useEffect(() => {
		
		const getSMS = () => {
			var myHeaders = new Headers();
			myHeaders.append(
				"ebazaar_token",
				localStorage.getItem("ebazaar_admin_token")
			);
			var requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};
			// if (dateStart === "" && dateEnd === "") {
			// 	let url = `https://api2.ebazaar.mn/api/get/smslog`;
			// 	console.log("REPORT ALL");

			// 	fetch(url, requestOptions)
			// 		.then(r => r.json())
			// 		.then(response => {
			// 			setSmsData(response.data);
			// 		})
			// 		.catch(error => console.log("error", error));
			// } else {
			let url = `https://api2.ebazaar.mn/api/get/smslog?start_date=${dateStart}&end_date=${dateEnd}`;
			console.log("REPORT FILTER ", url);
			fetch(url, requestOptions)
				.then(r => r.json())
				.then(response => {
					setSmsData(response.data);
					console.log("FILTERED SMS", response.data);
				})
				.catch(error => console.log("error", error));
			// }
		};
		if (dateStart !== "" && dateEnd !== "") {
			getSMS();
		}
	}, [download]);

	return (
		<div>
			<div className={css.wrapper}>
				<div className={css.header}>
					<div className={css.headerTabs}>
						{tabs.map((tab, index) => {
							return (
								<button
									key={index}
									type="button"
									onClick={() => setActiveTab(tab.id)}
									className={`${css.singleTabHeader} ${
										activeTab === tab.id && css.active
									}`}
								>
									{tab.header}
								</button>
							);
						})}
					</div>
				</div>

				<div className={css.contentWrapper}>
					{!open ? (
						<></>
					) : (
						<div className={css.datePicker}>
							<div className={css.dateClose} onClick={() => setOpen(!open)}>
								Хаах
							</div>
							<CSVLink
								data={smsData}
								onClick={() => {
									setDownload(true);
									setOpen(!open);
								}}
								filename="SMS report"
								className={css.dateSave}
							>
								Татах
							</CSVLink>

							<div className={css.dateItem}>
								<span>Эхлэх огноо</span>
								<input
									type="date"
									defaultValue={dateStart}
									onChange={e => setDateStart(e.target.value)}
								/>
							</div>
							<div className={css.dateItem}>
								<span>Дуусах огноо</span>
								<input
									type="date"
									defaultValue={dateEnd}
									onChange={e => setDateEnd(e.target.value)}
								/>
							</div>
						</div>
					)}
					{tabs.find(tab => tab.id === activeTab).content}
				</div>
				{smsctx.create ? <Create /> : null}
				{/* <div id="foobar"></div> */}
			</div>
		</div>
	);
}, areEqual);

export default Index;
