import React, { useContext, useState } from "react";
import Ctx from "../../hooks/context";
import classes from "./style.module.css";
import InsideModal from "./insideModal";
import cancel from "../../../assets/cancel.svg"
const Modal = () => {
	const { isModal, setIsModal } = useContext(Ctx);
	// const SaveHandler = () => {
		// let aa = filteredBarimts;
		// setFilteredBarimts(filteredBarimts=>[ ...filteredBarimts ,{
		//     "_id": "647ef5034427ffca4cf4fb7146",
		//     "orderId": 28269352,
		//     "register": "6388094",
		//     "body": {
		//       "amount": "118800.00",
		//       "vat": "10722.36",
		//       "cashAmount": "999009.00",
		//       "nonCashAmount": "0.00",
		//       "billIdSuffix": "",
		//       "billType": "3",
		//       "stocks": [
		//         {
		//           "code": "556178",
		//           "name": productname,
		//           "measureUnit": "ш",
		//           "qty": "5.00",
		//           "unitPrice": "2600.00",
		//           "totalAmount": "13000.00",
		//           "vat": "1181.82",
		//           "barCode": "6920238081050",
		//           "cityTax": "0.00"
		//         }
		//       ],
		//       "customerNo": "ЧН73120200",
		//       "cityTax": "854.05",
		//       "bankTransactions": null,
		//       "districtCode": "24",
		//       "posNo": "1000",
		//       "taxType": "1",
		//       "registerNo": "6388094",
		//       "reportMonth": "2023-05"
		// }])
		// let rawdata ={
		//     "_id": "647ef5034427ffca4cf4fb7146",
		//     "orderId": 28269352,
		//     "register": "6388094",
		//     "body": {
		//       "amount": "118800.00",
		//       "vat": "10722.36",
		//       "cashAmount": "999009.00",
		//       "nonCashAmount": "0.00",
		//       "billIdSuffix": "",
		//       "billType": "3",
		//       "stocks": [
		//         {
		//           "code": "556178",
		//           "name": productname,
		//           "measureUnit": "ш",
		//           "qty": "5.00",
		//           "unitPrice": "2600.00",
		//           "totalAmount": "13000.00",
		//           "vat": "1181.82",
		//           "barCode": "6920238081050",
		//           "cityTax": "0.00"
		//         }
		//       ],
		//       "customerNo": "ЧН73120200",
		//       "cityTax": "854.05",
		//       "bankTransactions": null,
		//       "districtCode": "24",
		//       "posNo": "1000",
		//       "taxType": "1",
		//       "registerNo": "6388094",
		//       "reportMonth": "2023-05"
		//     }
		//     let url = "www.example.com";
		//     fetch(url, {
		//         method:"POST",
		//         headers:"token",
		//         body:JSON.stringify(rawdata),
		//     }).then(res=>res.json()).catch(error=>{
		//         console.log("error",console.error();)
		//     })
	// };
	return (
		<div
			style={{
				display: isModal ? "flex" : "none",
				justifyContent: "center",
				alignItems: "center",
				position: "sticky",
				top: "0px",
				zIndex: "999",
				backgroundColor: "rgba(0, 0, 0, 0.208)",
				width: "100%",
				height: " 100vh",
			}}
		>
			<div className={classes.modalContainer}>
				<button className={classes.ModalX} onClick={() => setIsModal(false)}>
					<img src={cancel} alt="Cancel Icon" />
				</button>
				<InsideModal />
				<button className={classes.Donebutton} onClick={() => setIsModal(false)}>
					Done
				</button>
			</div>
		</div>
	);
};

export default Modal;
