import React from "react";
import css from "./list.module.css";

const List = (props) => {
  let content = props.users ? (
    <div className={css.wrapper}>
      {props.users?.map((e, index) => {
        let email = e.email;
        return (
          <div
            className={`${
              e.user_id === props.index ? css.selectedContainer : css.container
            }`}
            key={index}
            onClick={() => {
              props.setIndex(e.user_id);
            }}
          >
            <div
              style={{
                maxWidth: "302px",
                width: "100%",
                display: "flex",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#37474F",
                  width: "100%",
                }}
              >
                {email}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <span>Түр хүлээнэ үү ...</span>
  );
  return <div className={css.listcontainer}>{content}</div>;
};

export default List;
