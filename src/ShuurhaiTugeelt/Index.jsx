import React, { useEffect, useContext, useState } from "react";
import css from "./index.module.css";
import Products from "./Products";
import Suppliers from "./Suppliers";
import PickPack from "./PickPack";
import Warehouse from "./Warehouse";
import Order from "./components/Order/Index";
import ShuurkhaiHook from "../Hooks/ShuurkhaiHook";
import ProductOrder from "./components/ProductOrder/Index";
import { Button, Modal } from "../components/common";
import okIcon from "../assets/shipment/ok.svg";

const Index = props => {
	// console.log(props);
	const shuurkhaiCtx = useContext(ShuurkhaiHook);

	const tabs = [
		{
			id: 1,
			header: "Бүтээгдэхүүн",
			content: <Products />,
		},
		{
			id: 2,
			header: "Нийлүүлэгчид",
			content: <Suppliers props={props} />,
		},
		{
			id: 3,
			header: "PickPack",
			content: <PickPack />,
		},
		{
			id: 4,
			header: "Агуулах",
			content: <Warehouse props={props} />,
		},
	];
	const [activeTab, setActiveTab] = useState(tabs[0].id);
	return (
		<>
			<div className={css.container}>
				<div className={css.header}>
					<div className={css.headerTabs}>
						{tabs.map((tab, idx) => {
							return (
								<button
									key={idx}
									type="button"
									onClick={() => {
										setActiveTab(tab.id);
										shuurkhaiCtx.setTabId(tab.id);
									}}
									className={`${css.singleTabHeader} ${
										activeTab === tab.id && css.active
									}`}
								>
									{tab.header}
								</button>
							);
						})}
					</div>
				</div>
				<div className={css.contentWrapper}>
					{tabs.find(tab => tab.id === activeTab).content}
				</div>
			</div>
			{shuurkhaiCtx.orderSide && <Order />}
			{shuurkhaiCtx.prdctOrder && <ProductOrder />}
			{shuurkhaiCtx.orderComplete && (
				<Modal width={300} height={300}>
					<div
						style={{
							width: "100%",
							height: "100%",
							padding: "39px 26px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div style={{ width: 78, height: 78, marginBottom: 12 }}>
							<img
								style={{
									width: "100%",
									height: "100%",
									objectFit: "contain",
									aspectRatio: "1/1",
								}}
								src={okIcon}
								alt="Ok"
							/>
						</div>
						<span
							style={{
								color: "#1A1A1A",
								fontSize: 22,
								lineHeight: "26px",
								fontWeight: 700,
								marginBottom: 30,
								textAlign: "center",
							}}
						>
							Ачилтын захиалга илгээгдлээ
						</span>
						<Button
							size="medium"
							variant="primary"
							width="100%"
							onClick={() => {
								shuurkhaiCtx.setOrderComplete(false);
							}}
						>
							OK
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default Index;
