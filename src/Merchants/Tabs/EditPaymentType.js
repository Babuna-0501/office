import css from "./paymentType.module.css";

export const EditPaymentType = ({ supplier, acceptedIds, setAcceptedIds }) => {
  const handleChange = (supplier) => {
    if (acceptedIds.includes(supplier.id)) {
      const filteredIds = acceptedIds.filter((id) => id !== supplier.id);
      setAcceptedIds(filteredIds);
    } else {
      const newIds = [...acceptedIds, supplier.id];
      setAcceptedIds(newIds);
    }
  };

  return (
    <div className={css.supplier}>
      <div style={{ fontWeight: "600", width: "25px" }}>{supplier.id}</div>
      <div>
        <img
          src={supplier.media}
          alt="supplier logo"
          style={{ height: "30px", width: "30px", borderRadius: "50%" }}
        />
      </div>
      <div style={{ width: "35%" }}>{supplier.name}</div>
      <div className="showContainer" onClick={() => handleChange(supplier)}>
        {acceptedIds.includes(supplier.id) ? (
          <img src="https://admin.ebazaar.mn/media/on.svg" alt="" style={{ width: "35px" }} />
        ) : (
          <img src="https://admin.ebazaar.mn/media/off.svg" alt="" style={{ width: "35px" }} />
        )}
      </div>
    </div>
  );
};
