import React, { useState, useEffect } from "react";
import css from "./notifList.module.css";
import Notification from "./Notification";
import InfiniteScroll from "react-infinite-scroll-component";

const NotificationList = () => {
	const [notif, setNotif] = useState([]);

	const [createdDate, setCreatedDate] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [userName, setUserName] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [sender, setSender] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(150);

	const [showMore, setShowMore] = useState(true);

	const moreStatus = () => {
		if (
			createdDate !== "" ||
			phoneNumber !== "" ||
			userName !== "" ||
			title !== "" ||
			body !== "" ||
			sender !== ""
		) {
			setShowMore(false);
			setPage(1);
		}
		if (
			createdDate === "" &&
			phoneNumber === "" &&
			userName === "" &&
			title === "" &&
			body === "" &&
			sender === ""
		) {
			setShowMore(true);
		}
	};

	let getNotif = () => {
		moreStatus();
		setNotif([]);

		const myHeaders = new Headers();
		myHeaders.append(
			"ebazaar_token",
			localStorage.getItem("ebazaar_admin_token")
		);
		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		let testURL = `https://api2.ebazaar.mn/api/notification/get?createdDate=${createdDate}&phoneNumber=${phoneNumber}&firstName=${userName}&title=${title}&body=${body}&backOfficeUser=${sender}&page=${page}&limit=${limit}`;

		fetch(testURL, requestOptions)
			.then(response => response.json())
			.then(res => {
				console.log("RES: ", res.data);
				setNotif(rest => [...rest, ...res.data]);
			})
			.catch(err => console.log("ERROR: ", err));
	};

	useEffect(() => {
		getNotif();

		console.log("EFFECT MORE", showMore);
	}, [createdDate, phoneNumber, userName, title, body, sender, page, showMore]);

	return (
		<div className={css.container}>
			<div className={css.headerContainer}>
				<div className={css.headerFilter}>
					<div className={`${css.headerItem} ${css.width100px}`}>
						<span>Огноо</span>
						<input
							type="date"
							placeholder="Хайх"
							onChange={e => setCreatedDate(e.target.value)}
						/>
					</div>
					<div className={`${css.headerItem} ${css.width150px}`}>
						<span>Утасны дугаар</span>
						<input
							type="text"
							placeholder="Хайх"
							onChange={e => {
								if (e.target.value === "") {
									setPhoneNumber("");
								}
							}}
							onKeyDown={e => {
								if (e.key === "Enter") {
									setPhoneNumber(e.target.value);
								}
							}}
						/>
					</div>
					<div className={`${css.headerItem} ${css.width150px}`}>
						<span>Хэрэглэгчийн нэр</span>
						<input
							type="text"
							placeholder="Хайх"
							onChange={e => {
								if (e.target.value === "") {
									setUserName(e.target.value);
								}
							}}
							onKeyDown={e => {
								if (e.key === "Enter") {
									setUserName(e.target.value);
								}
							}}
						/>
					</div>
					<div className={`${css.headerItem} ${css.width150px}`}>
						<span>Гарчиг</span>
						<input
							type="text"
							placeholder="Хайх"
							onChange={e => {
								if (e.target.value === "") {
									setTitle(e.target.value);
								}
							}}
							onKeyDown={e => {
								if (e.key === "Enter") {
									setTitle(e.target.value);
								}
							}}
						/>
					</div>
					<div className={`${css.headerItem} ${css.width400px}`}>
						<span>Утга</span>
						<input
							type="text"
							placeholder="Хайх"
							onChange={e => {
								if (e.target.value === "") {
									setBody(e.target.value);
								}
							}}
							onKeyDown={e => {
								if (e.key === "Enter") {
									setBody(e.target.value);
								}
							}}
						/>
					</div>
					<div className={`${css.headerItem} ${css.width150px}`}>
						<span>Илгээгч</span>
						<input
							type="text"
							placeholder="Хайх"
							onChange={e => {
								if (e.target.value === "") {
									setSender(e.target.value);
								}
							}}
							onKeyDown={e => {
								if (e.key === "Enter") {
									setSender(e.target.value);
								}
							}}
						/>
					</div>
				</div>
				<div className={css.pageSetup}>
					<div className={css.page}>
						<span>Хуудас</span>
						<div>{page}</div>
					</div>
				</div>
			</div>
			<div className={css.list} id="scrollContainer">
				<InfiniteScroll
					style={{ overflow: "hidden" }}
					scrollableTarget="scrollContainer"
					dataLength={notif.length}
					hasMore={showMore}
					next={() => {
						if (
							createdDate !== "" ||
							phoneNumber !== "" ||
							userName !== "" ||
							title !== "" ||
							body !== "" ||
							sender !== ""
						) {
							setPage(1);
						}
						if (
							createdDate === "" ||
							phoneNumber === "" ||
							userName === "" ||
							title === "" ||
							body === "" ||
							sender === ""
						) {
							setPage(prev => prev + 1);
						}
					}}
					loader={
						<p style={{ textAlign: "center" }}>
							<b>Уншиж байна...</b>
						</p>
					}
					endMessage={
						<p style={{ textAlign: "center" }}>
							<b>Бүх мэдээлэл</b>
						</p>
					}
				>
					{notif.map((notif, idx) => (
						<Notification notif={notif} key={idx} />
					))}
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default NotificationList;
