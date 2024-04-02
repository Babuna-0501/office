import { useEffect } from "react";
import css from "./styles.module.css";
import { useMemo } from "react";

export const Management = ({ orders }) => {
  const managementStats = useMemo(() => {
    const gtOrders = orders.filter((order) => ["1", "2", "3", "4", "5"].includes(order.business_type_id));
    const horekaOrders = orders.filter((order) => ["6", "7", "8", "9", "10", "11", "12", "13", "14"].includes(order.business_type_id));
    const shuurkhaiOrders = orders.filter((order) => order.supplier_id === 13884);
    const otherOrders = orders.filter((order) => order.supplier_id !== 13884);

    const shuurkhaiVendors = [];

    for (const order of shuurkhaiOrders) {
      for (const prod of order.line) {
        if (prod.vendor) shuurkhaiVendors.push(prod.vendor);
      }
    }

    const result = [
      {
        slug: "all",
        title: "Сарын гүйцэтгэл /Нийт/",
        stats: [
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
            title: "Идэвхтэй харилцагч",
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
        ],
      },
      {
        slug: "gt",
        title: "Сарын гүйцэтгэл /GT/",
        stats: [
          { title: "Захиалга", data: gtOrders.length, slug: "orderCount" },
          {
            title: "Нийт дүн",
            data: Math.round(gtOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)),
            slug: "totalAmount",
          },
          {
            title: "Хүргэсэн",
            data: Math.round(gtOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0)),
            slug: "deliveredAmount",
          },
          {
            title: "Идэвхтэй харилцагч",
            data: [...new Set(gtOrders.map((order) => order.tradeshop_id))].length,
            slug: "userCount",
          },
          {
            title: "Нийлүүлэгч",
            data: [...new Set(gtOrders.map((order) => order.supplier_id))].length,
            slug: "supplierCount",
          },
          { title: "Захиалгын давтамж", data: 0, slug: "orderFrequency" },
          {
            title: "Хүргэлтийн хувь",
            data: Math.round((gtOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0) * 100) / gtOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)),
            slug: "deliveryPercentage",
          },
        ],
      },
      {
        slug: "horeca",
        title: "Сарын гүйцэтгэл /Хореке/",
        stats: [
          { title: "Захиалга", data: horekaOrders.length, slug: "orderCount" },
          { title: "Нийт дүн", data: Math.round(horekaOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)), slug: "totalAmount" },
          { title: "Хүргэсэн", data: Math.round(horekaOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0)), slug: "deliveredAmount" },
          { title: "Идэвхтэй харилцагч", data: [...new Set(horekaOrders.map((order) => order.tradeshop_id))].length, slug: "userCount" },
          { title: "Нийлүүлэгч", data: [...new Set(horekaOrders.map((order) => order.supplier_id))].length, slug: "supplierCount" },
          { title: "Захиалгын давтамж", data: 0, slug: "orderFrequency" },
          {
            title: "Хүргэлтийн хувь",
            data: Math.round((horekaOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0) * 100) / horekaOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)),
            slug: "deliveryPercentage",
          },
        ],
      },
      {
        slug: "shuurhkai",
        title: "Сарын гүйцэтгэл /Шуурхай түгээлт/",
        stats: [
          {
            title: "Захиалга",
            data: shuurkhaiOrders.length,
            slug: "orderCount",
          },
          {
            title: "Нийт дүн",
            data: Math.round(shuurkhaiOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)),
            slug: "totalAmount",
          },
          {
            title: "Хүргэсэн",
            data: Math.round(shuurkhaiOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0)),
            slug: "deliveredAmount",
          },
          {
            title: "Идэвхтэй харилцагч",
            data: [...new Set(shuurkhaiOrders.map((order) => order.tradeshop_id))].length,
            slug: "userCount",
          },
          {
            title: "Нийлүүлэгч",
            data: [...new Set(shuurkhaiVendors)].length,
            slug: "supplierCount",
          },
          { title: "Захиалгын давтамж", data: 0, slug: "orderFrequency" },
          {
            title: "Хүргэлтийн хувь",
            data: Math.round(
              (shuurkhaiOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0) * 100) / shuurkhaiOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)
            ),
            slug: "deliveryPercentage",
          },
        ],
      },
      {
        slug: "others",
        title: "Сарын гүйцэтгэл /Шуурхай түгээлтээс бусад/",
        stats: [
          { title: "Захиалга", data: otherOrders.length, slug: "orderCount" },
          {
            title: "Нийт дүн",
            data: Math.round(otherOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)),
            slug: "totalAmount",
          },
          {
            title: "Хүргэсэн",
            data: Math.round(otherOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0)),
            slug: "deliveredAmount",
          },
          {
            title: "Идэвхтэй харилцагч",
            data: [...new Set(otherOrders.map((order) => order.tradeshop_id))].length,
            slug: "userCount",
          },
          {
            title: "Нийлүүлэгч",
            data: [...new Set(otherOrders.map((order) => order.supplier_id))].length,
            slug: "supplierCount",
          },
          { title: "Захиалгын давтамж", data: 0, slug: "orderFrequency" },
          {
            title: "Хүргэлтийн хувь",
            data: Math.round((otherOrders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.totalPrice, 0) * 100) / otherOrders.reduce((acc, cur) => acc + cur.totalPrice, 0)),
            slug: "deliveryPercentage",
          },
        ],
      },
    ];

    return result;
  }, [orders]);

  useEffect(() => {
    console.log("orders", orders);
  }, [orders]);

  return (
    <div className={css.container}>
      {managementStats.map((rowStat, index) => {
        return (
          <div key={`management-row-${index}`} className={css.row}>
            <h1 className={css.rowTitle}>{rowStat.title}</h1>
            <div className={css.rowItems}>
              {rowStat.stats.map((rowItemStat, ind) => {
                return (
                  <div key={`management-row-${index}-item-${ind}`} className={css.singleRowItem}>
                    <span className={css.rowItemTitle}>{rowItemStat.title}</span>
                    <span className={css.rowItemStat}>
                      {rowItemStat.slug === "totalAmount" || rowItemStat.slug === "deliveredAmount"
                        ? rowItemStat.data >= 1_000_000
                          ? Math.round(rowItemStat.data / 1_000_000).toLocaleString() + "M"
                          : rowItemStat.data >= 1_000
                          ? Math.round(rowItemStat.data / 1_000).toLocaleString() + "K"
                          : rowItemStat.data.toLocaleString()
                        : rowItemStat.slug === "deliveryPercentage"
                        ? rowItemStat.data + "%"
                        : rowItemStat.data > 0
                        ? rowItemStat.data.toLocaleString()
                        : ""}
                    </span>
                    <span className={css.rowItemGoal}>{rowItemStat.goal && "Goal: 3000"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
