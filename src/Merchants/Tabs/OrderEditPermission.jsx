import css from "./orderEditPermission.module.css";

export const OrderEditPermission = (props) => {
  const { orderEditPermission, allSuppliers } = props;

  const supplierIds = Object.keys(JSON.parse(orderEditPermission)).map(Number);
  const newFilteredSup = allSuppliers?.filter((kk) => supplierIds.includes(kk.id));

  return (
    <div>
      {newFilteredSup.map((sup) => {
        return (
          <div key={sup.id} className={css.container}>
            <div className={css.supId}>{sup.id}</div>
            <img src={sup.media} alt="" className={css.supMedia} />
            <div className={css.supName}>{sup.name}</div>
          </div>
        );
      })}
    </div>
  );
};
