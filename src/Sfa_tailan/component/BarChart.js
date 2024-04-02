import React, { useRef, useEffect, useState } from "react"
import css from "./donutChart.module.css"
import {
  IgrLegendModule,
  IgrDataChartCoreModule,
  IgrDataChartCategoryCoreModule,
  IgrDataChartCategoryModule,
  IgrDataChartInteractivityModule,
  IgrDataChartVerticalCategoryModule,
  IgrDataChartAnnotationModule,
} from "igniteui-react-charts"
import {
  IgrLegend,
  IgrDataChart,
  IgrCategoryYAxis,
  IgrNumericXAxis,
  IgrCategoryHighlightLayer,
  IgrBarSeries,
  IgrDataToolTipLayer,
} from "igniteui-react-charts"

const mods = [
  IgrLegendModule,
  IgrDataChartCoreModule,
  IgrDataChartCategoryCoreModule,
  IgrDataChartCategoryModule,
  IgrDataChartInteractivityModule,
  IgrDataChartVerticalCategoryModule,
  IgrDataChartAnnotationModule,
]
mods.forEach((m) => m.register())

export const BarChart = (props) => {
  const { backOffData, backOffUsers } = props;
  const [userData, setUserData] = useState([]);

  const legendRef = useRef(null);
  const chartRef = useRef(null);
  const barSeries1Ref = useRef(null);
  const barSeries2Ref = useRef(null);

  const TestData = [
    {
      name: "Hello",
      totalRevenue: 5000000,
      highestGrossing: 5000000,
    },
  ];

  useEffect(() => {
    let newDatas = [];
    if (backOffData.length > 0) {
      backOffData.map((data) => {
        if (backOffUsers.length > 0) {
          const filteredData = backOffUsers.filter((user) => user.user_id === Number(data.id));
          if (filteredData.length > 0) {
            newDatas.push({
              name: `${filteredData[0].first_name}`,
              totalRevenue: 30000000,
              highestGrossing: data.amount,
            });
          }
        }
      });
    }
    setTimeout(() => {
      setUserData(newDatas);
    }, "100");
  }, [backOffData, backOffUsers]);

  useEffect(() => {
    if (chartRef.current && legendRef.current) {
      chartRef.current.legend = legendRef.current;
    }
  }, []);

  return (
    <div className={`${css.container} ${css.sample}`}>
      <div className={`${css.container} ${css.fill}`}>
        <IgrDataChart ref={chartRef} legend={legendRef.current}>
          <IgrCategoryYAxis
            name="yAxis"
            label="name"
            dataSource={userData.length > 0 ? userData : TestData}
            isInverted="true"
            gap="1"
          ></IgrCategoryYAxis>

          <IgrNumericXAxis name="xAxis" title=""></IgrNumericXAxis>
          <IgrCategoryHighlightLayer name="CategoryHighlightLayer"></IgrCategoryHighlightLayer>

          <IgrBarSeries
            name="BarSeries1"
            brush="#d6df2a "
            xAxisName="xAxis"
            yAxisName="yAxis"
            title="Зорилт"
            valueMemberPath="totalRevenue"
            dataSource={userData.length > 0 ? userData : TestData}
            showDefaultTooltip="true"
            isTransitionInEnabled="true"
            isHighlightingEnabled="true"
            ref={barSeries1Ref}
          ></IgrBarSeries>

          <IgrBarSeries
            name="BarSeries2"
            brush=" #FAA51A"
            xAxisName="xAxis"
            yAxisName="yAxis"
            title="Одоо"
            valueMemberPath="highestGrossing"
            dataSource={userData.length > 0 ? userData : TestData}
            showDefaultTooltip="true"
            isTransitionInEnabled="true"
            isHighlightingEnabled="true"
            ref={barSeries2Ref}
          ></IgrBarSeries>

          {/* <IgrDataToolTipLayer name="Tooltips"></IgrDataToolTipLayer> */}
        </IgrDataChart>
      </div>
    </div>
  ); 
}
