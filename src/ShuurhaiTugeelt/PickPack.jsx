import React, { useContext } from "react";
import css from "./pickpack.module.css";
import { List } from "../Pickpack/List";
import Request from "../Pickpack/Request";
import { Modal } from "../components/common";
import ShuurkhaiHook from "../Hooks/ShuurkhaiHook";

const PickPack = () => {
	const shuurkhaCtx = useContext(ShuurkhaiHook);
	return (
		<div className={css.container}>
			<List />
			{shuurkhaCtx.PPOrder ? (
				<Modal width={1200} height={800}>
					<div className={css.modalContainer}>
						<button
							className={css.closeBtn}
							onClick={() => shuurkhaCtx.setPPOrder(false)}
						>
							Хаах
						</button>
						<div className={css.reqContainer}>
							<Request />
						</div>
					</div>
				</Modal>
			) : null}
		</div>
	);
};

export default PickPack;
