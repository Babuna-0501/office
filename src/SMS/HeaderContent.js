import css from "./headerContent.module.css";
import SmsIndex from "../components/SMS/Smsindex";
import { useContext } from "react";
import { SMSHook } from "../Hooks/SMSHook";

export const HeaderContent = props => {
	const smsCTX = useContext(SMSHook);

	return (
		<div className={css.container}>
			<div className={css.leftSide}>
				<h1 className={css.title}>СМС</h1>
			</div>

			<div className={css.rightSide}>
				<button className={css.smsReport} onClick={() => props.setOpen(true)}>
					Тайлан татах
				</button>
				<SmsIndex />
			</div>
		</div>
	);
};
