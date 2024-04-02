import { Collapse } from "antd";
import React, { useContext, useEffect, useState } from "react";

import css from "./angilal.module.css";
import plusbtnorange from "../../assets/plus button_big.svg";
import ProductReportHook from "../../Hooks/ProductsReportHook";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const Angilal = () => {
  const prodRepctx = useContext(ProductReportHook);
  const [categories, setCategories] = useState(prodRepctx.sitedata.categories);
  const [parentCat, setParentCat] = useState(null);

  console.log("categories", categories);
  useEffect(() => {
    let par = categories.filter((item) => {
      return item.parent_id === 0;
    });
    setParentCat(par);
  }, [categories]);
  console.log("par", parentCat);
  return (
    <div className={css.container}>
      <div className={css.second}>
        {/* <img
          src={plusbtnorange}
          alt="plus icon "
          style={{
            width: "32px",
            height: "32px",
            objectFit: "cover",
            marginRight: "12px",
            cursor: "pointer",
          }}
        /> */}
        {/* <p>Шинэ брэнд нэмэх</p> */}
        <p>Тун удахгүй</p>
      </div>
      {/* <div className={css.collapseWrapper}>
        {parentCat?.map((item) => {
          return (
            <div className={css.collapseContainer}>
              <Collapse defaultActiveKey={["1"]} ghost>
                <Panel header={item.name} key="1">
                  <Collapse bordered={false} onChange={false}>
                    {categories
                      .filter((x) => x.parent_id === item.id)
                      .map((e) => (
                        <div className={css.collapseItem}>
                          <Collapse bordered={false}>
                            <Panel header={e.name}>
                              {categories
                                .filter((x) => x.parent_id === e.id)
                                .map((b) => (
                                  <Collapse bordered={false}>
                                    <Panel header={b.name}>
                                      {categories
                                        .filter((x) => x.parent_id === b.id)
                                        .map((c) => (
                                          <Collapse bordered={false}>
                                            <Panel header={c.name}></Panel>
                                          </Collapse>
                                        ))}
                                    </Panel>
                                  </Collapse>
                                ))}
                            </Panel>
                          </Collapse>
                        </div>
                      ))}
                  </Collapse>
                </Panel>
              </Collapse>
              <div>{}</div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Angilal;
