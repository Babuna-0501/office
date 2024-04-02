import React, { useContext, useState } from "react";
import css from "./selectsupplier.module.css";

import BackOfficeHook from "../../../Hooks/BackOfficeHook";
import { useEffect } from "react";

const SelectSupplier = (props) => {
  const supplierctx = useContext(BackOfficeHook);
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [supplierName, setSupplierName] = useState(null);

  useEffect(() => {
    const aaa = supplierctx.suppliers;
    if (props.chosedSupplier) {
      let bbb = aaa.filter((item) => {
        return item.id === props.chosedSupplier;
      });
      // console.log("bbb", bbb);
      bbb.map((item) => {
        setSupplierName(item.name);
      });
    }
    setData(aaa);
  }, []);

  const handler = (item) => {
    // console.log("e----item", item);
    setSupplierName(item.name);

    props.setSupId(item.id);
    setModal(false);
  };
  const modalOpen = () => {
    setModal(true);
    setSupplierName(null);
  };
  const newHandler = () => {
    setModal(true);
  };
  // console.log("supplierName", supplierName);

  return (
    <div className={css.listwrapper}>
      <div className={css.onewrapper}>
        {supplierName === null ? (
          <span onClick={modalOpen} className={css.supplier}>
            Нийлүүлэгч
          </span>
        ) : null}
        {supplierName && (
          <span className={css.supName} onClick={newHandler}>
            {supplierName}
          </span>
        )}
      </div>

      {modal && (
        <div className={css.listContainer}>
          {data?.map((item) => {
            return (
              <p key={item.id} onClick={() => handler(item)}>
                {item.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectSupplier;
