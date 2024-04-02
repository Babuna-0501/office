import { createPortal } from "react-dom";
import css from "./modal.module.css";
import { useState } from "react";
import { useEffect } from "react";

export const Modal = (props) => {
  const { children, width = 500, height = 500, padding = 1, closeHandler = () => undefined, backdrop, show = true } = props;

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
          <div className={css.modalContainer}>
            <div
              className={`${css.modal} ${show ? css.show : css.hide}`}
              style={{
                width,
                height,
                padding,
                boxShadow: backdrop === "transparent" && "none",
              }}
              onAnimationEnd={onAnimationEnd}
            >
              {children}
            </div>

            <div onClick={closeHandler} className={css.backDrop} style={{ backgroundColor: backdrop === "transparent" && "transparent" }} />
          </div>,
          document.body
        )}
    </>
  );
};
