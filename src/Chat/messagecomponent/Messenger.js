import React, { useState, useContext } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import css from "./messenger.module.css";
import homeicon from "../../assets/Frame 153491.svg";
import sendIcon from "../../assets/send.svg";
import closeIcon from "../../assets/close.svg";
import ChatHook from "../../Hooks/ChatHook";
import { useEffect } from "react";
const Messenger = props => {
	const [sms, setSms] = useState(null);
	const [supplierSms, setSupplierSms] = useState(null);
	const [supSMS, setSupSMS] = useState(null);
	const chatctx = useContext(ChatHook);
	const Fetchdata = () => {
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
		// let url = `https://api.ebazaar.link/api/chats/read`;
		let url = `https://api2.ebazaar.mn/api/chats?tradeshop_id=T${props.tx.tradeshop_id}&supplier_id=S13873`;

		fetch(url, requestOptions)
			.then(r => r.json())
			.then(res => {
				// console.log("messenger response", res);
				setSupplierSms(res.data);
			})
			.catch(error => {
				console.log("error messenger history get", error);
			});
	};
	// console.log("tradeshopid", props.tx.tradeshop_id);
	useEffect(() => {
		try {
			Fetchdata();
		} catch (error) {
			console.log("error", error);
		}
	}, [props.tx]);

	var client = new W3CWebSocket(
		`ws://ec2-18-167-0-126.ap-east-1.compute.amazonaws.com:4010/T${props.tx.tradeshop_id}`,

		null,
		{
			headers: {
				authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaW9zdHJlYW1lciJ9.oNx-4e9hldyATpdPZghd_sjX8DhTkQFVDBxIhKh4MC4",
			},
		}
	);

	client.onerror = function () {
		console.log("Connection Error");
	};

	client.onopen = function () {
		console.log("WebSocket Client Connected");
	};
	function sendNumber() {
		if (client.readyState === client.OPEN) {
			var number = Math.round(Math.random() * 0xffffff);
			client.send(number.toString());
			setTimeout(sendNumber, 1000);
		}
	}

	client.onclose = function () {
		console.log("echo-protocol Client Closed");
	};

	client.onclose();

	client.onmessage = function (e) {
		if (typeof e.data === "string") {
			// console.log("Received message: '" + e.data + "'");
			setSupSMS(e.data);
		}
	};
	const senMessageFunc = () => {
		if (!client) {
			sendNumber("No WebSocket connection :(");

			return;
		}
		client.send(JSON.stringify([`S13873`, sms])); //My
		let aa = client.send(JSON.stringify([`S13873`, sms]));
		// console.log("aa", aa);
		setSms("");
		// sendNumber(sms);
		// const raw = {
		//   tradeshop_id: `T${props.tx.tradeshop_id}`,
		//   supplier_id: "S13873",
		//   message: sms,
		// };
		// var myHeaders = new Headers();
		// myHeaders.append(
		//   "ebazaar_token",
		//   localStorage.getItem("ebazaar_admin_token")
		// );
		// myHeaders.append("Content-Type", "application/json");
		// var requestOptions = {
		//   method: "POST",
		//   headers: myHeaders,
		//   redirect: "follow",
		//   body: JSON.stringify(raw),
		// };
		// // let url = `https://api.ebazaar.link/api/chats/read`;
		// let url = `https://api2.ebazaar.mn/api/chats/read`;

		// fetch(url, requestOptions)
		//   .then((r) => r.json())
		//   .then((res) => {
		//     console.log("messenger response", res);
		//     setSupplierSms(res.data);
		//   })
		//   .catch((error) => {
		//     console.log("error messenger history get", error);
		//   });
	};
	// console.log("supplierSms", supplierSms);
	// console.log("supsms", supSMS);
	// let aa = supSMS.split(",");
	// let date = aa[2].split(" ")[0];
	// let time = aa[2].split(" ")[1];

	return (
		<div className={css.container}>
			<div className={css.wrapperFirst}>
				<div className={css.iconwrapper}>
					<img src={homeicon} alt="home iocn" />
				</div>
				<div className={css.headercontainer}>
					<div className={css.header}>{props.tx.tradeshop_name}</div>
					<div className={css.address}>{props.tx.address}</div>
					<div className={css.footer}>
						<div className={css.subfooter}>
							<span className={css.b}>Утас:</span>
							<span className={css.a}>&nbsp;{props.tx.user_phone_number}</span>
						</div>
						<div className={css.subfooter}>
							<span className={css.b}>Регистер:</span>
							<span className={css.a}>&nbsp;{props.tx.business_register}</span>
						</div>
					</div>
				</div>
				<img
					src={closeIcon}
					alt="close icon"
					onClick={() => chatctx.setMessengeropen(false)}
					className={css.closeBtn}
				/>
			</div>
			<div className={css.middlecontainer}>
				<div className={css.wrapper}>
					<div className={css.gray}>
						{/* <div className={css.one}> {aa[1]}</div> */}
						<div className={css.datecontainer}>
							{" "}
							{/* <span style={{ marginRight: "10px" }}>{date}</span>{" "} */}
							{/* <span>{time}</span> */}
						</div>
					</div>
					<div className={css.empty}></div>
				</div>

				<div className={css.wrapper}>
					<div className={css.empty}></div>
					<div className={css.orange}>
						<div className={css.sms}>{}</div>
						<div className={css.datecontainerOne}>
							{" "}
							<span style={{ marginRight: "10px" }}>2022.10.21</span>{" "}
							<span>22:00</span>
						</div>
					</div>
				</div>
			</div>
			<div className={css.message}>
				<input
					placeholder="Техт бичих ..."
					value={sms}
					onChange={e => setSms(e.target.value)}
				/>
				<img src={sendIcon} alt="send icon" onClick={senMessageFunc} />
			</div>
		</div>
	);
};

export default Messenger;
