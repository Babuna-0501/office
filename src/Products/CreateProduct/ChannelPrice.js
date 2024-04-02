import React, { useContext, useState } from "react";
import ProductReportHook from "../../Hooks/ProductsReportHook";
import Channel from "./Channel";
import css from "./channelprice.module.css";
import Channels from "../Channels/Channels";
import Priority from "../Priority/Priority";
import Deliveryfee from "../Delivery fee/Deliveryfee";
const ChannelPrice = (props) => {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(1);
  const [channeldata, setChanneldata] = useState([]);
  const prodctx = useContext(ProductReportHook);

  const data = [
    { id: 1, name: "Үнэ" },
    { id: 2, name: "Show/Hidden" },
    { id: 3, name: "Priority" },
    { id: 4, name: "Deliver fee" },
  ];

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {data.map((item, index) => {
          return (
            <div
              key={item.id}
              className={active === item.id ? css.active : css.unactive}
              onClick={() => {
                setActive(item.id);
                setPage(item.id);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      <div className={css.body}>
        {page === 1 && (
          <div className={css.channelwrapper}>
            {prodctx.bustype.map((item, index) => {
              return (
                <Channel
                  key={index}
                  item={item}
                  setPrice={props.setChannelPrice}
                  price={props.channelPrice}
                />
              );
            })}
          </div>
        )}

        {page === 2 && <Channels setChanneldata={setChanneldata} />}
        {page === 3 && <Priority />}
        {page === 4 && <Deliveryfee />}
      </div>
    </div>
  );
};

export default ChannelPrice;
