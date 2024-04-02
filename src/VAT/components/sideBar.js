import css from "./sideBar.module.css";
import { useContext, useState } from "react";
import Ctx from "../hooks/context";
import { styles } from "../style";
import clearIcon from "../../assets/vectorclearIcon.svg";
import { ZonesHook } from "../../Hooks/ZonesHook";

const SideBar = props => {
	const {
		isSideBar,
		sideBarData,
		setIsSideBar,
		namesearch,
		setNamesearch,
		data,
		setData,
	} = useContext(Ctx);

	const [selectedZone, setSelectedZone] = useState([]);

	const handleCheckboxChange = (event, item) => {
		const { checked } = event.target;
		setSelectedZone(prevSelected => {
			if (checked) {
				return [...prevSelected, item];
			} else {
				return prevSelected.filter(selectedItem => selectedItem !== item);
			}
		});
	};

	const handleSearchChange = event => {
		const { value } = event.target;
		setNamesearch(value);
		filterData(value);
	};

	const filterData = value => {
		const filtered = data.filter(
			item =>
				item.name.toLowerCase().includes(value.toLowerCase()) ||
				item.name.includes(value)
		);
		setData(filtered);
	};

	const selectedZoneIds = selectedZone.map(item => item._id);

	const handleSave = () => {
		// Handle the saving logic here with selectedZoneIds
		console.log("Selected Zone IDs:", selectedZoneIds);
		console.log("props.selectedProd", props.selectedProd);
		let aa = props.selectedProd.map(item => {
			return {
				...item,
				zoneids: selectedZoneIds,
			};
		});

		console.log("aa", aa);
	};

	return (
		<div className={isSideBar ? css.container : ""}>
			<div className={isSideBar ? css.unhide : css.hide}>
				<div className={css.header}>
					<div style={{ ...styles.SideBarZone }}>
						<div>
							<span className="header">Бүсчлэл сонгох</span>
							<input
								type="text"
								value={namesearch}
								onChange={handleSearchChange}
							/>
						</div>
					</div>
					<div style={{ ...styles.SideBarZone }}>
						<div>
							<span className="header">Created by</span>
						</div>
					</div>
				</div>
				<div className={css.productList}>
					<div className={css.productsHeader}></div>
					<div className={css.products}>
						{data &&
							data.map((item, index) => {
								return (
									<div className={css.sideZoneContainer} key={item._id}>
										<div className={css.sideZoneData} style={{ ...styles.SideBarZone }}>
											<input
												type="checkbox"
												onChange={event => handleCheckboxChange(event, item)}
												checked={selectedZone.includes(item)}
											/>
											{item.name}
										</div>
										<div className={css.sideZoneData} style={{ ...styles.SideBarZone }}>
											{item.createdBy}
										</div>
									</div>
								);
							})}
					</div>
					<div className={css.Savebutton}>
						<button
							className={css.buttonCancel}
							onClick={() => setIsSideBar(false)}
						>
							Цуцлах
						</button>
						<button className={css.buttonSave} onClick={handleSave}>
							Хадгалах
						</button>
					</div>
				</div>

				<div className={css.clearIcon} onClick={() => setIsSideBar(false)}>
					<img src={clearIcon} alt="Clear" />
				</div>
			</div>
		</div>
	);
};

export default SideBar;
