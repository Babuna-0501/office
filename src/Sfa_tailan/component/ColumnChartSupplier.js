import React, { useRef } from "react";
import { IgrLegendModule, IgrCategoryChartModule } from "igniteui-react-charts";
import { IgrCategoryChart } from "igniteui-react-charts";
import css from "./columnChart.module.css";
import { useEffect } from "react";
import { useState } from "react";

const datasOld = [
  {
    location: "1",
    year: 1600,
  },
  {
    location: "2",
    year: 1500,
  },
];

export const ColumnChartSupplier = (props) => {
  const { amounts, categories } = props;

  // const legendRef = useRef(null);
  const chartRef = useRef(null);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    let newDatas = [];
    if (amounts) {
      amounts.map((hello) => {
        if (hello.id === 0) {
          newDatas.push({
            location: "Ангилалгүй",
            amount: hello.amount,
          });
        } else {
          if (categories) {
            const filteredCate = categories.filter((cate) => cate.id === hello.id);
            if (filteredCate.length > 0) {
              newDatas.push({
                location: `${filteredCate[0].name.substring(0, 10)}`,
                amount: hello.amount,
              });
            } else {
              newDatas.push({
                location: "Ангилал бүртгээгүй",
                amount: hello.amount,
              });
            }
          }
        }
      });
    }
    setTimeout(() => {
      setDatas(newDatas);
    }, "100");
  }, [amounts, categories]);


  IgrLegendModule.register();
  IgrCategoryChartModule.register();

  return (
    <div className={`${css.container} ${css.sample}`}>
      <div className={`${css.container} ${css.fill} ${css.containerA}`}>
        <IgrCategoryChart
          ref={chartRef}
          dataSource={datas.length > 0 ? datas : datasOld}
          chartType="Column"
          isCategoryHighlightingEnabled={true}
          highlightingMode="FadeOthersSpecific"
          highlightingBehavior="NearestItemsAndSeries"
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
          crosshairsDisplayMode="None"
          // brushes="#8dc543"
        />
      </div>
    </div>
  );
};
