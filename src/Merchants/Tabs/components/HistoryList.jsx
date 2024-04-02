import React, { useState } from "react";
import css from "./historylist.module.css";
import ProductAvatar from "../../../Order/ProductAvatar/ProductAvatar";
import InfiniteScroll from "react-infinite-scroll-component";

const HistoryList = (props) => {
  const { setIsOrderDetail, setOrder } = props;

  return (
    <div className={css.mainContainer}>
      <div className={css.listContainer}>
        <div className={css.idContainer}>
          <div
            onClick={() => {
              setIsOrderDetail(true);
              setOrder(props.order);
            }}
          >
            <span className={css.title}>{props.order.order_id}</span>
          </div>
        </div>
        <div className={css.suppContainer}>
          <img src={props.order.supplier_logo} alt="" className={css.img} />
          <span className={css.title}>{props.order.supplier_name}</span>
        </div>
        <div className={css.orderContainer}>
          <div>
            <ProductAvatar data={props.order} />
          </div>
        </div>
        <div className={css.deliveryContainer}>
          <div>
            <span className={css.title}>
              {props.order.delivery_date.slice(5, 10)}
            </span>
          </div>
        </div>
        <div className={css.amountContainer}>
          <div>
            <span className={css.title}>
              {props.order.grand_total
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              ₮
            </span>
          </div>
        </div>
        {/* <div className={css.priceContainer}>
					<div>
						<span className={css.title}>Анхны дүн</span>
					</div>
				</div> */}
        <div className={css.dateContainer}>
          <div>
            <span className={css.title}>
              {props.order.order_date.slice(5, 10)}{" "}
              {props.order.order_date.slice(11, 16)}
            </span>
          </div>
        </div>
        <div className={css.phoneContainer}>
          <div>
            <span className={css.title}>{props.order.phone}</span>
          </div>
        </div>
        <div className={css.clientContainer}>
          <div>
            <span className={css.title}>{props.order.tradeshop_name}</span>
          </div>
        </div>
        {/* <div className={css.channelContainer}>
					<div>
						<span className={css.title}>Суваг</span>
					</div>
				</div>
				<div className={css.cityContainer}>
					<div>
						<span className={css.title}>Хот/аймаг</span>
					</div>
				</div>
				<div className={css.districtContainer}>
					<div>
						<span className={css.title}>Дүүрэг/сум</span>
					</div>
				</div>
				<div className={css.khorooContainer}>
					<div>
						<span className={css.title}>Хороо</span>
					</div>
				</div>
				<div className={css.addressContainer}>
					<div>
						<span className={css.title}>Хаяг</span>
					</div>
				</div> */}
      </div>
    </div>
  );
};

export default HistoryList;
