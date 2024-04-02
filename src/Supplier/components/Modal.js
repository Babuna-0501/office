import React, { useContext, useState } from "react";
import css from "./modal.module.css";
import closeicon from "../../assets/close.svg";
import ProductReportHook from "../../Hooks/ProductsReportHook";
import Item from "./Item";

const Modal = (props) => {
  const [data, setData] = useState({});
  const prodctx = useContext(ProductReportHook);

  console.log(data);

	const SaveHandler = () => {
		console.log("data bus type", data);
		// props.setBusPrice(data);
		props.setOpenModal(false);
	};
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div>
          <div className={css.header}>
            <span>Ангилалын хүргэлтийн доод хэмжээ</span>
            <img
              src={closeicon}
              alt="close icon"
              onClick={() => {
                props.setOpenModal(false);
              }}
            />
          </div>
          <div className={css.body}>
            {prodctx.sitedata &&
              prodctx.sitedata.business_types.map((item, index) => {
                return (
                  <Item key={index} item={item} setData={setData} data={data} />
                );
              })}
          </div>
        </div>
        <div className={css.btncontainer}>
          <button className={css.cancelbtn}>Цуцлах</button>
          <button className={css.confirmbtn} onClick={SaveHandler}>
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
