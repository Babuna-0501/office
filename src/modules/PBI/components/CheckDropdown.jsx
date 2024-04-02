import css from "./checkDropdown.module.css";
import arrowDown from "../../../assets/pbi/arrow-down.svg";
import arrowUp from "../../../assets/pbi/arrow-up.svg";
import checkMark from "../../../assets/pbi/checkmark.svg";
import { useEffect, useRef, useState } from "react";

const CheckDropdown = ({ data, hasAll = true, selected, setSelected }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (
        dropdownRef.current &&
        showDropdown &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", closeDropdowns);

    return () => {
      document.removeEventListener("mousedown", closeDropdowns);
    };
  }, [showDropdown]);

  return (
    <div className={css.wrapper} ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className={css.dropdownBtn}
      >
        <span>
          {data.find((d) => d.value === selected)
            ? data.find((d) => d.value === selected).label
            : "Бүгд"}
        </span>
        <img src={showDropdown ? arrowUp : arrowDown} alt="Arrow Down" />
      </button>

      {showDropdown && (
        <div className={css.dropdownWrapper}>
          {hasAll && (
            <SingleLine
              setSelected={setSelected}
              checked={selected === ""}
              value={""}
              label="Бүгд"
            />
          )}
          {data.map((d, index) => {
            return (
              <SingleLine
                checked={selected === d.value}
                key={index}
                value={d.value}
                label={d.label}
                setSelected={setSelected}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CheckDropdown;

const SingleLine = ({ value, label, checked, setSelected }) => {
  return (
    <div className={css.singleLineWrapper}>
      <input
        id={label}
        checked={checked}
        type="checkbox"
        style={{ backgroundImage: `url(${checkMark})` }}
        onChange={() => {
          setSelected(value);
        }}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
