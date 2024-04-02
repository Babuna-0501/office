import React, { useContext } from "react";
import css from "./message.module.css";
import homeicon from "../../assets/Frame 153491.svg";
import ChatHook from "../../Hooks/ChatHook";
import Messenger from "../messagecomponent/Messenger";

const Message = props => {
	const chatctx = useContext(ChatHook);

	const Handler = data => {
		props.showMessengerHandler(data);
		chatctx.setMessengeropen(true);
	};

	return (
		<div className={css.smscontainer}>
			<div className={css.wrapper} onClick={() => Handler(props.tx)}>
				<div className={css.iconwrapper}>
					<img src={homeicon} alt="home iocn" />
				</div>
				<div className={css.headercontainer}>
					<div className={css.header}>{props.tx.tradeshop_name}</div>
					<div className={css.address}>{props.tx.address}</div>
					<div className={css.footer}>
						<div className={css.subfooter}>
							<span className={css.b}>Утас : </span>
							<span className={css.a}>&nbsp;{props.tx.user_phone_number}</span>
						</div>
						<div className={css.subfooter}>
							<span className={css.b}>Регистер : </span>
							<span className={css.a}>&nbsp;{props.tx.business_register}</span>
						</div>
					</div>
				</div>
			</div>
			<div className={css.lines}></div>
			<div className={css.msmscontainer}>
				<p>
					{" "}
					Таны захиалга 09.22 гарсан шүүбө өбйбөйөй өөбййбөйб йбөйөйөйөб
					бөйөй....
				</p>
				<div className={css.msswrapper}>
					<div className={css.smsinfocontainer}>
						<span className={css.smsinfo}>2</span>
					</div>
					<span className={css.smshour}>11:11</span>
				</div>
			</div>
			{/* {chatctx.messengeropen && <Messenger tx={props.tx} />} */}
		</div>
	);
};

export default Message;
