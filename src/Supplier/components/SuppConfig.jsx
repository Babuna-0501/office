import React from "react";
import css from "../supplierindex.module.css";

const SuppConfig = props => {
	const {
		index,
		suppliers,
		setNuat,
		setRegNumber,
		setPhone,
		setSupplierName,
		setSupplierNameEng,
		setAddress,
		setGroup,
		SupplierGroup,
		setMinAmount,
		setEmail,
		setWebsite,
		OpenHandler,
		dates,
		deliveryDate,
		setDeliveryDate,
		setDescription,
		setChannelSetup,
		media,
		setLogo,
		setMedia,
		logo,
		returnProduct,
		setAlcohol,
		alcohol,
		setIsActive,
		isActive,
		setSmsNotif,
		smsNotif,
		setSmsPhone,
		setEmailNotif,
		emailNotif,
		setEmailNotifAddress,
		emailNotifAddress,
		setPushNotif,
		pushNotif,
		daysShow,
		setDaysShow,
		delay,
		setDelay,
		hours,
		setHours,
		moreInfo,
		Banks,
		DeleteIcon,
		BankDelete,
		setModal,
		modal,
		blackList,
		merList,
		setBlackList,
		setSearch,
		whiteList,
		setWhiteList,
		setIsNewModal,
		isNewModal,
		coMerchant,
		merListId,
		setCoMerchant,
		coSupplier,
		changedProducts,
		setChangedProducts,
		postOresh,
		permission,
		save,
		regNumber,
		phone,
		supplierName,
		supplierNameEng,
		address,
		group,
		minAmount,
		email,
		website,
		description,
		Media,
		setReturnProduct,
		smsPhone,
		DaysToShow,
		Delay,
		Hours,
		setMoreInfo,
		Select,
		NewModal,
		supplierList,
		setCoSupplier,
		ProductList,
		merchantId,
		setMerchantId,
	} = props;
	console.log(index);

	return (
		<>
			<div className={css.row}>
				{index !== "new" && (
					<div className={css.row}>
						<div className={css.supplierName}>
							<img
								src={suppliers.find(e => e.id === index)?.media}
								alt="supp"
							/>
							{suppliers.find(e => e.id === index)?.name}
						</div>
					</div>
				)}
			</div>
			<div className={css.row}>
				<div>
					<div className={css.bold}>Татвар төлөгчийн төрөл</div>
					<select
						onChange={e => setNuat(e.target.value)}
						className={css.inputformSelect}
					>
						<option value="all"></option>
						<option value={1}>НӨАТ төлөгч</option>
						<option value={2}>НӨАТ төлөгч биш</option>
					</select>
				</div>
				<div>
					<div className={css.bold}>Регистрийн дугаар</div>
					<input
						onChange={e => setRegNumber(e.target.value)}
						value={regNumber}
						className={css.inputform}
						type="number"
					/>
				</div>
				<div>
					<div className={css.bold}>Утасны дугаар</div>
					<input
						onChange={e => setPhone(e.target.value)}
						value={phone}
						className={css.inputform}
						type="number"
					/>
				</div>
			</div>
			<div className={css.row}>
				<div>
					<div className={css.bold}>Нийлүүлэгчийн нэр (Монгол)</div>
					<input
						onChange={e => setSupplierName(e.target.value)}
						value={supplierName}
						className={css.inputform}
					/>
				</div>
				<div>
					<div className={css.bold}>Нийлүүлэгчийн нэр (Англи)</div>
					<input
						onChange={e => setSupplierNameEng(e.target.value)}
						value={supplierNameEng}
						className={css.inputform}
					/>
				</div>
				<div>
					<div className={css.bold}>Хаяг</div>
					<input
						onChange={e => setAddress(e.target.value)}
						value={address}
						className={css.inputform}
					/>
				</div>
			</div>
			<div className={css.row}>
				<div>
					<div className={css.bold}>Категори</div>
					<select
						onChange={e => setGroup(e.target.value)}
						className={css.inputformSelect}
						value={group}
					>
						<option value="all"></option>
						{SupplierGroup.map(e => (
							<option value={e.id} style={{ padding: "0px" }} key={e.id}>
								{e.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<div className={css.bold}>Захиалгын доод лимит</div>
					<input
						onChange={e => setMinAmount(e.target.value)}
						value={minAmount}
						className={css.inputform}
						type="number"
					/>
				</div>
				<div>
					<div className={css.bold}>Мэйл хаяг</div>
					<input
						onChange={e => setEmail(e.target.value)}
						value={email}
						className={css.inputform}
					/>
				</div>
			</div>
			<div
				className={css.row}
				style={{
					justifyContent: "flex-start",
					gap: "25px",
				}}
			>
				<div>
					<div className={css.bold}>Вебсайт</div>
					<input
						onChange={e => setWebsite(e.target.value)}
						value={website}
						className={css.inputform}
					/>
				</div>
				{index !== "new" && (
					<div className={css.btnwrapper}>
						<div className={css.bold}>Ангилалаар захиалгын доод лимит</div>
						<button onClick={OpenHandler}>Оруулах</button>
					</div>
				)}

				<div>
					<div className={css.bold}>Түгээлтийн өдрүүд</div>
					<div style={{ display: "flex" }}>
						{dates.map((e, i) => (
							<div key={e}>
								<div style={{ marginLeft: "6px" }}>{e}</div>
								<input
									type="checkbox"
									checked={deliveryDate?.includes(e)}
									onChange={a => {
										a.target.checked
											? setDeliveryDate([...deliveryDate, e])
											: setDeliveryDate(deliveryDate.filter(e => e !== i + 1));
									}}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={css.bold}>Байгууллагын тайлбар (заавал биш)</div>
			<input
				onChange={e => setDescription(e.target.value)}
				value={description}
				className={css.inputformLong}
			/>
			<div
				className={css.btnwrapper}
				style={{
					marginBottom: "10px",
					display: index === "new" ? "none" : "block",
				}}
			>
				<div className={css.bold}>Нэмэлт тохиргоо</div>

				<button
					onClick={() => {
						setChannelSetup(true);
					}}
				>
					Тохиргоо
				</button>
			</div>
			<div className={css.row}>
				<div>
					<div className={css.bold}>
						Лого
						{media && <Media setLogo={setLogo} setMedia={setMedia} />}
					</div>

					<div style={{ width: "80px" }} onClick={() => setMedia(true)}>
						<img
							src={logo ? logo : "https://ebazaar.mn/icon/photo-add.svg"}
							alt="zurag"
							className="product-image"
						/>
					</div>
				</div>
				<div className={css.bold}>
					Бараа буцаалт
					<div
						onClick={() => {
							setReturnProduct(returnProduct === 0 ? 1 : 0);
						}}
					>
						{returnProduct ? (
							<img src="https://admin.ebazaar.mn/media/on.svg" alt="zurag" />
						) : (
							<img src="https://admin.ebazaar.mn/media/off.svg" alt="zurag" />
						)}
					</div>
				</div>
				<div className={css.bold}>
					Алкохол
					<div
						onClick={() => {
							setAlcohol(alcohol === 0 ? 1 : 0);
						}}
					>
						{alcohol ? (
							<img src="https://admin.ebazaar.mn/media/on.svg" alt="zurag" />
						) : (
							<img src="https://admin.ebazaar.mn/media/off.svg" alt="zurag" />
						)}
					</div>
				</div>
				<div className={css.bold}>
					Идэвхи
					<div
						onClick={() => {
							setIsActive(isActive === 0 ? 1 : 0);
						}}
					>
						{isActive ? (
							<img src="https://admin.ebazaar.mn/media/on.svg" alt="zurag" />
						) : (
							<img src="https://admin.ebazaar.mn/media/off.svg" alt="zurag" />
						)}
					</div>
				</div>
			</div>
			<div className={css.row}>
				<div className={css.bold}>
					СМС мэдэгдэл
					<div style={{ display: "flex", alignItems: "center", gap: 5 }}>
						<div
							onClick={() => {
								setSmsNotif(prev => !prev);
							}}
						>
							{smsNotif ? (
								<img src="https://admin.ebazaar.mn/media/on.svg" alt="zurag" />
							) : (
								<img src="https://admin.ebazaar.mn/media/off.svg" alt="zurag" />
							)}
						</div>

						<input
							onChange={e => setSmsPhone(e.target.value)}
							value={smsPhone}
							className={css.inputform}
							disabled={!smsNotif}
							type="number"
						/>
					</div>
				</div>

				<div className={css.bold}>
					Мэйл мэдэгдэл
					<div style={{ display: "flex", alignItems: "center", gap: 5 }}>
						<div
							onClick={() => {
								setEmailNotif(prev => !prev);
							}}
						>
							{emailNotif ? (
								<img src="https://admin.ebazaar.mn/media/on.svg" alt="zurag" />
							) : (
								<img src="https://admin.ebazaar.mn/media/off.svg" alt="zurag" />
							)}
						</div>

						<input
							onChange={e => setEmailNotifAddress(e.target.value)}
							value={emailNotifAddress}
							className={css.inputform}
							disabled={!emailNotif}
							type="email"
						/>
					</div>
				</div>

				<div className={css.bold}>
					Push Notification
					<div
						onClick={() => {
							setPushNotif(prev => !prev);
						}}
					>
						{pushNotif ? (
							<img src="https://admin.ebazaar.mn/media/on.svg" alt="zurag" />
						) : (
							<img src="https://admin.ebazaar.mn/media/off.svg" alt="zurag" />
						)}
					</div>
				</div>
			</div>
			<div className={css.dateContainer}>
				<div className={css.bold}>Delivery Time Configuration</div>
				<div className={css.dateConfig}>
					<DaysToShow daysShow={daysShow} setDaysShow={setDaysShow} />
					<Delay delay={delay} setDelay={setDelay} />
					<Hours hours={hours} setHours={setHours} />
				</div>
			</div>
			<div className={css.bold}>Банкны мэдээлэл</div>
			<table style={{ width: "100%" }}>
				<thead>
					<tr>
						<td
							style={{
								width: "25%",
								fontWeight: "bold",
							}}
						>
							Банкны нэр
						</td>
						<td style={{ width: "20%", fontWeight: "bold" }}>Дансны дугаар</td>
						<td style={{ width: "45%", fontWeight: "bold" }}>Дансны нэр</td>
						<td style={{ width: "10%", fontWeight: "bold" }}></td>
					</tr>
				</thead>
				<tbody>
					{moreInfo?.bankaccount?.map((e, i) => (
						<tr key={i}>
							<td>
								<img
									src={
										e.bank_logo ||
										Banks.find(d => d.id === parseInt(e.bank))?.bank_logo
									}
									alt="bank"
								/>
								{e.bank_name ||
									Banks.find(d => d.id === parseInt(e.bank))?.bank_name}
							</td>
							<td>{e.account}</td>
							<td>{e.holder}</td>
							<td>
								<img
									src={DeleteIcon}
									alt="delete"
									style={{
										marginLeft: "20px",
									}}
									onClick={() => {
										let aa = moreInfo.bankaccount.filter(
											a => a.account !== e.account
										);
										let bb = { ...moreInfo, bankaccount: [...aa] };
										setMoreInfo(bb);
										BankDelete(e);
									}}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<table style={{ width: "100%" }}>
				<thead>
					<tr>
						<td
							style={{
								width: "100%",
								color: "#78909C",
								fontWeight: "700",
							}}
							onClick={() => {
								setModal(!modal);
							}}
						>
							Шинэ данс нэмэх
						</td>
					</tr>
				</thead>
			</table>
			<div style={{ marginTop: "10px" }} className={css.bold}>
				Хэрэглэгчийн мэдээлэл
			</div>
			<div style={{ width: "100%", maxHeight: "200px", overflow: "auto" }}>
				<table style={{ width: "100%" }}>
					<thead>
						<tr>
							<td
								style={{
									width: "45%",
									fontWeight: "bold",
								}}
							>
								Имэйл
							</td>
							<td style={{ width: "45%", fontWeight: "bold" }}>
								Утасны дугаар
							</td>
							<td style={{ width: "10%", fontWeight: "bold" }}>Идэвхи</td>
						</tr>
					</thead>
					<tbody>
						{moreInfo?.backuser?.map((e, i) => (
							<tr key={i}>
								<td>{e.email}</td>
								<td>{e.phone}</td>
								<td
									style={{
										display: "flex",
										justifyContent: "center",
										width: "100%",
									}}
								>
									{e.isActive ? (
										<img
											src="https://admin.ebazaar.mn/media/on.svg"
											alt="zurag"
										/>
									) : (
										<img
											src="https://admin.ebazaar.mn/media/off.svg"
											alt="zurag"
										/>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div style={{ marginTop: "10px" }} className={css.bold}>
				Хар жагсаалт
			</div>
			<Select
				allowClear
				mode="multiple"
				placeholder="Регистрийн дугаараар хайх"
				style={{ width: "100%" }}
				value={blackList}
				options={merList}
				onChange={value => {
					setBlackList(value);
				}}
				onSearch={value => {
					setSearch(value);
				}}
			/>
			<div style={{ marginTop: "10px" }} className={css.bold}>
				Цагаан жагсаалт ( хэрэв мерчант бүртгэвэл зөвхөн бүртгэгдсэн мерчантууд
				л захиалга хийх боломжтой болно)
			</div>
			<Select
				allowClear
				mode="multiple"
				placeholder="Регистрийн дугаараар хайх"
				style={{ width: "100%" }}
				value={whiteList}
				options={merList}
				onChange={value => {
					setWhiteList(value);
				}}
				onSearch={value => {
					setSearch(value);
				}}
			/>
			<div className={css.bold} style={{ marginTop: "5px" }}>
				Supermarket
				<div className={css.btnwrapper}>
					<button
						style={{ width: "150px" }}
						onClick={() => {
							setIsNewModal(!isNewModal);
						}}
					>
						Тохиргоо
					</button>
				</div>
			</div>
			{isNewModal ? (
				<NewModal
					width="fitContent"
					height="fitContent"
					padding="2"
					closeHandler={() => {
						setIsNewModal(!isNewModal);
					}}
				>
					<div
						style={{
							margin: "5px 10px",
							width: "1100px",
						}}
					>
						<div>
							<div style={{ marginTop: "10px" }} className={css.bold}>
								Merchant
							</div>
							<Select
								allowClear
								mode="multiple"
								placeholder="id дугаараар хайх"
								style={{ width: "100%" }}
								value={coMerchant}
								options={merListId}
								onChange={value => {
									setCoMerchant(value);
								}}
								onSearch={value => {
									setSearch(value);
								}}
							/>
						</div>
						<div>
							<div style={{ marginTop: "10px" }} className={css.bold}>
								Supplier
							</div>
							<Select
								allowClear
								mode="multiple"
								placeholder="Нийлүүлэгчийн id аар хайх"
								style={{ width: "100%" }}
								value={coSupplier}
								options={supplierList}
								onChange={value => {
									setCoSupplier(value);
								}}
								onSearch={({ value, label }) => {
									setSearch(value);
								}}
							/>
						</div>
						<ProductList
							merchantId={merchantId}
							setMerchantId={setMerchantId}
							coSupplier={coSupplier}
							coMerchant={coMerchant}
							merListId={merListId}
							changedProducts={changedProducts}
							setChangedProducts={setChangedProducts}
							supplierId={moreInfo.id}
						/>
						<div
							className={css.btnwrapper}
							style={{
								display: "flex",
								justifyContent: "end",
								width: "100%",
								padding: "5px",
							}}
						>
							<button onClick={postOresh} style={{ width: "150px" }}>
								Хадгалах
							</button>
						</div>
					</div>
				</NewModal>
			) : null}
			{permission.supplier.update && (
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						marginTop: "20px",
					}}
				>
					<span className="btn" onClick={save}>
						Хадгалах
					</span>
				</div>
			)}
		</>
	);
};

export default SuppConfig;
