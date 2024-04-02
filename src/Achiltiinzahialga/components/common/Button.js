import css from "./button.module.css";

export const Button = (props) => {
  const {
    children,
    variant = "primary",
    size = "large",
    icon = false,
    width = "max-content",
  } = props;

  return (
    <button
      className={`${css.button} ${variant === "primary" ? css.primary : ""} ${
        variant === "secondary" ? css.secondary : ""
      } ${size === "large" ? css.large : ""} ${
        size === "medium" ? css.medium : ""
      } ${icon ? css.icon : ""}`}
      {...props}
      style={{ width, ...props.style }}
    >
      {children}
    </button>
  );
};
