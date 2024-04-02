import React, { useContext } from "react";
import css from "./supplierlist.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import ShuurkhaiHook from "../../../Hooks/ShuurkhaiHook";
import { LoadingSpinner, Modal } from "../../../components/common";
import Supplier from "./Supplier";

const SupplierList = ({ setIndex }) => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);
	console.log("INDEXS", shuurkhaiCtx.suppId);

	return (
		<>
			<div className={css.container} id="scrollableDiv">
				<InfiniteScroll
					dataLength={shuurkhaiCtx?.vendors.length}
					hasMore={false}
					scrollableTarget="scrollableDiv"
					loader={
						<div>
							<LoadingSpinner />
						</div>
					}
					endMessage={<p style={{ textAlign: "center" }}>Бүх мэдээлэл</p>}
				>
					{shuurkhaiCtx.vendors?.map((item, idx) => {
						return <Supplier data={item} key={idx} setIndex={setIndex} />;
					})}
				</InfiniteScroll>
			</div>
		</>
	);
};

export default SupplierList;
