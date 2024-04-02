import React, { useState, useEffect } from "react";

const Ctx = React.createContext();

export const ProductHook = (props) => {
	const [settingView, setSettingView] = useState(false);
	const [brandFix, setBrandFix] = useState(false);
	const [brandNew, setBrandNew] = useState(false);
	const [brandID, setBrandID] = useState("");
	const [brandSlug, setBrandSlug] = useState("");
	const [brandRender, setBrandRender] = useState(false);
	const [supp, setSupp] = useState();
	const [active, setActive] = useState(null);
	const [priceTerm, setPriceTerm] = useState(false);
	const [selected, setSelected] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState([]);
	const [shopPrice, setShopPrice] = useState(false);
	const [newdata, setNewdata] = useState([]);
	const [createProd, setCreateProd] = useState(false);
	const [brandMassImport, setBrandMassImport] = useState(false);

	// Shuurhai hooks

	return (
		<Ctx.Provider
			value={{
				settingView,
				setSettingView,
				brandRender,
				setBrandRender,
				brandFix,
				setBrandFix,
				brandNew,
				setBrandNew,
				brandID,
				setBrandID,
				brandSlug,
				setBrandSlug,
				active,
				setActive,
				priceTerm,
				setPriceTerm,
				selected,
				setSelected,
				selectedProduct,
				setSelectedProduct,
				shopPrice,
				setShopPrice,
				newdata,
				setNewdata,
				createProd,
				setCreateProd,
				supp,
				setSupp,
				brandMassImport,
				setBrandMassImport,
			}}
		>
			{props.children}
		</Ctx.Provider>
	);
};

export default Ctx;
