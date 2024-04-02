const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  console.log({ isChecked });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={`checkbox-${index}`} style={{ fontSize: "14px" }}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
