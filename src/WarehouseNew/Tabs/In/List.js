import Entry from "./Entry";
import { useContext, useEffect, useState } from "react";
import { ModuleContext } from "../../index";
import DistributionSettings from "./DistributionSettings";
import Total from "./Total";

const List = (props) => {
	const context = useContext(ModuleContext);
	const [confirmed, setConfirmed] = useState([]);
	const [requested, setRequested] = useState([]);
	const widths = [52, 100, 120, 360, 120, 120, 300];
	let renderHTML = [];
	const [distributionSettings, setDistributionSettings] = useState(false);
	// const [isDisabled, setIsDisabled] = useState(false);
	const [ids, setIds] = useState([]);
	const [params, setParams] = useState([]);

	const onRowSelect = (id, requestedBy) => {
		if (ids.filter((i) => i.id == id)?.[0] == undefined) {
			if (
				ids.length == 0 ||
				ids.filter((i) => i.by == requestedBy)?.[0] != undefined
			) {
				setIds((prev) => [
					...prev,
					{
						id: id,
						by: requestedBy,
					},
				]);
			}
		} else {
			setIds(ids.filter((i) => i.id != id));
		}
	};
	useEffect(() => {
		let confirmedFilter = [];
		let requestFilter = [];
		context.supplierUsers.map((user) => {
			props.data.map((d) => {
				if (user.user_id === d.confirmedBy) {
					if (
						confirmedFilter.filter((c) => c.id == d.confirmedBy)[0] ===
						undefined
					) {
						confirmedFilter.push({
							name: user.first_name + " " + user.last_name,
							id: d.confirmedBy,
						});
					}
				}
				if (user.user_id === d.requestedBy) {
					if (
						requestFilter.filter((c) => c.id == d.requestedBy)[0] === undefined
					) {
						requestFilter.push({
							name: user.first_name + " " + user.last_name,
							id: d.requestedBy,
						});
					}
				}
			});
		});
		setConfirmed(confirmedFilter);
		setRequested(requestFilter);
	}, [context.supplierUsers]);
	const change = (e, value) => {
		let param = [];
		if (e == "all") {
			param = params.filter((p) => p.param != value);
		} else {
			if (params.filter((p) => p.param == value)[0]) {
				param = params.map((p) => {
					if (p.param == value) {
						return {
							param: value,
							value: e,
						};
					}
					return p;
				});
			} else {
				param = [
					...params,
					{
						param: value,
						value: e,
					},
				];
			}
		}
		setParams(param);

		props.fetchData(param?.map((p) => `${p.param}=${p.value}&`).join(""));
	};
	props.data.map((data) => {
		renderHTML.push(
			<Entry
				data={data}
				supplierUsers={context.supplierUsers}
				setForm={props.setForm}
				setFormZarlaga={props.setFormZarlaga}
				key={Math.random()}
				widths={widths}
				ids={ids}
				setDistributionSettings={setDistributionSettings}
				onRowSelect={onRowSelect}
			/>
		);
	});
	const changeInterval = (newInterval) => {
		props.setOgnoo(newInterval);
		props.foobar(newInterval);
	};
	const fnSuccessfullySetCourier = (movementId, courierId) => {
		let courierName = "";
		context.supplierUsers.map((user) => {
			context.supplierUsers.map((user) => {
				if (user.user_id === courierId) {
					courierName = user.first_name + " " + user.last_name;
				}
			});
		});
		setDistributionSettings(false);
		document.getElementById("courier" + movementId).innerText = courierName;
	};
	return (
		<>
			<div
				style={{
					padding: "0 1.5rem",
					position: "fixed",
					top: "103px",
					right: "0px",
					left: "72px",
				}}
			>
				<div>
					<input
						type="date"
						value={props.startDate}
						className="formInput"
						onChange={(e) => props.setStartDate(e.target.value)}
					/>
					<input
						type="date"
						value={props.endDate}
						className="formInput marginleft1rem"
						onChange={(e) => props.setEndDate(e.target.value)}
					/>
					<button
						className="pageButton marginleft1rem"
						onClick={() =>
							props.setForm(["new", "warehouse", "Агуулахаас орлого"])
						}
					>
						+ Агуулахаас орлого
					</button>
					<button
						className="pageButton secondary marginleft1rem"
						onClick={() =>
							props.setForm(["new", "customer", "Харилцагчаас орлого"])
						}
					>
						+ Харилцагчаас орлого
					</button>
					<button
						className="pageButton secondary marginleft1rem"
						onClick={() => props.setForm(["new", "import", "Импортын орлого"])}
					>
						+ Импортын орлого
					</button>
					<button
						className="pageButton marginleft1rem"
						onClick={() =>
							props.setFormZarlaga([
								"new",
								"warehouse",
								"Агуулах руу зарлагадах",
							])
						}
					>
						Агуулах руу зарлагадах
					</button>
					<button
						className="pageButton secondary marginleft1rem"
						onClick={() =>
							props.setFormZarlaga([
								"new",
								"customer",
								"Харилцагч руу зарлагадах",
							])
						}
					>
						Харилцагч руу зарлагадах
					</button>
					<button
						className="pageButton secondary marginleft1rem"
						disabled={false}
						onClick={() => props.setDownload(ids)}
					>
						Download PDF
					</button>
				</div>
				<div className="blah margintop8px" style={{ height: "60px" }}>
					<div className="blahblah">
						<div className="width40px">
							<input type="checkbox" className="headerInputs" />
						</div>
					</div>
					<div className="blahblah">
						<div className="width100px">
							<p className="blahblahheader">ID</p>
							<input type="text" className="headerInputs" />
						</div>
					</div>
					<div className="blahblah">
						<div className="width100px">
							<p className="blahblahheader">Төрөл</p>
							<select
								className="headerInputs"
								onChange={(e) => change(e.target.value, "type")}
							>
								<option value="all">Бүгд</option>
								<option value="1">Орлого</option>
								<option value="2">Зарлага</option>
							</select>
						</div>
					</div>
					<div className="blahblah">
						<div className="width100px">
							<p className="blahblahheader">Огноо</p>
							<input type="date" className="headerInputs" />
						</div>
					</div>
					<div className="blahblah">
						<div className="width200px">
							<p className="blahblahheader">
								Хүсэлт гаргасан агуулах/харилцагч
							</p>
							<select className="headerInputs">
								<option value="all">Бүгд</option>
								<option value="1">Орлого</option>
								<option value="2">Зарлага</option>
							</select>
						</div>
					</div>
					<div className="blahblah">
						<div className="width100px">
							<p className="blahblahheader">Статус</p>
							<select
								className="headerInputs"
								onChange={(e) => {
									change(e.target.value, "status");
								}}
							>
								<option value="all">Бүгд</option>
								<option value="1">Хүлээгдэж буй</option>
								<option value="2">Баталсан</option>
							</select>
						</div>
					</div>
					<div className="blahblah">
						<div className="width200px">
							<p className="blahblahheader">Үүсгэсэн</p>
							<select
								className="headerInputs"
								onChange={(e) => {
									change(e.target.value, "confirmedBy");
								}}
							>
								<option value="all">Бүгд</option>
								{confirmed.map((c, i) => {
									return (
										<option value={c.id} key={i}>
											{c.name}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className="blahblah">
						<div className="width200px">
							<p className="blahblahheader">Тэмдэглэл</p>
							<input type="text" className="headerInputs" />
						</div>
					</div>
					<div className="blahblah">
						<div className="width100px">
							<p className="blahblahheader">Баталсан огноо</p>
							<input type="date" className="headerInputs" />
						</div>
					</div>
					<div className="blahblah">
						<div className="width200px">
							<p className="blahblahheader">Баталсан хэрэглэгч</p>
							<select
								className="headerInputs"
								onChange={(e) => {
									change(e.target.value, "requestedBy");
								}}
							>
								<option value="all">Бүгд</option>
								{requested.map((r, i) => {
									return (
										<option value={r.id} key={i}>
											{r.name}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className="blahblah">
						<div className="width200px">
							<p className="blahblahheader">Дүн</p>
						</div>
					</div>
					<div className="blahblah">
						<div className="width200px">
							<p className="blahblahheader">Хүргэлт, түгээлт</p>
						</div>
					</div>
				</div>
			</div>
			<div
				style={{
					padding: "0 1.5rem",
					position: "fixed",
					top: "213px",
					bottom: "58px",
					right: "0px",
					left: "72px",
					overflow: "auto",
				}}
			>
				{renderHTML}
			</div>
			<Total data={props.data} />
			{distributionSettings ? (
				<DistributionSettings
					data={distributionSettings}
					fnSuccessfullySetCourier={fnSuccessfullySetCourier}
					supplierUsers={context.supplierUsers}
					setDistributionSettings={setDistributionSettings}
				/>
			) : null}
		</>
	);
};

export default List;
