import css from "./errorPopup.module.css";

import danger from "../../assets/shipment/danger-circle.svg";
import { Button } from "./Button";
import { useState } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const ErrorPopup = (props) => {
  const { message, closeHandler, show = true } = props;

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
          <div className={css.errorContainer}>
            <div className={`${css.errorModal} ${show ? css.show : css.hide}`} onAnimationEnd={onAnimationEnd}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "39px 26px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 78, height: 78, marginBottom: 12 }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      aspectRatio: "1/1",
                    }}
                    src={danger}
                    alt="Danger"
                  />
                </div>
                <span
                  style={{
                    color: "#1A1A1A",
                    fontSize: 22,
                    lineHeight: "26px",
                    fontWeight: 700,
                    marginBottom: 30,
                    textAlign: "center",
                  }}
                >
                  {message}
                </span>
                <Button onClick={closeHandler} size="medium" variant="primary" width="100%">
                  OK
                </Button>
              </div>
            </div>

            <div onClick={closeHandler} className={css.errorBack} />
          </div>,
          document.body
        )}
    </>
  );
};

export default ErrorPopup;
