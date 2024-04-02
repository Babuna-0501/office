import React, { useState, useContext } from "react";
import css from "./setting.module.css";
import { data } from "./data";
import Brands from "../Brand/Brands";
import ProductHook from "../../Hooks/ProductHook";
import BrandModified from "../Brand/BrandModified";
import Angilal from "../Angilal/Angilal";
import NewBrand from "../Brand/NewBrand";

const Setting = () => {
	const prdctx = useContext(ProductHook);
	const clickHandler = (item, index) => {
		prdctx.setActive(index);
	};

	return (
		<div className={css.container}>
			{data.map((item, index) => {
				return (
					<div
						className={css.wrapper}
						onClick={() => clickHandler(item, index)}
						key={index}
					>
						<div
							className={css.firstwrapper}
							style={{ background: item.id === 1 ? "#607D8B" : "#00ADD0" }}
						>
							<img src={item.icon} alt="setting icon" />
						</div>
						<div className={css.secondwrapper}>
							<img src={item.settingIcon} /> <span>{item.desc}</span>
						</div>
					</div>
				);
			})}
			{prdctx.active === 1 && <Brands />}
			{prdctx.brandFix && <BrandModified />}
			{prdctx.brandNew && <NewBrand />}
			{prdctx.active === 0 && <Angilal />}
		</div>
	);
};

export default Setting;
