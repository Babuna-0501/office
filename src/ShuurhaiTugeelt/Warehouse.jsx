import React from 'react'
import Warehouse2 from "../Warehouse/Warehouse2";
import { useContext } from "react";
import AppHook from "../Hooks/AppHook";

const Warehouse = ({ props }) => {
	console.log("PROOOOOPS", props);

	const appctx = useContext(AppHook);

	return (
		<div>
			<Warehouse2
				categories={props.categories}
				userData={props.userData}
				setSubPage={appctx.setSubPage}
				setSelectedWareHouse={appctx.setSelectedWareHouse}
				subPage={appctx.subPage}
			/>
		</div>
	);
};

export default Warehouse