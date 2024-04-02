import React, { useState } from "react";
import css from "./select.module.css";
import { useEffect } from "react";

const Select = ({
  style = {},
  options,
  value,
  onChange = () => {},
  onSearch = () => {},
}) => {
  const [values, setValues] = useState([...value]);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    onChange(values);
  }, [values]);
  return (
    <div className={css.container} style={style}>
      <div
        className={css.choosenOptions}
        onClick={() => {
          setIsFocus(true);
        }}
      >
        {values.map((value) => {
          return (
            <div className={css.choosenOption}>
              <span>{value}</span>
              <span
                style={{
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setValues(values.filter((item) => item !== value));
                }}
              >
                x
              </span>
            </div>
          );
        })}
        <input
          placeholder="хайх..."
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
      </div>
      {isFocus && (
        <div className={css.options}>
          <div
            onClick={() => {
              setIsFocus(false);
            }}
            style={{
              position: "absolute",
              width: "15px",
              height: "15px",
              right: "10px",
              top: "10px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                cursor: "pointer",
              }}
              src="https://ebazaar.mn/media/original/5635124130785212415802395926202310030529379073801687019852063413126833.png"
              alt="close"
            />
          </div>
          {options.map((option) => {
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (values.includes(option.value)) {
                    setValues(values.filter((item) => item !== option.value));
                  } else {
                    setValues([...values, option.value]);
                  }
                }}
                style={
                  values.includes(option.value)
                    ? { backgroundColor: "#f1f1f1" }
                    : {}
                }
                className={css.option}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
