import css from "./borluulalt.module.css";

export const OneList = (props) => {
  const { d } = props;
  return (
    <div className={css.box}>
      <div style={{ width: "250px" }}>{d._id}</div>
      {/* <div>
        <img src={d.thumbnail} alt="hh" className={css.image} />
      </div> */}
      <div style={{ width: "100px" }}>{d.orderId}</div>
      <div style={{ width: "50px" }}>{d.amount}$</div>
      {/* <div style={{ width: "200px" }}>{d.brand}</div>
      <div style={{ width: "100px" }}>{d.category}</div> */}
    </div>
  );
};
