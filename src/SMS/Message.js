import React, { useState, useEffect, useContext } from "react";
import css from "./list.module.css";

function Message(props) {
	const message = props.message;
	return (
		<div className={css.row}>
			<div className={`${css.width100px} ${css.dateStyle}`}>
				{message.CreatedDate.substr(0, 10)} <br />
				{message.CreatedDate.substr(11, 5)}
			</div>
			<div className={`${css.width100px}`}>{message.Phone}</div>
			<div className={`${css.width200px}`}>{message.Sender}</div>
			<div className={`${css.width400px}`}>{message.Content}</div>
			<div className={`${css.width400px}`}>{message.sms_response}</div>
		</div>
	);
}

export default Message;
