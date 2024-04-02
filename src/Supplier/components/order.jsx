import React from "react";
import css from "./order.module.css";
import OrdersHook from "../../Hooks/OrdersHook";
import { useState } from "react";
import { useContext } from "react";
import { Checkbox } from "../../components/common";
import { useEffect } from "react";

const Order = ({ fieldsDataCopy, setFieldsDataCopy, updateUser }) => {
  return (
    <div className={css.container}>
      {fieldsDataCopy.map((field, index) => {
        return (
          <div className={css.singleField}>
            <Checkbox
              variant="primary"
              checked={field.permission}
              onChange={(e) => {
                setFieldsDataCopy((prevFieldsData) => {
                  return prevFieldsData.map((item, idx) =>
                    idx === index
                      ? { ...item, permission: e.target.checked }
                      : item
                  );
                });
              }}
            />
            <label>{field.title}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
