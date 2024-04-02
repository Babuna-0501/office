import { useContext } from "react";
import css from "./headerContent.module.css";
import SupplierHook from "../Hooks/SupplierHook";
import SfaFilter from "./components/SfaFilter";

export const HeaderContent = () => {
	const suppCtx = useContext(SupplierHook);
	return (
		<div className={css.container}>
			<div className={css.leftSide}>
				<h1 className={css.title}>Нийлүүлэгч</h1>
				<SfaFilter />
			</div>
		</div>
	);
};
