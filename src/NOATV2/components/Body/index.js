import React from "react";
import classes from "./main.module.css";

import SideBar from "../SideBar";
import Table from "../Table";

const Main = () => {
	return (
		<div className={classes.container}>
			<Table />

			<SideBar />
		</div>
	);
};

export default Main;
