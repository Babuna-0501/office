import { Collapse } from "antd";
import React, { useContext } from "react";
import ProductReportHook from "../../Hooks/ProductsReportHook";
import classes from "./productcat.module.css";
const { Panel } = Collapse;
const ProductCat = (props) => {
  const ctx = useContext(ProductReportHook);
  // console.log("ctx", ctx.sitedata.categories);
  const onClickHandler = (x, id) => {
    // console.log("x", x);
    // console.log("id", id);
    props.setCategoryCode(id);
    // if (id !== props.activeId) {
    //   x.stopPropagation();
    // }
  };
  return (
    <div className={classes.container}>
      <Collapse bordered={false} expandiconposition="end" defaultActiveKey={["1", "2", "3", "4", "5", "6", "7", "8"]}>
        <Panel header={<div className={classes.Header}>Бүтээгдэхүүний ангилал сонгох</div>} key="1">
          <Collapse bordered={false} onChange={false}>
            {ctx.sitedata.categories
              ?.filter((a) => a.parent_id === 0)
              .map((e, index) => (
                <div key={index}>
                  <Collapse bordered={false}>
                    <Panel header={<div>{e.name}</div>}>
                      {ctx.sitedata.categories
                        .filter((a) => a.parent_id === e.id)
                        .map((b, index) => (
                          <div
                            onClick={(x) => {
                              onClickHandler(x, e.id);
                            }}
                            key={index}
                          >
                            <Collapse bordered={false}>
                              <Panel header={<div>{b.name}</div>}>
                                {ctx.sitedata.categories
                                  .filter((d) => d.parent_id === b.id)
                                  .map((f, index) => (
                                    <div
                                      // onClick={(x) => {
                                      //   onClickHandler(x, b.id);
                                      // }}
                                      key={index}
                                    >
                                      {f.name}
                                    </div>
                                  ))}
                              </Panel>
                            </Collapse>
                          </div>
                        ))}
                    </Panel>
                  </Collapse>
                </div>
              ))}
          </Collapse>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ProductCat;
