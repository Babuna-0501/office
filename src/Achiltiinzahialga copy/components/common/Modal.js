import css from "./modal.module.css";

export const Modal = (props) => {
  const {
    children,
    width = 500,
    height = 500,
    padding = 1,
    closeHandler = () => undefined,
    backdrop,
  } = props;

  return (
    <div className={css.modalContainer}>
      <div
        className={css.modal}
        style={{
          width,
          height,
          padding,
          boxShadow: backdrop === "transparent" && "none",
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      <div
        onClick={closeHandler}
        className={css.backDrop}
        style={{ backgroundColor: backdrop === "transparent" && "transparent" }}
      />
    </div>
  );
};
