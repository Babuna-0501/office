import React, { useContext, useState, useEffect } from "react";
import { CSVLink } from "react-csv";

import css from "./smsindex.module.css";

import SMSHook from "../../Hooks/SMSHook";
import { Button } from "../common";

const Smsindex = () => {
	const smsctx = useContext(SMSHook);

	const Handler = () => {
		smsctx.setCreate(true);
	};

	return (
		<div className={css.container}>
			<Button onClick={Handler} variant="primary" size="medium" width={156}>
				СМС
			</Button>
		</div>
	);
};

export default Smsindex;
