import React from "react";
import css from "./pickpackorder.module.css";
import { Button } from "../../components/common";
import { useContext } from "react";
import ShuurkhaiHook from "../../Hooks/ShuurkhaiHook";

const PickPackOrder = () => {
	const shuurkhaCtx = useContext(ShuurkhaiHook);
	return (
		<div>
			<Button
				variant="primary"
				size="medium"
				onClick={() => shuurkhaCtx.setPPOrder(true)}
			>
				Захиалга үүсгэх
			</Button>
		</div>
	);
};

export default PickPackOrder;
