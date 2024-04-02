import React, { useContext } from "react";
import css from "./background.module.css";
import ShuurkhaiHook from "../../../Hooks/ShuurkhaiHook";

const Background = props => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);
	return (
		<div className={`${css.container} ${props.className}`}>
			{props.children}
		</div>
	);
};

export default Background;
