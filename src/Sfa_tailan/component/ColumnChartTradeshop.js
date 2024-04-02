import React, { useRef, useEffect } from "react";
import { IgrLegendModule, IgrCategoryChartModule } from "igniteui-react-charts";
import { IgrLegend, IgrCategoryChart } from "igniteui-react-charts";
import css from "./columnChart.module.css";
import { useState } from "react";

export const ColumnChartTradeShop = (props) => {
  const { tradeData, backOffUsers } = props;
  const [data, setData] = useState([
    {
      location: "1",
      bold: 90,
      sukh: 100,
      bat: 50,
    },
  ]);

  const legendRef = useRef(null);
  const chartRef = useRef(null);

  IgrLegendModule.register();
  IgrCategoryChartModule.register();

  useEffect(() => {
    const newData = tradeData.map((trade) => {
      const entry = {};
      entry["location"] = `${trade.tradeName.substring(0, 7)}`;

      trade.backOff.forEach(async (back) => {
        const name = await backOffUsers.find((bb) => Number(bb.user_id) === Number(back.backId));

        entry[name.first_name] = await Number(back.amount);
      });
      return entry;
    });

    setTimeout(() => {
      setData(newData);
    }, "100");
  }, [tradeData, backOffUsers]);

  return (
    <div className={`${css.container} ${css.sample}`}>
      <div className={`${css.legend}`}>
        <IgrLegend ref={legendRef} orientation="Horizontal" />
      </div>

      <div className={`${css.container} ${css.fill} ${css.containerA}`}>
        <IgrCategoryChart
          ref={chartRef}
          dataSource={data}
          chartType="Column"
          legend={legendRef.current}
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
          isSeriesHighlightingEnabled={true}
          brushes="#118dff #d6df2a #60d394 #faa51a #9381ff"
          outlines="white"
          xAxisMajorStroke="lightgray"
          xAxisGap={0.5}
          crosshairsDisplayMode="None"
          isCategoryHighlightingEnabled={true}
          highlightingMode="FadeOthersSpecific"
          highlightingBehavior="NearestItemsAndSeries"
        />
      </div>
    </div>
  );
};
