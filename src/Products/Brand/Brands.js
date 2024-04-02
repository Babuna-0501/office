import React, { useContext, useState, useEffect } from "react";
import readXlsxFile from "read-excel-file";
import css from "./brands.module.css";
import { Input } from "antd";
import Brand from "./Brand";
import myHeaders from "../../components/MyHeader/myHeader";
import ProductHook from "../../Hooks/ProductHook";
import { Button } from "../../components/common";
import upload from "../../assets/Upload_white.svg";
import plus from "../../assets/plus_narrow_white.svg";
import MassImport from "./MassImport";

const { Search } = Input;
const Brands = () => {
	const prdctx = useContext(ProductHook);

	const [brands, setBrands] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [edited, setEdited] = useState(false);
	const [brandChange, setBrandChange] = useState(false);
	const [data, setData] = useState({ rows: [], error: [] });


	const readExcel = () => {
		const id = (
			Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
		).toUpperCase();
		document
			.getElementById("root")
			.insertAdjacentHTML(
				"beforeEnd",
				'<form method="post" enctype="multipart/form‐data" id="' +
					id +
					'" name=' +
					id +
					'><input type="file" id="read" /></form>'
			);

		document.getElementById("read").click();
		document.getElementById("read").addEventListener(
			"change",
			() => {
				const schema = {
					name: {
						prop: "name",
						type: String,
					},
					slug: {
						prop: "slug",
						type: String,
					},
					active: {
						prop: "active",
						type: Number,
					},
				};
				readXlsxFile(document.getElementById("read").files[0], { schema }).then(
					rows => {
						setData(rows);
					}
				);
			},
			false
		);
	};

	const onSearch = value => {
		setSearchValue(value);
	};

	const fetchBrand = () => {
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(
			// `https://api2.ebazaar.mn/api/brands?search=${searchValue}`,
			`https://api2.ebazaar.mn/brand?search=${searchValue}`,
			requestOptions
		)
			.then(r => r.json())
			.then(res => {
				console.log("BRANDS", res.data);
				setBrands(res.data);
			})
			.catch(error => {
				console.log("error brands", error);
			});

		// fetch(`https://api2.ebazaar.mn/api/backoffice/suppliers`, requestOptions)
		// 	.then(r => r.json())
		// 	.then(res => {
		// 		const suppData = res.data.map(e => {
		// 			return { name: e.name, id: e.id };
		// 		});
		// 		console.log("SUPP", suppData);
		// 		setSuppliers(suppData);
		// 		prdctx.setSupp(suppData);
		// 	});
	};

	useEffect(() => {
		if (prdctx.brandMassImport === true) {
			readExcel();
		}
	}, [prdctx.brandMassImport]);

	useEffect(() => {
		try {
			fetchBrand();
		} catch (error) {
			console.log("error brand", error);
		}
	}, [searchValue, prdctx.brandRender, prdctx.brandMassImport === false]);
	return (
		<div className={css.container}>
			<div className={css.wrapper}>
				<div className={css.wrapperOne}>
					<div>
						<Search
							placeholder="Брэнд хайх"
							onSearch={onSearch}
							style={{
								width: "326px",
								height: "42px",
							}}
						/>
					</div>
					<div style={{ display: "flex", gap: "10px" }}>
						<div className={css.second} style={{ cursor: "pointer" }}>
							<Button
								size="medium"
								icon
								onClick={() => prdctx.setBrandMassImport(true)}
							>
								<img src={upload} alt="" />
								Брэнд масс импорт
							</Button>
						</div>
						<Button
							size="medium"
							icon
							onClick={() => {
								prdctx.setBrandNew(true);
							}}
						>
							<img
								src={plus}
								alt="plus icon "
								// style={{ width: "32px", height: "32px", objectFit: "cover" }}
							/>
							Шинэ брэнд нэмэх
						</Button>
					</div>
				</div>
				{data?.rows?.length > 0 && prdctx.brandMassImport ? (
					<MassImport data={data} setData={setData} />
				) : (
					<div className={css.brandsContainer}>
						{brands?.map((item, index) => {
							return <Brand item={item} suppliers={suppliers} key={index} />;
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Brands;
