import React, { useState, useEffect, useContext } from "react";
import HeaderMain from "./Headers";
import { ContextStore } from "./hooks/context";
import VatProduct from "./components/vatProduct";

const VatIndex = () => {
	return (
		<>
			<ContextStore>
				<HeaderMain />
				<VatProduct />
				
			</ContextStore>
		</>
	);
};

export default VatIndex;
