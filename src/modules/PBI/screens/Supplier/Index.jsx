import { useMemo } from "react";
import css from "./styles.module.css";
import { useState } from "react";
import { useEffect } from "react";

export const Supplier = ({ orders, suppliers: initSuppliers, tradeshops }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const uniqueSuppliers = [...new Set(orders.map((order) => order.supplier_id))];
    setSuppliers(initSuppliers.filter((supplier) => uniqueSuppliers.includes(supplier.id)));
  }, [orders, initSuppliers]);

  useEffect(() => {
    const uniqueTradeshops = [...new Set(orders.map((order) => order.tradeshop_id))];
    setMerchants(tradeshops.filter((tradeshop) => uniqueTradeshops.includes(tradeshop.tradeshop_id)));
  }, [orders, tradeshops]);

  const rowData = useMemo(() => {
    const result = [
      { title: "Захиалга", data: orders.length, slug: "orderCount" },
      {
        title: "Нийт дүн",
        data: Math.round(orders.reduce((acc, cur) => acc + cur.totalPrice, 0)),
        slug: "totalAmount",
      },
      {
        title: "Хүргэсэн",
        data: Math.round(orders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0)),
        slug: "deliveredAmount",
      },
      {
        title: "Идэвхтэй харилцгач",
        data: [...new Set(orders.map((order) => order.tradeshop_id))].length,
        slug: "userCount",
      },
      {
        title: "Нийлүүлэгч",
        data: [...new Set(orders.map((order) => order.supplier_id))].length,
        slug: "supplierCount",
      },
      {
        title: "Захиалгын давтамж",
        data: 0,
        slug: "orderFrequency",
      },
      {
        title: "Хүргэлтийн хувь",
        data: Math.round((orders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0) * 100) / orders.reduce((acc, cur) => acc + cur.totalPrice, 0)),
        slug: "deliveryPercentage",
      },
    ];

    return result;
  }, [orders]);

  return (
    <div className={css.container}>
      <div className={css.row}>
        {rowData.map((data, index) => {
          return (
            <div key={`suppliers-screen-single-row-item-${index}`} className={css.singleRowItem}>
              <span className={css.rowItemTitle}>{data.title}</span>
              <span className={css.rowItemStat}>
                {data.slug === "totalAmount" || data.slug === "deliveredAmount"
                  ? data.data >= 1_000_000
                    ? Math.round(data.data / 1_000_000).toLocaleString() + "M"
                    : data.data >= 1_000
                    ? Math.round(data.data / 1_000).toLocaleString() + "K"
                    : data.data.toLocaleString()
                  : data.slug === "deliveryPercentage"
                  ? data.data + "%"
                  : data.data > 0
                  ? data.data.toLocaleString()
                  : ""}
              </span>
              <span className={css.rowItemGoal}>{data.goal && "Goal: "}</span>
            </div>
          );
        })}
      </div>
      <div className={css.tableDataContainer}>
        <div className={css.suppliersTable}>
          <div className={css.suppliersTableHeader}>
            <div className={css.suppliersTableHeaderItem} style={{ width: 250 }}>
              <span className={css.headerText}>Нийлүүлэгч</span>
            </div>

            <div className={css.suppliersTableHeaderItem} style={{ width: 130 }}>
              <span className={css.headerText}>Нийт</span>
            </div>

            <div className={css.suppliersTableHeaderItem} style={{ width: 130 }}>
              <span className={css.headerText}>Хүргэсэн</span>
            </div>

            <div className={css.suppliersTableHeaderItem} style={{ width: 130 }}>
              <span className={css.headerText}>Цуцлагдсан</span>
            </div>

            <div className={css.suppliersTableHeaderItem} style={{ width: 110 }}>
              <span className={css.headerText}>Захиалга</span>
            </div>

            <div className={css.suppliersTableHeaderItem} style={{ width: 110 }}>
              <span className={css.headerText}>Харилцагч</span>
            </div>

            <div className={css.suppliersTableHeaderItem} style={{ width: 150 }}>
              <span className={css.headerText}>Хүргэлтийн хувь</span>
            </div>
          </div>

          <div className={css.suppliersTableContent}>
            {suppliers.map((supplier) => {
              const supplierOrders = orders.filter((order) => order.supplier_id === supplier.id);

              return (
                <div key={`supplier-screen-supplier-table-item-${supplier.id}`} className={css.suppliersTableContentRow}>
                  <div className={css.suppliersTableContentItem} style={{ width: 250 }}>
                    <span className={css.contentText}>{supplier.name}</span>
                  </div>

                  <div className={css.suppliersTableContentItem} style={{ width: 130 }}>
                    <span className={css.contentText}>{Math.round(supplierOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)).toLocaleString()}₮</span>
                  </div>

                  <div className={css.suppliersTableContentItem} style={{ width: 130 }}>
                    <span className={css.contentText}>{Math.round(supplierOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0)).toLocaleString()}₮</span>
                  </div>

                  <div className={css.suppliersTableContentItem} style={{ width: 130 }}>
                    <span className={css.contentText}>{Math.round(supplierOrders.filter((order) => order.status === 5).reduce((acc, cur) => acc + cur.totalPrice, 0)).toLocaleString()}₮</span>
                  </div>

                  <div className={css.suppliersTableContentItem} style={{ width: 110 }}>
                    <span className={css.contentText}>{supplierOrders.length.toLocaleString()}</span>
                  </div>

                  <div className={css.suppliersTableContentItem} style={{ width: 110 }}>
                    <span className={css.contentText}>{[...new Set(supplierOrders.map((order) => order.tradeshop_id))].length.toLocaleString()}</span>
                  </div>

                  <div className={css.suppliersTableContentItem} style={{ width: 150 }}>
                    <span className={css.contentText}>
                      {Math.round(
                        (supplierOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0) * 100) / supplierOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)
                      )}
                      %
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={css.suppliersTableFooter}>
            <div className={css.suppliersTableFooterItem} style={{ width: 250 }}>
              <span className={css.footerText}>Нийт</span>
            </div>

            <div className={css.suppliersTableFooterItem} style={{ width: 130 }}>
              <span className={css.footerText}>{Math.round(orders.reduce((acc, cur) => acc + cur.totalPrice, 0)).toLocaleString()}₮</span>
            </div>

            <div className={css.suppliersTableFooterItem} style={{ width: 130 }}>
              <span className={css.footerText}>{Math.round(orders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0)).toLocaleString()}₮</span>
            </div>

            <div className={css.suppliersTableFooterItem} style={{ width: 130 }}>
              <span className={css.footerText}>{Math.round(orders.filter((order) => order.status === 5).reduce((acc, cur) => acc + cur.totalPrice, 0)).toLocaleString()}₮</span>
            </div>

            <div className={css.suppliersTableFooterItem} style={{ width: 110 }}>
              <span className={css.footerText}>{orders.length.toLocaleString()}</span>
            </div>

            <div className={css.suppliersTableFooterItem} style={{ width: 110 }}>
              <span className={css.footerText}>{[...new Set(orders.map((order) => order.tradeshop_id))].length.toLocaleString()}</span>
            </div>

            <div className={css.suppliersTableFooterItem} style={{ width: 150 }}>
              <span className={css.footerText}>
                {Math.round((orders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0) * 100) / orders.reduce((acc, cur) => acc + cur.totalPrice, 0)).toLocaleString()}
                %
              </span>
            </div>
          </div>
        </div>

        <div className={css.rightSide}>
          <div className={css.typeChart}></div>

          <div className={css.merchantTable}>
            <div className={css.merchantTableHeader}>
              <div className={css.merchantTableHeaderItem} style={{ width: 250 }}>
                <span className={css.headerText}>Merchant</span>
              </div>

              <div className={css.merchantTableHeaderItem} style={{ width: 130 }}>
                <span className={css.headerText}>Total</span>
              </div>

              <div className={css.merchantTableHeaderItem} style={{ width: 110 }}>
                <span className={css.headerText}>Order</span>
              </div>

              <div className={css.merchantTableHeaderItem} style={{ width: 110 }}>
                <span className={css.headerText}>Rate</span>
              </div>
            </div>

            <div className={css.merchantTableContent}>
              {merchants
                .sort((a, b) => {
                  if (a.tradeshop_name < b.tradeshop_name) {
                    return -1;
                  }
                  if (a.tradeshop_name > b.tradeshop_name) {
                    return 1;
                  }
                  return 0;
                })
                .map((merchant) => {
                  const merchantOrder = orders.filter((order) => order.tradeshop_id === merchant.tradeshop_id);

                  return (
                    <div key={`supplier-screen-merchant-table-item-${merchant.tradeshop_id}`} className={css.merchantTableContentRow}>
                      <div className={css.merchantTableContentItem} style={{ width: 250 }}>
                        <span className={css.contentText}>{merchant.tradeshop_name}</span>
                      </div>
                      <div className={css.merchantTableContentItem} style={{ width: 130 }}>
                        <span className={css.contentText}>{Math.round(merchantOrder.reduce((acc, cur) => acc + cur.totalPrice, 0)).toLocaleString()}₮</span>
                      </div>

                      <div className={css.merchantTableContentItem} style={{ width: 110 }}>
                        <span className={css.contentText}>{merchantOrder.length.toLocaleString()}</span>
                      </div>
                      <div className={css.merchantTableContentItem} style={{ width: 110 }}>
                        <span className={css.contentText}>
                          {Math.round(
                            (merchantOrder.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0) * 100) / merchantOrder.reduce((acc, cur) => acc + cur.totalPrice, 0)
                          ).toLocaleString()}
                          %
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className={css.merchantTableFooter}>
              <div className={css.merchantTableFooterItem} style={{ width: 250 }}>
                <span className={css.footerText}>Total</span>
              </div>

              <div className={css.merchantTableFooterItem} style={{ width: 130 }}>
                <span className={css.footerText}>{}</span>
              </div>

              <div className={css.merchantTableFooterItem} style={{ width: 110 }}>
                <span className={css.footerText}>Order</span>
              </div>

              <div className={css.merchantTableFooterItem} style={{ width: 110 }}>
                <span className={css.footerText}>Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
