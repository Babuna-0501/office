import React from "react";
import css from "./notifList.module.css";

const Notification = props => {
	const notif = props.notif;
	return (
		<div className={css.row}>
			<div className={`${css.width100px} ${css.dateStyle}`}>
				{notif.CreatedDate.substr(0, 10)} <br />
				{notif.CreatedDate.substr(11, 5)}
			</div>
			<div className={`${css.width150px}`}>{notif.PhoneNumber}</div>
			<div className={`${css.width150px}`}>{notif.FirstName}</div>
			<textarea
				disabled
				className={`${css.width150px} ${css.textarea}`}
				value={notif.Title}
			></textarea>
			<textarea
				disabled
				className={`${css.width400px} ${css.textarea}`}
				value={notif.Body}
			/>
			<div className={`${css.width150px}`}>{notif.backOfficeUser}</div>
		</div>
	);
};

export default Notification;
