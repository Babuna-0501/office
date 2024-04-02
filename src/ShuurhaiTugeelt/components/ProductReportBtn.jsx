import React, { useContext } from "react";
import { Button } from "../../components/common";
import settingIcon from "../../assets/Setting_darkgray.svg";
import paperIcon from "../../assets/Paper.svg";
import priceSetting from "../../assets/Price Setting 2.png";
import upload from "../../assets/Upload_white.svg";
import download from "../../assets/Download.svg";
import filter from "../../assets/Filter.svg";
import ShuurkhaiHook from "../../Hooks/ShuurkhaiHook";

const ProductReportBtn = () => {
	const shuurkhaiCtx = useContext(ShuurkhaiHook);


	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				boxSizing: "border-box",
				gap: 10,
			}}
		>
			<div>
				<Button
					variant="primary"
					size="medium"
					onClick={() => {
						shuurkhaiCtx.setOrderSide(true);
					}}
				>
					Захиалга
				</Button>
			</div>
			<div>
				<Button variant="primary" size="medium">
					Тооцоолол
				</Button>
			</div>
			{/* <div>
				<Button variant="primary" size="medium">
					<img src={upload} alt="" style={{ marginRight: "10px" }} />
					Масс шинэчлэх
				</Button>
			</div>
			<div>
				<Button variant="primary" size="medium">
					<img src={upload} alt="" style={{ marginRight: "10px" }} />
					Масс импорт
				</Button>
			</div>

			<div>
				<Button variant="secondary" size="medium">
					<img src={priceSetting} alt="price" style={{ marginRight: "10px" }} />
					Үнийн тохиргоо
				</Button>
			</div>
			<div>
				<Button variant="secondary" size="medium">
					<img src={paperIcon} alt="paper" style={{ marginRight: "10px" }} />
					Export
				</Button>
			</div>
			<div>
				<Button variant="secondary" size="medium">
					<img src={filter} alt="" style={{ marginRight: "10px" }} />
					Эрэмблэх
				</Button>
			</div>
			<div>
				<Button
					variant="secondary"
					size="medium"
					onClick={() => shuurkhaiCtx.setProdSetting(!shuurkhaiCtx.prodSetting)}
				>
					<img
						src={settingIcon}
						alt="setting"
						style={{ marginRight: "10px" }}
					/>
					Тохиргоо
				</Button>
			</div> */}
		</div>
	);
};

export default ProductReportBtn;
