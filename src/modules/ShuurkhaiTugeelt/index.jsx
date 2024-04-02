import React, { useContext, useEffect } from "react";
import { HeaderContext } from "../../Hooks/HeaderHook";
import HeaderContent from "../../ShuurhaiTugeelt/HeaderContent";

const ShuurkhaiTugeelt = ({ children, userData }) => {
	const { setHeaderContent } = useContext(HeaderContext);

	useEffect(() => {
		setHeaderContent(<HeaderContent userData={userData} />);
		return () => {
			setHeaderContent(<></>);
		};
	}, []);

	return <div>{children}</div>;
};

export default ShuurkhaiTugeelt;
