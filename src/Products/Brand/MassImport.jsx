import React, { useContext } from "react";
import css from "./massimport.module.css";
import { Button } from "../../components/common";
import myHeaders from "../../components/MyHeader/myHeader";
import { ProductHook } from "../../Hooks/ProductHook";

const MassImport = props => {
	const prdctx = useContext(ProductHook);
	const save = () => {
		props.data.rows.map((item, idx) => {
			let rawNew = {
				name: item.name,
				slug: item.slug,
				active: item.active,
				// image: [
				// 	"https://ebazaar.mn/media/product/27d2e8954f9d8cbf9d23f500ae466f1e24e823c7171f95a87da2f28ffd0e.jpg",
				// ],
			};
			const requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify(rawNew),
				redirect: "follow",
			};
			console.log("TEST", requestOptions);

			const url = "https://api2.ebazaar.mn/brand";

			fetch(url, requestOptions)
				.then(response => response.json())
				.then(res => {
					console.log("BRAND IMPORT RESULT:  ", res);
					props?.setData();
					prdctx?.setBrandMassImport(false);
				})
				.catch(error => {
					console.log("error", error);
					props?.setData({ rows: [], error: [] });
					prdctx?.setBrandMassImport(false);
				});
		});
		setTimeout(() => {
			alert("Брэндүүдийг амжилттай бүртгэлээ");
			prdctx?.setBrandMassImport(false);
			props?.setData({ rows: [], error: [] });
		}, 3000);
	};
	return (
		<div className={css.container} style={{ width: "100%" }}>
			<div className={css.headerContainer}>
				<div
					style={{ fontSize: "14px", fontWeight: "700" }}
					className={css.number}
				>
					№
				</div>
				<div
					style={{ fontSize: "14px", fontWeight: "700" }}
					className={css.name}
				>
					Name
				</div>
				<div
					style={{ fontSize: "14px", fontWeight: "700" }}
					className={css.slug}
				>
					Slug
				</div>
				<div
					style={{ fontSize: "14px", fontWeight: "700" }}
					className={css.active}
				>
					Active
				</div>
			</div>
			<div
				className={css.listContainer}
				style={{ display: "flex", flexDirection: "column" }}
			>
				{props?.data?.rows?.map((item, idx) => {
					return (
						<div
							className={css.list}
							key={idx}
							style={{
								width: "100%",
								display: "flex",
								alignItems: "center",
							}}
						>
							<div style={{ fontSize: "12px" }} className={css.number}>
								{idx + 1}
							</div>
							<div style={{ fontSize: "12px" }} className={css.name}>
								{item.name}
							</div>
							<div style={{ fontSize: "12px" }} className={css.slug}>
								{item.slug}
							</div>
							<div style={{ fontSize: "12px" }} className={css.active}>
								{item.active}
							</div>
						</div>
					);
				})}
			</div>
			<div className={css.saveBtn}>
				<Button size={"medium"} onClick={() => save()}>
					Хадгалах
				</Button>
			</div>
		</div>
	);
};

export default MassImport;
