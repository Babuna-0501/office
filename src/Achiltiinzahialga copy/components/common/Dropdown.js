import css from "./dropdown.module.css";
import arrowDown from "../../../assets/shipment/arrow-down-shipment.svg";

export const Dropdown = ({ datas = [], onChangeHandler, value, name }) => {
  return (
    <select
      className={css.dropdown}
      style={{ backgroundImage: `url(${arrowDown})` }}
      value={value}
      onChange={(e) =>
        onChangeHandler(e.target.value === "Бүгд" ? "" : e.target.value)
      }
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
