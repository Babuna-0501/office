import css from "./input.module.css";

export const Input = (props) => {
  const { type, placeholder, disabled = false, size = "large", width = "100%" } = props;

  return (
    <input
      className={`${css.input} ${size === "large" && css.large} ${
        size === "medium" && css.medium
      } ${size === "small" && css.small}`}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      {...props}
      style={{ width }}
    />
  );
};
