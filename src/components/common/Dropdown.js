import css from "./dropdown.module.css";
import arrowDown from "../../assets/global/arrow-down.svg";

export const Dropdown = ({ datas = [], onChangeHandler, value, name, size = "small" }) => {
  return (
    <select
      className={`${css.dropdown} ${size === "medium" && css.medium}`}
      style={{ backgroundImage: `url(${arrowDown})` }}
      value={value}
      onChange={(e) => onChangeHandler(e.target.value === "Бүгд" ? "" : e.target.value)}
    >
      <option value={""}>Бүгд</option>
      {datas.map((d, index) => {
        return (
          <option key={`${name}-${index}`} value={d.value}>
            {d.label}
          </option>
        );
      })}
    </select>
  );
};
