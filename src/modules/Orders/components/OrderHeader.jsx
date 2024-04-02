// CSS
import { Checkbox, Dropdown, Input } from "../../../components/common";
import css from "./orderHeader.module.css";
import { useEffect } from "react";
import calendarIcon from "../../../assets/global/calendar.svg";

export const OrderHeader = ({ zIndex, suppliers, locations, channels, filterStates }) => {
  const {
    orderId,
    setOrderId,
    orderSupplier,
    setOrderSupplier,
    orderDate,
    setOrderDate,
    deliveryDate,
    setDeliveryDate,
    orderPrice,
    setOrderPrice,
    tradeshopName,
    setTradeshopName,
    tradeshopPhone,
    setTradeshopPhone,
    orderChannel,
    setOrderChannel,
    orderCity,
    setOrderCity,
    orderDistrict,
    setOrderDistrict,
    orderKhoroo,
    setOrderKhoroo,
    orderAddress,
    setOrderAddress,
  } = filterStates;

  useEffect(() => {
    setOrderDistrict("");
  }, [orderCity]);

  useEffect(() => {
    setOrderKhoroo("");
  }, [orderDistrict]);

  return (
    <div className={css.headerContainer} style={{ zIndex }}>
      <div className={css.headerWrapper}>
        {/* Checkbox */}
        <div className={css.singleFieldWrapper} style={{ width: 34, alignItems: "center" }}>
          <Checkbox />
        </div>

        {/* Id */}
        <div className={css.singleFieldWrapper} style={{ width: 100 }}>
          <span>Дугаар</span>
          <Input size="small" placeholder="Хайх" type="number" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        </div>

        {/* Suppliers */}
        <div className={css.singleFieldWrapper} style={{ width: 140 }}>
          <span>Нийлүүлэгч</span>
          <Dropdown
            datas={suppliers
              .sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              })
              .map((supplier) => ({
                value: supplier.id,
                label: supplier.name,
              }))}
            value={orderSupplier}
            onChangeHandler={setOrderSupplier}
          />
        </div>

        {/* Order */}
        <div className={css.singleFieldWrapper} style={{ width: 150 }}>
          <span>Захиалга</span>
          <Input size="small" disabled />
        </div>

        {/* Order Date */}
        <div className={css.singleFieldWrapper} style={{ width: 130 }}>
          <span>Захиалсан өдөр</span>
          <Input icon={calendarIcon} iconposition="left" size="small" type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} name="orderDate" />
        </div>

        {/* Delivery Date */}
        <div className={css.singleFieldWrapper} style={{ width: 130 }}>
          <span>Хүргүүлэх өдөр</span>
          <Input icon={calendarIcon} iconposition="left" size="small" type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} name="deliveryDate" />
        </div>

        {/* Price */}
        <div className={css.singleFieldWrapper} style={{ width: 100 }}>
          <span>Нийт дүн</span>
          <Input size="small" placeholder="Хайх" type="number" value={orderPrice} onChange={(e) => setOrderPrice(e.target.value)} />
        </div>

        {/* Payment */}
        <div className={css.singleFieldWrapper} style={{ width: 90 }}>
          <span>Төлбөр:</span>
          <div>
            <span className={css.text}>Төлөөгүй</span>
            <span className={css.text} style={{ color: "#8DC543" }}>
              Төлсөн
            </span>
          </div>
        </div>

        {/* Notes */}
        <div className={css.singleFieldWrapper} style={{ width: 162 }}>
          <span>Тэмдэглэл</span>
          <Input size="small" disabled />
        </div>

        {/* Tradeshop */}
        <div className={css.singleFieldWrapper} style={{ width: 120 }}>
          <span>Захиалсан</span>
          <Input size="small" placeholder="Хайх" value={tradeshopName} onChange={(e) => setTradeshopName(e.target.value)} />
        </div>

        {/* Phone */}
        <div className={css.singleFieldWrapper} style={{ width: 80 }}>
          <span>Утас</span>
          <Input size="small" type="number" placeholder="Хайх" value={tradeshopPhone} onChange={(e) => setTradeshopPhone(e.target.value)} />
        </div>

        {/* Channel */}
        <div className={css.singleFieldWrapper} style={{ width: 90 }}>
          <span>Суваг</span>
          <Dropdown
            datas={channels.map((channel) => ({
              value: channel.business_type_id,
              label: channel.business_type_name,
            }))}
            value={orderChannel}
            onChangeHandler={setOrderChannel}
          />
        </div>

        {/* City */}
        <div className={css.singleFieldWrapper} style={{ width: 100 }}>
          <span>Хот/аймаг</span>
          <Dropdown
            datas={locations
              .filter((location) => location.parent_id === 0)
              .map((location) => ({
                value: location.location_id,
                label: location.location_name,
              }))}
            value={orderCity}
            onChangeHandler={setOrderCity}
          />
        </div>

        {/* District */}
        <div className={css.singleFieldWrapper} style={{ width: 100 }}>
          <span>Дүүрэг/сум</span>
          <Dropdown
            datas={locations
              .filter((location) => location.parent_id === (orderCity === "" ? orderCity : Number(orderCity)))
              .map((location) => ({
                value: location.location_id,
                label: location.location_name,
              }))}
            value={orderDistrict}
            onChangeHandler={setOrderDistrict}
          />
        </div>

        {/* Khoroo */}
        <div className={css.singleFieldWrapper} style={{ width: 100 }}>
          <span>Хороо</span>
          <Dropdown
            datas={locations
              .filter((location) => location.parent_id === (orderDistrict === "" ? orderDistrict : Number(orderDistrict)))
              .map((location) => ({
                value: location.location_id,
                label: location.location_name,
              }))}
            value={orderKhoroo}
            onChangeHandler={setOrderKhoroo}
          />
        </div>

        {/* Address */}
        <div className={css.singleFieldWrapper} style={{ width: 172 }}>
          <span>Дэлгэрэнгүй хаяг</span>
          <Input size="small" placeholder="Хайх" value={orderAddress} onChange={(e) => setOrderAddress(e.target.value)} />
        </div>

        {/* PickPack */}
        <div className={css.singleFieldWrapper} style={{ width: 90 }}>
          <span>PickPack</span>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};
