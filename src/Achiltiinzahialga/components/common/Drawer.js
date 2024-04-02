import css from "./drawer.module.css";

export const Drawer = (props) => {
  const { closeHandler, children, backdrop } = props;

  return (
    <div className={css.drawerContainer}>
      <div
        className={css.drawerWrapper}
        style={{ boxShadow: backdrop === "transparent" && "none" }}
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
