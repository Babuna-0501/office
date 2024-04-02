import React, { useContext, useState, useEffect } from "react";
import css from "./suppliers.module.css";
import SupplierList from "./components/SupplierList/SupplierList";
import ShuurkhaiHook from "../Hooks/ShuurkhaiHook";
import ProductReportHook from "../Hooks/ProductsReportHook";
import myHeaders from "../components/MyHeader/myHeader";
import SuppConfig from "../Supplier/components/SuppConfig";
import { Banks, SupplierGroup } from "../Supplier/constants";
import Media from "../Supplier/Media";
import DeleteIcon from "../assets/delete_red_small.svg";
import DaysToShow from "../Supplier/components/OrderTiming/DaysToShow/DaysToShow";
import Delay from "../Supplier/components/OrderTiming/Delay/Delay";
import Hours from "../Supplier/components/OrderTiming/Hours/Hours";
import { Select } from "antd";
import { Modal as NewModal } from "../Achiltiinzahialga/components/common/Modal";
import ProductList from "../Supplier/components/productList";

const Suppliers = ({ props }) => {
	console.log("PROOPS", props);
	const shuurkhaiCtx = useContext(ShuurkhaiHook);

	const [isNewModal, setIsNewModal] = useState(false);
	const [suppliers, setSuppliers] = useState([]);
	const [dummy, setDummy] = useState(0);
	const [searchValue, setSearchValue] = useState();
	const [index, setIndex] = useState("");
	const [nuat, setNuat] = useState(0);
	const [regNumber, setRegNumber] = useState("");
	const [phone, setPhone] = useState("");
	const [minAmount, setMinAmount] = useState("");
	const [email, setEmail] = useState("");
	const [description, setDescription] = useState("");
	const [isActive, setIsActive] = useState(false);
	const [moreInfo, setMoreInfo] = useState("");
	const [group, setGroup] = useState();
	const [supplierName, setSupplierName] = useState("");
	const [supplierNameEng, setSupplierNameEng] = useState("");
	const [address, setAddress] = useState("");
	const [website, setWebsite] = useState("");
	const [modal, setModal] = useState(false);
	const [bank, setBank] = useState();
	const [newBankAccount, setNewBankAccount] = useState("");
	const [newBankHolder, setNewBankHolder] = useState("");
	const [deliveryDate, setDeliveryDate] = useState([1, 2, 3, 4, 5]);
	const [chosedChannel, setChosedChannel] = useState([]);
	const [logo, setLogo] = useState("");
	const [media, setMedia] = useState(false);
	const [channelSetup, setChannelSetup] = useState(false);
	const [alcohol, setAlcohol] = useState(0);
	const [returnProduct, setReturnProduct] = useState(0);
	const [isSuperMarket, setIsSuperMarket] = useState(0);
	const [search, setSearch] = useState("");
	let [merchants, setMerchants] = useState([]);
	const [blackList, setBlackList] = useState([]);
	const [whiteList, setWhiteList] = useState([]);
	const [coMerchant, setCoMerchant] = useState([]);
	const [coSupplier, setCoSupplier] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [busPrice, setBusPrice] = useState(null);
	const [merchantId, setMerchantId] = useState();

	const [daysShow, setDaysShow] = useState();
	const [delay, setDelay] = useState();
	const [hours, setHours] = useState();

	const permission = Object.values(JSON.parse(props.userData.permission))[0];
	const dates = [1, 2, 3, 4, 5, 6, 7];
	const ProductReportHookctx = useContext(ProductReportHook);

	const [smsNotif, setSmsNotif] = useState(false);
	const [smsPhone, setSmsPhone] = useState("");
	const [emailNotif, setEmailNotif] = useState(false);
	const [emailNotifAddress, setEmailNotifAddress] = useState("");
	const [pushNotif, setPushNotif] = useState(false);
	const [changedProducts, setChangedProducts] = useState([]);

	const postOresh = async () => {
		try {
			// safe decent iig Number luu hurvuulj bn
			for (const item of changedProducts) {
				item.safe = item.safe === "" ? 0 : Number(item.safe);
				item.decent = item.decent === "" ? 0 : Number(item.decent);
			}

			// safe decent 2la hooson baival hasaj bn
			const filteredProducts = changedProducts.filter(
				item => item.safe != false || item.decent != false
			);

			const body = {
				supplierId: Number(moreInfo.id),
				merchantId: Number(merchantId),
				products: filteredProducts,
			};

			var requestOptions = {
				method: "POST",
				body: JSON.stringify(body),
				headers: myHeaders,
				redirect: "follow",
			};
			const data = await fetch(
				"https://api2.ebazaar.mn/api/oresh",
				requestOptions
			);
			const res = await data.json();
			if (res.code === 200) {
				console.log("res", res);
			}
			alert("Амжилттай");
			setIsNewModal(false);
		} catch (error) {
			console.log("users error ", error);
		}
	};

	useEffect(() => {
		const fetchdata = async () => {
			var requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};
			const data = await fetch(
				"https://api2.ebazaar.mn/api/backoffice/suppliers",
				requestOptions
			);
			const res = await data.json();
			setSuppliers(res.data);
		};
		try {
			fetchdata();
		} catch (error) {
			console.log("users error ", error);
		}
	}, [dummy, ProductReportHookctx.render]);

	useEffect(() => {
		if (index !== "new") {
			if (index) {
				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow",
				};
				fetch(
					`https://api2.ebazaar.mn/api/backoffice/newsuppliers?id=${index}`,
					requestOptions
				)
					.then(res => res.json())
					.then(res => {
						console.log("res976", res);
					});
				const fetchdata = async () => {
					console.log("index", index);
					const data = await fetch(
						`https://api2.ebazaar.mn/api/backoffice/newsuppliers?id=${index}`,
						requestOptions
					);
					const res = await data.json();
					console.log("res948", res);
					setMoreInfo(res);
					setDeliveryDate(
						JSON.parse(res.new_deliver).location[0].delivery_date
					);
				};
				const dateData = async () => {
					const data = await fetch(
						`https://api2.ebazaar.mn/api/backoffice/suppliers?id=${index}`,
						requestOptions
					);

					const result = await data.json();
					const cityIDs = JSON.parse(result.data[0].supplier_is_active).city;

					// console.log("IDS", cityIDs);

					// ProductReportHookctx.setOronNutagdata(cityIDs);
					ProductReportHookctx.setChannelID(cityIDs);

					setHours(result.data[0].orderTiming.hours);
					setDelay(Number(result.data[0].orderTiming.delay));
					setDaysShow(Number(result.data[0].orderTiming.daysToShow));
				};
				try {
					fetchdata();
					dateData();
				} catch (error) {
					console.log("users error ", error);
				}
			}
		} else {
			setDeliveryDate([]);
		}
	}, [index, dummy, ProductReportHookctx.render]);
	console.log("index", index);

	useEffect(() => {
		if (!index) return;
		if (index === "new") return;

		setPhone(suppliers.find(e => e.id === index)?.phone || "");
		setEmail(suppliers.find(e => e.id === index)?.email || "");
		setDescription(suppliers.find(e => e.id === index)?.description || "");
		setIsActive(suppliers.find(e => e.id === index)?.is_active || 0);
		setGroup(suppliers.find(e => e.id === index)?.category_id || "");
		setSupplierName(suppliers.find(e => e.id === index)?.name || "");
		setSupplierNameEng(suppliers.find(e => e.id === index)?.english_name || "");
		setAddress(suppliers.find(e => e.id === index)?.address || "");
		setWebsite(suppliers.find(e => e.id === index)?.website || "");

		suppliers.find(e => e.id === index)?.coSupplier ||
		suppliers.find(e => e.id === index)?.coMerchant
			? setIsSuperMarket(true)
			: setIsSuperMarket(false);

		setCoMerchant(
			suppliers.find(e => e.id === index)?.coMerchant?.split(",") || []
		);

		setCoSupplier(
			suppliers.find(e => e.id === index)?.coSupplier?.split(",") || []
		);
		setMinAmount(
			suppliers.find(e => e.id === index)?.minimum_order_amount || ""
		);
		setMoreInfo(
			suppliers.find(e => e.id === index)?.bankaccount || { bankaccount: [] }
		); ////

		ProductReportHookctx.setMinAmount(
			suppliers.find(e => e.id === index)?.new_minimum_order_amount
				? JSON.parse(
						suppliers.find(e => e.id === index)?.new_minimum_order_amount
				  )
				: {}
		);
		setLogo(suppliers.find(e => e.id === index)?.media || "");
		setAlcohol(suppliers.find(e => e.id === index)?.alcohol || 0);
		setReturnProduct(suppliers.find(e => e.id === index)?.return || 0);
		setBlackList(
			suppliers.find(e => e.id === index)?.merchant_list
				? JSON.parse(suppliers.find(e => e.id === index)?.merchant_list)
						?.blackList?.register
				: []
		);
		setWhiteList(
			suppliers.find(e => e.id === index)?.merchant_list
				? JSON.parse(suppliers.find(e => e.id === index)?.merchant_list)
						?.whiteList?.register
				: []
		);

		if (suppliers.find(e => e.id === index).notification !== null) {
			setSmsNotif(
				JSON.parse(suppliers.find(e => e.id === index).notification).sms.sms ||
					false
			);
			setSmsPhone(
				JSON.parse(suppliers.find(e => e.id === index).notification).sms
					.phone_number || ""
			);
			setEmailNotif(
				JSON.parse(suppliers.find(e => e.id === index).notification).email
					.email || false
			);
			setEmailNotifAddress(
				JSON.parse(suppliers.find(e => e.id === index).notification).email
					.email_address || ""
			);
			setPushNotif(
				JSON.parse(suppliers.find(e => e.id === index).notification)
					.notification.notification || false
			);
		}

		let busids =
			JSON.parse(suppliers.find(e => e.id === index).supplier_is_active)
				.channels || [];
		let aa = ProductReportHookctx.bustype.map(item => {
			if (busids.includes(item.business_type_id)) {
				return {
					...item,
					chosed: true,
				};
			}
			return {
				...item,
				chosed: false,
			};
		});
		ProductReportHookctx.setBustype([...aa]);
		let oronids =
			JSON.parse(suppliers.find(e => e.id === index).supplier_is_active).city ||
			[];
		let bb = ProductReportHookctx.nutagdata.map(item => {
			if (oronids.includes(item.location_id)) {
				return {
					...item,
					chosed: true,
				};
			}
			return {
				...item,
				chosed: false,
			};
		});
		ProductReportHookctx.setNutagdata([...bb]);

		let supplierActive = JSON.parse(
			suppliers.find(x => x.id === index).supplier_is_active
		);
		if (supplierActive) {
			if (supplierActive.tradehops && supplierActive.tradehops.include) {
				ProductReportHookctx.setTradeshopIDS(supplierActive.tradehops.include);
			}
		}
	}, [index]);

	useEffect(() => {
		setBank();
		setNewBankAccount();
		setNewBankHolder();
	}, [modal]);

	useEffect(() => {
		var myHeaders = new Headers();
		myHeaders.append(
			"ebazaar_token",
			localStorage.getItem("ebazaar_admin_token")
		);
		myHeaders.append("Content-Type", "application/json");
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		let url = `https://api2.ebazaar.mn/api/merchants?register=${search}`;
		if (props.userData.company_id === "|14057|") {
			url = `https://api2.ebazaar.mn/api/merchants?id=6249,6250,6251`;
		}
		fetch(url, requestOptions)
			.then(r => r.json())
			.then(response => {
				console.log(response.data);
				setMerchants([...merchants, ...response.data]);
			})
			.catch(error => {
				console.log("error", error);
			});
	}, [search]);

	const merList = merchants
		.map(e => ({
			value: e.business_register,
			label: `${e.business_register} - ${e.tradeshop_name}`,
		}))
		.filter(
			(value, index, self) =>
				index === self.findIndex(t => t?.value === value?.value)
		);
	const merListId = merchants
		.map(e => ({
			value: String(e.tradeshop_id),
			label: `${e.tradeshop_id} - ${e.tradeshop_name}`,
		}))
		.filter(
			(value, index, self) =>
				index === self.findIndex(t => t?.value === value?.value)
		);

	useEffect(() => {
		setRegNumber(moreInfo?.register || "");
	}, [moreInfo]);

	const save = () => {
		if (smsNotif && smsPhone === "")
			return alert("СМС илгээх дугаараа оруулна уу!");

		if (emailNotif && emailNotifAddress === "")
			return alert("Мэйл явуулах хаягаа оруулна уу!");

		if (supplierName === "") {
			alert("Та нэрээ оруулна уу");
			return;
		}
		if (supplierNameEng === "") {
			alert("Та англи нэрээ оруулна уу");
			return;
		}
		if (phone === "") {
			alert("Та утасны дугаараа оруулна уу");
			return;
		}
		if (email === "") {
			alert("Та имэйл хаягаа оруулна уу");
			return;
		}
		if (address === "") {
			alert("Та хаягаа оруулна уу");
			return;
		}

		if (regNumber === "") {
			alert("Рэгистрийн дугаараа оруулна уу");
			return;
		}
		if (minAmount === "") {
			alert("Та захиалгын доод хэмжээгээ оруулна уу");
			return;
		}
		if (logo === "") {
			alert("Та захиалгын лого оруулна уу");
			return;
		}

		if (
			deliveryDate.length !== 0 &&
			supplierName &&
			supplierNameEng &&
			phone &&
			email &&
			address &&
			regNumber &&
			minAmount &&
			logo
		) {
			var myHeaders = new Headers();
			myHeaders.append(
				"ebazaar_token",
				localStorage.getItem("ebazaar_admin_token")
			);
			myHeaders.append("Content-Type", "application/json");

			let minPrice = {
				...busPrice,
				default: Number(minAmount),
			};

			let deliveryData = {
				location: [
					{
						coordinates: [
							[85.4335706, 49.0823404],
							[89.432594, 43.2626271],
							[104.901344, 41.2957833],
							[127.3573987, 44.2937978],
							[107.713844, 53.4499689],
							[85.4335706, 49.0823404],
						],
						delivery_date: deliveryDate.map(e => parseInt(e)),
						business_type:
							ProductReportHookctx.sitedata &&
							ProductReportHookctx.sitedata.business_types.map(e =>
								parseInt(e.business_type_id)
							),
						orderbefore: 32,
					},
				],
			};

			let newdatedata = deliveryDate.map(e => parseInt(e));

			let channelids = [];
			let locationids = [];
			let catIDS = [];

			let oldLocations = [];
			ProductReportHookctx.allCat.map(item =>
				item.chosed ? catIDS.push(item.id) : null
			);
			ProductReportHookctx.bustype.map(item =>
				item.chosed ? channelids.push(item.business_type_id) : null
			);

			ProductReportHookctx.oronNutagdata.map(item =>
				item.chosed ? locationids.push(item.location_id) : null
			);

			console.dir(ProductReportHookctx.oronNutagdata);

			// for (const data of ProductReportHookctx.oronNutagdata) {
			// 	// console.log("IDS", data.location_id);
			// 	data.chosed ? locationids.push(data.location_id) : null;
			// }
			console.log("CHEEECK", locationids);
			console.log("ANOTHER ONE", ProductReportHookctx.channelID);
			console.log(
				"ORON NUTAG DATA:  ",
				ProductReportHookctx.oronNutagdata.map((e, idx) => {
					return e.location_id;
				})
			);
			var raw =
				index === "new"
					? JSON.stringify({
							// SupplierID: index,
							SupplierName: supplierName,
							SupplierNameEnglish: supplierNameEng,
							SupplierPhone: phone,
							Email: email.replaceAll(" ", ""),
							Website: website, //
							Address: address,
							SupplierGroupID: group,
							SupplierDescription: description, //
							isActive: isActive ? 1 : 0, //
							Register: regNumber,
							MinimumOrderAmount: minAmount,
							NewMinimumOrderAmount: minPrice,
							DeliveryDate: newdatedata,
							MailList: [email],
							CoSupplier: coSupplier.join(","),
							CoMerchant: coMerchant.join(","),
							Alcohol: alcohol, //
							ReturnProduct: returnProduct, //
							Media: logo,
							MerchantList: {
								blackList: { register: blackList, tradeshop_id: [] },
								whiteList: { register: whiteList, tradeshop_id: [] },
							},
							Notification: {
								sms: {
									sms: smsNotif,
									phone_number: smsPhone,
								},
								email: {
									email: emailNotif,
									email_address: emailNotifAddress,
								},
								notification: {
									notification: pushNotif,
								},
							},
							// SupplierIsActive: {
							//   channels:
							//     ProductReportHookctx.busIDS.length > 0
							//       ? ProductReportHookctx.busIDS
							//       : channelids,
							//   tradehops: {
							//     include: [],
							//     exclude: [],
							//   },
							//   city: locationids,
							// },
					  })
					: JSON.stringify({
							SupplierID: index,
							SupplierName: supplierName,
							SupplierNameEnglish: supplierNameEng,
							SupplierPhone: phone,
							Email: email.replaceAll(" ", ""),
							Website: website, //
							Address: address,
							SupplierGroupID: group,
							SupplierDescription: description, //
							isActive: isActive, //
							Register: regNumber,
							MinimumOrderAmount: minAmount,
							NewMinimumOrderAmount: minPrice,
							Delivery: deliveryData,
							MailList: [email],
							CoSupplier: coSupplier.join(","),
							CoMerchant: coMerchant.join(","),
							Alcohol: alcohol, //
							ReturnProduct: returnProduct, //
							Media: logo,
							MerchantList: {
								blackList: { register: blackList, tradeshop_id: [] },
								whiteList: { register: whiteList, tradeshop_id: [] },
							},
							Notification: {
								sms: {
									sms: smsNotif,
									phone_number: smsPhone,
								},
								email: {
									email: emailNotif,
									email_address: emailNotifAddress,
								},
								notification: {
									notification: pushNotif,
								},
							},
							SupplierIsActive: {
								channels:
									ProductReportHookctx.busIDS.length > 0
										? ProductReportHookctx.busIDS
										: channelids,
								tradehops: {
									include:
										ProductReportHookctx.tradeshopIDS.length !== 0
											? ProductReportHookctx.tradeshopIDS
											: [],
									exclude: [],
								},
								city:
									// ProductReportHookctx.oronNutagdata.length > 0
									// 	? ProductReportHookctx.oronNutagdata
									// 	:
									// ProductReportHookctx.channelSet
									// 	?
									locationids,
								// : ProductReportHookctx.channelID,
								categories: [],
							},
							orderTiming: {
								daysToShow: daysShow,
								delay: delay,
								hours: hours,
							},
					  });

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};
			console.log("requestOptions", requestOptions);
			if (index === "new") {
				fetch(`https://api2.ebazaar.mn/api/suppliers/create`, requestOptions)
					.then(r => r.json())
					.then(res => {
						console.log("res-1", res);
						alert("Амжилттай хадгалагдлаа");
						setIndex("");
						setBusPrice(null);
						ProductReportHookctx.setMinAmount(null);
						if (res.code === 200) {
							moreInfo?.bankaccount.map((e, i) =>
								fetch(`https://api2.ebazaar.mn/api/bank/create`, {
									method: "POST",
									headers: myHeaders,
									body: JSON.stringify({
										SupplierID: res.id,
										BankID: parseInt(moreInfo?.bankaccount[i]?.bank),
										AccountNumber: parseInt(moreInfo?.bankaccount[i]?.account),
										AccountHolder: moreInfo?.bankaccount[i]?.holder,
									}),
									redirect: "follow",
								})
							);
							setDummy(dummy + 1);
						}
					})
					.catch(error => {
						console.log("error", error);
					});
			} else {
				// fetch(`https://api2.ebazaar.mn/api/suppliers?id=${index}`, requestOptions)
				//   .then(r=>r.json())
				//   .then(res=>{

				//   })

				fetch(`https://api2.ebazaar.mn/api/suppliers/update`, requestOptions)
					.then(r => r.json())
					.then(res => {
						console.log("res-2", res);
						alert("Амжилттай хадгалагдлаа");
						setIndex("");
						setBusPrice(null);
						ProductReportHookctx.setMinAmount(null);
						if (res.code === 200) {
							fetch(`https://api2.ebazaar.mn/api/suppliers`, {
								method: "PUT",
								headers: myHeaders,
								mode: "no-cors",
								body: JSON.stringify({
									id: index,
									orderTiming: {
										daysToShow: daysShow,
										delay: delay,
										hours: hours,
									},
								}),
							});

							moreInfo?.bankaccount.map((e, i) =>
								fetch(`https://api2.ebazaar.mn/api/bank/create`, {
									method: "POST",
									headers: myHeaders,
									body: JSON.stringify({
										...(moreInfo?.bankaccount[i]?.id && {
											id: parseInt(moreInfo?.bankaccount[i]?.id),
										}),
										...(moreInfo?.bankaccount[i]?.id
											? {
													supplier: parseInt(index),
											  }
											: {
													SupplierID: parseInt(index),
											  }),
										...(moreInfo?.bankaccount[i]?.id
											? {
													bank_id: parseInt(moreInfo?.bankaccount[i]?.bank),
											  }
											: {
													BankID: parseInt(moreInfo?.bankaccount[i]?.bank),
											  }),
										...(moreInfo?.bankaccount[i]?.id
											? {
													number: parseInt(moreInfo?.bankaccount[i]?.account),
											  }
											: {
													AccountNumber: parseInt(
														moreInfo?.bankaccount[i]?.account
													),
											  }),
										...(moreInfo?.bankaccount[i]?.id
											? {
													holder: moreInfo?.bankaccount[i]?.holder,
											  }
											: {
													AccountHolder: moreInfo?.bankaccount[i]?.holder,
											  }),

										// SupplierID: parseInt(index),
										// BankID: parseInt(moreInfo?.bankaccount[i]?.bank),
										// AccountNumber: parseInt(moreInfo?.bankaccount[i]?.account),
										// AccountHolder: moreInfo?.bankaccount[i]?.holder,
									}),
									redirect: "follow",
								})
							);
							setDummy(dummy + 1);
						}
					})
					.catch(error => {
						console.log("error", error);
					});
			}
		} else {
			alert("Мэдээлэлээ бүрэн бөглөнө үү");
		}
	};
	const BankDelete = e => {
		console.log("delete", e);

		let confirm = window.confirm("Та банкны данс устгахдаа итгэлтэй байна уу");
		if (confirm) {
			fetch(
				`https://api2.ebazaar.mn/api/backoffice/newsuppliers/deletebank?supplierId=${e.supplier}&BankAccountID=${e.id}`,
				{
					method: "PUT",
					headers: myHeaders,
					redirect: "follow",
				}
			)
				.then(res => res.json())
				.then(res => {
					console.log("delete banl", res);
					if (res) {
						alert("Амжилттай банк устгалаа");
					}
				})
				.catch(error => {
					console.log("error", error);
				});
		}
	};

	const OpenHandler = () => {
		setOpenModal(true);
		console.log("oruullaaa");
	};

	const supplierList = suppliers?.map(supplier => ({
		value: String(supplier.id),
		label: `${supplier.id} - ${supplier.name}`,
	}));
	return (
		<>
			{index === "" ? (
				<div className={css.mainContainer}>
					<div className={css.headerContainer}>
						<div className={css.imgContainer}>
							<div>
								<span className={css.title}>Зураг</span>
								<input
									type="text"
									onChange={e => {
										if (e.target.value === "") {
											console.log("first");
										}
									}}
									onKeyDown={e => {
										if (e.key === "Enter") {
											console.log("first");
										}
									}}
								/>
							</div>
						</div>
						<div className={css.nameContainer}>
							<div>
								<span className={css.title}>Нийлүүлэгчийн нэр</span>
								<input />
							</div>
						</div>
						<div className={css.showContainer}>
							<div>
								<span className={css.title}>Show</span>
								<input />
							</div>
						</div>
						<div className={css.registerContainer}>
							<div>
								<span className={css.title}>Регистр</span>
								<input />
							</div>
						</div>
						<div className={css.categoryContainer}>
							<div>
								<span className={css.title}>Категори</span>
								<input />
							</div>
						</div>
						<div className={css.detailedAddress}>
							<div>
								<span className={css.title}>Хаягийн дэлгэрэнгүй</span>
								<input />
							</div>
						</div>
						<div className={css.orderLimit}>
							<div>
								<span className={css.title}>Зa / доод лимит</span>
								<input />
							</div>
						</div>
					</div>
					<div className={css.suppliersContainer}>
						<SupplierList props={props} setIndex={setIndex} />
					</div>
				</div>
			) : (
				<div className={css.editContainer}>
					<button
						className={css.closeBtn}
						onClick={() => setIndex("")}
						style={{ cursor: "pointer" }}
					>
						Хаах
					</button>
					<SuppConfig
						index={index}
						suppliers={suppliers}
						setNuat={setNuat}
						setRegNumber={setRegNumber}
						setPhone={setPhone}
						setSupplierName={setSupplierName}
						setSupplierNameEng={setSupplierNameEng}
						setAddress={setAddress}
						setGroup={setGroup}
						SupplierGroup={SupplierGroup}
						setMinAmount={setMinAmount}
						setEmail={setEmail}
						setWebsite={setWebsite}
						OpenHandler={OpenHandler}
						dates={dates}
						deliveryDate={deliveryDate}
						setDeliveryDate={setDeliveryDate}
						setDescription={setDescription}
						setChannelSetup={setChannelSetup}
						media={media}
						setLogo={setLogo}
						setMedia={setMedia}
						logo={logo}
						returnProduct={returnProduct}
						setAlcohol={setAlcohol}
						alcohol={alcohol}
						setIsActive={setIsActive}
						isActive={isActive}
						setSmsNotif={setSmsNotif}
						smsNotif={smsNotif}
						setSmsPhone={setSmsPhone}
						setEmailNotif={setEmailNotif}
						emailNotif={emailNotif}
						setEmailNotifAddress={setEmailNotifAddress}
						emailNotifAddress={emailNotifAddress}
						setPushNotif={setPushNotif}
						pushNotif={pushNotif}
						daysShow={daysShow}
						setDaysShow={setDaysShow}
						delay={delay}
						setDelay={setDelay}
						hours={hours}
						setHours={setHours}
						moreInfo={moreInfo}
						Banks={Banks}
						DeleteIcon={DeleteIcon}
						BankDelete={BankDelete}
						setModal={setModal}
						modal={modal}
						blackList={blackList}
						merList={merList}
						setBlackList={setBlackList}
						setSearch={setSearch}
						whiteList={whiteList}
						setWhiteList={setWhiteList}
						setIsNewModal={setIsNewModal}
						isNewModal={isNewModal}
						coMerchant={coMerchant}
						merListId={merListId}
						setCoMerchant={setCoMerchant}
						coSupplier={coSupplier}
						changedProducts={changedProducts}
						setChangedProducts={setChangedProducts}
						postOresh={postOresh}
						permission={permission}
						save={save}
						regNumber={regNumber}
						phone={phone}
						supplierName={supplierName}
						supplierNameEng={supplierNameEng}
						address={address}
						group={group}
						minAmount={minAmount}
						email={email}
						website={website}
						description={description}
						Media={Media}
						setReturnProduct={setReturnProduct}
						smsPhone={smsPhone}
						DaysToShow={DaysToShow}
						Delay={Delay}
						Hours={Hours}
						setMoreInfo={setMoreInfo}
						Select={Select}
						NewModal={NewModal}
						supplierList={supplierList}
						setCoSupplier={setCoSupplier}
						ProductList={ProductList}
						merchantId={merchantId}
						setMerchantId={setMerchantId}
					/>
				</div>
			)}
		</>
	);
};

export default Suppliers;
