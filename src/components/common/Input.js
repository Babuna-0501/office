import { useRef } from "react";
import css from "./input.module.css";

export const Input = (props) => {
  const {
    type,
    placeholder,
    disabled = false,
    icon,
    iconposition = "right",
    iconClickHandler,
    size = "large",
    width = "100%",
    height,
    errorMsg,
    name,
  } = props;
  const inputRef = useRef(null);

  return (
    <>
      <div className={`${css.input} ${size === "large" && css.large} ${size === "medium" && css.medium} ${size === "small" && css.small} ${errorMsg && css.error}`} style={{ width, height }}>
        {icon && iconposition === "left" && (
          <label
            htmlFor={name}
            style={{ cursor: "pointer" }}
            onClick={() => {
              type === "date" && inputRef.current.showPicker();
              iconClickHandler && iconClickHandler();
            }}
          >
            {icon}
          </label>
        )}
        <input id={name} placeholder={placeholder} ref={inputRef} type={type} disabled={disabled} {...props} />
        {icon && iconposition === "right" && (
          <label
            htmlFor={name}
            style={{ cursor: "pointer" }}
            onClick={() => {
              type === "date" && inputRef.current.showPicker();
              iconClickHandler && iconClickHandler();
            }}
          >
            {icon}
          </label>
        )}
      </div>
      {errorMsg && <p className={css.errorMsg}>{errorMsg}</p>}
    </>
  );
};
