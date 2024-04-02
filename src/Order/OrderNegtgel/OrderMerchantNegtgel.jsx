import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../components/common";
import css from "./orderNegtgel.module.css";
import * as htmlToImage from "html-to-image";
import InfiniteScroll from "react-infinite-scroll-component";
import ExcelJS from "exceljs";

export const OrderMerchantNegtgel = ({ closeHandler, datas, selectedData }) => {
  console.log(closeHandler)
  console.log(datas)
  console.log(selectedData)
  const [subQuantities, setSubQuantities] = useState(0);
  const [subAmounts, setSubAmounts] = useState(0);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const receiptRef = useRef(null);

  let totalIndexs = [];
  let lastIndex;
  let newDatas = [];

  useEffect(() => {
    let totalQuantities = 0;
    let totalAmounts = 0;
    datas.map((data) => {
      let quantities = 0;
      let amounts = 0;
      data.line.map((line) => {
        quantities = quantities + line.quantity;
        amounts = amounts + line.quantity * line.price_amount;
      });
      totalQuantities = totalQuantities + quantities;
      totalAmounts = totalAmounts + amounts;
    });
    setSubQuantities(totalQuantities);
    setSubAmounts(totalAmounts);
  }, [datas]);

  datas.map((data, index) => {
    let quantities = 0;
    let amounts = 0;
    const foobarblah = JSON.parse(data.order_data)
    console.log(foobarblah)
    datas[index].line.map((line) => {
      quantities = quantities + line.quantity;
      amounts = amounts + line.quantity * line.price_amount;
      const idk = [
        `${index + 1}`,
        `${data.order_id}`,
        `${line.product_name}`,
        Number(line.quantity),
        Number(line.price_amount),
        Number(line.quantity) * Number(line.price_amount),
        Number(line.quantity) * Number(line.price_amount),
        `${data.phone}`,
        `${data.tradeshop_name}`,
        `${data.address}`,
        `${foobarblah.payment.userName}`,
      ];
      newDatas.push(idk);
    });
    const idk2 = [``, ``, `Total`, `${quantities}`, ``, ``, `${amounts.toLocaleString()}`, ``, ``];
    newDatas.push(idk2);
  });
  const idk3 = [
    `*`,
    ``,
    `Grand Total`,
    `${subQuantities}`,
    ``,
    ``,
    `${subAmounts.toLocaleString()}`,
    ``,
    ``,
  ];
  newDatas.push(idk3);

  newDatas.map((data, index) => {
    if (data[0] === "") {
      totalIndexs.push(index);
    }
    if (data[0] === "*") {
      lastIndex = index;
    }
  });

  const generateExcel = () => {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("Sheet1");

    worksheet.columns = [
      { header: "№", key: "№", width: 5 },
      { header: "Захиалгын дугаар", key: "order_number", width: 15 },
      { header: "Бүтээгдэхүүн нэр", key: "product_name", width: 65 },
      { header: "Тоо ширхэг", key: "quantity", width: 13 },
      { header: "Нэгж үнэ", key: "amount", width: 13 },
      { header: "Нийт үнэ", key: "sub_amount", width: 15 },
      { header: "Эцсийн нийт үнэ", key: "final_amount", width: 15 },
      { header: "Утасны дугаар", key: "phone", width: 15 },
      { header: "Харилцагч", key: "merchant", width: 30 },
      { header: "Хаяг", key: "address", width: 30 },
      { header: "ХТ", key: "sr", width: 30 },
    ];

    worksheet.addConditionalFormatting({
      ref: "A1:I1",
      rules: [
        {
          type: "expression",
          formulae: ["MOD(ROW(),1)=0"],
          style: {
            alignment: { horizontal: "center" },
            fill: { type: "pattern", pattern: "solid", bgColor: { argb: "1eff1e" } },
            font: { bold: true },
          },
        },
      ],
    });

    const defaultStyle1 = {
      alignment: { horizontal: "center" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "ffffff" } },
      border: {
        right: { style: "thin", color: "000000" },
        bottom: { style: "thin", color: "000000" },
      },
    };

    const defaultStyle2 = {
      alignment: { horizontal: "center" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "CCFFCC" } },
      font: { bold: true },
      border: {
        bottom: { style: "thin", color: "000000" },
      },
    };

    const defaultStyle3 = {
      alignment: { horizontal: "center" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "00FF00" } },
      font: { bold: true },
      border: {
        bottom: { style: "thin", color: "000000" },
      },
    };

    for (let i = 0; i < newDatas?.length; i++) {
      const currentRowStyle = totalIndexs.includes(i)
        ? defaultStyle2
        : lastIndex === i
        ? defaultStyle3
        : defaultStyle1;
      worksheet.addRow(newDatas[i]).eachCell((cell) => {
        cell.style = currentRowStyle;
      });
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Харилцагчийн-захиалгын-нэгтгэл.xlsx";
      a.click();
    });
  };

  const downloadHandler = useCallback(() => {
    if (receiptRef.current === null) return;
    htmlToImage
      .toPng(receiptRef.current, {
        cacheBust: true,
        canvasWidth: receiptRef.current.clientWidth * 3,
        canvasHeight: receiptRef.current.clientHeight * 3,
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Харилцагчийн-захиалгын-нэгтгэл.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.log(err));
  }, [receiptRef, height, width]);

  return (
    <div onClick={closeHandler} className={css.printRecieptContainer}>
      {selectedData.length > 0 ? (
        <div id="scrollableDiv" className={css.scrollcontainer}>
          <InfiniteScroll
            dataLength={datas.length}
            // next={() => setPage((prev) => prev + 1)}
            hasMore={true}
            // loader={
            //   loading === true && (
            //     <div className={css.loading}>
            //       <LoadingSpinner />
            //     </div>
            //   )
            // }
            // scrollableTarget="scrollableDiv"
          >
            <div onClick={(e) => e.stopPropagation()} ref={receiptRef}>
              <table className={css.productTables}>
                <thead>
                  <tr>
                    <th style={{ width: "1%" }}>№</th>
                    <th>Order number</th>
                    <th>Product name</th>
                    <th>Тоо ширхэг</th>
                    <th>Нэгж үнэ</th>
                    <th>Нийт үнэ</th>
                    <th>Эцсийн нийт үнэ</th>
                    <th>Receiver phone</th>
                    <th>Branch</th>
                    <th>Хаяг</th>
                    <th>ХТ</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => {
                    console.log(data)
                    const foobar = JSON.parse(data.order_data)
                    console.log(foobar)
                    let subQuantity = 0;
                    let subFinalAmount = 0;

                    return (
                      <>
                        {data.line.map((line) => {
                          subQuantity = subQuantity + line.quantity;
                          subFinalAmount = subFinalAmount + line.quantity * line.price_amount;
                          return (
                            <>
                              <tr key={`receipt-${data.order_id}`}>
                                <td>{index + 1}</td>
                                <td>{data.order_id}</td>
                                <td>{line.product_name}</td>
                                <td>{line.quantity}</td>
                                <td>{line.price_amount.toLocaleString()}₮</td>
                                <td>
                                  {(
                                    Number(line.quantity) * Number(line.price_amount)
                                  ).toLocaleString()}
                                  ₮
                                </td>
                                <td>{(line.quantity * line.price_amount).toLocaleString()}₮</td>
                                <td>{data.phone}</td>
                                <td>{data.tradeshop_name}</td>
                                <td>{data.address}</td>
                                <td>{foobar.payment.userName}</td>
                              </tr>
                            </>
                          );
                        })}

                        <tr style={{ backgroundColor: "#CCFFCC" }}>
                          <td></td>
                          <td></td>
                          <td style={{ fontWeight: "800" }}>Total</td>
                          <td style={{ fontWeight: "800" }}>{subQuantity}</td>
                          <td></td>
                          <td></td>
                          <td style={{ fontWeight: "800" }}>{subFinalAmount.toLocaleString()}₮</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </>
                    );
                  })}
                  <tr style={{ backgroundColor: "#00FF00 " }}>
                    <td></td>
                    <td></td>
                    <td style={{ fontWeight: "800" }}>Grand Total</td>
                    <td style={{ fontWeight: "800" }}>{subQuantities}</td>
                    <td></td>
                    <td></td>
                    <td style={{ fontWeight: "800" }}>{subAmounts.toLocaleString()}₮</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div>Хоосон байна</div>
      )}
      <div className={css.printBtn}>
        <Button onClick={() => closeHandler()} variant="secondary" size="medium">
          Болих
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            downloadHandler();
          }}
          variant="primary"
          size="medium"
          disabled={selectedData.length > 0 ? false : true}
        >
          Татах
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            generateExcel();
          }}
          variant="primary"
          size="medium"
          disabled={selectedData.length > 0 ? false : true}
        >
          Excel татах
        </Button>
      </div>
    </div>
  );
};
