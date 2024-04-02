import React, { useEffect, useState, useContext } from "react";
import css from "./productlist.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import myHeaders from "../../../components/MyHeader/myHeader";
import Product from "./Product";
import LoadingSpinner from "../../../components/Spinner/Spinner";
import ShuurkhaiHook from "../../../Hooks/ShuurkhaiHook";

const ProductList = props => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);

	const [catName, setCatName] = useState();

	const sortedProducts = shuurkhaiCtx.products.sort(
		(a, b) => a.stock - b.stock
	);

	return (
		<>
			<div className={css.container} id="scrollableDiv">
				<InfiniteScroll
					dataLength={sortedProducts.length}
					next={() => shuurkhaiCtx.setPage(prev => prev + 1)}
					hasMore={true}
					scrollableTarget="scrollableDiv"
					loader={
						<div className={css.loading}>
							<LoadingSpinner />
							<span>Уншиж байна...</span>
						</div>
					}
					endMessage={<p style={{ textAlign: "center" }}>Бүх мэдээлэл</p>}
				>
					{sortedProducts.map((product, idx) => {
						return <Product data={product} key={idx} />;
					})}
				</InfiniteScroll>
			</div>
			<div className={css.footer}>
				<span>Хуудас: {shuurkhaiCtx.page}</span>
			</div>
		</>
	);
};

export default ProductList;
