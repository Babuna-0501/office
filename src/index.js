import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import { UserDataHook } from "./Hooks/userHook";
import { OrderReportHook } from "./Hooks/OrderReportHook";
import { ProductReportHook } from "./Hooks/ProductsReportHook";
import { MerchantReportStore } from "./Hooks/MerchantReportHook";
import { PromoHook } from "./Hooks/PromoHook";
import { BackOfficeHook } from "./Hooks/BackOfficeHook";
import { AppHook } from "./Hooks/AppHook";
import { SfaHook } from "./Hooks/SfaHook";
import { ContentHook } from "./Hooks/ContentHook";
import { UpointHook } from "./Hooks/UpointHook";
import { OrdersHook } from "./Hooks/OrdersHook";
import { ProductHook } from "./Hooks/ProductHook";
import { ZonesHook } from "./Hooks/ZonesHook";
import { ChatHook } from "./Hooks/ChatHook";
import { TdaysHook } from "./Hooks/TdaysHook";
import { SMSHook } from "./Hooks/SMSHook";
import { CollectionHook } from "./Hooks/CollectionHook";
import { LendHook } from "./Hooks/LendHook";
import { MerchantRegisterHook } from "./Hooks/MerchantRegisterHook";
import { XTHook } from "./Hooks/XtHook";
import { VatHook } from "./Hooks/VatHook";
import { SupplierHook } from "./Hooks/SupplierHook";
import { PromoHookV1 } from "./Hooks/PromoHookV1";
import { ShipmentProvider } from "./Hooks/ShipmentHook";
import { HeaderProvider } from "./Hooks/HeaderHook";
import { GlobalProvider } from "./Hooks/GlobalContext";
import { ShuurkhaiHook } from "./Hooks/ShuurkhaiHook";

// if (process.env.NODE_ENV === "production") {
//   console.log = () => {};
//   console.error = () => {};
//   console.debug = () => {};
// }

ReactDOM.render(
	<GlobalProvider>
		<HeaderProvider>
			<UserDataHook>
				<AppHook>
					<VatHook>
						<SupplierHook>
							<SfaHook>
								<UpointHook>
									<ContentHook>
										<PromoHook>
											<PromoHookV1>
												<XTHook>
													<BackOfficeHook>
														<OrdersHook>
															<ShuurkhaiHook>
																<ProductHook>
																	<TdaysHook>
																		<SMSHook>
																			<CollectionHook>
																				<ZonesHook>
																					<LendHook>
																						<ChatHook>
																							<ProductReportHook>
																								<OrderReportHook>
																									<MerchantRegisterHook>
																										<MerchantReportStore>
																											<ShipmentProvider>
																												<App />
																											</ShipmentProvider>
																										</MerchantReportStore>
																									</MerchantRegisterHook>
																								</OrderReportHook>
																							</ProductReportHook>
																						</ChatHook>
																					</LendHook>
																				</ZonesHook>
																			</CollectionHook>
																		</SMSHook>
																	</TdaysHook>
																</ProductHook>
															</ShuurkhaiHook>
														</OrdersHook>
													</BackOfficeHook>
												</XTHook>
											</PromoHookV1>
										</PromoHook>
									</ContentHook>
								</UpointHook>
							</SfaHook>
						</SupplierHook>
					</VatHook>
				</AppHook>
			</UserDataHook>
		</HeaderProvider>
	</GlobalProvider>,
	document.getElementById("root")
);
