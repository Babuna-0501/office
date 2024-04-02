import React, { useState } from "react";

const Ctx = React.createContext();

export const SupplierHook = (props) => {
  const [dataopen, setDataopen] = useState(false);
  const [sfaFilter, setSfaFilter] = useState("all");
	console.log("SFA FILTER:  ", sfaFilter);

	return (
		<Ctx.Provider
			value={{
				dataopen,
				setDataopen,
				sfaFilter,
				setSfaFilter,
			}}
		>
			{props.children}
		</Ctx.Provider>
	);
};

export default Ctx;
