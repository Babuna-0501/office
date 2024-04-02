import React, { useEffect, useState, useContext } from "react";
import css from "./dashboard.module.css";
import order2x from "../assets/orders@2x.png";
import plusnarrowwhite from "../assets/plus_narrow_white.svg";
import myHeaders from "../components/MyHeader/myHeader";
import NewModal from "../components/Modal/NewModal";
import Btncontainer from "./component/Btncontainer";
import userHook from "../Hooks/userHook";
import ListComp from "./component/Li/ListComp";
import ListCompBrands from "./component/Li/ListCompBrands";

const Dashboard = () => {
	const [totalProduct, setTotalProduct] = useState(0);
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);

	const userctx = useContext(userHook);

	useEffect(() => {
		let cat = [];
		userctx.sitedata?.categories?.filter(item => {
			if (item.parent_id === 0) {
				cat.push(item);
			}
		});
		setBrands(userctx.sitedata.brands);

		setCategories(cat);
	}, [userctx]);
	// console.log("categories", categories);
	// useEffect(() => {
	//   let controller = new AbortController();
	//   fetch(`https://api2.ebazaar.mn/api/products/get1?page=0`, {
	// 		method: "GET",
	// 		headers: myHeaders,
	// 		signal: controller.signal,
	// 	})
	// 		.then(r => r.json())
	// 		.then(res => {
	// 			let aa = 0;
	// 			res.data?.map(item => {
	// 				aa = aa + 1;
	// 			});

	// 			setTotalProduct(aa);
	// 			controller = null;
	// 		})
	// 		.catch(error => {
	// 			console.log("dashboard aldaa garlaa", error);
	// 		});
	//   return () => controller?.abort();
	// }, []);

	return (
		<div className={css.container}>
			<div className={css.wrapper}>
				<div className={css.firstcontainer}>
					<NewModal className={css.hi}>
						<div className={css.imagecontainer}>
							<img src="https://admin.ebazaar.mn/logo.svg" alt="ebazaar logo" />
						</div>
						<div className={css.contentwrapper}>
							<span
								className={css.contentheader}
								style={{
									fontWeight: "700",
									color: "#37474F",
									fontSize: "24px",
								}}
							>
								Ebazaar-т тавтай
							</span>
							<span
								className={css.contentspan}
								style={{
									fontWeight: "700",
									color: "#37474F",
									fontSize: "24px",
								}}
							>
								морилно уу
							</span>
						</div>
					</NewModal>
					<NewModal className={css.hi}>
						<div className={css.imagecontainer}>
							<img src={order2x} alt="ebazaar logo" />
						</div>
						<div className={css.contentwrapper}>
							<span
								className={css.contentspan}
								style={{
									marginTop: "15px",
									color: "#37474F",
								}}
							>
								Нийт бүтээгдэхүүн
							</span>
							<span
								className={css.contentheader}
								style={{ marginTop: "-10px", fontWeight: "600" }}
							>
								{totalProduct?.toLocaleString()}ш
							</span>
						</div>
					</NewModal>
				</div>
				<div className={css.statcontainer}>
					<NewModal className={css.stat}>
						<div>
							<div
								style={{
									marginBottom: "22px",
								}}
							>
								<span className={css.header}>Ангилал</span>
							</div>
							<div style={{ width: "100%" }}>
								<ul>
									{categories?.slice(0, 6).map((item, index) => {
										return <ListComp name={item} key={index} />;
									})}
								</ul>
							</div>
						</div>
					</NewModal>
					<NewModal className={css.stat}>
						<div>
							<div
								style={{
									marginBottom: "22px",
								}}
							>
								<span className={css.header}>Брэнд</span>
							</div>
							<div style={{ width: "100%" }}>
								<ul>
									{brands?.slice(0, 6).map((item, index) => {
										return <ListCompBrands name={item} key={index} />;
									})}
								</ul>
							</div>
						</div>
					</NewModal>
				</div>
				<div className={css.btncontainer}>
					<Btncontainer
						className={css.redcontainer}
						onClick={() => {
							console.log("red clicked");
						}}
					>
						<span>Хямдрал, урамшуулал</span>
						<img src={plusnarrowwhite} alt="plus" />
					</Btncontainer>
					<Btncontainer
						className={css.greencontainer}
						onClick={() => {
							console.log("green clicked");
						}}
					>
						<span>Бүтээгдэхүүн тохиргоо</span>
						<img src={plusnarrowwhite} alt="plus" />
					</Btncontainer>
					<Btncontainer
						className={css.greycontainer}
						onClick={() => {
							console.log("gray clicked");
						}}
					>
						<span>Үнийн тохиргоо</span>
						<img src={plusnarrowwhite} alt="plus" />
					</Btncontainer>
				</div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Dashboard;
