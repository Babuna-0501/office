import css from "./checkbox.module.css";
import checkMark from "../../../assets/shipment/checkmark-shipment.svg";

export const Checkbox = ({ variant = "dark", id, checked, onChange }) => {
  return (
    <input
      checked={checked}
      onChange={onChange}
      id={id}
      className={`${css.input} ${variant === "primary" && css.primary}`}
      type="checkbox"
      style={{ backgroundImage: `url(${checkMark})` }}
    />
  );
};
