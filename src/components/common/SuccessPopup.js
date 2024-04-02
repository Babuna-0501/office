import css from "./successPopup.module.css";
import { Button } from "./Button";
import { useState } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { AcceptGreen } from "../../assets/icons";

export const SuccessPopup = ({ message, closeHandler, show = true }) => {
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
            <div className={`${css.modal} ${show ? css.show : css.hide}`} onAnimationEnd={onAnimationEnd}>
              <div className={css.successWrapper}>
                <AcceptGreen />
                <span>{message}</span>
                <Button onClick={closeHandler} variant="primary" size="medium" width="50%">
                  OK
                </Button>
              </div>
            </div>

            <div onClick={closeHandler} className={css.backDrop} />
          </div>,
          document.body
        )}
    </>
  );
};
