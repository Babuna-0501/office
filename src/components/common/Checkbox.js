import css from "./checkbox.module.css";
import checkMark from "../../assets/global/checkmark.svg";

export const Checkbox = ({ variant = "dark", id, checked, onChange, width = 18, height = 18 }) => {
  return (
    <input
      checked={checked}
      onChange={onChange}
      id={id}
      className={`${css.input} ${variant === "primary" && css.primary}`}
      type="checkbox"
      style={{ backgroundImage: `url(${checkMark})`, width, height }}
    />
  );
};
