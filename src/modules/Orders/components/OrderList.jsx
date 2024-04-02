// CSS
import { useState } from "react";
import { Checkbox, Drawer } from "../../../components/common";
import css from "./orderList.module.css";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const OrderList = ({ orders, suppliers, locations, channels, setCurrentPage, hasMore }) => {
  return (
    <div className={css.listContainer} id="scrollDiv">
      <InfiniteScroll
        scrollableTarget="scrollDiv"
        dataLength={orders.length}
        hasMore={hasMore}
        next={() => {
          setCurrentPage((prev) => prev + 1);
        }}
        loader={<h4 className={css.loadingScroll}>Уншиж байна...</h4>}
      >
        {orders.map((order, index) => {
          return <SingleOrder key={`single-order-${order.order_id}`} zIndex={orders.length - index} order={order} suppliers={suppliers} locations={locations} channels={channels} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

const SingleOrder = ({ zIndex, order, suppliers, locations, channels }) => {
  const [currentSupplier] = useState(suppliers.find((supplier) => supplier.id === order.supplier_id));
  const [currentCity] = useState(locations.find((location) => location.location_id === Number(order.tradeshop_city)));
  const [currentDistrict] = useState(locations.find((location) => location.location_id === Number(order.tradeshop_district)));
  const [currentKhoroo] = useState(locations.find((location) => location.location_id === Number(order.tradeshop_horoo)));
  const [currentChannel] = useState(channels.find((channel) => channel.business_type_id === Number(order.business_type_id)));

  const [orderDate] = useState(order.order_date.split("T")[0].split("-"));
  const [orderTime] = useState(order.order_date.split("T")[1].split(":"));
  const [deliveryDate] = useState(order.delivery_date.split("T")[0].split("-"));
  const [totalPrice, setTotalPrice] = useState(0);
  const [note] = useState(JSON.parse(order.description) || []);

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let totalPriceCopy = 0;

    for (const product of order.line) {
      totalPriceCopy += product.price * product.quantity;
    }

    setTotalPrice(totalPriceCopy);
  }, [order.order_id]);

  return (
		<>
			<div className={css.singleOrderWrapper} style={{ zIndex }}>
				<div className={css.singleOrderContainer}>
					{/* Checkbox */}
					<div
						className={css.singleOrderFieldWrapper}
						style={{ width: 34, justifyContent: "center" }}
					>
						<Checkbox />
					</div>

					{/* Id */}
					<div
						className={css.singleOrderFieldWrapper}
						style={{
							width: 100,
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
							gap: 3,
						}}
					>
						<div
							className={`${css.orderStatus} ${
								order.status === 1 && css.pending
							} ${order.status === 2 && css.confirmed} ${
								order.status === 3 && css.delivered
							} ${order.status === 5 && css.cancelled}`}
						>
							{order.status === 1 && "Хүлээгдэж буй"}
							{order.status === 2 && "Баталгаажсан"}
							{order.status === 3 && "Хүргэгдсэн"}
							{order.status === 5 && "Цуцлагдсан"}
						</div>
						<span onClick={() => setShowDetails(true)} className={css.orderId}>
							{order.order_id}
						</span>
					</div>

					{/* Supplier */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 140 }}>
						<span className={css.text}>
							{currentSupplier && currentSupplier.name.slice(0, 40)}
							{currentSupplier && currentSupplier.name.length > 40 && "..."}
						</span>
					</div>

					{/* Order */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 150 }}>
						{order.line.slice(0, 4).map((product, index) => {
							return (
								<div
									onClick={() => setShowDetails(true)}
									className={css.productImage}
									style={{ zIndex: 4 - index }}
								>
									<img
										src={product.product_image.split(",")[0]}
										alt={product.product_name}
									/>
								</div>
							);
						})}
						{order.line.length > 4 && (
							<div
								onClick={() => setShowDetails(true)}
								className={css.productRemainingImage}
							>
								+{order.line.length - 4}
							</div>
						)}
					</div>

					{/* Order Date */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 130 }}>
						<span className={css.text}>
							{orderDate[0]}.{orderDate[1]}.{orderDate[2]} <br /> {orderTime[0]}
							:{orderTime[1]}
						</span>
					</div>

					{/* Delivery Date */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 130 }}>
						<span className={css.text}>
							{deliveryDate[0]}.{deliveryDate[1]}.{deliveryDate[2]}
						</span>
					</div>

					{/* Price */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 100 }}>
						<span className={css.text}>{totalPrice.toLocaleString()}₮</span>
					</div>

					{/* Payment */}
					<div
						className={css.singleOrderFieldWrapper}
						style={{
							width: 90,
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
						}}
					>
						<span className={css.text}>
							{(totalPrice - order.payment_amount).toLocaleString()}₮
						</span>
						<span className={css.text} style={{ color: "#8DC543" }}>
							{order.payment_amount.toLocaleString()}₮
						</span>
					</div>

					{/* Notes */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 162 }}>
						<span className={css.text}>
							{note[note.length - 1]?.body.slice(0, 40)}
							{note[note.length - 1]?.body.length > 40 && "..."}
						</span>
					</div>

					{/* Tradeshop */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 120 }}>
						<span className={css.text}>
							{order.tradeshop_name.slice(0, 40)}
							{order.tradeshop_name.length > 40 && "..."}
						</span>
					</div>

					{/* Phone */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 80 }}>
						<span className={css.text}>
							{order.phone?.split(",")[0]} <br /> {order.phone?.split(",")[1]}
						</span>
					</div>

					{/* Channel */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 90 }}>
						<span className={css.text}>
							{currentChannel.business_type_name}
						</span>
					</div>

					{/* City */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 100 }}>
						<span className={css.text}>{currentCity?.location_name}</span>
					</div>

					{/* District */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 100 }}>
						<span className={css.text}>{currentDistrict?.location_name}</span>
					</div>

					{/* Khoroo */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 100 }}>
						<span className={css.text}>{currentKhoroo?.location_name}</span>
					</div>

					{/* Address */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 172 }}>
						<span className={css.text}>
							{order.address.slice(0, 40)}
							{order.address.length > 40 && "..."}
						</span>
					</div>

					{/* Pickpack */}
					<div className={css.singleOrderFieldWrapper} style={{ width: 90 }}>
						<button className={css.pickPackBtn} type="button">
							Илгээх
						</button>
					</div>
				</div>
			</div>

			<Drawer
				show={showDetails}
				closeHandler={() => setShowDetails(false)}
			></Drawer>
		</>
	);
};
