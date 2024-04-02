import { Modal } from "./Modal";

import danger from "../../../assets/shipment/danger-circle.svg";
import { Button } from "./Button";

const ErrorPopup = (props) => {
  const { message, closeHandler } = props;

  return (
    <Modal closeHandler={closeHandler} width={300} height={300}>
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
        <Button
          onClick={closeHandler}
          size="medium"
          variant="primary"
          width="100%"
        >
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default ErrorPopup;
