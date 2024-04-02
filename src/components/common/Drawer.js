import { useState } from "react";
import css from "./drawer.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export const Drawer = (props) => {
  const { closeHandler, children, backdrop, show = true } = props;

  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    <>
      {shouldRender &&
        createPortal(
          <div className={css.drawerContainer}>
            <div className={`${css.drawerWrapper} ${show ? css.show : css.hide}`} style={{ boxShadow: backdrop === "transparent" && "none" }} onAnimationEnd={onAnimationEnd}>
              {children}
            </div>

            <div onClick={closeHandler} className={css.backDrop} style={{ backgroundColor: backdrop === "transparent" && "transparent" }} />
          </div>,
          document.body
        )}
    </>
  );
};
